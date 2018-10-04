module.exports = (app, port) => 
{
    app.listen(port, () => 
    {
        console.log(`REST API on port ${port}`);
    });    
}