module.exports = app => 
{
    const port = app.get('port');

    app.db.sequelize.sync().done(() => {
        app.listen(port, () => 
        {
            console.log(`REST API on port ${port}`);
        });
    });    
}