/*		TRIGGERS USUARIOS		*/

DELIMITER //
CREATE TRIGGER USUARIOS_usuarios_ai_er
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
CREATE TRIGGER PRODUCTOS_productos_bi_er
  BEFORE INSERT ON productos
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER PRODUCTOS_productos_bi_up
  BEFORE UPDATE ON productos
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;


/*		TRIGGERS CLIENTES		*/

DELIMITER //
CREATE TRIGGER CLIENTES_clientes_bi_er
  BEFORE INSERT ON clientes
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER CLIENTES_clientes_ia_up
  BEFORE UPDATE ON clientes
  FOR EACH ROW 
BEGIN  
 SET NEW.fecha_ultima_modificacion = Now(), 
      NEW.fecha_modificacion_por = USER();   
END;//
DELIMITER ;

/*		TRIGGERS PROVEEDORES		*/ 

DELIMITER //
CREATE TRIGGER PROVEEDORES_proveedores_bi_er
  BEFORE INSERT ON proveedores
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER PROVEEDORES_proveedores_ia_up
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
CREATE TRIGGER COMPRAS_compras_bi_er
  BEFORE INSERT ON compras
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;


/*		TRIGGERS VENTAS		*/

DELIMITER //
CREATE TRIGGER VENTAS_ventas_bi_er
  BEFORE INSERT ON ventas
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;

/*		TRIGGERS DEVOLUCIONES		*/

DELIMITER //
CREATE TRIGGER DEVOLUCIONES_devoluciones_bi_er
  BEFORE INSERT ON devoluciones
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;