select * from usuarios;
select * from productos;
select * from categorias_productos;
select * from mediciones;
select * from clientes;
select * from proveedores;
select * from compras;
select * from notificaciones;
select * from adm_transacciones_log;
select * from productos_lista_precios;
SELECT * FROM equivalencias;





SELECT p.id_producto, p.nombre_producto,e.id_equivalencia , e.equivalencia1, e.equivalencia2 FROM productos p LEFT JOIN equivalencias e ON p.id_producto = e.id_producto;


