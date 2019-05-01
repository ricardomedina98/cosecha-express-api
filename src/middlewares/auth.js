const jwt = require('jsonwebtoken');


module.exports = app => {

   app.verificarToken = (req, res, next) => {
        let token = req.cookies.token || req.get('token');
    
        jwt.verify(token, app.libs.config.SEED_TOKEN, (err, decode) => {
    
            if(err){
                return res.status(401).json({
                    OK: false,
                    msg: 'Invalid Token'
                });
            }        
    
            next();
    
        })
    }

    return app;

}



