module.exports = (sequelize, DataType)=> {

    const Clientes = sequelize.define('Clientes', {
        id_cliente: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_cliente: {
            type: DataType.STRING,
            allowNull: true
        },
        apellido1_cliente: {
            type: DataType.STRING,
            allowNull: true
        },
        apellido2_cliente: {
            type: DataType.STRING,
            allowNull: true
        },
        nombre_empresa_cliente: {
            type: DataType.STRING,
            allowNull: false
        },
        telefono_cliente: {
            type: DataType.STRING,
            allowNull: true
        },
        correo_cliente: {
            type: DataType.STRING,
            allowNull: false
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

    Clientes.associate = (models) => {

        Clientes.belongsToMany(models.Productos, {
            as: 'ProductosClientes',
            through: {
                model: models.Productos_Clientes
            },
            foreignKey: 'id_cliente',
            sourceKey: 'id_cliente'
        });
        

    }

    return Clientes;
}