module.exports = {
    database: 'cosechaexpress2',
    username: 'root',
    password: 'hugo1010',    
    options:{        
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: '-07:00',
        pool: { // If you want to override the options used for the read/write pool you can do so here
            max: 20,
            idle: 30000
        }
    },
    SEED_TOKEN: process.env.SEED_TOKEN || 'cosechaexpress2019',
    CADUCIDAD_TOKEN: process.env.CADUCIDAD_TOKEN || '48h',
    correoOpciones: {
        correo_electronico: 'guerrero0124@outlook.com',
        contrasena_correo: 'Ragnarok1010',
        servicio: 'Hotmail'
    }
};