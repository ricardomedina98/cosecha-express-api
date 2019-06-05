use cosechaexpress;


	
/*  DELETE  */

DELETE FROM productos WHERE id_producto = 4;



/*		   SELECT			*/

/*Lista de precios de  la semana actual*/
select p.id_producto, p.nombre_producto, p.existencia, p.existencia_min, p.existencia_max,
(select lp.precio_semanal where lp.fecha_i_semana >= last_monday() and lp.fecha_f_semana <= next_sunday()) as precio_semanal, 
(select lp.precio_diario where lp.fecha_i_semana >= last_monday() and lp.fecha_f_semana <= next_sunday()) as precio_diario
from productos p
left join productos_lista_precios lp on lp.id_producto = p.id_producto where p.status = 'A' order by id_producto;

SELECT* FROM productos p;


SELECT p.nombre_producto FROM productos p INNER JOIN categorias_productos cp ON p.id_categoria = cp.id_categoria WHERE cp.id_categoria = 1;














SELECT AES_DECRYPT(u.contrasena, 'cosechaexpress2019') FROM usuarios u;
SELECT u.contrasena FROM usuarios u;


SELECT u.* FROM usuarios u WHERE u.nombre_usuario = 'ricardo_medina04' AND u.contrasena = '$2a$07$asxx54ahjppf45sd87a5auRajNP0zeqOkB9Qda.dSiTb2/n.wAC/2';

/*SOLO USO PARA DEMOSTRACION PHP*/
SELECT * FROM usuarios u;

SELECT DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) last_monday;

SELECT curdate() + INTERVAL 6 - weekday(curdate()) DAY next_sunday;


SELECT * FROM productos ;


	
/*		   INSERT			*/
                                                            
                                                            

insert productos_lista_precios(id_producto, precio_semanal, precio_diario, fecha_i_semana, fecha_f_semana) 
values(299, 653.43, 322.98,  
last_monday(),
next_sunday());


INSERT INTO mediciones (id_medicion, tipo_medicion)
  VALUES (1, 'KG');

INSERT INTO mediciones (id_medicion, tipo_medicion)
  VALUES (2, 'MJO');

INSERT INTO mediciones (id_medicion, tipo_medicion)
  VALUES (3, 'CHAROLA');

INSERT INTO mediciones (id_medicion, tipo_medicion)
  VALUES (4, 'BOTE');

INSERT INTO mediciones (id_medicion, tipo_medicion)
  VALUES (5, 'CAJA');


INSERT INTO categorias_productos (id_categoria, nombre_categoria)
  VALUES (1, 'Aguacate');
  
INSERT INTO clientes(nombre_cliente, apellido1_cliente, apellido2_cliente, nombre_empresa_cliente, telefono_cliente, correo_cliente)
  VALUES ('Jose Ricardo', 'Medina', 'Lopez', 'GRUPO TLK', '8127660895', 'ricardo_medina@gmail.com');
  

INSERT INTO clientes(nombre_cliente, apellido1_cliente, apellido2_cliente, nombre_empresa_cliente, telefono_cliente, correo_cliente)
  VALUES ('Hugo', 'Guerrero', 'Martinez', 'Cosecha Express', '812354985', 'hugo1010@gmail.com');
USE cosechaexpress2;
SELECT * FROM productos p;
INSERT INTO productos(nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Tomate salsa' , 1, 1, 100, 10, 110, 235.00);

INSERT INTO productos(nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Aguacate Tercera' , 1, 1, 200, 50, 500, 170.00);

INSERT INTO productos(nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Pina Miel', 1, 1, 10, 11, 125, 54.00);

INSERT INTO productos(nombre_producto, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Calabaza akjsdnkjasnd', 1, 10, 13, 34, 79.00);

INSERT INTO productos (id_producto, nombre_producto, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES (1, 'sad', 1, 0, 0, 0, 0, 0, 0);



INSERT INTO productos(nombre_producto, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Calabaza LALALA', 1, 10, 13, 34, 649.00);
 
INSERT INTO productos(nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Naranja Valencia', 1, 1, 10, 13, 34, 700.00);
  

INSERT INTO productos(nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES ('Pepino', 1, 1, 25, 12, 96, 68.00);

select * FROM productos ;

INSERT INTO usuarios (nombre_empleado, nombre_usuario, contrasena, role)
  VALUES ('Mundo Garza', 'mundo_garza', '$2a$07$asxx54ahjppf45sd87a5auRajNP0zeqOkB9Qda.dSiTb2/n.wAC/2', 'admin');

INSERT INTO categorias_productos (id_categoria, nombre_categoria)
  VALUES (1, 'Aguacate');


insert into notificaciones (titulo, descripcion) values('Producto entrada', '2 toneladas de tomate');
insert into notificaciones (titulo, descripcion) values('Producto merma', '3 kilos de papa');


insert producto_cliente_p_especial(id_cliente, id_venta, id_producto) values(2, 4, 69);
insert producto_cliente_p_especial(id_cliente, id_venta, id_producto) values(5, 2, 55);



/*		   UPDATE			*/
                                                            
                                                            
                                                            
update usuarios set nombre_empleado = 'Hugo Guerrero', nombre_usuario = 'guerrero01' where id_usuario = 2;

update productos set nombre_producto = 'Kilo de tomate' where id_producto = 59;



