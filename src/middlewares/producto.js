module.exports = app => {
    
    const Producto = app.database.models.Productos;
    const Sequelize = app.database.Sequelize;
    const Op = Sequelize.Op;

    app.UniqueProductoInsert = async (req, res, next) => {    
        
        let producto = await Producto.findOne({ 
            where: Sequelize.and({
                status: 'A'
            }, 
            Sequelize.or({
                nombre_producto: req.body.nombre_producto
            }))
        });

        if(producto) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            nombre_producto: req.body.nombre_producto
                        }
                    }
                }
            });
        }        

        next();
    }

    app.UniqueProductoUpdate = async (req, res, next) => {    
        
        let producto = await Producto.findOne({ 
            where: Sequelize.and({
                status: 'A',
                id_producto: {
                    [Op.ne]: req.params.id
                }
            }, 
            Sequelize.or({
                nombre_producto: req.body.nombre_producto
            }))
        });

        if(producto) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            nombre_producto: req.body.nombre_producto
                        }
                    }
                }
            });
        }        

        next();
    }


    return app;
}