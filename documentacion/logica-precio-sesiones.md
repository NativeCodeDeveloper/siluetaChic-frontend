# Logica de Precio Final por Sexo, Zona y Sesiones

## Contexto

La pagina de detalle de producto (`src/app/(public)/producto/[id]/page.jsx`) necesitaba calcular el precio final aplicando descuentos por volumen de sesiones (3 o 6), diferenciados segun el sexo del cliente (categoria) y la zona corporal (subsubcategoria).

Anteriormente el calculo era simplemente `valorProducto * cantidadSesiones`, sin ningun descuento.

---

## Archivos involucrados

| Archivo | Accion | Proposito |
|---|---|---|
| `src/FuncionesTranversales/calcularPrecioFinal.js` | Creado | Funcion pura + tabla de multiplicadores |
| `src/FuncionesTranversales/calcularPrecioFinal.test.js` | Creado | 16 tests ejecutables con Node |
| `src/app/(public)/producto/[id]/page.jsx` | Modificado | Integracion de la nueva logica en la UI |

---

## Arquitectura de la solucion

### 1. Tabla de multiplicadores (mapping)

Se definio un objeto plano que mapea `categoria -> subsubcategoria -> sesiones -> multiplicador`:

```javascript
const TABLA_MULTIPLICADORES = {
    49: {  // MUJER
        31: { 3: 0.5125, 6: 0.3844 },  // XS
        32: { 3: 0.5206, 6: 0.4165 },  // S
        33: { 3: 0.4543, 6: 0.3787 },  // M
        34: { 3: 0.4443, 6: 0.3332 },  // L
    },
    48: {  // HOMBRE
        38: { 3: 0.5550, 6: 0.4443 },  // XS
        39: { 3: 0.5830, 6: 0.4166 },  // S
        40: { 3: 0.5950, 6: 0.4170 },  // M
        41: { 3: 0.5550, 6: 0.3930 },  // L
    },
};
```

**Por que un objeto y no ifs?** Es mas facil de mantener. Agregar una nueva zona o cambiar un multiplicador es editar un solo numero en la tabla, sin tocar logica.

### 2. Funcion `calcularPrecioFinal(producto, sesiones)`

Es una funcion pura (sin efectos secundarios) que:

1. **Valida inputs**: si el producto es nulo o `valorProducto` no es numerico, retorna 0
2. **Normaliza sesiones**: si el valor no es 1, 3 o 6, lo fuerza a 1
3. **Fuerza 1 sesion** para mujer subcategoria 24 o 26 (regla de negocio)
4. **Si sesiones = 1**: retorna `valorProducto` sin descuento
5. **Si sesiones = 3 o 6**: busca el multiplicador en la tabla
6. **Fallback**: si no encuentra la combinacion en la tabla, retorna `valorProducto * sesiones` (precio sin descuento) y emite un `console.warn`

**Formula del precio final:**

```
precioFinal = Math.round(valorProducto * multiplicador) * cantidadSesiones
```

Ejemplo concreto - Mujer zona XS, 3 sesiones, valor base $100.000:

```
precioPorSesion = Math.round(100000 * 0.5125) = $51.250
precioFinal = 51.250 * 3 = $153.750
```

Vs. el precio sin descuento: `100.000 * 3 = $300.000`

### 3. Funcion `esSoloUnaSesion(producto)`

Retorna `true` cuando el producto es mujer (`categoriaProducto === 49`) y su `subcategoria` es 24 o 26. Se usa tanto dentro de `calcularPrecioFinal` como en el componente React para deshabilitar el selector de sesiones.

---

## Integracion en el componente React

### Estado nuevo

```javascript
const [precioFinal, setPrecioFinal] = useState(0);
```

### Derivacion

```javascript
const soloUnaSesion = esSoloUnaSesion(producto);
```

### Efectos agregados

**Forzar sesiones a 1 cuando corresponde:**

```javascript
useEffect(() => {
    if (soloUnaSesion && cantidadSesiones !== '1') {
        setcantidadSesiones('1');
    }
}, [soloUnaSesion, cantidadSesiones]);
```

**Recalcular precio al cambiar producto o sesiones:**

```javascript
useEffect(() => {
    const precio = calcularPrecioFinal(producto, cantidadSesiones);
    setPrecioFinal(precio);
}, [producto, cantidadSesiones]);
```

### Selector de sesiones

El `<Select>` de sesiones se deshabilita completamente y las opciones 3 y 6 se marcan como `disabled` cuando `soloUnaSesion === true`:

```jsx
<Select disabled={soloUnaSesion} ...>
    <SelectItem value="1">1</SelectItem>
    <SelectItem value="3" disabled={soloUnaSesion}>3</SelectItem>
    <SelectItem value="6" disabled={soloUnaSesion}>6</SelectItem>
</Select>
```

### Display del precio

Antes:

```javascript
calcularPrecio(producto.valorProducto, cantidadSesiones)
// => valorProducto * sesiones (sin descuento)
```

Despues:

```javascript
precioFinal
// => valorProducto * multiplicador * sesiones (con descuento segun tabla)
```

---

## Nota sobre los multiplicadores

Los multiplicadores estan expresados como fraccion decimal. Por ejemplo `0.5125` significa que el precio por sesion es el 51.25% del valor base.

Si en el futuro el negocio define los multiplicadores como porcentaje entero (ej: `51.25`), se debe dividir por 100 antes de usarlos. Hay un `TODO` en el codigo fuente marcando esto.

---

## Tests

Archivo: `src/FuncionesTranversales/calcularPrecioFinal.test.js`

Ejecutar con:

```bash
node src/FuncionesTranversales/calcularPrecioFinal.test.js
```

### Casos cubiertos (16 tests)

| Caso | Sesiones | Resultado esperado |
|---|---|---|
| Mujer XS (31) | 1 | valorProducto |
| Mujer XS (31) | 3 | `round(100000 * 0.5125) * 3 = 153750` |
| Mujer XS (31) | 6 | `round(100000 * 0.3844) * 6 = 230640` |
| Mujer L (34) | 1 | valorProducto |
| Mujer L (34) | 6 | `round(200000 * 0.3332) * 6 = 399840` |
| Hombre M (40) | 1 | valorProducto |
| Hombre M (40) | 3 | `round(150000 * 0.5950) * 3 = 267750` |
| Hombre M (40) | 6 | `round(150000 * 0.4170) * 6 = 375300` |
| Mujer subcat 26 | 3 | forzado a 1 sesion = valorProducto |
| Mujer subcat 26 | 6 | forzado a 1 sesion = valorProducto |
| Mujer subcat 26 | esSoloUnaSesion | true |
| Mujer subcat 24 | 6 | forzado a 1 sesion = valorProducto |
| Mujer subcat 24 | esSoloUnaSesion | true |
| Producto null | 3 | 0 |
| valorProducto NaN | 3 | 0 |
| Sesiones invalidas (5) | 5 | fallback a 1 sesion = valorProducto |

---

## Resumen de IDs de referencia

| Concepto | ID |
|---|---|
| Categoria Mujer | 49 |
| Categoria Hombre | 48 |
| Subcategoria solo 1 sesion (mujer) | 24, 26 |
| Mujer XS | subsubcategoria 31 |
| Mujer S | subsubcategoria 32 |
| Mujer M | subsubcategoria 33 |
| Mujer L | subsubcategoria 34 |
| Hombre XS | subsubcategoria 38 |
| Hombre S | subsubcategoria 39 |
| Hombre M | subsubcategoria 40 |
| Hombre L | subsubcategoria 41 |
