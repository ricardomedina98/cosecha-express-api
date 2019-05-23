drop database cosechaexpress;
create database cosechaexpress;
use cosechaexpress;


create table usuarios(
  id_usuario int auto_increment,
  nombre_empleado varchar(50) not null,
  nombre_usuario varchar(50) not null,
  contrasena text NOT NULL,
  role varchar(100) NOT NULL,
  fecha_creacion datetime not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion datetime,
  fecha_modificacion_por varchar(30),
  status varchar(1) NOT NULL DEFAULT 'A',
  CONSTRAINT id_usuario_pk primary key(id_usuario),
  CONSTRAINT nombre_usuario_un unique(nombre_usuario),
  CONSTRAINT chk_status_usuarios CHECK(status in ('A', 'I'))
);



create table categorias_productos(
  id_categoria int auto_increment,
  nombre_categoria varchar(50) NOT NULL,
  CONSTRAINT pk_id_categoria_prod primary key(id_categoria),
  CONSTRAINT un_categoria unique(nombre_categoria)  
);

CREATE TABLE mediciones(
  id_medicion int AUTO_INCREMENT,
  tipo_medicion varchar(45) NOT NULL,
  CONSTRAINT pk_id_medicion PRIMARY KEY(id_medicion)
);

create table productos(
  id_producto int auto_increment,
  nombre_producto varchar(40) NOT NULL,
  id_categoria int NULL,
  id_medicion int NOT NULL,
  existencia float(10,6) NOT NULL,
  existencia_min float(10, 6) NOT NULL,
  existencia_max float(10, 6) NOT NULL,
  precio_semanal float(10,4) NOT NULL,
  precio_diario float(10,4) NULL,
  status varchar(1) NOT NULL DEFAULT 'A',
  fecha_creacion datetime NOT NULL,
  creado_por varchar(30) NOT NULL,
  fecha_ultima_modificacion datetime,
  fecha_modificacion_por varchar(30),
  CONSTRAINT pk_id_producto primary key(id_producto),
  CONSTRAINT un_nombre_producto UNIQUE(nombre_producto),
  CONSTRAINT fk_id_subcategoria_prod_productos FOREIGN KEY(id_categoria) REFERENCES categorias_productos(id_categoria),
  CONSTRAINT fk_id_medicion_productos FOREIGN KEY(id_medicion) REFERENCES mediciones(id_medicion),
  CONSTRAINT chk_status_productos CHECK(status in ('A', 'I'))
);

SELECT * FROM productos p;

CREATE TABLE adm_transacciones_log(
  id_transaccion int NOT NULL,
  nombre_objeto varchar(100),
  id_objeto varchar(50),
  tipo_transaccion varchar(50),
  descripcion varchar(100),
  fecha_creacion date,
  CONSTRAINT pk_id_transaccion PRIMARY KEY(id_transaccion)
);

/* ACTORES */

create table clientes(
  id_cliente int auto_increment,
  nombre_cliente varchar(50) not null,
  apellido1_cliente varchar(50) not null,
  apellido2_cliente varchar(50) not null,
  nombre_empresa_cliente varchar(50) null,
  telefono_cliente varchar(20) null,
  correo_cliente varchar(35) null, 
  fecha_creacion date not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion date,
  fecha_modificacion_por varchar(30),
  status varchar(1) NOT NULL DEFAULT 'A',
  CONSTRAINT pk_id_cliente primary key(id_cliente),
  CONSTRAINT un_nombre_empresa_cliente unique(nombre_empresa_cliente),
  CONSTRAINT un_telefono_cliente unique(telefono_cliente),
  CONSTRAINT un_correo_cliente unique(correo_cliente),
  CONSTRAINT chk_status_clientes CHECK(status in ('A', 'I'))
);

create table proveedores(
  id_proveedor int auto_increment,
  nombre_proveedor varchar(50) not null,
  apellido1_proveedor varchar(50) not null,
  apellido2_proveedor varchar(50) not null,
  nombre_empresa_proveedor varchar(50) not null,
  telefono_proveedor varchar(15) default null,
  correo_proveedor varchar(35) default null,
  rfc_proveedor varchar(35) default null,
  fecha_creacion date not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion date,
  fecha_modificacion_por varchar(30),
  status varchar(1) NOT NULL DEFAULT 'A',
  CONSTRAINT pk_id_proveedor primary key(id_proveedor),
  CONSTRAINT un_nombre_empresa_proveedor unique(nombre_empresa_proveedor),
  CONSTRAINT un_rfc_proveedor unique(rfc_proveedor),
  CONSTRAINT un_telefono_proveedor unique(telefono_proveedor),
  CONSTRAINT un_correo_proveedor unique(correo_proveedor),
  CONSTRAINT chk_status_proveedores CHECK(status in ('A', 'I'))
);

/* COMPRAS */

CREATE TABLE compras(
  id_compra int AUTO_INCREMENT,
  factura_compra varchar(50) NOT NULL,
  fecha_compra datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  precio_total float(10,4) NOT NULL,
  id_proveedor int NOT NULL,
  fecha_creacion date not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion date,
  fecha_modificacion_por varchar(30),
  CONSTRAINT pk_id_compra PRIMARY KEY(id_compra),
  CONSTRAINT fk_id_proveedor_compras FOREIGN KEY(id_proveedor) REFERENCES proveedores(id_proveedor)
);

CREATE TABLE compra_proveedor_productos(
  id_compra int NOT NULL,  
  cantidad_compra float(10,4) NOT NULL,
  id_producto int NOT NULL,
  CONSTRAINT fk_id_compra_proveedor FOREIGN KEY(id_compra) REFERENCES compras(id_compra),
  CONSTRAINT fk_id_producto_proveedor FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);


/* VENTAS */

CREATE TABLE ventas(
  id_venta int AUTO_INCREMENT,
  cantidad_venta float(10, 4) NOT NULL,
  precio_total float(10, 4) NOT NULL,
  fecha_venta datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  id_cliente int NULL,
  fecha_creacion date not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion date,
  fecha_modificacion_por varchar(30),
  CONSTRAINT

);

CREATE TABLE ventas_productos(
  id_venta_producto int AUTO_INCREMENT,
  id_producto
);


/*DEVOLUCIONES*/
CREATE TABLE devoluciones_compras(
  id_devolucion int AUTO_INCREMENT,
  fecha_devolucion datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  precio_total_devolcucion int NOT NULL,
  id_compra int NOT NULL,
  fecha_creacion date not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion date,
  fecha_modificacion_por varchar(30),
  CONSTRAINT pk_id_devolucion PRIMARY KEY(id_devolucion),
  CONSTRAINT fk_id_compra_devoluciones FOREIGN KEY(id_compra) REFERENCES compras(id_compra)
);

CREATE TABLE devolucion_compra_productos(
  id_devolucion int NOT NULL,
  cantidad_devolucion int NOT NULL,
  precio_devolucion float(10,4) NOT NULL,
  id_producto int NOT NULL,
  CONSTRAINT fk_id_devolucion_productos FOREIGN KEY(id_devolucion) REFERENCES devoluciones_compras(id_devolucion),
  CONSTRAINT fk_id_producto_dev_productos FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);

/*SALIDAS*/

CREATE TABLE merma(
  id_merma int AUTO_INCREMENT,
  imagen blob NOT NULL,
  cantidad float(10, 4) NOT NULL,
  justificacion text NOT NULL,
  id_producto int NOT NULL,
  CONSTRAINT pk_id_merma PRIMARY KEY(id_merma),
  CONSTRAINT fk_id_producto_merma FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);

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

