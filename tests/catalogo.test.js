import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatearBs, tallasDisponibles, stockTotal, porcentajeDescuento } from '../js/catalogo.js';

const zapato = {
  id: 'T-1', precio: 300, precioAnterior: 400,
  stock: { 40: 2, 38: 0, 39: 1, 41: 3 },
};

test('formatearBs usa el formato boliviano con dos decimales', () => {
  assert.equal(formatearBs(289), 'Bs 289,00');
  assert.equal(formatearBs(1234.5), 'Bs 1.234,50');
});

test('tallasDisponibles ignora tallas agotadas y ordena de menor a mayor', () => {
  assert.deepEqual(tallasDisponibles(zapato), [39, 40, 41]);
});

test('stockTotal suma los pares de todas las tallas', () => {
  assert.equal(stockTotal(zapato), 6);
  assert.equal(stockTotal({ stock: { 38: 0 } }), 0);
});

test('porcentajeDescuento redondea y devuelve 0 sin oferta', () => {
  assert.equal(porcentajeDescuento(zapato), 25);
  assert.equal(porcentajeDescuento({ precio: 289, precioAnterior: 349 }), 17);
  assert.equal(porcentajeDescuento({ precio: 100 }), 0);
  assert.equal(porcentajeDescuento({ precio: 100, precioAnterior: 90 }), 0);
});
