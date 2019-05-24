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
                attributes: ['tipo_medicion']
            }, {
                model: Models.Categoria_productos,
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