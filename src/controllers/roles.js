module.exports = app => {

    const Roles = app.database.models.Roles;
    const Modulos = app.database.models.Modulos;
    const Permisos_Nivel_1 = app.database.models.Permisos_Nivel_1;

    app.ObtenerRoles = (req, res) => {
        

        Roles.findAll()
        .then(roles => {
            res.json({
                OK: true,
                Roles: roles
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    return app;
}