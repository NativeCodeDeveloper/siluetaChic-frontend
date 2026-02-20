/**
 * Tests para calcularPrecioFinal
 * Ejecutar con: node src/FuncionesTranversales/calcularPrecioFinal.test.js
 */

// Reimport manual para poder ejecutar con Node sin bundler
const CATEGORIA_MUJER = 49;
const CATEGORIA_HOMBRE = 48;
const SUBCATEGORIAS_SOLO_UNA_SESION = [24, 26];

const TABLA_MULTIPLICADORES = {
    [CATEGORIA_MUJER]: {
        31: { 3: 0.5125, 6: 0.3844 },
        32: { 3: 0.5206, 6: 0.4165 },
        33: { 3: 0.4543, 6: 0.3787 },
        34: { 3: 0.4443, 6: 0.3332 },
    },
    [CATEGORIA_HOMBRE]: {
        38: { 3: 0.5550, 6: 0.4443 },
        39: { 3: 0.5830, 6: 0.4166 },
        40: { 3: 0.5950, 6: 0.4170 },
        41: { 3: 0.5550, 6: 0.3930 },
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

    const tablaCategoria = TABLA_MULTIPLICADORES[producto.categoriaProducto];
    if (!tablaCategoria) return valorBase * numSesiones;
    const tablaZona = tablaCategoria[producto.subsubcategoria];
    if (!tablaZona) return valorBase * numSesiones;
    const multiplicador = tablaZona[numSesiones];
    if (multiplicador == null) return valorBase * numSesiones;

    return Math.round(valorBase * multiplicador) * numSesiones;
}

// --- Test runner ---
let passed = 0;
let failed = 0;

function assert(desc, actual, expected) {
    if (actual === expected) {
        console.log(`  PASS: ${desc} => ${actual}`);
        passed++;
    } else {
        console.error(`  FAIL: ${desc} => got ${actual}, expected ${expected}`);
        failed++;
    }
}

console.log('\n=== Mujer XS (subsubcategoria=31) ===');
const mujerXS = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 31, valorProducto: 100000 };
assert('1 sesión', calcularPrecioFinal(mujerXS, 1), 100000);
assert('3 sesiones', calcularPrecioFinal(mujerXS, 3), Math.round(100000 * 0.5125) * 3); // 51250 * 3 = 153750
assert('6 sesiones', calcularPrecioFinal(mujerXS, 6), Math.round(100000 * 0.3844) * 6); // 38440 * 6 = 230640

console.log('\n=== Mujer L (subsubcategoria=34) ===');
const mujerL = { categoriaProducto: 49, subcategoria: 23, subsubcategoria: 34, valorProducto: 200000 };
assert('1 sesión', calcularPrecioFinal(mujerL, 1), 200000);
assert('6 sesiones', calcularPrecioFinal(mujerL, 6), Math.round(200000 * 0.3332) * 6); // 66640 * 6 = 399840

console.log('\n=== Hombre M (subsubcategoria=40) ===');
const hombreM = { categoriaProducto: 48, subcategoria: 23, subsubcategoria: 40, valorProducto: 150000 };
assert('1 sesión', calcularPrecioFinal(hombreM, 1), 150000);
assert('3 sesiones', calcularPrecioFinal(hombreM, 3), Math.round(150000 * 0.5950) * 3); // 89250 * 3 = 267750
assert('6 sesiones', calcularPrecioFinal(hombreM, 6), Math.round(150000 * 0.4170) * 6); // 62550 * 6 = 375300

console.log('\n=== Mujer subcategoria=26 (forzar 1 sesión) ===');
const mujerPromo = { categoriaProducto: 49, subcategoria: 26, subsubcategoria: 31, valorProducto: 80000 };
assert('pide 3 pero fuerza 1', calcularPrecioFinal(mujerPromo, 3), 80000);
assert('pide 6 pero fuerza 1', calcularPrecioFinal(mujerPromo, 6), 80000);
assert('esSoloUnaSesion=true', esSoloUnaSesion(mujerPromo), true);

console.log('\n=== Mujer subcategoria=24 (forzar 1 sesión) ===');
const mujerSubcat24 = { categoriaProducto: 49, subcategoria: 24, subsubcategoria: 32, valorProducto: 50000 };
assert('pide 6 pero fuerza 1', calcularPrecioFinal(mujerSubcat24, 6), 50000);
assert('esSoloUnaSesion=true', esSoloUnaSesion(mujerSubcat24), true);

console.log('\n=== Inputs inválidos ===');
assert('producto null', calcularPrecioFinal(null, 3), 0);
assert('valorProducto NaN', calcularPrecioFinal({ categoriaProducto: 49, valorProducto: 'abc' }, 3), 0);
assert('sesiones inválidas (5) => usa 1', calcularPrecioFinal(mujerXS, 5), 100000);

console.log(`\n=== Resultado: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) process.exit(1);
