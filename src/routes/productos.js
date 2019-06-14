module.exports = app => {
    

    const Producto = app.controllers.productos;
    const { verificarToken } = app.middlewares.auth;

    app.get('/productos',verificarToken, Producto.ObtenerProductos);

    app.get('/productos/:id', verificarToken, Producto.ConsultarProductoID);

    app.post('/productos', verificarToken, Producto.CrearProducto);

    app.put('/productos/:id', verificarToken, Producto.ActualizarProducto);

    app.delete('/productos/:id', verificarToken, Producto.EliminarProducto);

    app.delete('/clientes/:id_cliente/productos/:id_producto', verificarToken, Producto.EliminarProductoCliente);
    
    app.get('/productos/faker/:num', verificarToken, Producto.GenerarProductos);

    app.put('/productos/equivalencias/:id', verificarToken, Producto.EquivalenciaProducto);

    
}