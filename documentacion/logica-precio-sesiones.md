# Logica de Precio Final por Sexo, Zona y Sesiones

## Contexto

La pagina de detalle de producto (`src/app/(public)/producto/[id]/page.jsx`) necesitaba calcular el precio final aplicando descuentos por volumen de sesiones (3 o 6), diferenciados segun el sexo del cliente (categoria) y la zona corporal (subsubcategoria).

Anteriormente el calculo era simplemente `valorProducto * cantidadSesiones`, sin ningun descuento.

---

## Archivos involucrados

| Archivo | Accion | Proposito |
|---|---|---|
| `src/FuncionesTranversales/calcularPrecioFinal.js` | Creado | Funcion pura + tabla de precios promocionales |
| `src/FuncionesTranversales/calcularPrecioFinal.test.js` | Creado | 33 tests ejecutables con Node |
| `src/app/(public)/producto/[id]/page.jsx` | Modificado | Integracion de la nueva logica en la UI |

---

## Arquitectura de la solucion

### 1. Tabla de precios fijos promocionales

Se usan los **precios totales fijos** directamente del Excel (`DEPILACION.xlsx`, columnas PROMOCION), en vez de multiplicadores aproximados. Esto garantiza que los precios cuadren al peso exacto con la planilla del negocio.

```javascript
const PRECIOS_PROMOCION = {
    49: {  // MUJER
        31: { 3: 19990, 6: 29990 },  // XS (base: $13.000)
        32: { 3: 24990, 6: 39990 },  // S  (base: $16.000)
        33: { 3: 29990, 6: 49990 },  // M  (base: $22.000)
        34: { 3: 39990, 6: 59990 },  // L  (base: $30.000)
    },
    48: {  // HOMBRE
        38: { 3: 24990, 6: 39990 },  // XS (base: $15.000)
        39: { 3: 34990, 6: 49990 },  // S  (base: $20.000)
        40: { 3: 49990, 6: 69990 },  // M  (base: $28.000)
        41: { 3: 59990, 6: 84990 },  // L  (base: $36.000)
    },
};
```

**Por que precios fijos y no multiplicadores?**

Los precios del negocio terminan en cifras comerciales ($X9.990). Usando multiplicadores con 4 decimales, las diferencias por redondeo llegaban hasta $102 en algunas zonas (Hombre L, 6 sesiones). Los precios fijos eliminan ese problema y coinciden exactamente con el Excel.

### 2. Funcion `calcularPrecioFinal(producto, sesiones)`

Es una funcion pura (sin efectos secundarios) que:

1. **Valida inputs**: si el producto es nulo o `valorProducto` no es numerico, retorna 0
2. **Normaliza sesiones**: si el valor no es 1, 3 o 6, lo fuerza a 1
3. **Fuerza 1 sesion** para mujer subcategoria 24 o 26 (regla de negocio)
4. **Si sesiones = 1**: retorna `valorProducto` sin descuento
5. **Si sesiones = 3 o 6**: busca el precio fijo en la tabla
6. **Fallback**: si no encuentra la combinacion en la tabla, retorna `valorProducto * sesiones` (sin descuento) y emite un `console.warn`

Ejemplo concreto - Mujer zona XS, 3 sesiones:

```
valorProducto = $13.000
precioFinal = $19.990 (precio fijo de la tabla)
```

Vs. el precio sin descuento: `$13.000 * 3 = $39.000`

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
// => precio fijo promocional de la tabla, o valorProducto si es 1 sesion
```

---

## Tabla completa de precios (referencia Excel)

### Mujer (categoriaProducto = 49)

| Zona | Subsubcat | Base 1 ses | Total 3 ses | Total 6 ses |
|------|-----------|------------|-------------|-------------|
| XS   | 31        | $13.000    | $19.990     | $29.990     |
| S    | 32        | $16.000    | $24.990     | $39.990     |
| M    | 33        | $22.000    | $29.990     | $49.990     |
| L    | 34        | $30.000    | $39.990     | $59.990     |

### Hombre (categoriaProducto = 48)

| Zona | Subsubcat | Base 1 ses | Total 3 ses | Total 6 ses |
|------|-----------|------------|-------------|-------------|
| XS   | 38        | $15.000    | $24.990     | $39.990     |
| S    | 39        | $20.000    | $34.990     | $49.990     |
| M    | 40        | $28.000    | $49.990     | $69.990     |
| L    | 41        | $36.000    | $59.990     | $84.990     |

---

## Tests

Archivo: `src/FuncionesTranversales/calcularPrecioFinal.test.js`

Ejecutar con:

```bash
node src/FuncionesTranversales/calcularPrecioFinal.test.js
```

### Casos cubiertos (33 tests)

| Grupo | Caso | Sesiones | Precio esperado |
|---|---|---|---|
| Mujer XS | base $13.000 | 1 | $13.000 |
| Mujer XS | | 3 | $19.990 |
| Mujer XS | | 6 | $29.990 |
| Mujer S | base $16.000 | 1 | $16.000 |
| Mujer S | | 3 | $24.990 |
| Mujer S | | 6 | $39.990 |
| Mujer M | base $22.000 | 1 | $22.000 |
| Mujer M | | 3 | $29.990 |
| Mujer M | | 6 | $49.990 |
| Mujer L | base $30.000 | 1 | $30.000 |
| Mujer L | | 3 | $39.990 |
| Mujer L | | 6 | $59.990 |
| Hombre XS | base $15.000 | 1 | $15.000 |
| Hombre XS | | 3 | $24.990 |
| Hombre XS | | 6 | $39.990 |
| Hombre S | base $20.000 | 1 | $20.000 |
| Hombre S | | 3 | $34.990 |
| Hombre S | | 6 | $49.990 |
| Hombre M | base $28.000 | 1 | $28.000 |
| Hombre M | | 3 | $49.990 |
| Hombre M | | 6 | $69.990 |
| Hombre L | base $36.000 | 1 | $36.000 |
| Hombre L | | 3 | $59.990 |
| Hombre L | | 6 | $84.990 |
| Forzar 1 ses | Mujer subcat 26 pide 3 | forzado a 1 | $80.000 |
| Forzar 1 ses | Mujer subcat 26 pide 6 | forzado a 1 | $80.000 |
| Forzar 1 ses | esSoloUnaSesion subcat 26 | - | true |
| Forzar 1 ses | Mujer subcat 24 pide 6 | forzado a 1 | $50.000 |
| Forzar 1 ses | esSoloUnaSesion subcat 24 | - | true |
| Invalidos | producto null | 3 | $0 |
| Invalidos | valorProducto NaN | 3 | $0 |
| Invalidos | sesiones = 5 | forzado a 1 | $13.000 |
| Fallback | sin tabla (cat 99) | 3 | base * 3 |

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

---

## Cambio de multiplicadores a precios fijos

Inicialmente se implementaron multiplicadores porcentuales (ej: `0.5125`). Al validar contra el Excel, se detectaron diferencias de hasta $102 por errores de redondeo y precision. Se reemplazo por precios fijos totales del Excel, que cuadran al peso exacto.

Si en el futuro se necesita volver a multiplicadores, usar al menos 10 decimales y la formula `Math.round(valorProducto * multiplicador * sesiones)` para evitar redondeo intermedio.
