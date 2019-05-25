module.exports = (sequelize, DataType) => {
    const Lista_Precios = sequelize.define('Lista_Precios', {
        id_prod_precios: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        id_producto: {
            type: DataType.INTEGER,
            allowNull: false
        },
        precio_semanal: {
            type: DataType.FLOAT,
            allowNull: false
        },
        precio_diario: {
            type: DataType.FLOAT,
            allowNull: false
        },
        fecha_i_semana: {
            type: DataType.DATE,
            allowNull: false
        },
        fecha_f_semana: {
            type: DataType.DATE,
            allowNull: false
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
        tableName: 'productos_lista_precios',
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        timestamps: false
    });

    return Lista_Precios;
};