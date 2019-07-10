
module.exports = (sequelize, DataType) => {
    const Modulos = sequelize.define('Modulos', {
        id_modulo:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_modulos: {
            type: DataType.STRING,
            allowNull: false     
        }
    },{
        tableName: 'modulos'
    });
    

    return Modulos;
}