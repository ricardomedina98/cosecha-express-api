
const faker = require('faker/locale/es_MX');

module.exports = app => {
    

    const Producto = app.controllers.productos;
    const { verificarToken } = app.middlewares.auth;

    app.route('/productos')
    .get(verificarToken, Producto.ObtenerProductos)
    .post(verificarToken, Producto.CrearProducto);

    app.put('/productos/:id', verificarToken, Producto.ActualizarProducto);
    
    app.get('/productos/faker/:num', verificarToken, Producto.GenerarProductos);
}