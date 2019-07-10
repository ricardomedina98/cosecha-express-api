
module.exports = (sequelize, DataType) => {
    const Permisos = sequelize.define('Permisos', {
        id_permiso:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_permiso: {
            type: DataType.STRING,
            allowNull: false     
        }
    },{
        tableName: 'permisos'
    });
    

    return Permisos;
}