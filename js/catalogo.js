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
