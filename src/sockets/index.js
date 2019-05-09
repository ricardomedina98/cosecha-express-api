module.exports = app => {

    

    app.io.on('connection', (client) => {
        console.log("Usuario conectado");        

        client.on('disconnect', () => {                        
            console.log("Usuario desconectado");
        });

        client.on('SHOW_PRODUCTS', (data, callback)=> {            
    
            client.broadcast.emit('SHOW_PRODUCTS', data);
            
        });
    });   

    return app;

}