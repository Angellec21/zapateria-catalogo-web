# 👟 zapateria-catalogo-web

[![CI](https://github.com/Angellec21/zapateria-catalogo-web/actions/workflows/ci.yml/badge.svg)](https://github.com/Angellec21/zapateria-catalogo-web/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-F7DF1E?logo=javascript&logoColor=black)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)

Catálogo web para una zapatería de Santa Cruz de la Sierra: el cliente encuentra su modelo **en su talla**, ve el precio en **Bs** y hace el pedido por **WhatsApp**. Sitio estático, liviano y accesible, que se publica gratis en GitHub Pages o en cualquier hosting.

> Proyecto de portafolio con una tienda ficticia (**Calzados Piraí**) y datos de ejemplo realistas.

## 💼 El problema de negocio

Muchas zapaterías de Santa Cruz venden por WhatsApp y Facebook enviando fotos sueltas. El cliente pregunta "¿hay en 38?" modelo por modelo, el vendedor revisa el depósito y la conversación se alarga… y muchas veces el cliente se va.

Este catálogo resuelve eso:

- El cliente filtra **por su talla** y solo ve lo que realmente hay en stock.
- Precios claros en bolivianos, con ofertas y novedades destacadas.
- El vendedor recibe por WhatsApp un pedido ya armado (modelo, talla y precio) *(en desarrollo)*.
- No requiere servidor ni base de datos: el dueño actualiza un solo archivo con sus productos.

## ✨ Funcionalidades

**Disponible**

- Grilla de productos con marca, tallas disponibles, precio en Bs y precio anterior tachado.
- Etiquetas automáticas: **Oferta** (con % de descuento), **Nuevo** y **Agotado**.
- Filtros combinables: categoría, para quién (mujer / hombre; los unisex aparecen en ambos) y talla.
- La talla solo muestra modelos **con pares disponibles** en esa talla.
- Búsqueda por modelo, marca o color que ignora tildes y mayúsculas (`urubo` encuentra *Urubó*).
- Orden por destacados, precio (menor/mayor) o novedades.
- Los filtros quedan en la URL para compartir el enlace: `?categoria=botas&talla=40`.
- Diseño *mobile first*, navegación por teclado, enlace "saltar al catálogo" y validación de accesibilidad en CI.

**En camino** (ver [roadmap](#️-roadmap))

- Ficha de producto con selección de talla y botón **Pedir por WhatsApp** con el mensaje armado.
- Carrito de varios pares en un solo pedido.

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 con variables, Grid y Flexbox (sin frameworks) |
| Interacción | JavaScript con módulos ES nativos (sin dependencias en producción) |
| Pruebas | `node:test` (incluido en Node.js) |
| Calidad | [html-validate](https://html-validate.org/) con reglas de accesibilidad (WCAG) |
| CI | GitHub Actions en Node 20 y 22 |

## 🏗️ Arquitectura

```
zapateria-catalogo-web/
├── index.html          # Página del catálogo (estructura y formulario de filtros)
├── css/estilos.css     # Estilos mobile first con variables de diseño
├── js/
│   ├── productos.js    # Datos de la tienda y del catálogo (lo que edita el dueño)
│   ├── catalogo.js     # Lógica pura: formato Bs, tallas, filtros, orden y URL
│   └── app.js          # Interfaz: pinta la grilla y conecta los filtros con el DOM
├── img/                # Ilustraciones SVG de los productos
└── tests/              # Pruebas de datos, lógica del catálogo y filtros
```

La lógica de negocio (`catalogo.js`) no toca el DOM, por eso se prueba directamente con Node sin navegador. `app.js` solo traduce entre el formulario, la URL y la grilla.

## 🚀 Instalación y uso

Requisitos: [Node.js](https://nodejs.org/) 20 o superior (solo para pruebas y servidor local).

```bash
git clone https://github.com/Angellec21/zapateria-catalogo-web.git
cd zapateria-catalogo-web
npm install
npm start            # abre http://localhost:8080
```

> Como usa módulos ES, el sitio debe abrirse desde un servidor (no con doble clic en `index.html`). También sirve `python3 -m http.server 8080`.

### Pruebas y validación

```bash
npm test             # 25 pruebas con node:test
npm run lint:html    # valida el HTML y reglas de accesibilidad
npm run check        # ambas cosas, igual que en CI
```

### Cargar los productos de tu tienda

Edita `js/productos.js`:

```js
{
  id: 'BOT-002', nombre: 'Bota de trabajo Chiquitana', marca: 'Faena', categoria: 'botas',
  genero: 'hombre', precio: 575, color: 'Miel',
  descripcion: 'Puntera de acero, suela dieléctrica y cuero engrasado.',
  stock: { 39: 3, 40: 5, 41: 6, 42: 5 },   // pares por talla
  imagen: 'img/bota.svg', nuevo: false,
}
```

- `precioAnterior` (opcional) activa la etiqueta de oferta con el % de descuento.
- Una talla con `0` pares se oculta del filtro; si todas están en `0`, el modelo aparece como **Agotado**.
- El número de WhatsApp y la dirección están en `tienda`, al inicio del mismo archivo.

Las pruebas verifican que los datos sean válidos (códigos únicos, categorías existentes, precios y tallas correctos, imágenes presentes), así que un error al cargar productos se detecta antes de publicar.

## 🗺️ Roadmap

- [x] Catálogo con datos de ejemplo, etiquetas de oferta/nuevo/agotado y diseño responsive
- [x] Filtros por categoría, género y talla, búsqueda y orden, con estado en la URL
- [ ] Ficha de producto con galería y selección de talla
- [ ] Pedido por WhatsApp con mensaje armado (modelo, talla, color y precio)
- [ ] Carrito de varios pares y total en Bs
- [ ] Panel de filtros plegable en celulares
- [ ] Publicación en GitHub Pages y SEO local (datos estructurados de la tienda)

## 📄 Licencia

[MIT](LICENSE) © 2026 Angel Emanuel Lecaro Quispe
