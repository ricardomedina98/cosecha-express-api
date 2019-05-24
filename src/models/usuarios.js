
module.exports = (sequelize, DataType) => {
    const Usuarios = sequelize.define('Usuarios', {
        id_usuario:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nombre_empleado: {
            type: DataType.STRING,
            allowNull: false,            
            validate: {
                notNull: {
                    msg: 'El nombre es necesario'
                },
                notEmpty: true
            }     
        },
        nombre_usuario: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre de usuario es necesario'
                },
                notEmpty: true
            }         
        },        
        contrasena: {
            type: DataType.TEXT,                  
            allowNull: true        
        },
        role: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El rol de usuario es necesario'
                },
                notEmpty: true
            }   
        },
        status: {
            type: DataType.ENUM,
            values: ['A', 'I'],
            allowNull: true     
        },
        fecha_creacion: {
            type: DataType.DATE,
            allowNull: true    
        },
        creado_por: {
            type: DataType.STRING,
            allowNull: true   
        },
        fecha_ultima_modificacion: {
            type: DataType.DATE,
            allowNull: true   
        },
        fecha_modificacion_por: {
            type: DataType.STRING,
            allowNull: true    
        }
    },{
        tableName: 'usuarios',
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        defaultScope: {
            attributes: { exclude: ['contrasena'] },
        },
        scopes: {
            withPassword: {
                attributes: { exclude: ['fecha_creacion', 'creado_por', 'fecha_ultima_modificacion', 'fecha_modificacion_por', 'status'] },
            }
        },
        timestamps: false
    });
    

    return Usuarios;
}