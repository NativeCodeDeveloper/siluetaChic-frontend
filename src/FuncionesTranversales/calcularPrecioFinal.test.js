/**
 * Tests para calcularPrecioFinal
 * Ejecutar con: node src/FuncionesTranversales/calcularPrecioFinal.test.js
 *
 * Precios de referencia tomados de DEPILACION.xlsx (columnas PROMOCION)
 */

const CATEGORIA_MUJER = 49;
const CATEGORIA_HOMBRE = 48;
const SUBCATEGORIAS_SOLO_UNA_SESION = [24, 26];

const PRECIOS_PROMOCION = {
    [CATEGORIA_MUJER]: {
        31: { 3: 19990, 6: 29990 },
        32: { 3: 24990, 6: 39990 },
        33: { 3: 29990, 6: 49990 },
        34: { 3: 39990, 6: 59990 },
    },
    [CATEGORIA_HOMBRE]: {
        38: { 3: 24990, 6: 39990 },
        39: { 3: 34990, 6: 49990 },
        40: { 3: 49990, 6: 69990 },
        41: { 3: 59990, 6: 84990 },
    },
};

function esSoloUnaSesion(producto) {
    if (!producto) return false;
    return (
        producto.categoriaProducto === CATEGORIA_MUJER &&
        SUBCATEGORIAS_SOLO_UNA_SESION.includes(producto.subcategoria)
    );
}

function calcularPrecioFinal(producto, sesiones) {
    if (!producto || typeof producto !== 'object') return 0;
    const valorBase = Number(producto.valorProducto);
    if (isNaN(valorBase) || valorBase <= 0) return 0;

    let numSesiones = Number(sesiones);
    if (![1, 3, 6].includes(numSesiones)) numSesiones = 1;
    if (esSoloUnaSesion(producto)) numSesiones = 1;
    if (numSesiones === 1) return valorBase;

    const precioFijo = PRECIOS_PROMOCION[producto.categoriaProducto]?.[producto.subsubcategoria]?.[numSesiones];
    if (precioFijo != null) return precioFijo;

    return valorBase * numSesiones;
}

// --- Test runner ---
let passed = 0;
let failed = 0;

function assert(desc, actual, expected) {
    if (actual === expected) {
        console.log(`  PASS: ${desc} => $${actual.toLocaleString('es-CL')}`);
        passed++;
    } else {
        console.error(`  FAIL: ${desc} => got $${actual.toLocaleString('es-CL')}, expected $${expected.toLocaleString('es-CL')}`);
        failed++;
    }
}

// ======== MUJER ========

console.log('\n=== Mujer XS (subsubcategoria=31, base=$13.000) ===');
const mujerXS = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 31, valorProducto: 13000 };
assert('1 sesión', calcularPrecioFinal(mujerXS, 1), 13000);
assert('3 sesiones', calcularPrecioFinal(mujerXS, 3), 19990);
assert('6 sesiones', calcularPrecioFinal(mujerXS, 6), 29990);

console.log('\n=== Mujer S (subsubcategoria=32, base=$16.000) ===');
const mujerS = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 32, valorProducto: 16000 };
assert('1 sesión', calcularPrecioFinal(mujerS, 1), 16000);
assert('3 sesiones', calcularPrecioFinal(mujerS, 3), 24990);
assert('6 sesiones', calcularPrecioFinal(mujerS, 6), 39990);

console.log('\n=== Mujer M (subsubcategoria=33, base=$22.000) ===');
const mujerM = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 33, valorProducto: 22000 };
assert('1 sesión', calcularPrecioFinal(mujerM, 1), 22000);
assert('3 sesiones', calcularPrecioFinal(mujerM, 3), 29990);
assert('6 sesiones', calcularPrecioFinal(mujerM, 6), 49990);

console.log('\n=== Mujer L (subsubcategoria=34, base=$30.000) ===');
const mujerL = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 34, valorProducto: 30000 };
assert('1 sesión', calcularPrecioFinal(mujerL, 1), 30000);
assert('3 sesiones', calcularPrecioFinal(mujerL, 3), 39990);
assert('6 sesiones', calcularPrecioFinal(mujerL, 6), 59990);

// ======== HOMBRE ========

console.log('\n=== Hombre XS (subsubcategoria=38, base=$15.000) ===');
const hombreXS = { categoriaProducto: 48, subcategoria: 23, subsubcategoria: 38, valorProducto: 15000 };
assert('1 sesión', calcularPrecioFinal(hombreXS, 1), 15000);
assert('3 sesiones', calcularPrecioFinal(hombreXS, 3), 24990);
assert('6 sesiones', calcularPrecioFinal(hombreXS, 6), 39990);

console.log('\n=== Hombre S (subsubcategoria=39, base=$20.000) ===');
const hombreS = { categoriaProducto: 48, subcategoria: 23, subsubcategoria: 39, valorProducto: 20000 };
assert('1 sesión', calcularPrecioFinal(hombreS, 1), 20000);
assert('3 sesiones', calcularPrecioFinal(hombreS, 3), 34990);
assert('6 sesiones', calcularPrecioFinal(hombreS, 6), 49990);

console.log('\n=== Hombre M (subsubcategoria=40, base=$28.000) ===');
const hombreM = { categoriaProducto: 48, subcategoria: 23, subsubcategoria: 40, valorProducto: 28000 };
assert('1 sesión', calcularPrecioFinal(hombreM, 1), 28000);
assert('3 sesiones', calcularPrecioFinal(hombreM, 3), 49990);
assert('6 sesiones', calcularPrecioFinal(hombreM, 6), 69990);

console.log('\n=== Hombre L (subsubcategoria=41, base=$36.000) ===');
const hombreL = { categoriaProducto: 48, subcategoria: 23, subsubcategoria: 41, valorProducto: 36000 };
assert('1 sesión', calcularPrecioFinal(hombreL, 1), 36000);
assert('3 sesiones', calcularPrecioFinal(hombreL, 3), 59990);
assert('6 sesiones', calcularPrecioFinal(hombreL, 6), 84990);

// ======== FORZAR 1 SESIÓN ========

console.log('\n=== Mujer subcategoria=26 (forzar 1 sesión) ===');
const mujerPromo26 = { categoriaProducto: 49, subcategoria: 26, subsubcategoria: 31, valorProducto: 80000 };
assert('pide 3 pero fuerza 1', calcularPrecioFinal(mujerPromo26, 3), 80000);
assert('pide 6 pero fuerza 1', calcularPrecioFinal(mujerPromo26, 6), 80000);
assert('esSoloUnaSesion=true', esSoloUnaSesion(mujerPromo26), true);

console.log('\n=== Mujer subcategoria=24 (forzar 1 sesión) ===');
const mujerSubcat24 = { categoriaProducto: 49, subcategoria: 24, subsubcategoria: 32, valorProducto: 50000 };
assert('pide 6 pero fuerza 1', calcularPrecioFinal(mujerSubcat24, 6), 50000);
assert('esSoloUnaSesion=true', esSoloUnaSesion(mujerSubcat24), true);

// ======== INPUTS INVÁLIDOS ========

console.log('\n=== Inputs inválidos ===');
assert('producto null', calcularPrecioFinal(null, 3), 0);
assert('valorProducto NaN', calcularPrecioFinal({ categoriaProducto: 49, valorProducto: 'abc' }, 3), 0);
assert('sesiones inválidas (5) => usa 1', calcularPrecioFinal(mujerXS, 5), 13000);

// ======== FALLBACK (sin tabla) ========

console.log('\n=== Fallback: categoria/zona sin tabla ===');
const productoSinTabla = { categoriaProducto: 99, subcategoria: 1, subsubcategoria: 999, valorProducto: 10000 };
assert('sin tabla => base * sesiones', calcularPrecioFinal(productoSinTabla, 3), 30000);

console.log(`\n=== Resultado: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) process.exit(1);
