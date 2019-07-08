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

CREATE TABLE mediciones(
  id_medicion int AUTO_INCREMENT,
  tipo_medicion varchar(45) NOT NULL,
  CONSTRAINT pk_id_medicion PRIMARY KEY(id_medicion)
);

create table categorias_productos(
  id_categoria int auto_increment,
  nombre_categoria varchar(50) NOT NULL,
  CONSTRAINT pk_id_categoria_prod primary key(id_categoria),
  CONSTRAINT un_categoria unique(nombre_categoria)  
);

create table productos(
  id_producto int auto_increment,
  nombre_producto varchar(40) NOT NULL,  
  id_categoria int NULL,
  id_medicion int NOT NULL,
  existencia float(10,6) NOT NULL,
  existencia_min float(10, 6) NOT NULL,
  existencia_max float(10, 6) NOT NULL,
  precio_semanal float(10, 6) NULL,
  status varchar(1) NOT NULL DEFAULT 'A',
  fecha_creacion datetime NOT NULL,
  creado_por varchar(30) NOT NULL,
  fecha_ultima_modificacion datetime,
  fecha_modificacion_por varchar(30),
  CONSTRAINT pk_id_producto primary key(id_producto),
  /*CONSTRAINT un_nombre_producto UNIQUE(nombre_producto),*/
  CONSTRAINT fk_id_categoria_prod_productos FOREIGN KEY(id_categoria) REFERENCES categorias_productos(id_categoria),
  CONSTRAINT fk_id_medicion_productos FOREIGN KEY(id_medicion) REFERENCES mediciones(id_medicion),
  CONSTRAINT chk_status_productos CHECK(status in ('A', 'I'))
);


SELECT * FROM productos p WHERE p.id_producto = 42;


CREATE TABLE equivalencias(
  id_equivalencia int AUTO_INCREMENT, 
  equivalencia1 float(8, 2),
  medicionEquiv1 int NULL,
  equivalencia2 float(8, 2),
  medicionEquiv2 int NULL,
  id_producto int NOT NULL,
  porcentaje float(10, 4) null,
  fecha_creacion datetime NOT NULL,
  creado_por varchar(30) NOT NULL,
  fecha_ultima_modificacion datetime,
  fecha_modificacion_por varchar(30),
  CONSTRAINT pk_id_equivalencia PRIMARY KEY(id_equivalencia),
  CONSTRAINT fk_id_producto_equivalencias FOREIGN KEY(id_producto) REFERENCES productos(id_producto),
  CONSTRAINT fk_medicionEquiv1_equivalencias FOREIGN KEY(medicionEquiv1) REFERENCES mediciones(id_medicion),
  CONSTRAINT fk_medicionEquiv2_equivalencias FOREIGN KEY(medicionEquiv2) REFERENCES mediciones(id_medicion),
  CONSTRAINT un_id_producto UNIQUE(id_producto)
);

create table clientes(
  id_cliente int auto_increment,
  nombre_cliente varchar(50) null,
  apellido1_cliente varchar(50) NULL,
  apellido2_cliente varchar(50) null,
  nombre_empresa_cliente varchar(50) not null,
  telefono_cliente varchar(20) not null,
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

ALTER TABLE clientes DROP INDEX un_nombre_empresa_cliente;
ALTER TABLE clientes DROP INDEX un_telefono_cliente;
ALTER TABLE clientes DROP INDEX un_correo_cliente;


create table producto_precio_esp(
  id_producto_precio_esp int auto_increment,
  id_cliente int not null,
  id_producto int not null,
  precio_especial float(10, 4) NULL,
  porcentaje float(10, 4) NULL,
  CONSTRAINT pk_id_producto_precio_esp primary key (id_producto_precio_esp),
  CONSTRAINT fk_id_producto_precio_esp_productos FOREIGN KEY(id_producto) REFERENCES productos(id_producto),
  CONSTRAINT fk_id_producto_precio_esp_clientes FOREIGN KEY(id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE adm_transacciones_log(
  id_transaccion int auto_increment,
  nombre_tabla varchar(100), /*Nombre de la tabla*/
  nombre_objeto varchar(100), /*Nombre del objeto*/
  id_objeto varchar(50), /*ID del objeto al que se aplicara los cambios*/
  tipo_transaccion varchar(50), /*UPDATE, DELETE, INSERT*/
  descripcion varchar(100), /*Ej: Creacion de registro + nombre_objeto*/
  fecha_creacion datetime DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_id_transaccion PRIMARY KEY(id_transaccion)
);

CREATE TABLE adm_precios_log(
  id_precio_log int AUTO_INCREMENT,
  nombre_tabla varchar(100) NULL,
  id_objeto int NULL,
  id_cliente int NULL,
  precio_anterior float NULL,
  precio_nuevo float NULL,  
  fecha_creacion datetime DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_id_precio_log PRIMARY KEY(id_precio_log)
);
SELECT @@SYSTEM_TIME_ZONE, @@TIME_ZONE, NOW();

  SELECT * FROM  adm_precios_log apl ORDER BY apl.fecha_creacion ASC;
  SELECT* FROM adm_precios_log apl; /*WHERE apl.id_objeto = 42 AND apl.nombre_tabla = 'producto_precio_esp' ORDER BY apl.fecha_creacion;*/
/*SENTENCIAS*/

  SELECT * FROM adm_precios_log apl WHERE apl.id_objeto = 54 AND apl.nombre_tabla = 'productos';
/*APLICAR DESCUENTO A LISTA DE PRODUCTO DE UN CLIENTE*/


CALL lista_productos_descuento_cliente(74, 10, '+');
CALL restaurar_lista_precios(56);
CALL lista_productos_descuento_cliente(56, 5.5, '+');



TRUNCATE adm_precios_log;
