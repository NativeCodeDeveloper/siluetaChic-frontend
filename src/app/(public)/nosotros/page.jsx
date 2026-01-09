import Image from "next/image";

export default function SobreNosotrosCard() {
    return (
        <section className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-blue-900/10 px-2 sm:px-4 md:px-10">
            {/* Fondo */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                    src="/maxus1.jpg"
                    alt="Maxus"
                    fill
                    sizes="100vw"
                    className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-white/50 backdrop-blur-[2px]" />
                <div className="absolute -top-24 -left-24 z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
            </div>

            {/* Contenido */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full pt-20 pb-6 sm:pb-10 md:pb-14">
                {/* Logo desktop */}
                <div className="mb-4 sm:mb-6 md:mb-8 hidden md:block">
                    <Image
                        src="/logoBlack2.png"
                        alt="Macar Repuestos"
                        width={360}
                        height={360}
                        className="h-auto w-[220px] md:w-[320px] mx-auto"
                    />
                </div>

                <div className="w-full max-w-2xl md:max-w-3xl rounded-2xl md:rounded-3xl border border-blue-900/20 bg-white/80 backdrop-blur-xl shadow-2xl p-3 sm:p-6 md:p-12 mb-4 flex flex-col items-center">
                    <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-center mb-3">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                            Sobre Nosotros
                        </span>
                    </h2>

                    <p className="mt-1 text-center text-xs sm:text-base md:text-lg leading-relaxed text-blue-900 font-semibold drop-shadow-sm">
                        <span className="font-bold">Macar Repuestos Chile</span>
                        <br /><br />
                        Macar Repuestos Chile es una empresa chilena, con base en la Región de Ñuble, especializada exclusivamente en vehículos Maxus y dedicada a la importación y distribución de repuestos originales de fábrica. Nuestra operación se sustenta en un principio fundamental: no comercializamos piezas alternativas, porque confiamos en la calidad, seguridad y durabilidad que solo los repuestos oficiales pueden garantizar.
                        <br /><br />
                        Con una visión estratégica de crecimiento, buscamos consolidarnos como el líder nacional en repuestos Maxus y proyectarnos como un referente regional en Latinoamérica, entregando soluciones confiables, asesoría técnica especializada y un servicio transparente y oportuno a clientes de todo Chile y la región.
                        Somos una empresa familiar chilena, originaria de la Región de Ñuble, con trayectoria en el rubro automotriz desde el año 2012, cuando iniciamos nuestras actividades como Automotora Pehuén.
                        A partir de esta experiencia y de un proceso de evolución constante, en 2023 damos origen a Comercializadora Carrasco Macar Ltda., fortaleciendo nuestro enfoque en la especialización, la importación directa y el respaldo técnico.
                        <br /><br />
                        En Macar Repuestos Chile, trabajamos con un compromiso permanente hacia la excelencia, aportando valor al mercado automotriz nacional y regional mediante repuestos originales Maxus, atención experta y relaciones comerciales basadas en la confianza y la transparencia.                  
                    </p>
                </div>

                {/* Logo móvil */}
                <div className="mb-4 sm:mb-6 md:mb-8 block md:hidden">
                    <Image
                        src="/logoBlack2.png"
                        alt="Macar Repuestos"
                        width={360}
                        height={360}
                        className="h-auto w-[160px] sm:w-[220px] mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}
