module.exports = (sequelize, DataType) => {
    const Productos = sequelize.define('Productos',{
        id_producto:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_producto:{
            type: DataType.STRING,
            allowNull: false
        },
        id_medicion: {
            type: DataType.INTEGER,
            allowNull: false
        },
        id_categoria: {
            type: DataType.INTEGER,
            allowNull: true
        },
        precio_semanal:{
            type: DataType.FLOAT,
            allowNull: true
        },
        existencia:{
            type: DataType.FLOAT,
            allowNull: false
        },
        existencia_min: {
            type: DataType.FLOAT,
            allowNull: false
        },
        existencia_max: {
            type: DataType.FLOAT,
            allowNull: false
        },
        status: {
            type: DataType.ENUM,
            values: ['A', 'I'],
            allowNull: true     
        },
        fecha_creacion: {
            type: DataType.DATE,
            allowNull: true    
        },
        creado_por: {
            type: DataType.STRING,
            allowNull: true   
        },
        fecha_ultima_modificacion: {
            type: DataType.DATE,
            allowNull: true   
        },
        fecha_modificacion_por: {
            type: DataType.STRING,
            allowNull: true    
        }
    }, {
        tableName: 'productos',        
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        timestamps: false
    });
      

    Productos.associate = (models) => {  
                
        Productos.hasOne(models.Categoria_productos, {
            foreignKey: 'id_categoria',
            sourceKey: 'id_categoria'
        });

        Productos.hasOne(models.Mediciones, {
            foreignKey: 'id_medicion',
            sourceKey: 'id_medicion'
        });

        Productos.hasOne(models.Equivalencias, {
            foreignKey: 'id_producto',
            sourceKey: 'id_producto'
        });

        Productos.belongsToMany(models.Clientes, {
            as:'productosClientes',
            through: {
                model: models.Productos_Clientes
            }, 
            foreignKey: 'id_producto',
            sourceKey: 'id_producto'
        });

    }

    
    Productos.addHook('beforeCreate', 'hookBeforeCreate', (producto, options) => {        
        console.log(options);
        return Promise.reject(new Error("I'm afraid I can't let you do that!"));
    });
    
    

    return Productos;
}