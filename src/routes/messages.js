module.exports = app => {
    const Messages = app.db.models.Messages;

    app.route('/api/constructionsites/:appEUI/messages')
        .get((req, res) => {
            console.log(req.params);
            Messages.findAll({where: req.params})
                .then( result => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(412).json({msg: err.message})
                });
        });
}