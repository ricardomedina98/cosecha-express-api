const faker = require('faker/locale/es_MX');
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const nodemailer = require('nodemailer');
const moment = require('moment');
const excel = require('exceljs');
const _ = require('lodash');


module.exports = app => {

    const Cliente = app.database.models.Clientes;
    const Productos = app.database.models.Productos;
    const Productos_Clientes = app.database.models.Productos_Clientes;
    const Mediciones = app.database.models.Mediciones;
    const sequelize = app.database.sequelize;       

    app.ConsultarClientes = (req, res) => {

        Cliente.findAll({
            where: {
                status: 'A'
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Clientes: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });

    }

    app.ConsultarProductosClientes = (req, res) => {

        let id = req.params.id;              

        Cliente.findByPk(id,{
            where: {                
                status: 'A'
            },
            include: [{
                model: Productos,
                as: 'ProductosClientes',                
                required:true,
                include: [{
                    model: Mediciones,
                    required: true
                }]
            }]
        })
        .then(result => {
            res.json({
                OK: true,
                Clientes: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });

    }

    app.CrearCliente = (req, res)=> {

        let body = req.body;

        let cliente = new Cliente({
            nombre_cliente: body.nombre_cliente,
            apellido1_cliente: body.apellido1_cliente,
            apellido2_cliente: body.apellido2_cliente,
            nombre_empresa_cliente: body.nombre_empresa_cliente,
            telefono_cliente: body.telefono_cliente,
            correo_cliente: body.correo_cliente
        });

        console.log(cliente.dataValues);

        Cliente.create(cliente.dataValues, {
            fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
            'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
        })
        .then(result => {
            res.json({
                OK: true,
                Cliente: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(409).json({
                OK: false,
                msg: err
            });
        });

    }

    app.ActualizarCliente = (req, res)=> {

        let id = req.params.id;
        let body = req.body;

        let cliente = new Cliente({
            nombre_cliente: body.nombre_cliente,
            apellido1_cliente: body.apellido1_cliente,
            apellido2_cliente: body.apellido2_cliente,
            nombre_empresa_cliente: body.nombre_empresa_cliente,
            telefono_cliente: body.telefono_cliente,
            correo_cliente: body.correo_cliente
        });

        Cliente.update(cliente.dataValues, {
            where: {
                id_cliente: id,
                status: 'A'
            },
            fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
            'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
        })
        .then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: true,
                msg: err
            });
        });

    };

    app.EliminarCliente = (req, res) => {
        let id = req.params.id;

        let cliente = new Cliente({
            status: 'I'
        });

        Cliente.update(cliente.dataValues, {
            where: {
                id_cliente: id
            },
            fields: ['status']
        })
        .then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    app.ActualizarPrecioEspecial = (req, res) => {

        Productos_Clientes.update(new Productos_Clientes({
            precio_especial: req.body.precio_especial
        }).dataValues, {
            where : {
                id_producto: req.params.id_producto,
                id_cliente: req.params.id_cliente
            },
            fields: ['precio_especial']
        })
        .then(response => {
            res.json({
                OK: true,
                rows_affected: response[0]
            });
        })
        .catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });

    }

    app.AgregarProuctosClientes = (req, res) => {

        let products = req.body;
        
        sequelize.transaction(async t => {

            await products.forEach((element, index) => {

                let precio_cliente = new Productos_Clientes({
                    id_producto: element.id_producto,
                    id_cliente: element.id_cliente,
                    precio_especial: element.precio_especial
                });   
                Productos_Clientes.create(precio_cliente.dataValues,
                {
                    transaction: t
                })
                .then(result => {
                    
                }).catch(error => {
                    console.log(error);
                });                        
                
            })
        })
        .then(result => {
            res.json({
                OK: true
            });
        }).catch(error => {
            res.status(402).json({
                OK: false
            });
        });

    }

    app.EliminarProductoCliente = (req, res) => {        

        Productos_Clientes.findOne({
            where: {
                id_producto: req.params.id_producto,
                id_cliente: req.params.id_cliente
            }
        })
        .then(producto_prec_espec => {

            if(!producto_prec_espec){
                res.status(404).json({
                    OK: false,
                    msg: 'Producto no encontrado'
                });
            }

            producto_prec_espec.destroy()
            .then(result => {
                res.json({
                    OK: true,
                    row_deleted: true
                });
            });
            
        })
        .catch(err => {
            res.status(404).json({
                OK: false,
                msg: 'Producto no encontrado'
            });
        });
    }

    app.enviarCorreoCliente = async (req, res) => {  
        
        moment.locale('es');
    
        const productos = await Cliente.findByPk(req.params.id_cliente,{
            where: {                
                status: 'A'
            },
            include: [{
                model: Productos,
                as: 'ProductosClientes',                
                required:true,
                include: [{
                    model: Mediciones
                }]
            }]
        });

        let productosNuevos = [];
        
        _.forEach(productos.dataValues.ProductosClientes, (item, index) => {
           
            if(Number(req.body.productosMarcados[item.id_producto]) === Number(item.id_producto) || req.body.productosMarcados[item.id_producto] == true) {           
                productosNuevos.push({
                    nombre_producto: item.nombre_producto,
                    precio_especial: item.Productos_Clientes.precio_especial,
                    tipo_medicion: item.Medicione.tipo_medicion,
                    marcado: true
                });                
            } else {
                productosNuevos.push({
                    nombre_producto: item.nombre_producto,
                    precio_especial: item.Productos_Clientes.precio_especial,
                    tipo_medicion: item.Medicione.tipo_medicion,
                    marcado: false
                });                
            }
        });

        let fileNameargSend = `${moment(getPreviousMonday()).format('DD-MM-YYYY')}_${moment(getNextMonday()).format('DD-MM-YYYY')}`;
        

        let dataBinding = {
            fecha_inicio: moment(getPreviousMonday()).format('dddd, DD MMMM YYYY'),
            fecha_fin: moment(getNextMonday()).format('dddd, DD MMMM YYYY'),
            nombre_empresa_cliente: productos.nombre_empresa_cliente,
            correo_cliente: productos.correo_cliente,
            productos: JSON.parse(JSON.stringify(productosNuevos)),
            observacion: req.body.observacion
        }
        
        let templateHTMLPDF = fs.readFileSync(path.join(process.cwd(), 'src/pdfs/lista_productos_cliente_pdf.html'), 'utf8');
        let template = handlebars.compile(templateHTMLPDF);
        let finalHtml = template(dataBinding);
        let options = {
            format: 'A4',
            footerTemplate: `<div style="font-size: 10px; margin-left: 30px;">Cosecha Express ${moment().format('YYYY')}</div> <span></span> <div style="font-size: 10px; float: right;"> - Desarrollado por Grupo TLK</div>`,
            displayHeaderFooter: true,
            margin: {
                top: "20px",
                bottom: "60px"
            },
            printBackground: true,
            path: `src/files/pdfs/lista_precios_${fileNameargSend}.pdf`
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(finalHtml);
        const buffer = await page.pdf(options);
        await browser.close();

        const transporter = nodemailer.createTransport({
            service: app.libs.config.correoOpciones.servicio,
            auth: {
                   user: app.libs.config.correoOpciones.correo_electronico,
                   pass: app.libs.config.correoOpciones.contrasena_correo
               }
        });

        const mailOptions = {
            from: app.libs.config.correoOpciones.correo_electronico,
            to: dataBinding.correo_cliente,
            subject: 'Lista de Precios - Cosecha Express',
            html: '<h2>Lista de Precios Semanal</h2>',
            attachments: [{
                filename: `Lista Precios Semanal ${fileNameargSend}.pdf`,
                content: buffer
            }]
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                res.json({
                    OK: false,
                    msg: err
                });
            else                            
              res.json({
                  OK: true,
                  informacion: info
              });
         });


    }

    app.descargarExcel = async (req, res) => {

        const productos = await Cliente.findByPk(req.params.id_cliente,{
            where: {                
                status: 'A'
            },
            include: [{
                model: Productos,
                as: 'ProductosClientes',                
                required:true,
                include: [{
                    model: Mediciones
                }]
            }]
        });

        const prodyctosJSON = JSON.parse(JSON.stringify(productos.ProductosClientes));

        let dataRows = [];

        _.forEach(prodyctosJSON, (value, key) => {
            dataRows.push({
                nombre_producto: value.nombre_producto,
                precio_especial: value.Productos_Clientes.precio_especial,
                tipo_medicion: value.Medicione.tipo_medicion
            });
        });

        let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('Productos'); //creating worksheet

        worksheet.columns = [
			{ header: 'Nombre Producto', key: 'nombre_producto', width: 30 },
			{ header: 'Precio', key: 'precio_especial', width: 20 },
			{ header: 'Unidad', key: 'tipo_medicion', width: 30}			
        ];
        
        worksheet.addRows(dataRows);

        let fileNameargSend = `${moment(getPreviousMonday()).format('DD-MM-YYYY')}_${moment(getNextMonday()).format('DD-MM-YYYY')}`;

        res.set('Content-disposition', 'attachment; filename=' + `lista_precios_${fileNameargSend}.xlsx` );
        res.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        
		// Write Buffer
        workbook.xlsx.write(res)
        .then(() => {
            res.end();
        });
        
    }

    app.AplicarOperacionProductos = (req, res) => {
        
        sequelize.query('CALL lista_productos_descuento_cliente(:id_cliente, :porcetaje, :operacion);', {
            replacements: { 
                id_cliente: Number(req.params.id_cliente), 
                porcetaje: Number(req.body.porcentaje), 
                operacion: req.body.operacion
            }
        }).then( response => {            
            res.json({
                OK: true
            });            
            
        }).catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.RestaurarPrecios = (req, res) => {

        sequelize.query('CALL restaurar_lista_precios(:id_cliente)', {
            replacements: { 
                id_cliente: Number(req.params.id_cliente)
            }
        }).then( response => {
            if(response[TextRow] == 'OK'){
                res.json({
                    OK: true
                });
            }
            
        }).catch(err => {
            res.json({
                OK: true,
                msg: err
            });
        });

    }

    app.RestaurarPrecioCliente = async(req, res) => {

        let precio_general = await Productos.findByPk(req.params.id_producto, {
            fields: ['precio_semanal']
        });

        let producto = new Productos_Clientes({
            precio_especial: precio_general.dataValues.precio_semanal,
            porcetaje: null
        });

        Productos_Clientes.update(producto.dataValues, {
            where :{
                id_cliente: req.params.id_cliente,
                id_producto: req.params.id_producto
            },
            fields: ['precio_especial', 'porcetaje']
        }).then(response => {            
            res.json({
                OK: true,
                rows_affected: response[0]
            });
        }).catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }
    
    app.GenerarClientes = async(req, res) => {

        let num = req.params.num;

        for (let index = 0; index < num; index++) {

            let cliente = new Cliente({
                nombre_cliente: faker.name.firstName(),
                apellido1_cliente: faker.name.lastName(),
                apellido2_cliente: faker.name.lastName(),
                nombre_empresa_cliente: faker.company.companyName(),
                telefono_cliente: faker.phone.phoneNumber(),
                correo_cliente: faker.internet.email()
            });

            await Cliente.create(cliente.dataValues, {
                fields: ['nombre_cliente', 'apellido1_cliente', 'apellido2_cliente',
                'nombre_empresa_cliente', 'telefono_cliente', 'correo_cliente']
            })
            
        }

        res.send(`${num} clientes creados`);

    }

    function getPreviousMonday()
    {
        var today=new Date();
        var todaysDay=today.getDay();
        var goBack=today.getDay()%7-2;
        var lastMonday=new Date().setDate(today.getDate()-goBack);
        var desiredDate=new Date(lastMonday);
        return desiredDate;

    }

    function getNextMonday()
    {
        var today=new Date();
        var todaysDay=today.getDay();
        var goBack=today.getDay()%7-8;
        var lastMonday=new Date().setDate(today.getDate()-goBack);
        var desiredDate=new Date(lastMonday);
        return desiredDate;

    }

    app.ConsultarClienteTotales = (req, res) => {

        Cliente.count({
            where: {
                status: 'A'
            }
        })
        .then(count => {
            res.json({
                OK: true,
                Total: count
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    return app;
}