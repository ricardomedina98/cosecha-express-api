module.exports = app => {
    const Cliente = app.database.models.Clientes;

    app.ConsultarUsuario = (req, res) => {

        Cliente.findAll({
            where: {
                status: 'A'
            }
        })
        .then(result => {
            //console.log(result);
        })
        .catch(err => {
            //console.log(err);
        });

    }

    return app;
}