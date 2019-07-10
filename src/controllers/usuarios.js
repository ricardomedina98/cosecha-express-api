const bcrypt = require('bcrypt');
const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Usuario = app.database.models.Usuarios;

    app.ObtenerUsuarios = (req, res) => {

        Usuario.findAll({
            where: {
                status: 'A'
            }
        })
        .then(usuarios => {
            res.json({
                OK: true,
                Usuarios: usuarios
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.CrearUsuario = (req, res) => {

        let body = req.body;

        let usuario = new Usuario({
            nombre_empleado: body.nombre_empleado,
            nombre_usuario: body.nombre_usuario,
            contrasena: bcrypt.hashSync(body.contrasena, 10),
            id_role: body.id_role
        });

        Usuario.create(usuario.dataValues, {
            fields: ['nombre_empleado', 'nombre_usuario', 'contrasena', 'id_role']
        })
        .then(result => {
            delete result.dataValues.contrasena;
            res.json({
                OK: true,
                Usuario: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.ActualizarUsuario = (req, res) => {
        let id = req.params.id;
        let body = req.body;   
        let fields = ['nombre_empleado', 'nombre_usuario', 'id_role', 'status']     

        let usuario = new Usuario();        

        if(body.contrasena) {
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,
                contrasena: bcrypt.hashSync(body.contrasena, 10),
                id_role: body.role,
                status: 'A'
            });

            fields.push('contrasena');
        } else {
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,                
                id_role: body.id_role,
                status: 'A'
            });
        }

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields
        }).then(result => {
            delete usuario.dataValues.contrasena;
            res.json({
                OK: true,
                usuario,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    }

    app.ActualizarUsuarioPerfil = (req, res) => {
        let id = req.params.id;
        let body = req.body;  
        
        let field = ['nombre_empleado', 'nombre_usuario'];

        let usuario = new Usuario({
            nombre_empleado: body.nombre_empleado,
            nombre_usuario: body.nombre_usuario            
        });        

        if(body.contrasena){
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,
                contrasena: bcrypt.hashSync(body.contrasena, 10)         
            }); 
            field.push('contrasena');
        }

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields: field
        }).then(result => {
            delete usuario.dataValues.contrasena;
            res.json({
                OK: true,
                usuario,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    }


    app.ObtenerUsuarioID = (req, res) => {

        let id = req.params.id;

        Usuario.findByPk(id)
        .then(usuario => {
            res.json({
                OK: true,
                usuario
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.EliminarUsuario = (req, res) => {
        let id = req.params.id;

        let usuario = new Usuario({
            status: 'I'
        });

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
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

    app.GenerarUsuarios = async (req, res) => {

        let num = req.params.num;

        for (let index = 0; index < num; index++) {
            await Usuario.create({
                nombre_empleado: faker.name.findName(),
                nombre_usuario: faker.internet.userName(),
                contrasena: bcrypt.hashSync('12345', 10),
                role: 'admin'
            }, {
                fields: ['nombre_empleado', 'nombre_usuario', 'contrasena', 'role']
            });
        }

        res.send(`${num} users created`);

    }

    app.ConsultarUsuarioTotales = (req, res) => {

        Usuario.count({
            where: {
                status: 'A'
            }
        })
        .then(count => {
            res.json({
                OK: true,
                Total: count
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    return app;
}