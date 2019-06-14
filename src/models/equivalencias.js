module.exports = (sequelize, DataType) => {
    const Equivalencias = sequelize.define('Equivalencias',{
        id_equivalencia:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        equivalencia1:{
            type: DataType.INTEGER,
            allowNull: false
        },
        medicionEquiv1: {
            type: DataType.INTEGER,
            allowNull: true
        },
        equivalencia2: {
            type: DataType.INTEGER,
            allowNull: false
        },
        medicionEquiv2: {
            type: DataType.INTEGER,
            allowNull: true
        },
        id_producto: {
            type: DataType.INTEGER,
            allowNull: false
        },
        porcentaje: {
            type: DataType.FLOAT,
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
        tableName: 'equivalencias',        
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        timestamps: false
    });


    Equivalencias.associate = (models) => {

        Equivalencias.belongsTo(models.Productos, {
            foreignKey: 'id_producto',
            targetKey: 'id_producto'
        });
        
    }
    

    return Equivalencias;
}