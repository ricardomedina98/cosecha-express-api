use cosechaexpress;


select * from usuarios;
select * from productos;
select * from categorias_productos;
select * from mediciones;
select * from clientes;
select * from proveedores;
select * from compras;

select * from notificaciones;


select * from adm_transacciones_log;
select * from compra_proveedor_productos;
select * from devoluciones_compras;
select * from devolucion_compra_productos;


select * from productos_lista_precios;




update usuarios set nombre_empleado = 'Hugo Guerrero', nombre_usuario = 'guerrero01' where id_usuario = 2;

update productos set nombre_producto = 'Kilo de papa' where id_producto = 59;



insert productos_lista_precios(id_producto, precio_semanal, precio_diario, fecha_i_semana, fecha_f_semana) 
values(341, 203.43, 255.65,  
last_monday(),
next_sunday());



/*Lista de precios de  la semana actual*/
select p.id_producto, p.nombre_producto, p.existencia, p.existencia_min, p.existencia_max, 
(select lp.precio_semanal where lp.fecha_i_semana >= last_monday() and lp.fecha_f_semana <= next_sunday()) as precio_semanal, 
(select lp.precio_diario where lp.fecha_i_semana >= last_monday() and lp.fecha_f_semana <= next_sunday()) as precio_diario
from productos p
left join productos_lista_precios lp on lp.id_producto = p.id_producto where p.status = 'A' order by id_producto;













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

INSERT INTO productos(id_producto, nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES (1, 'Aguacate Extra' , 1, 1, 100, 10, 110, 235.00);

INSERT INTO productos(id_producto, nombre_producto, id_categoria, id_medicion, existencia, existencia_min, existencia_max, precio_semanal)
  VALUES (2, 'Aguacate Tercera' , 1, 1, 200, 50, 500, 170.00);

SELECT p.nombre_producto FROM productos p INNER JOIN categorias_productos cp ON p.id_categoria = cp.id_categoria WHERE cp.id_categoria = 1;




INSERT INTO usuarios (id_usuario, nombre_empleado, nombre_usuario, contrasena, tipo_usuario, fecha_creacion, creado_por, fecha_ultima_modificacion, fecha_modificacion_por)
  VALUES (1, 'Jose Ricardo Medina', 'ricardo_medina', AES_ENCRYPT('ricardo', 'cosechaexpress2019'), 'Administrador', CURDATE(), '', CURDATE(), 'Yo');


SELECT AES_DECRYPT(u.contrasena, 'cosechaexpress2019') FROM usuarios u;
SELECT u.contrasena FROM usuarios u;



SELECT u.* FROM usuarios u WHERE u.nombre_usuario = 'ricardo_medina04' AND u.contrasena = '$2a$07$asxx54ahjppf45sd87a5auRajNP0zeqOkB9Qda.dSiTb2/n.wAC/2';

/*SOLO USO PARA DEMOSTRACION PHP*/
SELECT * FROM usuarios u;
INSERT INTO usuarios (nombre_empleado, nombre_usuario, contrasena, role)
  VALUES ('Mundo Garza', 'mundo_garza', '$2a$07$asxx54ahjppf45sd87a5auRajNP0zeqOkB9Qda.dSiTb2/n.wAC/2', 'admin');

INSERT INTO categorias_productos (id_categoria, nombre_categoria)
  VALUES (1, 'Aguacate');



insert into notificaciones (titulo, descripcion) values('Producto entrada', '2 toneladas de tomate');
insert into notificaciones (titulo, descripcion) values('Producto merma', '3 kilos de papa');




SELECT DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) last_monday;

SELECT curdate() + INTERVAL 6 - weekday(curdate()) DAY next_sunday;
