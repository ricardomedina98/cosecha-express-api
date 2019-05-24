const bcrypt = require('bcrypt');
const faker = require('faker/locale/es_MX');

module.exports = app => {

    const Usuario = app.database.models.usuarios;

    app.ObtenerUsuarios = (req, res) => {

        Usuario.findAll({
            where: {
                status: 'A'
            }
        })
        .then(result => res.json(result))
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
            role: body.role
        });

        Usuario.create(usuario.dataValues, {
            fields: ['nombre_empleado', 'nombre_usuario', 'contrasena', 'role']
        })
        .then(result => {
            delete result.dataValues.contrasena;
            res.json({
                OK: true,
                usuario: result
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

        let usuario = new Usuario({
            nombre_empleado: body.nombre_empleado,
            nombre_usuario: body.nombre_usuario,
            contrasena: bcrypt.hashSync(body.contrasena, 10),
            role: body.role,
            status: 'A'
        });        

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields: ['nombre_empleado', 'nombre_usuario', 'contrasena', 'role', 'status']
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
            field = ['nombre_empleado', 'nombre_usuario', 'contrasena']
        }

        console.log(usuario.dataValues);
        console.log(field);

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

    return app;
}