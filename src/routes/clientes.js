module.exports = app => {

    const Cliente = app.controllers.clientes;
    const { verificarToken } = app.middlewares.auth;
    const { UniqueClienteInsert, UniqueClienteUpdate } = app.middlewares.cliente;

    //Obtiene la informacion del cliente
    app.get('/clientes', [verificarToken] , Cliente.ConsultarClientes);

    //Obtiene los productos de un cliente en especifico
    app.get('/clientes/:id/productos', [verificarToken] , Cliente.ConsultarProductosClientes);

    //Crea un nuevo cliente
    app.post('/clientes', [verificarToken, UniqueClienteInsert] , Cliente.CrearCliente);

    //Agrega nuevos productos a la lista de un cliente
    app.put('/clientes/productos', [verificarToken] , Cliente.AgregarProuctosClientes);

    //Actualiza la informacion basica del cliente
    app.put('/clientes/:id', [verificarToken, UniqueClienteUpdate] , Cliente.ActualizarCliente);

    //Desactiva a un cliente
    app.delete('/clientes/:id', [verificarToken] , Cliente.EliminarCliente);
    
    //Genera nuevos clientes aleatoriamente
    app.get('/clientes/:num', [verificarToken] , Cliente.GenerarClientes);

    //Aplica la operacion de aumento o desaumento a la lista de precios de un cliente
    app.put('/clientes/:id_cliente/aplicar_operacion', [verificarToken] , Cliente.AplicarOperacionProductos);

    //Restaura el precio especial que tiene el cliente al precio general de la tabla de productos
    app.get('/clientes/:id_cliente/producto/:id_producto', [verificarToken] , Cliente.RestaurarPrecioCliente);

    //Restara los precios de toda la lista de productos de un cliente
    app.get('/clientes/restaurar_lista/:id_cliente', [verificarToken] , Cliente.RestaurarPrecios);

    //Actualizar el precio especial de un producto de la lista de un clinete
    app.put('/clientes/:id_cliente/productos/:id_producto', [verificarToken] , Cliente.ActualizarPrecioEspecial);

    app.post('/clientes/:id_cliente/enviar_correo', [verificarToken] , Cliente.enviarCorreoCliente);

    app.get('/clientes/:id_cliente/descargar_excel', [verificarToken] , Cliente.descargarExcel);

    app.get('/clientes/count/totales', Cliente.ConsultarClienteTotales);
    
}