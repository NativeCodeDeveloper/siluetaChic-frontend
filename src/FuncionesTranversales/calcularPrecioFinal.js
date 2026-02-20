// Categorías de sexo
const CATEGORIA_MUJER = 49;
const CATEGORIA_HOMBRE = 48;

// Subcategorías que fuerzan 1 sola sesión (mujer)
const SUBCATEGORIAS_SOLO_UNA_SESION = [24, 26];

// TODO: Los multiplicadores están expresados como fracción decimal (0.x).
// Si el negocio los define como porcentaje (51.25%), dividir por 100 antes de usar.
// Por defecto se implementan como fracción: 0.5125 = el precio por sesión es 51.25% del base.

// Tabla de multiplicadores: categoria -> subsubcategoria -> sesiones -> multiplicador
const TABLA_MULTIPLICADORES = {
    [CATEGORIA_MUJER]: {
        31: { 3: 0.5125, 6: 0.3844 },  // XS
        32: { 3: 0.5206, 6: 0.4165 },  // S
        33: { 3: 0.4543, 6: 0.3787 },  // M
        34: { 3: 0.4443, 6: 0.3332 },  // L
    },
    [CATEGORIA_HOMBRE]: {
        38: { 3: 0.5550, 6: 0.4443 },  // XS
        39: { 3: 0.5830, 6: 0.4166 },  // S
        40: { 3: 0.5950, 6: 0.4170 },  // M
        41: { 3: 0.5550, 6: 0.3930 },  // L
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
 * Calcula el precio final por sesión según producto y cantidad de sesiones.
 *
 * @param {Object} producto - Objeto con categoriaProducto, subcategoria, subsubcategoria, valorProducto
 * @param {number|string} sesiones - 1, 3 o 6
 * @returns {number} Precio final total (precio_por_sesion * sesiones)
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

    // Buscar multiplicador en la tabla
    const categoria = producto.categoriaProducto;
    const subsubcategoria = producto.subsubcategoria;

    const tablaCategoria = TABLA_MULTIPLICADORES[categoria];
    if (!tablaCategoria) {
        console.warn('[calcularPrecioFinal] Sin tabla para categoría:', categoria, '— usando precio base * sesiones');
        return valorBase * numSesiones;
    }

    const tablaZona = tablaCategoria[subsubcategoria];
    if (!tablaZona) {
        console.warn('[calcularPrecioFinal] Sin tabla para subsubcategoria:', subsubcategoria, '— usando precio base * sesiones');
        return valorBase * numSesiones;
    }

    const multiplicador = tablaZona[numSesiones];
    if (multiplicador == null) {
        console.warn('[calcularPrecioFinal] Sin multiplicador para', numSesiones, 'sesiones — usando precio base * sesiones');
        return valorBase * numSesiones;
    }

    // Precio por sesión con descuento * cantidad de sesiones
    const precioPorSesion = Math.round(valorBase * multiplicador);
    return precioPorSesion * numSesiones;
}

export { SUBCATEGORIAS_SOLO_UNA_SESION, SESIONES_VALIDAS, TABLA_MULTIPLICADORES };
