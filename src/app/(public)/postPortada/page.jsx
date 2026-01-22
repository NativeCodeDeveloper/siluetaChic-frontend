export default function PostPortada() {
  return (
    <section className="mt-24 sm:mt-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">¿Por qué elegir
            <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent"> Silueta Chic</span> ?
        </h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            En Silueta Chic transformamos tu piel.
            Resultados visibles desde la primera sesión, sin dolor.
            Adiós a la irritación y al vello encarnado.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Card 1 */}
          <div className="group relative bg-white/95 rounded-3xl p-7 sm:p-8 lg:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100
            hover:ring-2 hover:ring-amber-400/60
            hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]">
            <div className="flex justify-center -mt-14 sm:-mt-16 mb-5">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-md ring-1 ring-black/5 group-hover:scale-[1.02] transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.07 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Tecnología de <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">Triple Onda</span>: ¿Cómo funciona?
            </h2>
              <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                  No todos los vellos son iguales, por eso un solo láser no es suficiente. Nuestro sistema combina tres potencias en cada pulso para una eliminación total:</p>

              <ul className="mt-6 space-y-4 text-left text-[15px] leading-relaxed text-gray-600">

                  <li>                <span className='font-bold text-purple-600'> 755nm (Alexandrita): </span>
                      Especialista en vellos claros y finos. Ataca la raíz más superficial.</li>


                  <li>
                      <span className='font-bold text-purple-600'> 808nm (Diodo):  </span>
                      La onda más versátil. Llega a la profundidad media para eliminar el vello más común y resistente.
                  </li>


                  <li>
                      <span className='font-bold text-purple-600'> 1064nm (ND-Yag):   </span>
                      Potencia profunda. Ideal para pieles oscuras o bronceadas y vellos con raíces muy arraigadas.
                  </li>


                  <li>
                      <span className='font-bold text-amber-600'> El Efecto Esperado:   </span>
                      Una reducción del 80% al 90% del vello hacia el final del tratamiento, dejando solo un vello residual casi invisible.
                  </li>




              </ul>


          </div>

          {/* Card 2 */}
          <div className="group relative bg-white/95 rounded-3xl p-7 sm:p-8 lg:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100
            hover:ring-2 hover:ring-amber-400/60
            hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]">
            <div className="flex justify-center -mt-14 sm:-mt-16 mb-5">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-md ring-1 ring-black/5 group-hover:scale-[1.02] transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046a1 1 0 00-1.6 0L3.07 10.2A1 1 0 003.87 12H9l-1 6.954a1 1 0 001.6.8l6.63-9.154A1 1 0 0015.43 9H10.3l1-6.954z" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Sistema Super Ice: ¿Por qué garantizamos <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">CERO dolor</span>?
            </h2>
            <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                El miedo al dolor es la razón #1 por la que las personas no se depilan. Aquí es donde rompemos esa barrera:
            </p>



              <ul className="mt-6 space-y-4 text-left text-[15px] leading-relaxed text-gray-600">

                  <li>
                      Nuestra pieza de mano cuenta con tecnología <span className='font-bold text-cyan-600'> Super Ice de enfriamiento por contacto. </span> Mientras el láser calienta el folículo para destruirlo, la punta del cabezal se congela provocando efecto frio sobre la zona a tratar.
                  </li>


                  <li>
                      <span className='font-bold text-cyan-600'>Traducción para el cliente: </span>
                      Sentirás una sensación de frescura constante que anestesia la zona, protegiendo tu piel de quemaduras y haciendo que la sesión sea segura, cómoda y relajante.
                  </li>



              </ul>

          </div>

          {/* Card 3 */}
          <div className="group relative bg-white/95 rounded-3xl p-7 sm:p-8 lg:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100
            hover:ring-2 hover:ring-amber-400/60
            hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]">
            <div className="flex justify-center -mt-14 sm:-mt-16 mb-5">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-md ring-1 ring-black/5 group-hover:scale-[1.02] transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2c-.472 0-.93.083-1.36.246l-4 1.6A1 1 0 004 4.764V9c0 4.418 2.91 6.99 5.445 8.445a1 1 0 001.11 0C13.09 15.99 16 13.418 16 9V4.764a1 1 0 00-.64-.918l-4-1.6A3.963 3.963 0 0010 2zm0 2.055L14 5.6V9c0 3.29-2.1 5.41-4 6.555C8.1 14.41 6 12.29 6 9V5.6l4-1.545z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Mucho más que estética: <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">Beneficios para tu Vida</span>
            </h2>
            <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                La depilación Trilaser no es solo "quitar vellos", es transformar cómo te sientes:
            </p>


              <ul className="mt-6 space-y-4 text-left text-[15px] leading-relaxed text-gray-600">

                  <li>                <span className='font-bold text-cyan-600'> Piel de Seda (Nivel Salud):  </span>
                      Elimina la foliculitis (vellos encarnados) desde la primera sesión. Tu piel recupera su textura lisa y se aclaran las manchas causadas por el uso constante de la rasuradora/cera.
                  </li>

                  <li>
                      <span className='font-bold text-purple-600'> Seguridad y Libertad (Autoestima):  </span>
                      Olvídate de planificar tu ropa según si te depilaste o no. Usa ese vestido, ve a la piscina o levanta los brazos con total confianza en cualquier momento.

                  </li>



                  <li>
                      <span className='font-bold text-amber-600'> Seguridad Clínica </span>
                      Olvídate de planificar tu ropa según si te depilaste o no. Usa ese vestido, ve a la piscina o levanta los brazos con total confianza en cualquier momento.
                  </li>









              </ul>
          </div>
        </div>
      </div>
    </section>
  );
}