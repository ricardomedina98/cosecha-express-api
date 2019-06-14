const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Producto = app.database.models.Productos;
    const Mediciones = app.database.models.Mediciones;
    const Cat_Prod = app.database.models.Categoria_productos;
    const Equivalencias = app.database.models.Equivalencias;
    const sequelize = app.database.sequelize;    


    app.ObtenerProductos = (req, res) => {
        Producto.findAll({
            where: {
                status: 'A'
            },
            include: [{
                model: Mediciones,
                attributes: ['id_medicion','tipo_medicion']
            }, {
                model: Cat_Prod,
                attributes: ['id_categoria', 'nombre_categoria']
            }, {
                model: Equivalencias,
                required: false,
                attributes: ['id_equivalencia', 'equivalencia1', 'equivalencia2', 'medicionEquiv1', 'medicionEquiv2']
            }]
        })
        .then(result => {            
            res.json({
                OK: true,
                Productos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.CrearProducto = (req, res) => {

        let body = req.body;
        
        let producto = new Producto({ 
            id_categoria: body.id_categoria,     
            id_medicion: body.id_medicion,
            nombre_producto: body.nombre_producto,
            existencia: body.existencia,
            existencia_min: body.existencia_min,
            existencia_max: body.existencia_max
        });        
        
        Producto.create(producto.dataValues, {
            fields: ['id_categoria' ,'id_medicion', 'nombre_producto',
             'existencia', 'existencia_min', 'existencia_max']
        })
        .then(result => {                       
            res.json({
                OK: true,
                producto: result
            });
            
        })
        .catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
        });        
    }

    app.ActualizarProducto = (req, res) => {
       
        let id = req.params.id;
        let body = req.body;
            
        let producto = new Producto({
            id_categoria: body.id_categoria || null,
            id_medicion: body.id_medicion,
            nombre_producto: body.nombre_producto,
            existencia: body.existencia,
            existencia_min: body.existencia_min,
            existencia_max: body.existencia_max          
        });        

        Producto.update(producto.dataValues, {            
            where : {
                id_producto: id
            },
            individualHooks: true,            
            fields: ['id_categoria', 'id_medicion', 'nombre_producto', 'existencia', 'existencia_min',
                    'existencia_max']
        }).then(result => {            
            res.json({
                OK: true,
                producto: producto.dataValues
            });
        }).catch(err => {
            console.log(err);
            res.status(412).json({
                OK: false,
                msg: err
            });
        });

    }

    app.ConsultarProductoID = (req, res) => {
        let id = req.params.id;        

        Producto.findByPk(id, { 
            where: {
                status: 'A'
            },
            include: [{
                model: Mediciones,
                where: { id_medicion: app.database.Sequelize.col('mediciones.id_medicion') },
                attributes: ['tipo_medicion']
            }, {
                model: Cat_Prod,
                where: { id_categoria: app.database.Sequelize.col('categoria_productos.id_categoria') },
                required:false,
                attributes: ['nombre_categoria']
            }]
        })
        .then(producto => {
            res.json({
                OK: true,
                producto
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.EliminarProducto = (req, res) => {
        let id = req.params.id;

        let producto = new Producto({
            status: 'I'
        });

        Producto.update(producto.dataValues, {
            where: {
                id_producto: id
            },
            individualHooks: true,
            fields: ['status']
        }).then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    app.GenerarProductos = async(req, res) => {

        let num = req.params.num;

        for (let index = 0; index < num; index++) {

            let producto = new Producto({
                id_categoria: null,
                id_medicion: 1,
                nombre_producto: faker.commerce.productName(),
                existencia: faker.finance.amount(),
                existencia_min: faker.finance.amount(),
                existencia_max: faker.finance.amount()
            });

            await Producto.create(producto.dataValues, {
                fields: ['id_categoria', 'id_medicion', 'nombre_producto',
                 'existencia', 'existencia_min', 'existencia_max']
            })
            .then(result => {
                //console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

            
            
        }

        res.send(`${num} productos creados`);

    }

    app.EquivalenciaProducto = async(req, res) => {

        let id = req.params.id;
        let body = req.body;

        sequelize.transaction(async t => {

            producto = await Producto.update({
                precio_semanal: body.precio_semanal
            }, {            
                where : {
                    id_producto: id
                },     
                fields: ['precio_semanal'],
                transaction: t,
                individualHooks: true            
            }).then(result => {                
            }).catch(error => {                
                return t.rollback();
            });

            equivalencias = await Equivalencias.update({
                equivalencia1: req.body.equivalencia1,
                equivalencia2: req.body.equivalencia2,
                medicionEquiv1: req.body.medicionEquiv1,
                medicionEquiv2: req.body.medicionEquiv2,
                porcentaje: req.body.porcentaje
            }, {
                where : {
                    id_producto: id
                }, 
                fields: ['equivalencia1', 'equivalencia2', 'medicionEquiv1', 'medicionEquiv2', 'porcentaje'],
                transaction: t,
                individualHooks: true   
            }).then(result => {
            }).catch(error => {
                console.log(error);
                return t.rollback();
            });

            t.afterCommit((transaction) => {                
                app.getProductos;
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

    return app;
}