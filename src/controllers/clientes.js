const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Cliente = app.database.models.Clientes;
    const Productos = app.database.models.Productos;
    const Productos_Clientes = app.database.models.Productos_Clientes;
    const sequelize = app.database.sequelize;    

    app.ConsultarClientes = (req, res) => {

        Cliente.findAll({
            where: {
                status: 'A'
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Clientes: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });

    }

    app.ConsultarProductosClientes = (req, res) => {

        let id = req.params.id; 
        console.log(id);       

        Cliente.findByPk(id,{
            where: {                
                status: 'A'
            },
            include: [{
                model: Productos,
                as: 'ProductosClientes',                
                required:true
            }]
        })
        .then(result => {
            res.json({
                OK: true,
                Clientes: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });

    }

    app.CrearCliente = (req, res)=> {

        let body = req.body;

        let cliente = new Cliente({
            nombre_cliente: body.nombre_cliente,
            apellido1_cliente: body.apellido1_cliente,
            apellido2_cliente: body.apellido2_cliente,
            nombre_empresa_cliente: body.nombre_empresa_cliente,
            telefono_cliente: body.telefono_cliente,
            correo_cliente: body.correo_cliente
        });

        console.log(cliente.dataValues);

        Cliente.create(cliente.dataValues, {
            fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
            'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
        })
        .then(result => {
            res.json({
                OK: true,
                Cliente: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(409).json({
                OK: false,
                msg: err
            });
        });

    }

    app.ActualizarCliente = (req, res)=> {

        let id = req.params.id;
        let body = req.body;

        let cliente = new Cliente({
            nombre_cliente: body.nombre_cliente,
            apellido1_cliente: body.apellido1_cliente,
            apellido2_cliente: body.apellido2_cliente,
            nombre_empresa_cliente: body.nombre_empresa_cliente,
            telefono_cliente: body.telefono_cliente,
            correo_cliente: body.correo_cliente
        });

        Cliente.update(cliente.dataValues, {
            where: {
                id_cliente: id,
                status: 'A'
            },
            fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
            'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
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

    };

    app.EliminarCliente = (req, res) => {
        let id = req.params.id;

        let cliente = new Cliente({
            status: 'I'
        });

        Cliente.update(cliente.dataValues, {
            where: {
                id_cliente: id
            },
            fields: ['status']
        })
        .then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    app.AgregarProuctosClientes = (req, res) => {

        let products = req.body;
        
        sequelize.transaction(async t => {

            await products.forEach((element, index) => {

                let precio_cliente = new Productos_Clientes({
                    id_producto: element.id_producto,
                    id_cliente: element.id_cliente,
                    precio_especial: element.precio_especial
                });   
                Productos_Clientes.create(precio_cliente.dataValues,
                {
                    transaction: t
                })
                .then(result => {
                    
                }).catch(error => {
                    console.log(error);
                });                        
                
            })
        })
        .then(result => {
            res.json({
                OK: true
            });
        }).catch(error => {
            res.status(402).json({
                OK: true
            });
        });

    }

    app.EliminarProductoCliente = (req, res) => {        

        Productos_Clientes.findOne({
            where: {
                id_producto: req.params.id_producto,
                id_cliente: req.params.id_cliente
            }
        })
        .then(producto_prec_espec => {

            if(!producto_prec_espec){
                res.status(404).json({
                    OK: false,
                    msg: 'Producto no encontrado'
                });
            }

            producto_prec_espec.destroy()
            .then(result => {
                res.json({
                    OK: true,
                    row_deleted: true
                });
            });
            
        })
        .catch(err => {
            res.status(404).json({
                OK: false,
                msg: 'Producto no encontrado'
            });
        });
    }
    
    app.GenerarClientes = async(req, res) => {

        let num = req.params.num;

        for (let index = 0; index < num; index++) {

            let cliente = new Cliente({
                nombre_cliente: faker.name.firstName(),
                apellido1_cliente: faker.name.lastName(),
                apellido2_cliente: faker.name.lastName(),
                nombre_empresa_cliente: faker.company.companyName(),
                telefono_cliente: faker.phone.phoneNumber(),
                correo_cliente: faker.internet.email()
            });

            await Cliente.create(cliente.dataValues, {
                fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
                'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
            })
            
        }

        res.send(`${num} clientes creados`);

    }


    return app;
}