module.exports = app => {
    const Categoria_Prod = app.controllers.categorias_productos;
    
    const { verificarToken, verificarAdmin_Role } = app.middlewares.auth;

    app.get('/categorias', [verificarToken, verificarAdmin_Role], Categoria_Prod.ConsultarCategorias);

    app.get('/categorias/productos', [verificarToken, verificarAdmin_Role], Categoria_Prod.ConsCategoriasProd);

}