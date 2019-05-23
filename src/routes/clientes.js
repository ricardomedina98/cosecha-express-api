module.exports = app => {

    const Cliente = app.controllers.clientes;
    const { verificarToken, verificarAdmin_Role } = app.middlewares.auth;

    app.get('/clientes', [verificarToken, verificarAdmin_Role] , Cliente.ConsultarClientes);

    app.post('/clientes', [verificarToken, verificarAdmin_Role] , Cliente.CrearCliente);

    app.put('/clientes/:id', [verificarToken, verificarAdmin_Role] , Cliente.ActualizarCliente);

    app.delete('/clientes/:id', [verificarToken, verificarAdmin_Role] , Cliente.EliminarCliente);

    app.get('/clientes/:num', [verificarToken, verificarAdmin_Role] , Cliente.GenerarClientes);

}