module.exports = app => {

    const Mediciones = app.database.models.Mediciones;

    app.ObtenerMediciones = (req, res) => {
        Mediciones.findAll({
        })
        .then(result => {            
            res.json({
                OK: true,
                Mediciones: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    return app;

}