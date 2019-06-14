module.exports = app => {

    const Cliente = app.database.models.Clientes;
    const Sequelize = app.database.Sequelize;

    app.UniqueCliente = async(req, res, next) => {

        let cliente = await Cliente.findAll({
            where: Sequelize.and({
                status: 'A'
            },
            Sequelize.or({
                nombre_cliente: req.body.nombre_cliente,
                nombre_empresa_cliente: body.nombre_empresa_cliente,
                correo_cliente: body.correo_cliente
            }))
        });

        if(!cliente){
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            
                        }
                    }
                }
            });
        }
        
        next();
    }



    return app;
}