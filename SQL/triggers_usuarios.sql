/*TRIGGERS USUARIOS*/
DROP TRIGGER USUARIOS_roles_ai_er;
DELIMITER //
CREATE TRIGGER USUARIOS_usuarios_ai_er
  BEFORE INSERT ON usuarios
  FOR EACH ROW 
BEGIN     
  set NEW.fecha_creacion = NOW(), NEW.creado_por = USER();  
END;//
DELIMITER ;