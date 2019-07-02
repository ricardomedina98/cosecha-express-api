module.exports = (sequelize, DataType)=> {

    const Precios_Log = sequelize.define('Precios_Log', {
        
        id_precio_log: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_tabla: {
            type: DataType.STRING,
            allowNull: true
        },
        id_objeto: {
            type: DataType.INTEGER,
            allowNull: false
        },
        id_cliente: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        precio_anterior: {
            type: DataType.FLOAT,
            allowNull: true,
        },
        precio_nuevo: {
            type: DataType.FLOAT,
            allowNull: true,
        },
        fecha_creacion: {
            type: DataType.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'adm_precios_log',
        timestamps: false
    });

    Precios_Log.associate = (models) => {

        Precios_Log.belongsTo(models.Productos, {
            foreignKey: 'id_objeto'
        });
    };

    return Precios_Log;

}