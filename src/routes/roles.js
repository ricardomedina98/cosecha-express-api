

module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Roles = app.controllers.roles;    

    app.get('/roles', [verificarToken], Roles.ObtenerRoles );

}