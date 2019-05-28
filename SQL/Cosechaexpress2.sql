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
  precio_semanal float(10, 6) not null,
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


create table producto_precio_esp(
id_producto_precio_esp int auto_increment,
id_cliente int not null,
id_producto int not null,
precio_especial float(10, 4),
porcentaje float(10, 4),
constraint pk_id_producto_precio_esp primary key (id_producto_precio_esp),
 CONSTRAINT fk_id_producto_precio_esp_productos FOREIGN KEY(id_producto) REFERENCES productos(id_producto),
CONSTRAINT fk_id_producto_precio_esp_clientes FOREIGN KEY(id_cliente) REFERENCES clientes(id_cliente)
);