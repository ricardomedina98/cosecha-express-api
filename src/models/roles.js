
module.exports = (sequelize, DataType) => {
    const Roles = sequelize.define('Roles', {
        id_role:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_role: {
            type: DataType.STRING,
            allowNull: false     
        }
    },{
        tableName: 'roles'
    });
    

    return Roles;
}