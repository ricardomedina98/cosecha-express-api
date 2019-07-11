
module.exports = (sequelize, DataType) => {
    const Permisos_Nivel_2 = sequelize.define('Permisos_Nivel_2', {
        id_permiso_nivel_2:{
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
        id_permiso_nivel_1: {
            type: DataType.INTEGER,
            allowNull: false     
        }
    },{
        tableName: 'permisos_nivel_2'
    });
    

    return Permisos_Nivel_2;
}