module.exports = app => {

    const Cat_Prod = app.database.models.categoria_productos;
    const Producto = app.database.models.productos;

    app.ConsultarCategorias = (req, res) => {

        Cat_Prod.findAll({})
        .then(result => {
            res.json({
                OK: true,
                categorias: result
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });

    }
    
    app.ConsCategoriasProd = (req, res)=> {

        Cat_Prod.findAll({
            include: [{
                model: Producto,                            
                required:false                
            }]
        })
        .then(result => {
            res.json({
                OK: true,
                categorias: result
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });

    }

    return app;

}