const bcrypt = require('bcrypt');
const faker = require('faker/locale/es_MX');

module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Usuario = app.middlewares.usuarios;

    app.route('/usuario')
    .get(verificarToken, Usuario.ObtenerUsuarios )
    .post(verificarToken, Usuario.CrearUsuario);

    app.put('/usuario/:id', verificarToken, Usuario.ActualizarUsuario);

    app.get('/usuario/:id', verificarToken, Usuario.ObtenerUsuarioID);

    app.delete('/usuario/:id', verificarToken , Usuario.EliminarUsuario);
    
    app.get('/faker/user/:num', Usuario.GenerarUsuarios);

}