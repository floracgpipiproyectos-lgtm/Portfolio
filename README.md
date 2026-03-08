# 🚀 Portfolio Web Interactivo

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Descripción General

Este es el repositorio del **portfolio personal** de Florencia Antonella Caminos Garcia, desarrollado con tecnologías web modernas. El proyecto incluye una página de presentación profesional, navegación entre mini-proyectos y una aplicación React completa.

---

## 📁 Estructura del Proyecto

```
Portfolio/
├── index.html                 # Página principal del portfolio
├── style.scss                 # Estilos SCSS
├── style.css                  # Estilos compilados
├── script.js                  # JavaScript principal (JSDoc)
├── README.md                  # Documentación principal
├── style.css.map              # Mapa de estilos SCSS
├── Imagenes/
│   └── Foto_Profesional.png   # Foto de perfil
├── PROYECTOS/
│   ├── proyecto1.html         # App del Clima
│   ├── proyecto2.html         # Calculadora
│   ├── proyecto3.html         # To-Do List
│   ├── proyecto4.html        # E-commerce
│   └── proyecto5.html        # Juego/Más proyectos
├── SCRIPTS/
│   ├── proyecto1.js          # Lógica Weather App
│   ├── proyecto2.js          # Lógica Calculadora
│   ├── proyecto3.js          # Lógica To-Do List
│   ├── proyecto4.js          # Lógica E-commerce
│   └── proyecto5.js          # Lógica Juego
└── REACT/
    └── todo-app/             # Aplicación React completa
        ├── package.json
        ├── public/
        │   └── index.html
        └── src/
            ├── index.js       # Entry point con JSDoc
            ├── App.js         # Componente principal
            ├── index.css      # Estilos de la app
            └── README.md      # Documentación React
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **HTML5** | - | Estructura semántica del sitio |
| **CSS3** | - | Estilos modernos y animaciones |
| **Sass/SCSS** | - | Preprocesador CSS con variables y mixins |
| **JavaScript (ES6+)** | - | Lógica de interactividad |
| **React** | 18.2.0 | Framework JavaScript para la app |
| **Bootstrap** | 5.3.2 | Framework CSS para diseño responsivo |
| **Tailwind CSS** | 3.x | Framework CSS utilitario |

---

## 📖 Documentación por Archivo

### 1. `index.html` - Página Principal

#### Estructura del Documento

| Sección | Descripción |
|---------|-------------|
| **Navbar** | Navegación fija con Bootstrap |
| **Header** | Foto de perfil, nombre y disponibilidad |
| **About** | Biografía y aspiraciones profesionales |
| **Skills** | Habilidades técnicas (badges) |
| **Projects** | Galería de proyectos con navegación |
| **Activity** | GitHub actividad reciente |
| **Contact** | Enlaces a redes sociales |

#### Funcionalidades

- Diseño responsivo con Bootstrap
- Tema oscuro/claro (toggle)
- Navegación entre proyectos con flechas
- Integración con Google Fonts y Material Symbols

---

### 2. `style.scss` - Estilos SCSS

#### Variables Definidas

```scss
// Paleta de colores
$colors: (
  'bg-primary': #f8f5f0,      // Fondo principal
  'bg-card': #ffffff,          // Fondo tarjeta
  'text-primary': #2c2c2c,     // Texto principal
  'text-secondary': #5c5c5c,   // Texto secundario
  'accent': #b8a9a9,           // Color de acento
  ...
);

// Espaciado
$spacing: (
  'xs': 8px,
  'sm': 16px,
  'md': 24px,
  'lg': 32px,
  'xl': 48px,
  '2xl': 64px
);

// Radios de bordes
$radius: (
  'sm': 12px,
  'md': 16px,
  'lg': 24px,
  'full': 100px
);
```

#### Mixins Personalizados

| Mixin | Descripción |
|-------|-------------|
| `@mixin flex-center` | Centra elementos con flexbox |
| `@mixin flex-between` | Distribuye con space-between |
| `@mixin transition` | Transición base |
| `@mixin hover-lift` | Efecto hover con elevación |

#### Componentes Estilizados

1. **Card Principal** - Contenedor principal del portfolio
2. **Header** - Foto de perfil y acciones
3. **Tipografía** - Encabezados h1-h4
4. **Tech Stack** - Badges de tecnologías
5. **Proyectos** - Grid de tarjetas
6. **Actividad** - Lista de actividad GitHub
7. **Contacto** - Enlaces sociales

#### Animaciones Definidas

```scss
@keyframes pulse {
  // Animación de pulso para indicador de disponibilidad
}

@keyframes fadeIn {
  // Animación de entrada suave
}
```

---

### 3. `script.js` - JavaScript Principal

#### Namespace Principal: `Portfolio`

```javascript
const Portfolio = (function() { ... })();
```

#### Constantes Privadas

| Constante | Tipo | Descripción |
|-----------|------|-------------|
| `TYPEWRITER_SPEED` | number | Velocidad de escritura (100ms) |
| `ERASE_SPEED` | number | Velocidad de borrado (50ms) |
| `HEART_COLORS` | string[] | Colores para corazones flotantes |
| `FLOATING_HEARTS_COUNT` | number | Cantidad de corazones (5) |
| `INTERSECTION_THRESHOLD` | number | Threshold para observer (0.1) |

#### Funciones Privadas

##### `createFloatingHearts(element)`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `element` | HTMLElement | Elemento sobre el cual crear corazones |

**Descripción**: Crea 5 elementos de corazón que flotan hacia arriba con animaciones aleatorias.

**Proceso**:
1. Obtiene la posición del elemento
2. Crea 5 elementos span con emoji ❤️
3. Los posiciona cerca del elemento
4. Anima su movimiento hacia arriba y rotación
5. Los elimina del DOM después de 1 segundo

---

##### `handleHeartClick()`

**Descripción**: Maneja el evento click en el corazón de favoritos.

**Acciones**:
1. Alterna el color entre rojo y gris
2. Aplica efecto de escala (1.5x)
3. Llama a `createFloatingHearts()` para efecto visual

---

##### `typeWriter(title, text, i)`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `title` | HTMLElement | Elemento donde escribir |
| `text` | string | Texto completo a escribir |
| `i` | number | Índice actual |

**Descripción**: Efecto recursivo de máquina de escribir que escribe carácter por carácter.

---

##### `eraseText(title, text, i)`

**Descripción**: Efecto de borrado inverso ( cíclico con typeWriter).

---

##### `initTypeWriter()`

**Descripción**: Inicializa el efecto typewriter en el elemento h2 de la página.

---

##### `initCardHoverEffects()`

**Descripción**: Añade event listeners a todas las tarjetas de proyecto para efectos hover.

---

##### `initSmoothScroll()`

**Descripción**: Configura scroll suave para todos los enlaces que начинаются con "#".

---

##### `initIntersectionObserver()`

**Descripción**: Configura IntersectionObserver para animaciones de entrada cuando los elementos entran en viewport.

---

##### `initHeartEffect()`

**Descripción**: Inicializa el efecto del corazón buscando `.favorite-icon`.

---

#### API Pública

| Función | Descripción |
|---------|-------------|
| `Portfolio.init()` | Inicializa todas las funcionalidades |
| `Portfolio.destroy()` | Limpia event listeners y observers |

#### Namespace: `PortfolioUtils`

Funciones de utilidad adicionales:

##### `formatDate(date, locale)`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `date` | Date | Fecha a formatear |
| `locale` | string | Locale (default: 'es-ES') |

**Retorna**: String con la fecha formateada

---

##### `debounce(func, wait)`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `func` | Function | Función a debounce |
| `wait` | number | Tiempo de espera en ms |

**Retorna**: Función con debounce aplicado

---

##### `getRandomInt(min, max)`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `min` | number | Valor mínimo |
| `max` | number | Valor máximo |

**Retorna**: Número aleatorio entre min y max (inclusive)

---

### 4. Aplicación React (`REACT/todo-app/`)

#### `src/index.js` - Punto de Entrada

```javascript
/**
 * @function Root
 * @description Componente raíz que inicializa la aplicación React
 * @returns {void}
 * 
 * Utiliza ReactDOM.createRoot para rendering asíncrono
 * wrap con React.StrictMode para validación en desarrollo
 */
```

