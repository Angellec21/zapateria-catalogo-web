// Catálogo de ejemplo de "Calzados Piraí", una zapatería ficticia de Santa Cruz de la Sierra.
// Precios en bolivianos (Bs). Las tallas usan numeración boliviana/europea (EU).
// `stock` indica pares disponibles por talla en la tienda.

export const tienda = {
  nombre: 'Calzados Piraí',
  ciudad: 'Santa Cruz de la Sierra',
  direccion: 'Av. Cañoto esq. calle Ayacucho, 1er anillo',
  horario: 'Lun a sáb · 9:00 a 20:30',
  // Número de WhatsApp de ejemplo (formato internacional sin "+"). Cámbialo por el de la tienda.
  whatsapp: '59170000000',
};

export const categorias = [
  { id: 'zapatillas', nombre: 'Zapatillas' },
  { id: 'formales', nombre: 'Formales' },
  { id: 'botas', nombre: 'Botas y botines' },
  { id: 'sandalias', nombre: 'Sandalias' },
  { id: 'escolares', nombre: 'Escolares' },
];

export const productos = [
  {
    id: 'ZAP-001', nombre: 'Zapatilla urbana Kalua', marca: 'Piraí Sport', categoria: 'zapatillas',
    genero: 'unisex', precio: 289, precioAnterior: 349, color: 'Blanco con gris',
    descripcion: 'Zapatilla liviana de tela respirable con suela de goma antideslizante, ideal para el calor cruceño.',
    stock: { 36: 3, 37: 5, 38: 6, 39: 4, 40: 4, 41: 2, 42: 0 }, imagen: 'img/zapatilla.svg', nuevo: false,
  },
  {
    id: 'ZAP-002', nombre: 'Zapatilla running Urubó', marca: 'Andes Run', categoria: 'zapatillas',
    genero: 'hombre', precio: 459, color: 'Negro con naranja',
    descripcion: 'Amortiguación media y malla transpirable para correr en el Parque Urbano o la ciclovía.',
    stock: { 39: 2, 40: 4, 41: 5, 42: 3, 43: 2, 44: 1 }, imagen: 'img/zapatilla.svg', nuevo: true,
  },
  {
    id: 'ZAP-003', nombre: 'Zapatilla running Lomas', marca: 'Andes Run', categoria: 'zapatillas',
    genero: 'mujer', precio: 439, color: 'Lila con blanco',
    descripcion: 'Horma femenina con plantilla de espuma y refuerzo en el talón.',
    stock: { 35: 2, 36: 4, 37: 4, 38: 3, 39: 1 }, imagen: 'img/zapatilla.svg', nuevo: true,
  },
  {
    id: 'ZAP-004', nombre: 'Zapatilla de lona Clásica', marca: 'Piraí Sport', categoria: 'zapatillas',
    genero: 'unisex', precio: 149, color: 'Azul marino',
    descripcion: 'La de siempre: lona resistente y puntera de goma. Se lava fácil.',
    stock: { 34: 4, 35: 6, 36: 8, 37: 8, 38: 6, 39: 5, 40: 4, 41: 3, 42: 2 }, imagen: 'img/zapatilla.svg', nuevo: false,
  },
  {
    id: 'FOR-001', nombre: 'Zapato Oxford de cuero', marca: 'Cueros del Oriente', categoria: 'formales',
    genero: 'hombre', precio: 520, color: 'Café',
    descripcion: 'Cuero vacuno curtido en Bolivia, forro de cuero y suela cosida. Para oficina y eventos.',
    stock: { 39: 1, 40: 3, 41: 3, 42: 2, 43: 1 }, imagen: 'img/formal.svg', nuevo: false,
  },
  {
    id: 'FOR-002', nombre: 'Mocasín Equipetrol', marca: 'Cueros del Oriente', categoria: 'formales',
    genero: 'hombre', precio: 395, precioAnterior: 450, color: 'Negro',
    descripcion: 'Mocasín sin cordones de cuero suave, cómodo para todo el día.',
    stock: { 39: 2, 40: 2, 41: 4, 42: 3, 43: 0, 44: 1 }, imagen: 'img/formal.svg', nuevo: false,
  },
  {
    id: 'FOR-003', nombre: 'Stiletto Noche Cruceña', marca: 'Bella Sierra', categoria: 'formales',
    genero: 'mujer', precio: 360, color: 'Rojo charol',
    descripcion: 'Taco de 9 cm con plantilla acolchada. Para fiestas, matrimonios y el carnaval de salón.',
    stock: { 35: 2, 36: 3, 37: 3, 38: 2, 39: 1 }, imagen: 'img/formal.svg', nuevo: true,
  },
  {
    id: 'FOR-004', nombre: 'Ballerina de cuero', marca: 'Bella Sierra', categoria: 'formales',
    genero: 'mujer', precio: 245, color: 'Beige',
    descripcion: 'Zapato plano de cuero con lazo, liviano y combinable.',
    stock: { 35: 3, 36: 4, 37: 5, 38: 4, 39: 2, 40: 1 }, imagen: 'img/formal.svg', nuevo: false,
  },
  {
    id: 'BOT-001', nombre: 'Botín chelsea', marca: 'Cueros del Oriente', categoria: 'botas',
    genero: 'unisex', precio: 610, color: 'Café oscuro',
    descripcion: 'Botín de cuero con elásticos laterales y suela de goma. Para el surazo y los viajes al occidente.',
    stock: { 37: 1, 38: 2, 39: 2, 40: 3, 41: 2, 42: 1 }, imagen: 'img/bota.svg', nuevo: false,
  },
  {
    id: 'BOT-002', nombre: 'Bota de trabajo Chiquitana', marca: 'Faena', categoria: 'botas',
    genero: 'hombre', precio: 575, color: 'Miel',
    descripcion: 'Puntera de acero, suela dieléctrica y cuero engrasado. Para obra, campo y agroindustria.',
    stock: { 39: 3, 40: 5, 41: 6, 42: 5, 43: 3, 44: 2 }, imagen: 'img/bota.svg', nuevo: false,
  },
  {
    id: 'BOT-003', nombre: 'Bota caña alta Valle', marca: 'Bella Sierra', categoria: 'botas',
    genero: 'mujer', precio: 690, precioAnterior: 790, color: 'Negro',
    descripcion: 'Bota de caña alta con cierre lateral y taco cuadrado de 5 cm.',
    stock: { 35: 1, 36: 2, 37: 2, 38: 1, 39: 0 }, imagen: 'img/bota.svg', nuevo: false,
  },
  {
    id: 'SAN-001', nombre: 'Sandalia Samaipata', marca: 'Bella Sierra', categoria: 'sandalias',
    genero: 'mujer', precio: 179, color: 'Dorado',
    descripcion: 'Sandalia plana de tiras con hebilla, cómoda para el día a día.',
    stock: { 35: 4, 36: 6, 37: 6, 38: 5, 39: 3, 40: 1 }, imagen: 'img/sandalia.svg', nuevo: true,
  },
  {
    id: 'SAN-002', nombre: 'Chinela Playa Las Islas', marca: 'Piraí Sport', categoria: 'sandalias',
    genero: 'unisex', precio: 69, color: 'Verde',
    descripcion: 'Chinela de goma EVA, resistente al agua. Para la piscina o el condominio.',
    stock: { 35: 10, 36: 10, 37: 12, 38: 12, 39: 10, 40: 8, 41: 8, 42: 6, 43: 4 }, imagen: 'img/sandalia.svg', nuevo: false,
  },
  {
    id: 'SAN-003', nombre: 'Sandalia de cuero Guarayos', marca: 'Cueros del Oriente', categoria: 'sandalias',
    genero: 'hombre', precio: 219, color: 'Café',
    descripcion: 'Sandalia de cuero con doble tira regulable y suela de caucho.',
    stock: { 39: 2, 40: 3, 41: 3, 42: 2, 43: 1 }, imagen: 'img/sandalia.svg', nuevo: false,
  },
  {
    id: 'ESC-001', nombre: 'Zapato escolar colegial', marca: 'Escolar Plus', categoria: 'escolares',
    genero: 'unisex', precio: 189, color: 'Negro',
    descripcion: 'Cuero sintético lustrable, suela resistente y plantilla anatómica. Aprobado para uniforme.',
    stock: { 28: 4, 29: 5, 30: 6, 31: 6, 32: 5, 33: 5, 34: 4, 35: 3, 36: 2 }, imagen: 'img/formal.svg', nuevo: false,
  },
  {
    id: 'ESC-002', nombre: 'Zapatilla blanca de educación física', marca: 'Escolar Plus', categoria: 'escolares',
    genero: 'unisex', precio: 159, precioAnterior: 185, color: 'Blanco',
    descripcion: 'Zapatilla blanca reglamentaria con velcro (hasta talla 32) o cordones.',
    stock: { 28: 3, 29: 4, 30: 5, 31: 5, 32: 6, 33: 4, 34: 4, 35: 2, 36: 0 }, imagen: 'img/zapatilla.svg', nuevo: false,
  },
];
