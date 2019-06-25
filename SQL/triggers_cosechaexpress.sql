/*		TRIGGERS USUARIOS		*/

DELIMITER //
  CREATE TRIGGER usuarios_bi_er
    BEFORE INSERT ON usuarios
    FOR EACH ROW 
  BEGIN     
    set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
  END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER usuarios_bu_er
  BEFORE UPDATE ON usuarios
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER usuarios_ai_er
  AFTER INSERT ON usuarios
  FOR EACH ROW 
  BEGIN
   INSERT INTO adm_transacciones_log (nombre_tabla, nombre_objeto, id_objeto, tipo_transaccion, descripcion, fecha_creacion)
    VALUES ('usuarios', NEW.nombre_usuario, NEW.id_usuario, 'INSERT', CONCAT('Creacion del usuario ', new.nombre_usuario), NOW());
  END;//
DELIMITER;

DELIMITER //
CREATE TRIGGER usuarios_au_er
  AFTER UPDATE ON usuarios
  FOR EACH ROW 
  BEGIN
   INSERT INTO adm_transacciones_log (nombre_tabla, nombre_objeto, id_objeto, tipo_transaccion, descripcion, fecha_creacion)
    VALUES ('usuarios', NEW.nombre_usuario, NEW.id_usuario, 'UPDATE', CONCAT('Actualizacion del usuario ', OLD.nombre_usuario), NOW());
  END;//
DELIMITER;



/*		TRIGGERS PRODUCTOS		*/

DELIMITER //
CREATE TRIGGER productos_bi_er
  BEFORE INSERT ON productos
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER productos_bu_er
  BEFORE UPDATE ON productos
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER productos_ai_er
  AFTER INSERT ON productos
  FOR EACH ROW 
  BEGIN
   INSERT INTO adm_transacciones_log (nombre_tabla, nombre_objeto, id_objeto, tipo_transaccion, descripcion, fecha_creacion)
    VALUES ('prodctos', NEW.nombre_producto, NEW.id_producto, 'INSERT', CONCAT('Creacion del producto ', new.nombre_producto), NOW());
  END;//
DELIMITER;

DELIMITER //
CREATE TRIGGER productos_au_er
  AFTER UPDATE ON productos
  FOR EACH ROW 
  BEGIN
   INSERT INTO adm_transacciones_log (nombre_tabla, nombre_objeto, id_objeto, tipo_transaccion, descripcion, fecha_creacion)
    VALUES ('prodctos', NEW.nombre_producto, NEW.id_producto, 'UPDATE', CONCAT('Actualizacion del producto ', new.nombre_producto), NOW());
  END;//
DELIMITER;


DELIMITER //
CREATE TRIGGER productos_precio_au_er
  AFTER UPDATE ON productos
  FOR EACH ROW 
BEGIN  
 INSERT adm_precios_log(nombre_tabla, id_objeto, precio_nuevo, precio_anterior)
    VALUES('productos', NEW.id_producto, NEW.precio_semanal, OLD.precio_semanal);
END;//
DELIMITER ;

/* PRECIO ESPECIAL CLIENTE */

DELIMITER //
CREATE TRIGGER productos_precio_esp_au_er
  AFTER UPDATE ON producto_precio_esp
  FOR EACH ROW 
BEGIN  
 INSERT adm_precios_log(nombre_tabla, id_objeto, precio_nuevo, precio_anterior, id_cliente)
    VALUES('producto_precio_esp', NEW.id_producto, NEW.precio_especial, OLD.precio_especial, NEW.id_cliente);
END;//
DELIMITER ;


/*		TRIGGERS CLIENTES		*/

DELIMITER //
CREATE TRIGGER clientes_bi_er
  BEFORE INSERT ON clientes
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER clientes_bu_er
  BEFORE UPDATE ON clientes
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;

/*		TRIGGERS EQUIVALENCIAS		*/

DELIMITER //
CREATE TRIGGER equivalencias_bi_er
  BEFORE INSERT ON equivalencias
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;


DELIMITER //
CREATE TRIGGER equivalencias_ai_er
  AFTER INSERT ON productos
  FOR EACH ROW 
BEGIN     
  INSERT INTO equivalencias (equivalencia1, medicionEquiv1, equivalencia2, medicionEquiv2, id_producto)
  VALUES(0,0,0,0,New.id_producto) ;
END;//
DELIMITER ;








/*		TRIGGERS PROVEEDORES		*/ 

DELIMITER //
CREATE TRIGGER proveedores_bi_er
  BEFORE INSERT ON proveedores
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER proveedores_bu_er
  BEFORE UPDATE ON proveedores
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;


