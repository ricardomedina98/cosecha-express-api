/*TRIGGERS USUARIOS*/

DELIMITER //
CREATE TRIGGER USUARIOS_usuarios_ai_er
  BEFORE INSERT ON usuarios
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;




/*TRIGGERS PRODUCTOS*/

DELIMITER //
CREATE TRIGGER PRODUCTOS_productos_bi_er
  BEFORE INSERT ON productos
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;





DROP TRIGGER USUARIOS_roles_ai_er;

DROP TRIGGER PRODUCTOS_productos_bi_er;