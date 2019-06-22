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

CREATE TABLE clientes_direcciones(
  id_clientes_direcciones int AUTO_INCREMENT,
  
);

CREATE TABLE direccion_estados(
  id_estado int AUTO_INCREMENT,
  
);

CREATE TABLE direccion_municipios(
  id_municipio int AUTO_INCREMENT,

);

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
  nombre_objeto varchar(100),
  id_objeto varchar(50),
  tipo_transaccion varchar(50),
  descripcion varchar(100),
  fecha_creacion datetime,
  CONSTRAINT pk_id_transaccion PRIMARY KEY(id_transaccion)
);


/*SENTENCIAS*/

/*APLICAR DESCUENTO A LISTA DE PRODUCTO DE UN CLIENTE*/
CALL lista_productos_descuento_cliente(56, 2.8, '+');
CALL restaurar_lista_precios(56);
SELECT * FROM productos p WHERE p.id_producto = 42;
SELECT * FROM equivalencias e WHERE e.id_producto = 44;
SELECT * FROM producto_precio_esp ppe WHERE ppe.id_cliente = 56;
SELECT * FROM usuarios u;
SELECT * FROM clientes c;
CALL lista_productos_descuento_cliente(56, 5.5, '+');
SELECT ppe.precio_especial INTO @precio_especial FROM producto_precio_esp ppe WHERE ppe.id_producto = 43 ;
USE cosechaexpress2;
UPDATE producto_precio_esp ppe SET ppe.precio_especial = 743, ppe.porcentaje = NULL WHERE ppe.id_cliente = 6 AND ppe.id_producto = 32;
UPDATE `producto_precio_esp` SET `precio_especial`=123.2 WHERE `id_cliente` = 56 AND `id_producto` = 51;
DROP TRIGGER IF EXISTS producto_precio_esp_bi;
DELIMITER //
CREATE TRIGGER producto_precio_esp_bi
  BEFORE INSERT ON producto_precio_esp
  FOR EACH ROW 
BEGIN  
  SELECT p.precio_semanal INTO @precio_actual FROM productos p WHERE p.id_producto = NEW.id_producto;
  SET NEW.precio_especial = @precio_actual;
END;//
DELIMITER ;



INSERT INTO equivalencias(equivalencia1, medicionEquiv1, equivalencia2, medicionEquiv2, id_producto)
  VALUES (150, 1, 50, 3, 6);

INSERT INTO producto_precio_esp (id_cliente, id_producto)
  VALUES (3, 5);

SELECT * FROM producto_precio_esp ppe;
SELECT * FROM productos p;

INSERT INTO producto_precio_esp (id_cliente, id_producto)
  VALUES (6, 39);

SELECT * FROM clientes c INNER JOIN producto_precio_esp ppe ON c.id_cliente = ppe.id_cliente INNER JOIN productos p ON ppe.id_producto = p.id_producto WHERE c.id_cliente = 6;

SELECT * FROM producto_precio_esp ppe;

UPDATE `equivalencias` SET `equivalencia1`=250,`equivalencia2`=25,`medicionEquiv1`=1,`medicionEquiv2`=?,`porcentaje`=? WHERE `id_producto` = ?;



SELECT * FROM clientes c WHERE c.id_cliente = 6;