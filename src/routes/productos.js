module.exports = app => {
    

    const Producto = app.controllers.productos;
    const { verificarToken } = app.middlewares.auth;
    const { UniqueProductoInsert, UniqueProductoUpdate } = app.middlewares.producto;

    app.get('/productos',verificarToken, Producto.ObtenerProductos);

    app.get('/productos/:id', verificarToken, Producto.ConsultarProductoID);

    app.post('/productos', [verificarToken, UniqueProductoInsert], Producto.CrearProducto);

    app.put('/productos/:id', [verificarToken, UniqueProductoUpdate], Producto.ActualizarProducto);

    app.delete('/productos/:id', verificarToken, Producto.EliminarProducto);

    app.delete('/clientes/:id_cliente/productos/:id_producto', verificarToken, Producto.EliminarProductoCliente);
    
    app.get('/productos/faker/:num', verificarToken, Producto.GenerarProductos);

    app.put('/productos/equivalencias/:id', verificarToken, Producto.EquivalenciaProducto);

    app.get('/productos/:id_producto/grafica', Producto.GraficaProducto);

    
}