module.exports = (sequelize, DataType)=> {

    const Clientes = sequelize.define('clientes', {
        id_cliente: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nombre_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El nombre de cliente es necesario'
                },
                notEmpty: true
            }
        },
        apellido1_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El apellido paterno del cliente es necesario'
                },
                notEmpty: true
            }
        },
        apellido2_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El apellido materno del cliente es necesario'
                },
                notEmpty: true
            }
        },
        nombre_empresa_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El nombre de la empresa es necesario'
                },
                notEmpty: true
            }
        },
        telefono_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El telefono del cliente es necesario'
                },
                notEmpty: true
            }
        },
        correo_cliente: {
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El correo del cliente es necesario'
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
    }, {
        tableName: 'clientes',        
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        timestamps: false
    });

    return Clientes;
}