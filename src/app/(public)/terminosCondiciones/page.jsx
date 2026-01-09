"use client";

export default function TerminosYCondiciones() {
    return (
        <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl">
                {/* Card estilo Facebook */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">

                    {/* Título principal */}
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#1877f2] text-center mb-4">
                        Términos y Condiciones de Intercambio Comercial
                    </h1>

                    <p className="text-gray-600 text-sm text-center mb-6">
                        Macar Repuestos Chile – Líderes en importación y distribución de repuestos originales Maxus.
                    </p>

                    {/* Introducción */}
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                        Los presentes Términos y Condiciones regulan todas las transacciones comerciales
                        realizadas con <span className="font-semibold">Macar Repuestos Chile</span>, ya sea a través de nuestro
                        sitio web u otros canales oficiales de contacto. Al efectuar una compra, el cliente
                        declara conocer y aceptar íntegramente lo aquí establecido.
                    </p>

                    {/* 1. Condiciones generales */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            1. Condiciones Generales de Venta
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Todas las ventas están sujetas a la disponibilidad de stock y a la confirmación
                            comercial por parte de Macar Repuestos Chile. Nos reservamos el derecho de
                            modificar precios, promociones y condiciones comerciales sin previo aviso,
                            respetando siempre las condiciones vigentes al momento de la compra ya confirmada.
                        </p>
                    </section>

                    {/* 2. Información y compatibilidad */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            2. Información del Vehículo y Compatibilidad del Producto
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Para asegurar la correcta compatibilidad de los repuestos, el cliente debe
                            proporcionar información precisa del vehículo, como:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Modelo y año del vehículo.</li>
                            <li>Versión y tipo de motor.</li>
                            <li>Chasis, VIN u otros datos técnicos relevantes.</li>
                        </ul>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            Nuestro equipo puede orientar en la elección del repuesto, pero la verificación
                            final de compatibilidad recae en el cliente, salvo en aquellos casos donde se
                            haya entregado documentación técnica que respalde la recomendación.
                        </p>
                    </section>

                    {/* 3. Precios y facturación */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            3. Precios y Facturación
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Los precios publicados pueden incluir o no IVA, lo que será debidamente
                            indicado al momento de la compra. Las boletas y facturas se emiten con los
                            datos entregados por el cliente; es responsabilidad del comprador revisar
                            y confirmar que la información tributaria sea correcta antes de finalizar
                            la transacción.
                        </p>
                    </section>

                    {/* 4. Condiciones de pago */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            4. Condiciones de Pago
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Macar Repuestos Chile <span className="font-semibold">no almacena ni procesa datos bancarios</span> de los clientes.
                        </p>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Todos los pagos se realizan a través de la plataforma segura{" "}
                            <span className="font-semibold">Mercado Pago</span>, la cual procesa directamente las
                            transacciones con la entidad bancaria del cliente. De esta forma:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1 mt-2">
                            <li>No vemos ni registramos números de tarjeta.</li>
                            <li>No tenemos acceso a claves, contraseñas ni tokens bancarios.</li>
                            <li>La seguridad de la transacción es responsabilidad de Mercado Pago y del banco emisor.</li>
                        </ul>
                    </section>

                    {/* 5. Despachos y entregas */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            5. Despachos y Entregas
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Los despachos se realizan mediante empresas de transporte y mensajería
                            externas. Los plazos de entrega pueden variar según la región y condiciones
                            logísticas del transportista. Una vez entregado el producto a la empresa
                            de transporte, el seguimiento y tiempo de entrega dependen de dicha empresa,
                            sin perjuicio de la asistencia que podamos brindar como intermediarios.
                        </p>
                    </section>

                    {/* 6. Cambios, garantías y devoluciones */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            6. Cambios, Garantías y Devoluciones
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Macar Repuestos Chile cuenta con políticas de:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Devoluciones.</li>
                            <li>Cambios por incompatibilidad.</li>
                            <li>Garantías por fallas de fabricación.</li>
                        </ul>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            Estas políticas se encuentran publicadas en secciones específicas del sitio
                            web y forman parte integrante de los presentes Términos y Condiciones.
                        </p>
                    </section>

                    {/* 7. Protección de datos */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            7. Protección de Datos Personales
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            El uso y resguardo de los datos personales de nuestros clientes se regula
                            por nuestra <span className="font-semibold">Política de Privacidad y Seguridad de Datos</span>, donde se
                            detalla el tratamiento, finalidad y protección de la información.
                        </p>
                    </section>

                    {/* 8. Aceptación de términos */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            8. Aceptación de los Términos
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Al realizar una compra o solicitar un servicio a través de los canales
                            oficiales de Macar Repuestos Chile, el cliente declara haber leído,
                            comprendido y aceptado estos Términos y Condiciones de Intercambio Comercial.
                        </p>
                    </section>

                    {/* Footer */}
                    <section className="pt-4 border-t border-gray-200 mt-4">
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            Para cualquier consulta adicional sobre estos términos, puedes comunicarte
                            con nuestro equipo a través de los canales oficiales de Macar Repuestos Chile.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}