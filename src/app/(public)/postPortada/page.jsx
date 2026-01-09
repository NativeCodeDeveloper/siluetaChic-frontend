export default function PostPortada() {
  return (
    <section className="mt-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          ¿Por qué elegir <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">Triláser</span>?
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Tecnología avanzada que garantiza seguridad y resultados excepcionales
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition">
            <div className="flex justify-center -mt-20 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.07 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Tecnología Triláser</h2>
            <p className="text-gray-600 font-medium">
              Combinación de tres longitudes de onda (Alejandrita, Diodo y Nd:YAG)
              para máxima efectividad en todos los tipos de piel y vello.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition">
            <div className="flex justify-center -mt-20 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046a1 1 0 00-1.6 0L3.07 10.2A1 1 0 003.87 12H9l-1 6.954a1 1 0 001.6.8l6.63-9.154A1 1 0 0015.43 9H10.3l1-6.954z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Menos Sesiones, Más Resultados</h2>
            <p className="text-gray-600 font-medium">
              Resultados visibles desde la primera sesión. Reducción del 80-98% del vello en 6-8 sesiones.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition">
            <div className="flex justify-center -mt-20 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2c-.472 0-.93.083-1.36.246l-4 1.6A1 1 0 004 4.764V9c0 4.418 2.91 6.99 5.445 8.445a1 1 0 001.11 0C13.09 15.99 16 13.418 16 9V4.764a1 1 0 00-.64-.918l-4-1.6A3.963 3.963 0 0010 2zm0 2.055L14 5.6V9c0 3.29-2.1 5.41-4 6.555C8.1 14.41 6 12.29 6 9V5.6l4-1.545z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Segura para Todos los Fototipos</h2>
            <p className="text-gray-600 font-medium">
              Tratamiento seguro y eficaz en pieles claras y oscuras gracias a nuestro sistema de enfriamiento avanzado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}