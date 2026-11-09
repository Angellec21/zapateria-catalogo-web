// Lógica pura del catálogo (sin DOM), para poder probarla con `node --test`.

const formatoBs = new Intl.NumberFormat('es-BO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formatea un monto en bolivianos: 1234.5 → "Bs 1.234,50". */
export function formatearBs(monto) {
  return `Bs ${formatoBs.format(monto)}`;
}

/** Tallas con al menos un par disponible, ordenadas de menor a mayor. */
export function tallasDisponibles(producto) {
  return Object.entries(producto.stock)
    .filter(([, pares]) => pares > 0)
    .map(([talla]) => Number(talla))
    .sort((a, b) => a - b);
}

/** Total de pares disponibles de un producto. */
export function stockTotal(producto) {
  return Object.values(producto.stock).reduce((suma, pares) => suma + pares, 0);
}

/** Porcentaje de descuento redondeado, o 0 si no tiene precio anterior. */
export function porcentajeDescuento(producto) {
  if (!producto.precioAnterior || producto.precioAnterior <= producto.precio) return 0;
  return Math.round((1 - producto.precio / producto.precioAnterior) * 100);
}

// ---------------------------------------------------------------------------
// Filtros y orden

export const filtrosVacios = Object.freeze({
  texto: '',
  categoria: '',
  genero: '',
  talla: null,
  orden: 'destacados',
});

export const ordenes = {
  destacados: 'Destacados',
  'precio-asc': 'Precio: menor a mayor',
  'precio-desc': 'Precio: mayor a menor',
  nuevos: 'Novedades primero',
};

/** Pasa a minúsculas y quita tildes para que "urubo" encuentre "Urubó". */
export function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Todas las tallas con stock en el catálogo, para armar el filtro. */
export function tallasDelCatalogo(lista) {
  const tallas = new Set(lista.flatMap(tallasDisponibles));
  return [...tallas].sort((a, b) => a - b);
}

function coincideTexto(producto, texto) {
  if (!texto) return true;
  const donde = normalizar(`${producto.nombre} ${producto.marca} ${producto.color} ${producto.id}`);
  return normalizar(texto).split(/\s+/).every((palabra) => donde.includes(palabra));
}

function coincideGenero(producto, genero) {
  // Los modelos unisex aparecen tanto en "hombre" como en "mujer".
  return !genero || producto.genero === genero || producto.genero === 'unisex';
}

/**
 * Filtra y ordena el catálogo. La talla solo deja pasar modelos con pares disponibles
 * en esa talla; el orden "destacados" respeta el orden original de la tienda.
 */
export function filtrarProductos(lista, filtros = {}) {
  const f = { ...filtrosVacios, ...filtros };
  const resultado = lista.filter((p) =>
    (!f.categoria || p.categoria === f.categoria)
    && coincideGenero(p, f.genero)
    && (f.talla == null || (p.stock[f.talla] ?? 0) > 0)
    && coincideTexto(p, f.texto));

  const conIndice = resultado.map((p, i) => [p, i]);
  const desempate = (a, b) => a[1] - b[1];
  switch (f.orden) {
    case 'precio-asc':
      conIndice.sort((a, b) => a[0].precio - b[0].precio || desempate(a, b));
      break;
    case 'precio-desc':
      conIndice.sort((a, b) => b[0].precio - a[0].precio || desempate(a, b));
      break;
    case 'nuevos':
      conIndice.sort((a, b) => Number(b[0].nuevo) - Number(a[0].nuevo) || desempate(a, b));
      break;
    default:
      break;
  }
  return conIndice.map(([p]) => p);
}

/** Lee los filtros desde la URL (?categoria=botas&talla=40) para que se puedan compartir. */
export function filtrosDesdeURL(busqueda) {
  const params = new URLSearchParams(busqueda);
  const talla = Number(params.get('talla'));
  const orden = params.get('orden');
  return {
    ...filtrosVacios,
    texto: params.get('q') ?? '',
    categoria: params.get('categoria') ?? '',
    genero: ['hombre', 'mujer'].includes(params.get('genero')) ? params.get('genero') : '',
    talla: Number.isInteger(talla) && talla > 0 ? talla : null,
    orden: Object.hasOwn(ordenes, orden ?? '') ? orden : 'destacados',
  };
}

/** Convierte los filtros activos en query string, omitiendo los vacíos. */
export function filtrosAURL(filtros) {
  const params = new URLSearchParams();
  if (filtros.texto?.trim()) params.set('q', filtros.texto.trim());
  if (filtros.categoria) params.set('categoria', filtros.categoria);
  if (filtros.genero) params.set('genero', filtros.genero);
  if (filtros.talla != null) params.set('talla', String(filtros.talla));
  if (filtros.orden && filtros.orden !== 'destacados') params.set('orden', filtros.orden);
  const texto = params.toString();
  return texto ? `?${texto}` : '';
}
