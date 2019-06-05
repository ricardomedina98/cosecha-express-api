module.exports = app => {

    const Mediciones = app.controllers.mediciones;
    const { verificarToken } = app.middlewares.auth;

    app.get('/mediciones', verificarToken, Mediciones.ObtenerMediciones);

};