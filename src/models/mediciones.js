module.exports = (sequelize, DataType) => {
    const Mediciones = sequelize.define('mediciones',{
        id_medicion:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        tipo_medicion:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El tipo de medicion es necesario'
                },
                notEmpty: true
            }
        }
    }, {
        tableName: 'mediciones',
        timestamps: false
    });

    
    Mediciones.associate = (models) => {
        Mediciones.belongsTo(models.productos, {
            foreignKey: 'id_medicion',
            targetKey: 'id_medicion'
        });
    };
    
    return Mediciones;
}