module.exports = app => {
    app.get('/', (req, res) => {
       res.json({status: 'Iot backed API'}); 
    });
}