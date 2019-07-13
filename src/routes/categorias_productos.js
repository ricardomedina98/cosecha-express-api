module.exports = app => {
    const Categoria_Prod = app.controllers.categorias_productos;
    
    const { verificarToken } = app.middlewares.auth;

    app.get('/categorias', [verificarToken], Categoria_Prod.ConsultarCategorias);

    app.get('/categorias/productos', [verificarToken], Categoria_Prod.ConsCategoriasProd);

    app.delete('/categorias/:id_categoria', [verificarToken], Categoria_Prod.EliminarCategoria);

    app.post('/categorias', [verificarToken], Categoria_Prod.AgregarCategoria);

    app.put('/categorias/:id_categoria', [verificarToken], Categoria_Prod.ActualizarCategoria);

}