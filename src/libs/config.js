module.exports = {
    database: 'cosechaexpress',
    username: 'root',
    password: '030498',    
    options:{        
        host: '127.0.0.1',
        dialect: 'mariadb',
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
    CADUCIDAD_TOKEN: process.env.CADUCIDAD_TOKEN || '48h'

    
};