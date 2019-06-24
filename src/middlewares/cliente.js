module.exports = app => {

    const Cliente = app.database.models.Clientes;
    const Sequelize = app.database.Sequelize;
    const Op = Sequelize.Op

    app.UniqueClienteUpdate = async(req, res, next) => {

        let fields = {};

        let cliente_empresa = await Cliente.findAll({
            where: Sequelize.and({
                status: 'A',
                nombre_empresa_cliente: req.body.nombre_empresa_cliente,
                id_cliente: {
                    [Op.ne]: req.params.id
                }   
            })
        });

        let cliente_correo = await Cliente.findAll({
            where: Sequelize.and({
                status: 'A',
                correo_cliente: req.body.correo_cliente,
                id_cliente: {
                    [Op.ne]: req.params.id
                }      
            })
        });

        if(cliente_empresa.length > 0)
            fields.un_nombre_empresa_cliente = 'nombre_empresa_cliente';
        if(cliente_correo.length > 0)
            fields.un_correo_cliente = 'correo_cliente';

        if(fields.un_nombre_empresa_cliente || fields.un_correo_cliente) {
            return res.status(422).json({
                OK: false,
                msg: {
                    fields
                }
            });
        }

        next();
    }

    app.UniqueClienteInsert = async(req, res, next) => {

        let fields = {};

        let cliente_empresa = await Cliente.findAll({
            where: Sequelize.and({
                status: 'A',
                nombre_empresa_cliente: req.body.nombre_empresa_cliente                
            })
        });

        let cliente_correo = await Cliente.findAll({
            where: Sequelize.and({
                status: 'A',
                correo_cliente: req.body.correo_cliente
            })
        });

        if(cliente_empresa.length > 0)
            fields.un_nombre_empresa_cliente = 'nombre_empresa_cliente';
        if(cliente_correo.length > 0)
            fields.un_correo_cliente = 'correo_cliente';

        if(fields.un_nombre_empresa_cliente || fields.un_correo_cliente) {
            return res.status(422).json({
                OK: false,
                msg: {
                    fields
                }
            });
        }

        next();
    }



    return app;
}