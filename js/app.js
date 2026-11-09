// Interfaz del catálogo: pinta los productos en la grilla.
import { productos, tienda } from './productos.js';
import { formatearBs, tallasDisponibles, stockTotal, porcentajeDescuento } from './catalogo.js';

const grilla = document.getElementById('grilla');
const contador = document.getElementById('contador');

function crear(etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function tarjetaProducto(producto) {
  const item = crear('li');
  const tarjeta = crear('article', 'tarjeta');
  tarjeta.setAttribute('aria-labelledby', `nombre-${producto.id}`);

  const descuento = porcentajeDescuento(producto);
  if (stockTotal(producto) === 0) tarjeta.append(crear('span', 'etiqueta etiqueta--agotado', 'Agotado'));
  else if (descuento > 0) tarjeta.append(crear('span', 'etiqueta etiqueta--oferta', `-${descuento}%`));
  else if (producto.nuevo) tarjeta.append(crear('span', 'etiqueta', 'Nuevo'));

  const marcoImagen = crear('div', 'tarjeta__imagen');
  const imagen = crear('img');
  imagen.src = producto.imagen;
  imagen.alt = `${producto.nombre}, color ${producto.color.toLowerCase()}`;
  imagen.width = 240;
  imagen.height = 160;
  imagen.loading = 'lazy';
  marcoImagen.append(imagen);

  const cuerpo = crear('div', 'tarjeta__cuerpo');
  const nombre = crear('h3', 'tarjeta__nombre', producto.nombre);
  nombre.id = `nombre-${producto.id}`;
  const precio = crear('p', 'tarjeta__precio');
  precio.append(crear('span', 'precio', formatearBs(producto.precio)));
  if (descuento > 0) {
    const anterior = crear('del', 'precio precio--anterior', formatearBs(producto.precioAnterior));
    anterior.setAttribute('aria-label', `Antes ${formatearBs(producto.precioAnterior)}`);
    precio.append(anterior);
  }
  const tallas = tallasDisponibles(producto);
  const textoTallas = tallas.length ? `Tallas: ${tallas.join(', ')}` : 'Sin tallas disponibles';

  cuerpo.append(
    crear('p', 'tarjeta__marca', producto.marca),
    nombre,
    crear('p', 'tarjeta__tallas', textoTallas),
    precio,
  );
  tarjeta.append(marcoImagen, cuerpo);
  item.append(tarjeta);
  return item;
}

function mostrar(lista) {
  grilla.replaceChildren(...lista.map(tarjetaProducto));
  contador.textContent = `${lista.length} ${lista.length === 1 ? 'modelo' : 'modelos'}`;
}

document.getElementById('direccion').textContent = `${tienda.direccion}, ${tienda.ciudad}`;
document.getElementById('horario').textContent = tienda.horario;
mostrar(productos);
