module.exports = app => {

    const Productos = app.database.models.Productos;  
    const Models = app.database.models;

    const findAllProductos = () => {        
        Productos.findAll({ 
            where: {
                status: 'A'
            },
            include: [{
                model: Models.Mediciones,
                where: { id_medicion: app.database.Sequelize.col('mediciones.id_medicion') },
                attributes: ['tipo_medicion']
            }, {
                model: Models.Categoria_productos,
                where: { id_categoria: app.database.Sequelize.col('categoria_productos.id_categoria') },
                required:false,
                attributes: ['nombre_categoria']
            }]
        })
        .then(result => {            
            app.io.emit('SHOW_PRODUCTS', {Productos: result});
        })
        .catch(error => {
            console.log(error);
        });
    }

    Productos.addHook('afterCreate', findAllProductos);
    Productos.addHook('afterUpdate', findAllProductos);    

    return app;

}