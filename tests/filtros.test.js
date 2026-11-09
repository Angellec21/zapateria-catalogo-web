import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filtrarProductos, tallasDelCatalogo, normalizar, filtrosDesdeURL, filtrosAURL, filtrosVacios,
} from '../js/catalogo.js';
import { productos } from '../js/productos.js';

const muestra = [
  { id: 'A', nombre: 'Zapatilla Urubó', marca: 'Andes', color: 'Negro', categoria: 'zapatillas', genero: 'hombre', precio: 450, nuevo: true, stock: { 40: 2, 41: 0 } },
  { id: 'B', nombre: 'Sandalia Samaipata', marca: 'Bella', color: 'Dorado', categoria: 'sandalias', genero: 'mujer', precio: 180, nuevo: false, stock: { 37: 3 } },
  { id: 'C', nombre: 'Chinela Playa', marca: 'Piraí', color: 'Verde', categoria: 'sandalias', genero: 'unisex', precio: 70, nuevo: false, stock: { 37: 1, 41: 4 } },
  { id: 'D', nombre: 'Botín chelsea', marca: 'Cueros', color: 'Café', categoria: 'botas', genero: 'unisex', precio: 610, nuevo: true, stock: { 40: 0 } },
];
const ids = (lista) => lista.map((p) => p.id);

test('sin filtros devuelve todo en el orden de la tienda', () => {
  assert.deepEqual(ids(filtrarProductos(muestra)), ['A', 'B', 'C', 'D']);
  assert.deepEqual(ids(filtrarProductos(muestra, filtrosVacios)), ['A', 'B', 'C', 'D']);
});

test('filtra por categoría', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { categoria: 'sandalias' })), ['B', 'C']);
});

test('los modelos unisex aparecen en hombre y en mujer', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { genero: 'hombre' })), ['A', 'C', 'D']);
  assert.deepEqual(ids(filtrarProductos(muestra, { genero: 'mujer' })), ['B', 'C', 'D']);
});

test('la talla solo muestra modelos con pares disponibles en esa talla', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { talla: 41 })), ['C']);
  assert.deepEqual(ids(filtrarProductos(muestra, { talla: 40 })), ['A']);
  assert.deepEqual(ids(filtrarProductos(muestra, { talla: 44 })), []);
});

test('la búsqueda ignora tildes y mayúsculas y exige todas las palabras', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { texto: 'URUBO' })), ['A']);
  assert.deepEqual(ids(filtrarProductos(muestra, { texto: 'sandalia dorado' })), ['B']);
  assert.deepEqual(ids(filtrarProductos(muestra, { texto: 'sandalia verde' })), []);
  assert.deepEqual(ids(filtrarProductos(muestra, { texto: 'pirai' })), ['C']);
});

test('combina varios filtros a la vez', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { categoria: 'sandalias', genero: 'hombre', talla: 41 })), ['C']);
});

test('ordena por precio en ambos sentidos y por novedades sin perder el orden original', () => {
  assert.deepEqual(ids(filtrarProductos(muestra, { orden: 'precio-asc' })), ['C', 'B', 'A', 'D']);
  assert.deepEqual(ids(filtrarProductos(muestra, { orden: 'precio-desc' })), ['D', 'A', 'B', 'C']);
  assert.deepEqual(ids(filtrarProductos(muestra, { orden: 'nuevos' })), ['A', 'D', 'B', 'C']);
});

test('no modifica la lista original', () => {
  const copia = ids(muestra);
  filtrarProductos(muestra, { orden: 'precio-asc' });
  assert.deepEqual(ids(muestra), copia);
});

test('tallasDelCatalogo junta las tallas con stock sin repetir', () => {
  assert.deepEqual(tallasDelCatalogo(muestra), [37, 40, 41]);
  const todas = tallasDelCatalogo(productos);
  assert.ok(todas.includes(28) && todas.includes(44));
});

test('normalizar quita tildes y espacios', () => {
  assert.equal(normalizar('  Botín Cruceño '), 'botin cruceno');
});

test('los filtros se leen desde la URL y descartan valores inválidos', () => {
  assert.deepEqual(filtrosDesdeURL('?categoria=botas&talla=40&genero=mujer&orden=precio-asc&q=cuero'), {
    texto: 'cuero', categoria: 'botas', genero: 'mujer', talla: 40, orden: 'precio-asc',
  });
  assert.deepEqual(filtrosDesdeURL('?talla=abc&genero=otro&orden=toString'), { ...filtrosVacios });
});

test('los filtros se escriben en la URL omitiendo los vacíos (ida y vuelta)', () => {
  assert.equal(filtrosAURL(filtrosVacios), '');
  const filtros = { texto: ' bota ', categoria: 'botas', genero: '', talla: 39, orden: 'nuevos' };
  const url = filtrosAURL(filtros);
  assert.equal(url, '?q=bota&categoria=botas&talla=39&orden=nuevos');
  assert.deepEqual(filtrosDesdeURL(url), { ...filtros, texto: 'bota' });
});
