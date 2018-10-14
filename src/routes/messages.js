module.exports = app => {
    const Messages = app.db.models.Messages;

    function parseRequest(req, res, last)
    {
        console.log(req.params);

        const sequelize = app.db.sequelize;
        let queryParams = req.params;

        if (req.query.DevEui) queryParams.devEui = req.query.DevEui;

        if (last === false)
        {
	    let filterOpts = {
		order: [['serverDateTime', 'DESC']],
		where: queryParams
	    };

	    if (req.query.Page && req.query.PageSize)
	    {
		filterOpts.limit = req.query.PageSize;
		filterOpts.offset = req.query.Page * req.query.PageSize;
	    }

            Messages.findAll(filterOpts)
                .then( result => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(412).json({msg: err.message})
                });
        }
        else
        {
            if (!req.query.DevEui)
            {
                res.status(402).json({msg: 'DevEui required!'});
                return;
            }

            Messages.findAll({limit: 1, order: [['id', 'DESC']], where: queryParams})
                .then( result => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(412).json({msg: err.message})
                });
        }
    }

    app.route('/api/constructionsites/:appEUI/messages')
        .get((req, res) => parseRequest(req, res, false));

    app.route('/api/constructionsites/:appEUI/messages/last')
        .get((req, res) => parseRequest(req, res, true));
}
