create database cosechaexpress2;
use cosechaexpress2;




select * from productos;

select p.id_producto, p.nombre_producto, p.precio_semanal from productos p;

select * from clientes;

select * from producto_precio_esp;

select p.id_producto, p.nombre_producto, p.existencia, p.precio_semanal from productos p 
inner join producto_precio_esp p_esp on p.id_producto = p_esp.id_producto
inner join clientes c on c.id_cliente = c.id_cliente where c.id_cliente = 1;