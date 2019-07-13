module.exports = (sequelize, DataType) => {
    const Categoria_Productos = sequelize.define('Categoria_productos', {
        id_categoria:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_categoria:{
            type: DataType.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categorias_productos',
        timestamps : false
    });

    Categoria_Productos.associate = (models) => {
        Categoria_Productos.belongsTo(models.Productos, {
            foreignKey: 'id_categoria',
            targetKey: 'id_categoria'
        });
    };

    return Categoria_Productos;
}