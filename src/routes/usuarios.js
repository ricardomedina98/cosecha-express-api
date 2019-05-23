

module.exports = app => {
    
    const { verificarToken, verificarAdmin_Role } = app.middlewares.auth;
    const Usuario = app.controllers.usuarios;

    app.get('/usuario', [verificarToken, verificarAdmin_Role], Usuario.ObtenerUsuarios );

    app.post('/usuario', verificarToken, Usuario.CrearUsuario);

    app.put('/usuarioperfil/:id', verificarToken, Usuario.ActualizarUsuarioPerfil);

    app.put('/usuario/:id', verificarToken, Usuario.ActualizarUsuario);

    app.get('/usuario/:id', verificarToken, Usuario.ObtenerUsuarioID);

    app.delete('/usuario/:id', verificarToken , Usuario.EliminarUsuario);

    app.get('/faker/user/:num', Usuario.GenerarUsuarios);

}