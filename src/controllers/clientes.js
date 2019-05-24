const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Cliente = app.database.models.clientes;

    app.ConsultarClientes = (req, res) => {

        Cliente.findAll({
            where: {
                status: 'A'
            }
        })
        .then(result => {
            res.json({
                OK: true,
                clientes: result
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

        Cliente.create(cliente.dataValues, {
            fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
            'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
        })
        .then(result => {
            res.json({
                OK: true,
                cliente: result
            });
        })
        .catch(err => {
            res.status(412).json({
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