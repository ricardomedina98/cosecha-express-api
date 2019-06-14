module.exports = app => {

    const Cliente = app.controllers.clientes;
    const { verificarToken, verificarAdmin_Role } = app.middlewares.auth;
    const { UniqueCliente } = app.middlewares.cliente;

    app.get('/clientes', [verificarToken, verificarAdmin_Role] , Cliente.ConsultarClientes);

    app.get('/clientes/:id/productos', [verificarToken, verificarAdmin_Role] , Cliente.ConsultarProductosClientes);

    app.post('/clientes', [verificarToken, verificarAdmin_Role, UniqueCliente] , Cliente.CrearCliente);

    app.put('/clientes/productos', [verificarToken, verificarAdmin_Role] , Cliente.AgregarProuctosClientes);

    app.put('/clientes/:id', [verificarToken, verificarAdmin_Role] , Cliente.ActualizarCliente);

    app.delete('/clientes/:id', [verificarToken, verificarAdmin_Role] , Cliente.EliminarCliente);
    
    app.get('/clientes/:num', [verificarToken, verificarAdmin_Role] , Cliente.GenerarClientes);

}