
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
        tableName: 'roles',
        timestamps: false
    });

    Roles.associate = (models) => {

        Roles.belongsToMany(models.Modulos, {       
            as: 'RolesModulos',
            through: {
                model: models.Roles_Modulos
            }, 
            foreignKey: 'id_role',
            sourceKey: 'id_role'
        });
    }

    
    

    return Roles;
}