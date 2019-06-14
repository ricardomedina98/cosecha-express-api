module.exports = app => {
    
    const Producto = app.database.models.Productos;
    const Sequelize = app.database.Sequelize;

    app.UniqueProducto = async (req, res, next) => {    
        
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


    return app;
}