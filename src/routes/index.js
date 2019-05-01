module.exports = app => {

    const Usuarios = app.database.models.Usuarios;
    

    app.get('/', (req, res) => {
        console.log(req.cookie);
    });
}