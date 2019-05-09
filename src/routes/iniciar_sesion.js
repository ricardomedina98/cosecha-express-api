const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports = app => {

    const Usuario = app.database.models.Usuarios;

    app.get('/iniciar_sesion', (req, res) => {

        let body = req.body;

        Usuario.scope('withPassword').findOne({
            where: {
                nombre_usuario: body.nombre_usuario
            }
        }).then(result => {            
            

            if(!result){
                return res.status(401).json({
                    OK: false,
                    msg: 'Usuario o contraseña incorrecto'
                });
            }

            if(!bcrypt.compareSync(body.contrasena, result.dataValues.contrasena)){
                return res.status(401).json({
                    OK: false,
                    msg: 'Usuario o contraseña incorrecto'
                });
            }

            delete result.dataValues.contrasena;

            let token = jwt.sign({
                usuario: result.dataValues  
            }, app.libs.config.SEED_TOKEN, {expiresIn: app.libs.config.CADUCIDAD_TOKEN});

            return res.
            cookie('token', token, { maxAge: 86400 }).
            json({
                OK: true,
                usuario: result,
                token
            });
                
            

        }).catch(err => {
            return res.status(412).json({
                OK: false,
                msg: err.message
            });
        });

    });

}