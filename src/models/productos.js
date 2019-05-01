module.exports = (sequelize, DataType) => {
    const Productos = sequelize.define('Productos',{
        id_producto:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nombre_producto:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El nombre es necesario'
                },
                notEmpty: true
            }
        },
        id_categoria: {
            type: DataType.INTEGER,
            allowNull: true
        },
        id_medicion: {
            type: DataType.INTEGER,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El id de la medicion es necesario'
                },
                notEmpty: true
            }
        },
        existencia:{
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'La existencia es necesaria'
                }
            }
        },
        existencia_min: {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'La existencia minima es necesaria'
                }
            }
        },
        existencia_max: {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'La existencia maxima es necesaria'
                }
            }
        },
        precio_semanal : {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'El precio semanal es necesario'
                }
            }
        },
        precio_diario : {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'El precio diario es necesario'
                }
            }
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
        Productos.hasMany(models.Mediciones, {
            foreignKey: 'id_medicion',
            sourceKey: 'id_medicion'
        });

        Productos.hasMany(models.Categoria_productos, {
            foreignKey: 'id_categoria',
            sourceKey: 'id_categoria'
        });
    }
    

    return Productos;
}