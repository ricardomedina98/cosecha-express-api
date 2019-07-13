module.exports = app => {

    const Cat_Prod = app.database.models.Categoria_productos;
    const Producto = app.database.models.Productos;
    const sequelize = app.database.sequelize; 

    app.ConsultarCategorias = (req, res) => {

        Cat_Prod.findAll({})
        .then(result => {
            res.json({
                OK: true,
                Categorias: result
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

    app.EliminarCategoria = (req,res)=> {

        sequelize.transaction(async t => {                      
            
            producto = await Producto.update({
                id_categoria: null
            }, {            
                where : {
                    id_categoria: req.params.id_categoria
                },     
                fields: ['id_categoria'],
                transaction: t,
                individualHooks: false            
            }).then(result => {                
            }).catch(error => {    
                console.log(error);            
                return t.rollback();
            });

            Cat_Prod.destroy({
                where: {
                    id_categoria: req.params.id_categoria
                }
            })
            .then(result => {
            })
            .catch(err => {
                console.log(err);
                return t.rollback();
            });

            t.afterCommit((transaction) => {   
                app.getProductos();                
            });

        }).then(result => {            
            res.json({
                OK: true
            });            

        }).catch(error => {            
            res.status(402).json({
                OK: false
            });
        });
    }

    app.AgregarCategoria = (req, res) => {
        let categoria = new Cat_Prod({            
            nombre_categoria: req.body.nombre_categoria
        });

        Cat_Prod.create(categoria.dataValues, {
            fields: ['nombre_categoria']
        })
        .then(result => {
            res.json({
                OK: true,
                Categoria: result
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    app.ActualizarCategoria = (req, res) => {

        let categoria = new Cat_Prod({
            nombre_categoria: req.body.nombre_categoria
        });

        Cat_Prod.update(categoria.dataValues, {
            where: {
                id_categoria: req.params.id_categoria
            },
            fields: ['nombre_categoria']
        })
        .then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: true,
                msg: err
            });
        });
    }

    return app;

}