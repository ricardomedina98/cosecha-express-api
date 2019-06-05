module.exports = app => {

    const Productos = app.database.models.Productos;  
    const Models = app.database.models;
    

    const getProductos = () => {   
        console.log(Models);     
        Productos.findAll({
            where: {
                status: 'A'
            },
            include: [{
                model: Models.Mediciones,
                attributes: ['id_medicion','tipo_medicion']
            }, {
                model: Models.Categoria_productos,
                attributes: ['id_categoria', 'nombre_categoria']
            }, {
                model: Models.Equivalencias,
                required: false,
                attributes: ['id_equivalencia', 'equivalencia1', 'equivalencia2', 'medicionEquiv1', 'medicionEquiv2']
            }]
        })
        .then(result => {            
            app.io.emit('SHOW_PRODUCTS', {Productos: result});
        })
        .catch(error => {
            console.log(error);
        });
    }

    Productos.addHook('afterCreate', getProductos);
    Productos.addHook('afterUpdate', getProductos);    

    return app;

}