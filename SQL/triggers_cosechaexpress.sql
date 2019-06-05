/*		TRIGGERS USUARIOS		*/

DELIMITER //
CREATE TRIGGER usuarios_ai_er
  BEFORE INSERT ON usuarios
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER USUARIOS_usuarios_ia_up
  BEFORE UPDATE ON usuarios
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;


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
CREATE TRIGGER productos_bi_up
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
	insert into adm_transacciones_log (nombre_objeto, id_objeto, tipo_transaccion, descripcion, fecha_creacion) 
		values ('productos', NEW.id_producto, 'I', concat('Creacion de producto || ', new.nombre_producto) , NOW());
END;//
DELIMITER;


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
CREATE TRIGGER clientes_ia_up
  BEFORE UPDATE ON clientes
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
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
CREATE TRIGGER proveedores_ia_up
  BEFORE UPDATE ON proveedores
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;




/*										PENDIENTE								*/




/*		TRIGGERS COMPRAS		*/ 

DELIMITER //
CREATE TRIGGER compras_bi_er
  BEFORE INSERT ON compras
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;


/*		TRIGGERS VENTAS		*/

DELIMITER //
CREATE TRIGGER ventas_bi_er
  BEFORE INSERT ON ventas
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

/*		TRIGGERS DEVOLUCIONES		*/

DELIMITER //
CREATE TRIGGER devoluciones_bi_er
  BEFORE INSERT ON devoluciones
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;



/*				TRIGGERS  LISTA PRECIOS   				*/

DELIMITER //
CREATE TRIGGER lista_precios_bi_er
  BEFORE INSERT ON productos_lista_precios
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;



DELIMITER //
CREATE TRIGGER lista_precios_bu_er
  BEFORE UPDATE ON productos_lista_precios
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;




