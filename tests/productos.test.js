import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { productos, categorias, tienda } from '../js/productos.js';

const raiz = new URL('../', import.meta.url);
const idsCategorias = new Set(categorias.map((c) => c.id));

test('los códigos de producto son únicos', () => {
  const ids = productos.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('cada producto tiene los datos que muestra el catálogo', () => {
  for (const p of productos) {
    for (const campo of ['id', 'nombre', 'marca', 'categoria', 'genero', 'color', 'descripcion', 'imagen']) {
      assert.ok(typeof p[campo] === 'string' && p[campo].trim(), `${p.id}: falta ${campo}`);
    }
  }
});

test('cada producto pertenece a una categoría existente', () => {
  for (const p of productos) assert.ok(idsCategorias.has(p.categoria), `${p.id}: ${p.categoria}`);
});

test('todas las categorías tienen al menos un producto', () => {
  for (const c of categorias) {
    assert.ok(productos.some((p) => p.categoria === c.id), `categoría vacía: ${c.id}`);
  }
});

test('el género es hombre, mujer o unisex', () => {
  for (const p of productos) assert.ok(['hombre', 'mujer', 'unisex'].includes(p.genero), p.id);
});

test('los precios en Bs son positivos y el precio anterior es mayor al actual', () => {
  for (const p of productos) {
    assert.ok(Number.isFinite(p.precio) && p.precio > 0, p.id);
    if (p.precioAnterior !== undefined) assert.ok(p.precioAnterior > p.precio, p.id);
  }
});

test('las tallas están entre 20 y 46 y el stock son pares enteros no negativos', () => {
  for (const p of productos) {
    const tallas = Object.keys(p.stock);
    assert.ok(tallas.length > 0, `${p.id}: sin tallas`);
    for (const [talla, pares] of Object.entries(p.stock)) {
      assert.ok(Number(talla) >= 20 && Number(talla) <= 46, `${p.id}: talla ${talla}`);
      assert.ok(Number.isInteger(pares) && pares >= 0, `${p.id}: stock ${talla}`);
    }
  }
});

test('las imágenes de los productos existen en el proyecto', () => {
  for (const p of productos) assert.ok(existsSync(new URL(p.imagen, raiz)), `${p.id}: ${p.imagen}`);
});

test('el WhatsApp de la tienda está en formato internacional de Bolivia', () => {
  assert.match(tienda.whatsapp, /^591[67]\d{7}$/);
});
