use cosechaexpress;
create database cosechaexpress;

select * from usuarios;
select * from productos;
select * from categorias_productos;
select * from mediciones;


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

SELECT * FROM categorias_productos cp;

SELECT * FROM productos p;


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

SELECT * FROM productos p;

