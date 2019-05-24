module.exports = (sequelize, DataType) => {
    const Categoria_Productos = sequelize.define('categoria_productos', {
        id_categoria:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nombre_categoria:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El nombre de la categoria es necesario'
                },
                notEmpty: true
            }
        }
    }, {
        tableName: 'categorias_productos',
        timestamps : false
    });

    Categoria_Productos.associate = (models) => {
        Categoria_Productos.belongsTo(models.productos, {
            foreignKey: 'id_categoria',
            targetKey: 'id_categoria'
        });
    };

    return Categoria_Productos;
}