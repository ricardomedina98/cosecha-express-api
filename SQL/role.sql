insert into roles(nombre_role) values('Administrador');

insert into role_modulos (id_modulo, id_role) values (2, 1);

insert into modulos(nombre_modulo) values ('Productos');
insert into modulos(nombre_modulo) values ('Clientes');
insert into modulos(nombre_modulo) values ('Usuarios');
insert into modulos(nombre_modulo) values ('Perfil');
insert into modulos(nombre_modulo) values ('Proveedores');


insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canAddProduct', 'Agregar productos', 1);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditProduct', 'Editar productos', 1);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditPrice', 'Editar precios', 1);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canDeleteProduct', 'Eliminar productos', 1);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canViewChart', 'Ver grafica', 1);

insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canAddClient', 'Agregar cliente', 2);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditClient', 'Modificar cliente', 2);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canDeleteClient', 'Eliminar cliente', 2);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditListProductsClient', 'Modificar lista de productos del cliente', 2);

insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canAddUsers', 'Agregar usuarios', 3);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditUsers', 'Editar usuarios', 3);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canDeleteUsers', 'Eliminar usuarios', 3);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditRoles', 'Editar roles', 3);

insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values('canEditName', 'Editar nombre', 4); 
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values('canEditUser', 'Editar usuario', 4);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values('canEditPassword', 'Editar contraseña', 4);

insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canAddProvider', 'Agregar proveedor', 5);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canEditProvider', 'Editar proveedor', 5);
insert into permisos_nivel_1 (nombre_permiso, descripcion, id_modulo) values ('canDeleteProvider', 'Eliminar proveedor', 5);


insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canApplyPorcentajeAllList', 'Aplicar porcentaje a toda la lista', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canEditPrice', 'Modificar precio', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canDeleteProduct', 'Eliminar producto', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canRestoreProductPrice', 'Restaurar el precio de un producto', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canAddProductList', 'Agregar productos a la lista', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canRestoreGeneralList', 'Restaurar precios a lista general', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canSendEmail', 'Enviar correo', 9);
insert into permisos_nivel_2 (nombre_permiso, descripcion, id_permiso_nivel_1) values ('canExportExcel', 'Exportar a Excel', 9);

select * from permisos_nivel_1;