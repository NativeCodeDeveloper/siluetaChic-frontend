// Categorías de sexo
const CATEGORIA_MUJER = 49;
const CATEGORIA_HOMBRE = 48;

// Subcategorías que fuerzan 1 sola sesión (mujer)
const SUBCATEGORIAS_SOLO_UNA_SESION = [24, 26];

// Precios promocionales TOTALES fijos por zona y sesiones.
// Fuente: DEPILACION.xlsx (hojas MUJER y HOMBRE, columnas PROMOCION).
// Estructura: categoria -> subsubcategoria -> sesiones -> precio total fijo
const PRECIOS_PROMOCION = {
    [CATEGORIA_MUJER]: {
        // XS — base normal: $13.000
        31: { 3: 19990, 6: 29990 },
        // S — base normal: $16.000
        32: { 3: 24990, 6: 39990 },
        // M — base normal: $22.000
        33: { 3: 29990, 6: 49990 },
        // L — base normal: $30.000
        34: { 3: 39990, 6: 59990 },
    },
    [CATEGORIA_HOMBRE]: {
        // XS — base normal: $15.000
        38: { 3: 24990, 6: 39990 },
        // S — base normal: $20.000
        39: { 3: 34990, 6: 49990 },
        // M — base normal: $28.000
        40: { 3: 49990, 6: 69990 },
        // L — base normal: $36.000
        41: { 3: 59990, 6: 84990 },
    },
};

const SESIONES_VALIDAS = [1, 3, 6];

/**
 * Determina si un producto solo permite 1 sesión (mujer subcat 24 o 26).
 */
export function esSoloUnaSesion(producto) {
    if (!producto) return false;
    return (
        producto.categoriaProducto === CATEGORIA_MUJER &&
        SUBCATEGORIAS_SOLO_UNA_SESION.includes(producto.subcategoria)
    );
}

/**
 * Calcula el precio final total según producto y cantidad de sesiones.
 *
 * - 1 sesión: retorna valorProducto (sin descuento)
 * - 3 o 6 sesiones: busca el precio fijo promocional en la tabla
 * - Fallback: valorProducto * sesiones (sin descuento) si no hay precio fijo
 *
 * @param {Object} producto - Objeto con categoriaProducto, subcategoria, subsubcategoria, valorProducto
 * @param {number|string} sesiones - 1, 3 o 6
 * @returns {number} Precio final total
 */
export function calcularPrecioFinal(producto, sesiones) {
    if (!producto || typeof producto !== 'object') {
        console.warn('[calcularPrecioFinal] Producto inválido:', producto);
        return 0;
    }

    const valorBase = Number(producto.valorProducto);
    if (isNaN(valorBase) || valorBase <= 0) {
        console.warn('[calcularPrecioFinal] valorProducto inválido:', producto.valorProducto);
        return 0;
    }

    let numSesiones = Number(sesiones);
    if (!SESIONES_VALIDAS.includes(numSesiones)) {
        numSesiones = 1;
    }

    // Si es mujer subcat 24 o 26 => forzar 1 sesión
    if (esSoloUnaSesion(producto)) {
        numSesiones = 1;
    }

    // 1 sesión => precio base sin descuento
    if (numSesiones === 1) {
        return valorBase;
    }

    // Buscar precio fijo promocional en la tabla
    const categoria = producto.categoriaProducto;
    const subsubcategoria = producto.subsubcategoria;

    const precioFijo = PRECIOS_PROMOCION[categoria]?.[subsubcategoria]?.[numSesiones];

    if (precioFijo != null) {
        return precioFijo;
    }

    // Fallback: sin tabla de precios, cobrar precio base * sesiones
    console.warn('[calcularPrecioFinal] Sin precio promocional para cat:', categoria, 'subsubcat:', subsubcategoria, 'ses:', numSesiones, '— usando precio base * sesiones');
    return valorBase * numSesiones;
}

export { SUBCATEGORIAS_SOLO_UNA_SESION, SESIONES_VALIDAS, PRECIOS_PROMOCION };
