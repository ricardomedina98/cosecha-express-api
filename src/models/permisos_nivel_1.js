
module.exports = (sequelize, DataType) => {
    const Permisos_Nivel_1 = sequelize.define('Permisos_Nivel_1', {
        id_permiso_nivel_1:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_permiso: {
            type: DataType.STRING,
            allowNull: false     
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false     
        },
        id_modulo: {
            type: DataType.INTEGER,
            allowNull: false     
        }
    },{
        tableName: 'permisos_nivel_1',
        timestamps: false
    });


    Permisos_Nivel_1.associate = (models) => {

        Permisos_Nivel_1.belongsTo(models.Modulos, {       
            foreignKey: 'id_modulo',
            sourceKey: 'id_modulo'
        });
    }
    

    return Permisos_Nivel_1;
}