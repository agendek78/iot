// @ts-check
module.exports = app => {
    const Messages = app.db.models.Messages;
    const Op = app.db.Sequelize.Op;

    function parseRequest(req, res, last) {

        const sequelize = app.db.sequelize;
        let queryParams = req.params;

        if (req.query.DevEui) queryParams.devEui = req.query.DevEui;

        if (last === false) {
            let filterOpts = {
                order: [],
                where: queryParams
            };

            if (req.query.SortBy) {
                let sortFields = req.query.SortBy.split(',');

                sortFields.forEach(element => {
                    if (element[0] === '-')
                        filterOpts.order.push([element.substring(1, element.length), 'DESC']);
                    else
                        filterOpts.order.push([element, 'ASC']);
                });
            } else {
                filterOpts.order.push(['serverDateTime', 'DESC']);
            }

            if (req.query.Page && req.query.PageSize) {
                filterOpts.limit = Number(req.query.PageSize);
                if (req.query.Page < 1)
                    filterOpts.offset = 0;
                else
                    filterOpts.offset = (req.query.Page - 1) * req.query.PageSize;
            } else {
		filterOpts.limit = 100;
		filterOpts.offset = 0;
	    }

            if (req.query.OnlyAlarm &&
                req.query.OnlyAlarm.toLowerCase() == 'true') {
                filterOpts.where.zone = {
                    [Op.ne]: app.libs.zone.ZoneType.NotMonitored
                };
                filterOpts.where.status = {
                    [Op.in]: [app.libs.status.StatusType.Alarm]
                };
            }

            Messages.findAll(filterOpts)
                .then(result => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        } else {
            if (!req.query.DevEui) {
                res.status(402).json({
                    msg: 'DevEui required!'
                });
                return;
            }

            Messages.findAll({
                    limit: 1,
                    order: [
                        ['id', 'DESC']
                    ],
                    where: queryParams
                })
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    });
                });
        }
    }

    app.route('/api/constructionsites/:appEUI/messages')
        .get((req, res) => parseRequest(req, res, false));

    app.route('/api/constructionsites/:appEUI/messages/last')
        .get((req, res) => parseRequest(req, res, true));
}
