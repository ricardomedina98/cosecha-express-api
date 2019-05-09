const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Producto = app.database.models.Productos;
    const Mediciones = app.database.models.Mediciones;
    const Cat_Prod = app.database.models.Categoria_productos;    

    app.ObtenerProductos = (req, res) => {
        Producto.findAll({ 
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
            id_categoria: body.id_categoria || null,
            id_medicion: body.id_medicion,
            nombre_producto: body.nombre_producto,
            existencia: body.existencia,
            existencia_min: body.existencia_min,
            existencia_max: body.existencia_max,
            precio_semanal: body.precio_semanal,
            precio_diario: body.precio_diario
        });

        Producto.create(producto.dataValues, {
            fields: ['id_categoria', 'id_medicion', 'nombre_producto',
             'existencia', 'existencia_min', 'existencia_max', 'precio_semanal', 'precio_diario'],
             include: [Mediciones]
        })
        .then(result => {
            app.io.emit('SHOW_PRODUCTS', { Productos: result });
            res.json({
                OK: true,
                producto: result
            });
            
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });

        console.log(producto.dataValues);
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
            existencia_max: body.existencia_max,
            precio_semanal: body.precio_semanal,
            precio_diario: body.precio_diario
        });

        Producto.update(producto.dataValues, {
            where : {
                id_producto: id
            },
            individualHooks: true,
            fields: ['id_categoria', 'id_medicion', 'nombre_producto', 'existencia', 'existencia_min',
                    'existencia_max', 'precio_semanal', 'precio_diario']
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
                existencia_max: faker.finance.amount(),
                precio_semanal: faker.finance.amount(),
                precio_diario: faker.finance.amount()
            });

            await Producto.create(producto.dataValues, {
                fields: ['id_categoria', 'id_medicion', 'nombre_producto',
                 'existencia', 'existencia_min', 'existencia_max', 'precio_semanal', 'precio_diario']
            })
            
        }

        res.send(`${num} productos creados`);

    }

    return app;
}