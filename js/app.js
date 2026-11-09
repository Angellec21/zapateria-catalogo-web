// Interfaz del catálogo: filtros, grilla de productos y estado en la URL.
import { productos, categorias, tienda } from './productos.js';
import {
  formatearBs, tallasDisponibles, stockTotal, porcentajeDescuento,
  filtrarProductos, tallasDelCatalogo, filtrosDesdeURL, filtrosAURL, filtrosVacios, ordenes,
} from './catalogo.js';

document.documentElement.classList.add('js');

const grilla = document.getElementById('grilla');
const contador = document.getElementById('contador');
const formulario = document.getElementById('filtros');
const vacio = document.getElementById('vacio');

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
  vacio.hidden = lista.length > 0;
  contador.textContent = `${lista.length} ${lista.length === 1 ? 'modelo' : 'modelos'}`;
}

// --- Filtros ---------------------------------------------------------------

function opcion(valor, texto) {
  const el = crear('option', '', texto);
  el.value = valor;
  return el;
}

function chipTalla(talla) {
  const etiqueta = crear('label', 'chip');
  const entrada = crear('input');
  entrada.type = 'radio';
  entrada.name = 'talla';
  entrada.value = talla;
  etiqueta.append(entrada, crear('span', '', talla === '' ? 'Todas' : talla));
  return etiqueta;
}

function armarFiltros() {
  formulario.categoria.append(...categorias.map((c) => opcion(c.id, c.nombre)));
  formulario.orden.append(...Object.entries(ordenes).map(([valor, texto]) => opcion(valor, texto)));
  const tallas = document.getElementById('f-tallas');
  tallas.append(chipTalla(''), ...tallasDelCatalogo(productos).map((t) => chipTalla(String(t))));
}

function leerFormulario() {
  const datos = new FormData(formulario);
  const talla = datos.get('talla');
  return {
    texto: datos.get('texto') ?? '',
    categoria: datos.get('categoria') ?? '',
    genero: datos.get('genero') ?? '',
    talla: talla ? Number(talla) : null,
    orden: datos.get('orden') || 'destacados',
  };
}

function escribirFormulario(filtros) {
  formulario.texto.value = filtros.texto;
  formulario.categoria.value = categorias.some((c) => c.id === filtros.categoria) ? filtros.categoria : '';
  formulario.orden.value = filtros.orden;
  for (const radio of formulario.genero) radio.checked = radio.value === filtros.genero;
  const talla = filtros.talla == null ? '' : String(filtros.talla);
  const radios = [...formulario.talla];
  if (!radios.some((r) => r.value === talla)) {
    radios[0].checked = true;
    return;
  }
  for (const radio of radios) radio.checked = radio.value === talla;
}

function aplicar({ guardarEnURL = true } = {}) {
  const filtros = leerFormulario();
  mostrar(filtrarProductos(productos, filtros));
  if (guardarEnURL) {
    const url = `${location.pathname}${filtrosAURL(filtros)}`;
    history.replaceState(null, '', url);
  }
}

function limpiar() {
  escribirFormulario(filtrosVacios);
  aplicar();
}

formulario.addEventListener('input', () => aplicar());
formulario.addEventListener('change', () => aplicar());
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  aplicar();
});
formulario.addEventListener('reset', (evento) => {
  evento.preventDefault();
  limpiar();
});
document.getElementById('limpiar-vacio').addEventListener('click', () => {
  limpiar();
  formulario.texto.focus();
});

document.getElementById('direccion').textContent = `${tienda.direccion}, ${tienda.ciudad}`;
document.getElementById('horario').textContent = tienda.horario;
armarFiltros();
escribirFormulario(filtrosDesdeURL(location.search));
aplicar({ guardarEnURL: false });
