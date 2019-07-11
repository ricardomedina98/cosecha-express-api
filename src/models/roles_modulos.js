
module.exports = (sequelize, DataType) => {
    const Roles_Modulos = sequelize.define('Roles_Modulos', {
        id_role_modulos:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_role:{
            type: DataType.INTEGER,
            allowNull: false    
        },
        id_modulo: {
            type: DataType.STRING,
            allowNull: false     
        }
    },{
        tableName: 'role_modulos',
        timestamps: false
    });

    Roles_Modulos.associate = (models) => {

        Roles_Modulos.belongsTo(models.Roles, {            
            foreignKey: 'id_role',
            sourceKey: 'id_role'
        });

        Roles_Modulos.belongsTo(models.Modulos, {            
            foreignKey: 'id_modulo',
            sourceKey: 'id_modulo'
        });

    }
    

    return Roles_Modulos;
}