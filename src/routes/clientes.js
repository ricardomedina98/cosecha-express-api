module.exports = app => {

    const Cliente = app.controllers.clientes;
    const { verificarToken, verificarAdmin_Role } = app.middlewares.auth;

    app.get('/clientes', [verificarToken, verificarAdmin_Role] , Cliente.ConsultarUsuario);

}