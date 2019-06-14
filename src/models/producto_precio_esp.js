module.exports = (sequelize, DataType)=> {

    const Productos_Clientes = sequelize.define('Productos_Clientes', {

        id_producto_precio_esp: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'Clientes',
                key: 'id_cliente'
            }
        },
        id_producto: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'id_producto'
            }
        },
        precio_especial: {
            type: DataType.FLOAT,
            allowNull: true,
        },
        porcentaje: {
            type: DataType.FLOAT,
            allowNull: true,
        }
    }, {
        tableName: 'producto_precio_esp',        
        timestamps: false
    });

    Productos_Clientes.associate = (models) => {

        Productos_Clientes.belongsTo(models.Clientes, {
            foreignKey: 'id_cliente'
        });

        Productos_Clientes.belongsTo(models.Productos, {
            foreignKey: 'id_producto'
        });
    };

    return Productos_Clientes;

}