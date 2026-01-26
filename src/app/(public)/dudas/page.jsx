'use client'
import { useState } from 'react';
import ServicioPage from "@/app/(public)/servicios/page";
import { Sun, Scissors, Ban, Droplets, Beaker, Pill, Syringe, ShowerHead, UserRound } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Dudas(){
    const [estadoCuidadosPrevios, setEstadoCuidadosPrevios] = useState(true);
    const [estadoCuidadosPosteriores, setEstadoCuidadosPosteriores] = useState(false);
    const [estadoPreguntas, setEstadoPreguntas] = useState(false);
    const [servicios, setServicios] = useState(false);

    function activarCuidadosPrevios(){
        setEstadoCuidadosPrevios(true);
        setEstadoPreguntas(false);
        setEstadoCuidadosPosteriores(false);
        setServicios(false);
    }

    function activarServicios(){
        setEstadoCuidadosPrevios(false);
        setEstadoPreguntas(false);
        setEstadoCuidadosPosteriores(false);
        setServicios(true);
    }


    function activarCuidadosPosteriores(){
        setEstadoCuidadosPrevios(false);
        setEstadoPreguntas(false);
        setEstadoCuidadosPosteriores(true);
        setServicios(false);
    }


    function activarPreguntas(){
        setEstadoCuidadosPrevios(false);
        setEstadoPreguntas(true);
        setEstadoCuidadosPosteriores(false);
        setServicios(false);
    }



    return (
      <div>
          {/* CELULARES */}

          <div className="block md:hidden">
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-50
            flex flex-col justify-center items-center
            ">

                  <h1 className="text-white text-4xl font-bold">
                      Centro de Ayuda
                  </h1>
                  <p className="text-white text-2xl text-center tracking-wide p-2">Toda la información que necesitas para tu tratamiento</p>
              </div>



              <div className="flex flex-col justify-center items-center p-6 gap-3 ">
                  <button onClick={()=> activarCuidadosPrevios()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-80 text-purple-500 font-semibold tracking-wide
                hover:bg-purple-400 hover:text-white border-purple-400
                "> Cuidados Previos </button>

                  <button onClick={()=> activarCuidadosPosteriores()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-80 text-purple-500 font-semibold tracking-wide
                hover:bg-purple-400 hover:text-white border-purple-400
                "> Cuidados Posteriores </button>

                  <button onClick={()=> activarPreguntas()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-80 text-purple-500 font-semibold tracking-wide border-purple-400
                hover:bg-purple-400 hover:text-white
                "> Preguntas Frecuentes </button>

                  <button onClick={()=> activarServicios()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-80 text-purple-500 font-semibold tracking-wide border-purple-400
                hover:bg-purple-400 hover:text-white
                "> Mas informacion </button>
              </div>


              {servicios&&(
                  <ServicioPage></ServicioPage>
              )}


              {estadoCuidadosPrevios&&(
                  <div>
                      <div className="flex justify-center mt-10">
                          <h1 className='text-4xl font-bold text-center'>
                              Cuidados
                              {" "}
                              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Previos</span>
                              {" "}
                              la Sesión</h1>
                      </div>

                      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Exposición Solar</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">La exposición solar, solarium o autobronceante debe ser suspendida al menos <span>30 días antes</span>.</p>
                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Scissors className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Rasurado</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Rasurar la zona máximo 24 horas antes de la sesión, con rasuradora. Es preferible hacerlo la noche anterior para que la piel no esté irritada.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Ban className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Métodos de Depilación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Abandona cualquier método de depilación que arranque el vello de raíz (cera, pinzas, depiladora eléctrica) al menos un mes antes y durante el tratamiento.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Sin Productos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No apliques cremas, desodorantes, perfumes o maquillaje en la zona a tratar el día de la cita.</p>

                          </div>


                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ácidos Tópicos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Suspender los ácidos tópicos 1 semana antes de la sesión en la zona a tratar (glicólico, salicílico, retinoides, peróxido de benzoilo, hidroquinona, etc.).</p>

                          </div>


                          <div className="w-80 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Pill className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Medicación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Suspender medicación fotosensibilizante, anticoagulante, antiinflamatoria bajo supervisión médica.</p>

                          </div>



                          <div className="w-80 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Syringe className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Vacunas</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Si te vacunaste debes esperar 15 días post inyección.</p>
                          </div>



                          <div className="w-80 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Higiene Personal</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Asiste con la piel limpia, sin cremas, perfumes, lociones, desodorante, serums, bloqueador, sin maquillaje</p>

                          </div>



                          <div className="w-80 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Rostro</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Si la zona a tratar corresponde al rostro, es importante no haberse realizado ningún peeling químico en el mes anterior</p>

                          </div>
                      </div>
                  </div>
              )}




              {estadoCuidadosPosteriores&&(
                  <div>
                      <div className="flex justify-center mt-10">
                          <h1 className='text-4xl font-bold text-center'>
                              Cuidados
                              {" "}
                              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Posteriores</span>
                              {" "}
                              la Sesión</h1>
                      </div>

                      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Hidratación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Hidratar la piel con productos libres de parabenos, alcohol y perfumes. Opciones recomendadas: aloe vera o aceite de argán.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Sin Sol</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No tomar sol ni broncearse por mínimo 7 días después de realizada la sesión para prevenir hiperpigmentación e irritación.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Protector Solar</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Utilizar protector solar FPS 50 o superior en la zona tratada.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Evitar Calor</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evita el calor en las zonas depiladas: duchas calientes, saunas, estufas, calienta camas.</p>

                          </div>


                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Piscinas</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evitar bañarse en piscinas, el cloro puede irritar.</p>

                          </div>


                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ejercicio</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evitar actividad física donde las zonas depiladas suden ya que se pueden irritar.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Maquillaje</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Rostro: evita maquillar en las siguientes 24 horas. Después puedes usar maquillaje y productos cosméticos.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-cyan-600 mb-4" />
                              <h1 className="text-4xl font-bold">Desodorantes</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Axilas: evita desodorantes con alcohol las siguientes 24 horas.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Ban className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Irritación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evita tocar o rascar las zonas depiladas. En caso de ardor o picazón aplica compresas frías, agua fría o hidratantes neutros.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Exfoliación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Exfoliar la piel 12 días post sesión o cuando la irritación desaparezca para favorecer la caída del pelo quemado.</p>

                          </div>



                          <div className="w-auto p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Scissors className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Entre Sesiones</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No depilar entre sesiones con métodos que arranquen el pelo de raíz. Si necesitas depilar hazlo solo con rasuradoras.</p>

                          </div>


                          <div className="w-auto p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ácidos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Después de 1 semana puedes aplicar tus productos cosméticos o tratamientos con ácido.</p>

                          </div>



                      </div>
                  </div>
              )}







              {estadoPreguntas&&(
                  <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-white via-cyan-50 to-indigo-100 py-8">
                      <div className="w-full max-w-2xl px-2 sm:px-4 md:px-8">
                          {estadoPreguntas && (
                              <div className="flex flex-col items-center w-full">
                                  <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Preguntas <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Frecuentes</span></h1>
                                  <div className="w-full space-y-4">
                                      {/* Ejemplo de acordeón estilizado */}
                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿El vello volverá a crecer?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Después de las 6-8 sesiones del tratamiento, el vello no volverá a crecer. Sin embargo, hay condiciones especiales como alteraciones hormonales, que pueden estimular el crecimiento del vello nuevamente y para ello, será necesario realizar sesiones de mantenimiento. Importante, el láser no elimina 100% los vellos que son extremadamente finos, blancos y pelirrojos.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>



                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación trilaser duele?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Nuestra pieza de mano cuenta con tecnología Super Ice de enfriamiento por contacto.
                                                  Mientras el láser calienta el folículo para destruirlo, la punta del cabezal se congela
                                                  provocando efecto frio sobre la zona a tratar.
                                                  Sentirás una sensación de frescura constante que anestesia la zona, protegiendo tu piel de
                                                  quemaduras y haciendo que la sesión sea segura, cómoda y relajante.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Es necesario realizar evaluación previa?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  <p className="mb-6 leading-relaxed text-gray-800">
                                                      Sí, es fundamental. Antes de comenzar, realizamos una evaluación para garantizar que tu piel esté sana y sea apta para el tratamiento. Si todo está en orden, el proceso es muy ágil:
                                                  </p>
                                                  <div className="mb-4 space-y-3">
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Consentimiento Informado:</span> Firmarás la documentación necesaria donde te explicamos los cuidados y alcances del procedimiento para tu total tranquilidad.
                                                      </div>
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Consentimiento Informado:</span> Firmarás la documentación necesaria donde te explicamos los cuidados y alcances del procedimiento para tu total tranquilidad.
                                                      </div>
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Comienza de inmediato:</span> Si tu piel está lista, podemos realizar tu primera sesión en esa misma visita, optimizando tu tiempo desde el primer día.
                                                      </div>
                                                  </div>
                                                  <p className="mt-6 text-gray-700">
                                                      Recuerda asistir con la zona rasurada y con la piel limpia, sin cremas, sin maquillaje, desodorantes ni aceites en la zona a tratar para que podamos proceder con la sesión el mismo día.
                                                  </p>
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Para quién está dirigido el tratamiento Depilacion Trilaser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  <p className="mb-6 leading-relaxed text-gray-800">
                                                      Nuestro tratamiento está diseñado para quienes buscan una <span className="font-semibold text-indigo-700">solución definitiva, segura y profesional</span>. Es la alternativa líder para quienes desean dejar atrás los métodos tradicionales como la cera, cremas o rasuradoras, que suelen causar irritación y molestias constantes.
                                                  </p>
                                                  <div className="mb-4">
                                                      <h2 className="font-bold text-lg text-cyan-700 mb-2">Perfil del Candidato Ideal</h2>
                                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                                          <li><span className="font-semibold">Género:</span> Dirigido tanto a mujeres como a hombres que priorizan su higiene y salud cutánea.</li>
                                                          <li><span className="font-semibold">Tipos de Piel:</span> Efectivo en fototipos de piel desde el I hasta el IV.</li>
                                                          <li><span className="font-semibold">Tipos de Vello:</span> Actúa con éxito sobre vello fino, normal o grueso.</li>
                                                          <li><span className="font-semibold">Objetivo:</span> Personas que buscan eliminar definitivamente la irritación, los vellos encarnados (foliculitis) y la fricción por roce.</li>
                                                      </ul>
                                                  </div>
                                                  <div className="mt-6 p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded">
                                                      <h3 className="font-bold text-cyan-800 mb-1 flex items-center gap-2">
                                                          <span className="text-xl">⚠️</span> Consideraciones Importantes
                                                      </h3>
                                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                                          <li>Para garantizar la eficacia del tratamiento, es importante notar que el láser actúa sobre el pigmento del vello.</li>
                                                          <li>El tratamiento no es efectivo en vellos de color blanco o pelirrojo debido a la falta de pigmentación.</li>
                                                          <li>Se requiere una evaluación previa dentro de la primera sesión para determinar los parámetros exactos según tu tipo de piel y vello.</li>
                                                      </ul>
                                                  </div>
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pieles morenas y oscuras pueden utilizar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si se puede, con el láser ND Yag. Su longitud de onda de 1064 nm permite eliminar el vello
                                                  de forma efectiva sin dañar la piel. Esto minimiza el riesgo de efectos secundarios como
                                                  hiperpigmentación o quemaduras, algo especialmente importante al tratar pieles morenas.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Es seguro combinar acidos, serums, retinol mientras estoy en tratamiento de
                                                  depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Sí puedes combinarlos, pero no al mismo tiempo, debes suspender el uso al menos 1
                                                  semana antes, en caso de que no lo suspendas, tu piel puede terminar más roja e irritada de
                                                  lo que te gustaría, además pueden aparecer manchas o sufrir quemaduras en la piel.
                                                  Puedes retomar el uso 7 días después de realizada la sesión laser.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>






                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Me hice Plasma rico en plaquetas, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Para realizar depilación láser después de un tratamiento de Plasma Rico en Plaquetas,
                                                  debes esperar un mínimo de 15 días y presentar autorización del especialista, ya que un
                                                  intervalo de tiempo menor incrementa el riesgo de irritación y enrojecimiento en la piel
                                                  tratada.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Me inyecte Botox/Rellenos, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si la depilación láser y la aplicación de Bótox se realizan en áreas corporales diferentes, no
                                                  hay problema en combinar los procedimientos.
                                                  Si ambos tratamientos se aplican en la misma área, es vital esperar mínimo 15 días después
                                                  de recibir el Bótox para hacer la depilación láser. Esta precaución se debe a que la piel
                                                  tratada con Bótox puede estar más sensible, y la estimulación del láser podría aumentar el
                                                  riesgo de irritación o inflamación localizada.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Tengo Herpes, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Es fundamental no realizar el tratamiento durante brotes activos de herpes, ya que la luz del
                                                  láser puede irritar las áreas afectadas, prolongar la curación e incrementar el riesgo de
                                                  diseminación del virus. Por esta razón, antes de cualquier sesión, es crucial acudir al
                                                  médico para que evalúe la situación y determine si es necesario posponer la depilación
                                                  láser.
                                                  Protocolo y Cuidado
                                                  Se requiere una comunicación abierta y honesta con el profesional de la depilación láser,
                                                  informando inmediatamente si se siente alguna incomodidad o si hay signos de un brote
                                                  inminente. Además, se debe notificar al profesional si el paciente está usando alguna crema
                                                  o consumiendo algún medicamento considerado fotosensible.
                                                  El cuidado posterior es esencial e incluye mantener la piel hidratada, evitar la exposición
                                                  solar y abstenerse de rascar las zonas tratadas.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Estoy con mi periodo ¿Puedo realizarme depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si puedes, ya que no hay ningún inconveniente o contraindicación en realizar depilación
                                                  láser durante la menstruación.
                                                  Sin embargo, la mayoría de los centros de estética aconsejan postergarla por motivos de
                                                  higiene.
                                                  Si decides realizar depilación láser durante los días de la menstruación, debes asistir con
                                                  tampón, higienizada y evitar en todo momento medicamentos para calmar el dolor o el
                                                  malestar, como el ibuprofeno, ya que este es un medicamento fotosensible, y ocasionaría
                                                  que la piel tuviera una reacción adversa al aplicar el láser..
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación láser sirve para pacientes con síndrome de ovarios poliquísticos?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  El Síndrome de Ovarios Poliquísticos (SOP) es un desorden endocrino que causa un
                                                  desequilibrio hormonal, específicamente la producción excesiva de andrógenos (hormonas
                                                  &quot;masculinas&quot;) en los ovarios.
                                                  Este desequilibrio hormonal conduce a la aparición vello excesivo (Hirsutismo) en áreas
                                                  poco comunes, más oscuro, grueso y difícil de eliminar con métodos tradicionales.
                                                  Este crecimiento de vello puede causar incomodidad, baja autoestima y problemas
                                                  emocionales.
                                                  Ante esto, la depilación láser se presenta como una alternativa efectiva y duradera para
                                                  reducir este tipo de vello, ayudando a las mujeres a recuperar la confianza.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con Diabetes pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Está completamente permitido en personas con diabetes, siempre que la enfermedad se
                                                  encuentre en tratamiento y compensada. Para garantizar la seguridad, si el paciente ha
                                                  iniciado o modificado su medicación recientemente, es esencial aplazar las sesiones hasta
                                                  alcanzar un control permanente y estable de su condición.
                                                  Debido a que la piel de las personas diabéticas es más sensible, existe un riesgo ligeramente
                                                  más elevado de efectos secundarios. Por ello, se deben tomar precauciones específicas:
                                                  1. Hidratación y Sol: Es crucial hidratarse lo suficiente los días antes y después de la
                                                  sesión, y evitar completamente la exposición al sol antes y después del tratamiento,
                                                  ya que la falta de hidratación y la exposición solar pueden causar daños cutáneos e
                                                  ineficacia.
                                                  2. Riesgo con la Insulina: Es una prohibición clave depilar con láser la zona donde se
                                                  ha inyectado insulina recientemente, o inyectar insulina en zonas recién depiladas.
                                                  El calor del láser en la zona de inyección puede aumentar la absorción del
                                                  medicamento y potencialmente causar un episodio de hipoglucemia (baja de
                                                  azúcar).
                                                  En conclusión, la depilación láser es una técnica segura y recomendada para la diabetes,
                                                  pero solo debe llevarse a cabo si se mantiene un control adecuado de la enfermedad.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación láser puede causar cáncer?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  No, la depilación láser no causa cáncer.
                                                  La depilación láser actúa de forma superficial. Esta técnica emite luz que es absorbida por
                                                  la melanina del vello, esto destruye el folículo piloso sin dañar los tejidos alrededor. Esta
                                                  energía no es ionizante, lo que significa que no altera el ADN, ni provoca mutaciones
                                                  celulares.
                                                  A diferencia de los rayos X o la radiación ultravioleta, la depilación láser no penetran la
                                                  piel. No afectan a los órganos internos.
                                                  Un paciente que atraviesa o atravesó tratamiento de Radioterapia ¿Puede realizarse
                                                  depilación laser?
                                                  En este sentido, el paciente en periodo de tratamiento no podrá por ningún motivo recibir
                                                  depilación láser.
                                                  Una vez resuelto el cáncer y habiendo transcurrido 5 años de la de haberse realizado el
                                                  tratamiento de radioterapia, el paciente podrá realizarse depilación láser, siempre y cuando
                                                  tenga autorización médica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>



                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Puedo utilizar depilación laser si tengo Dermatomiositis?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  La dermatomiositis es una enfermedad contraindicada de forma absoluta para la depilación
                                                  láser.La inflamación cutánea y la fragilidad asociadas con esta enfermedad hacen que
                                                  cualquier exposición a tratamientos láser sea potencialmente de riesgo.
                                                  Se recomienda siempre consultar con tu médico tratante sobre que tratamiento pudiera ser
                                                  viable ante tu patología o si autoriza el uso de la depilación laser según tu condición clínica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con VIH pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Sí, se puede, pero hay que hacerlo con responsabilidad.
                                                  Lo primero es hablar con tu médico, ya que, los medicamentos antirretrovirales, pueden
                                                  volver tu piel un poco más sensible. Eso no significa que no puedas hacerte el láser,
                                                  significa que hay que ajustarlo a ti. Sabemos que no se pueden suspender, es por esto que
                                                  necesitamos que tu doctor dé luz verde antes de comenzar. Ese pequeño certificado es la
                                                  tranquilidad de que tu piel está lista.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>


                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con LUPUS pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Pacientes con lupus se recomienda siempre consultar con tu médico tratante quien será el
                                                  indicado para abordar tu patología como corresponda y dar respuesta sobre que tratamiento
                                                  pudiera ser viable ante tu patología o si autoriza el uso de la depilación laser según tu
                                                  condición clínica.
                                                  Esta precaución debe ser estimada por los pacientes con lupus, debido a que la luz de la
                                                  depilación láser puede desencadenar brotes o reacciones cutáneas intensas, incluso si la
                                                  enfermedad se encuentra en remisión.
                                                  Por otra parte, los efectos adversos de la depilación láser en pacientes con lupus pueden
                                                  incluir irritación severa, manchas, lesiones dolorosas e incluso complicaciones sistémicas.
                                                  Por esta razón, el tratamiento con láser puede estar totalmente contraindicado.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Puedo utilizar depilación laser si tengo espinillas?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si puedes utilizar depilación láser, uno de sus beneficios es que al reducir el crecimiento del
                                                  vello, también disminuye significativamente las obstrucciones foliculares que pueden
                                                  provocar brotes.
                                                  Esto se traduce en menos espinillas, menos inflamación y una piel visiblemente más
                                                  uniforme.
                                                  Si hablamos de espinillas o granitos, que surgen después del uso de cera o rasuradora, sí,
                                                  podemos utilizar depilación laser, ya que, en la mayoría de los casos, estas afecciones se
                                                  tratan de foliculitis, una inflamación del vello encarnado causada por fricción, obstrucción
                                                  del poro o bacterias que entran en la piel a través de la depilación por métodos
                                                  tradicionales.
                                                  Si tienes espinillas aisladas o piel con tendencia acneica, el tratamiento puede realizarse
                                                  normalmente, evitando directamente las lesiones inflamadas.
                                                  En casos de brotes activos, es posible que el profesional sugiera postergar la sesión en esa
                                                  zona para evitar irritaciones.
                                                  Nunca se deben aplicar sesiones sobre espinillas infectadas, heridas abiertas o zonas con
                                                  piel comprometida.
                                                  Es clave seguir las indicaciones previas y posteriores al tratamiento: mantener la piel
                                                  limpia, sin exposición al sol y evitando productos irritantes.
                                                  Otro aspecto para considerar sería aquellos pacientes con tratamientos de antibióticos,
                                                  isotretinoina, para lo cual estaría contraindicado el uso de láser, en un plazo no menor a los
                                                  6 meses.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>






                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con Vitiligo pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Para quienes padecen vitíligo, la depilación láser presenta consideraciones y dilemas
                                                  específicos debido a la falta de pigmento (melanina), en las áreas afectadas la eficacia del
                                                  láser disminuye, llevando a resultados dispares donde el vello puede persistir, las zonas
                                                  hipopigmentadas podrían no requerir tratamiento, Las zonas con vitíligo son más sensibles
                                                  al sol y pueden serlo al láser, ya que la falta de melanina reduce la capacidad de la piel para
                                                  disipar el calor, existe un riesgo llamado Fenómeno de Koebner, aunque poco frecuente, de
                                                  que el láser desencadene una respuesta inflamatoria que afecte o exacerbe el vitíligo.
                                                  Se recomienda siempre consultar con tu médico tratante sobre que tratamiento pudiera ser
                                                  viable ante tu patología o si autoriza el uso de la depilación laser según tu condición clínica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>
                                  </div>
                              </div>
                          )}
                          {/* ...otros bloques de contenido, como cuidados previos y posteriores, también pueden usar este mismo patrón de ancho y estilo... */}
                      </div>
                  </div>
              )}











          </div>













          {/*ESCRITORIO*/}
          <div className="hidden md:block">
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-50
            flex flex-col justify-center items-center
            ">

                  <h1 className="text-white text-5xl font-bold">
                      Centro de Ayuda
                  </h1>
                  <p className="text-white text-2xl tracking-wide">Toda la información que necesitas para tu tratamiento</p>
              </div>



              <div className="flex justify-center gap-10 p-10">
                  <button onClick={()=> activarCuidadosPrevios()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-55 text-white font-semibold tracking-wide bg-purple-400
                hover:bg-purple-600
                "> Cuidados Previos </button>

                  <button onClick={()=> activarCuidadosPosteriores()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-55 text-purple-500 font-semibold tracking-wide
                hover:bg-purple-400 hover:text-white border-purple-400
                "> Cuidados Posteriores </button>

                  <button onClick={()=> activarPreguntas()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-55 text-purple-500 font-semibold tracking-wide border-purple-400
                hover:bg-purple-400 hover:text-white
                "> Preguntas Frecuentes </button>


                  <button onClick={()=> activarServicios()}
                          className="text-base border-2 rounded-3xl h-12 shadow-lg w-55 text-purple-500 font-semibold tracking-wide border-purple-400
                hover:bg-purple-400 hover:text-white
                "> Mas informacion </button>
              </div>


              {estadoCuidadosPrevios&&(
                  <div>
                      <div className="flex justify-center mt-10">
                          <h1 className='text-5xl font-bold'>
                              Cuidados
                              {" "}
                              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Previos</span>
                              {" "}
                              la Sesión</h1>
                      </div>

                      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Exposición Solar</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">La exposición solar, solarium o autobronceante debe ser suspendida al menos <span>30 días antes</span>.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Scissors className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Rasurado</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Rasurar la zona máximo 24 horas antes de la sesión, con rasuradora. Es preferible hacerlo la noche anterior para que la piel no esté irritada.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Ban className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Métodos de Depilación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Abandona cualquier método de depilación que arranque el vello de raíz (cera, pinzas, depiladora eléctrica) al menos un mes antes y durante el tratamiento.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Sin Productos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No apliques cremas, desodorantes, perfumes o maquillaje en la zona a tratar el día de la cita.</p>

                          </div>


                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ácidos Tópicos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Suspender los ácidos tópicos 1 semana antes de la sesión en la zona a tratar (glicólico, salicílico, retinoides, peróxido de benzoilo, hidroquinona, etc.).</p>

                          </div>


                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Pill className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Medicación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Suspender medicación fotosensibilizante, anticoagulante, antiinflamatoria bajo supervisión médica.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Syringe className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Vacunas</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Si te vacunaste debes esperar 15 días post inyección.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Higiene Personal</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Asiste con la piel limpia, sin cremas, perfumes, lociones, desodorante, serums, bloqueador, sin maquillaje</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Rostro</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Si la zona a tratar corresponde al rostro, es importante no haberse realizado ningún peeling químico en el mes anterior</p>

                          </div>
                      </div>
                  </div>
              )}




              {estadoCuidadosPosteriores&&(
                  <div>
                      <div className="flex justify-center mt-10">
                          <h1 className='text-5xl font-bold'>
                              Cuidados
                              {" "}
                              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Posteriores</span>
                              {" "}
                              la Sesión</h1>
                      </div>

                      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Hidratación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Hidratar la piel con productos libres de parabenos, alcohol y perfumes. Opciones recomendadas: aloe vera o aceite de argán.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Sin Sol</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No tomar sol ni broncearse por mínimo 7 días después de realizada la sesión para prevenir hiperpigmentación e irritación.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Sun className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Protector Solar</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Utilizar protector solar FPS 50 o superior en la zona tratada.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Evitar Calor</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evita el calor en las zonas depiladas: duchas calientes, saunas, estufas, calienta camas.</p>

                          </div>


                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Droplets className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Piscinas</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evitar bañarse en piscinas, el cloro puede irritar.</p>

                          </div>


                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ejercicio</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evitar actividad física donde las zonas depiladas suden ya que se pueden irritar.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <UserRound className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Maquillaje</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Rostro: evita maquillar en las siguientes 24 horas. Después puedes usar maquillaje y productos cosméticos.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <ShowerHead className="w-10 h-10 text-cyan-600 mb-4" />
                              <h1 className="text-4xl font-bold">Desodorantes</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Axilas: evita desodorantes con alcohol las siguientes 24 horas.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Ban className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Irritación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Evita tocar o rascar las zonas depiladas. En caso de ardor o picazón aplica compresas frías, agua fría o hidratantes neutros.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Exfoliación</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Exfoliar la piel 12 días post sesión o cuando la irritación desaparezca para favorecer la caída del pelo quemado.</p>

                          </div>



                          <div className="w-100 p-10 rounded-2xl border-l-cyan-600 border-3 shadow-lg">
                              <Scissors className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Entre Sesiones</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">No depilar entre sesiones con métodos que arranquen el pelo de raíz. Si necesitas depilar hazlo solo con rasuradoras.</p>

                          </div>


                          <div className="w-100 p-10 rounded-2xl border-l-indigo-600 border-3 shadow-lg">
                              <Beaker className="w-10 h-10 text-indigo-600 mb-4" />
                              <h1 className="text-4xl font-bold">Ácidos</h1>
                              <p className="text-lg mt-5 text-gray-500 tracking-wide">Después de 1 semana puedes aplicar tus productos cosméticos o tratamientos con ácido.</p>

                          </div>



                      </div>
                  </div>
              )}


              {servicios&&(
                  <ServicioPage></ServicioPage>
              )}





              {estadoPreguntas&&(
                  <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-white via-cyan-50 to-indigo-100 py-8">
                      <div className="w-full max-w-2xl px-2 sm:px-4 md:px-8">
                          {estadoPreguntas && (
                              <div className="flex flex-col items-center w-full">
                                  <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Preguntas <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">Frecuentes</span></h1>
                                  <div className="w-full space-y-4">
                                      {/* Ejemplo de acordeón estilizado */}
                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿El vello volverá a crecer?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Después de las 6-8 sesiones del tratamiento, el vello no volverá a crecer. Sin embargo, hay condiciones especiales como alteraciones hormonales, que pueden estimular el crecimiento del vello nuevamente y para ello, será necesario realizar sesiones de mantenimiento. Importante, el láser no elimina 100% los vellos que son extremadamente finos, blancos y pelirrojos.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>



                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación trilaser duele?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Nuestra pieza de mano cuenta con tecnología Super Ice de enfriamiento por contacto.
                                                  Mientras el láser calienta el folículo para destruirlo, la punta del cabezal se congela
                                                  provocando efecto frio sobre la zona a tratar.
                                                  Sentirás una sensación de frescura constante que anestesia la zona, protegiendo tu piel de
                                                  quemaduras y haciendo que la sesión sea segura, cómoda y relajante.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Es necesario realizar evaluación previa?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  <p className="mb-6 leading-relaxed text-gray-800">
                                                      Sí, es fundamental. Antes de comenzar, realizamos una evaluación para garantizar que tu piel esté sana y sea apta para el tratamiento. Si todo está en orden, el proceso es muy ágil:
                                                  </p>
                                                  <div className="mb-4 space-y-3">
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Consentimiento Informado:</span> Firmarás la documentación necesaria donde te explicamos los cuidados y alcances del procedimiento para tu total tranquilidad.
                                                      </div>
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Consentimiento Informado:</span> Firmarás la documentación necesaria donde te explicamos los cuidados y alcances del procedimiento para tu total tranquilidad.
                                                      </div>
                                                      <div>
                                                          <span className="font-bold text-indigo-700">Comienza de inmediato:</span> Si tu piel está lista, podemos realizar tu primera sesión en esa misma visita, optimizando tu tiempo desde el primer día.
                                                      </div>
                                                  </div>
                                                  <p className="mt-6 text-gray-700">
                                                      Recuerda asistir con la zona rasurada y con la piel limpia, sin cremas, sin maquillaje, desodorantes ni aceites en la zona a tratar para que podamos proceder con la sesión el mismo día.
                                                  </p>
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Para quién está dirigido el tratamiento Depilacion Trilaser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  <p className="mb-6 leading-relaxed text-gray-800">
                                                      Nuestro tratamiento está diseñado para quienes buscan una <span className="font-semibold text-indigo-700">solución definitiva, segura y profesional</span>. Es la alternativa líder para quienes desean dejar atrás los métodos tradicionales como la cera, cremas o rasuradoras, que suelen causar irritación y molestias constantes.
                                                  </p>
                                                  <div className="mb-4">
                                                      <h2 className="font-bold text-lg text-cyan-700 mb-2">Perfil del Candidato Ideal</h2>
                                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                                          <li><span className="font-semibold">Género:</span> Dirigido tanto a mujeres como a hombres que priorizan su higiene y salud cutánea.</li>
                                                          <li><span className="font-semibold">Tipos de Piel:</span> Efectivo en fototipos de piel desde el I hasta el IV.</li>
                                                          <li><span className="font-semibold">Tipos de Vello:</span> Actúa con éxito sobre vello fino, normal o grueso.</li>
                                                          <li><span className="font-semibold">Objetivo:</span> Personas que buscan eliminar definitivamente la irritación, los vellos encarnados (foliculitis) y la fricción por roce.</li>
                                                      </ul>
                                                  </div>
                                                  <div className="mt-6 p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded">
                                                      <h3 className="font-bold text-cyan-800 mb-1 flex items-center gap-2">
                                                          <span className="text-xl">⚠️</span> Consideraciones Importantes
                                                      </h3>
                                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                                          <li>Para garantizar la eficacia del tratamiento, es importante notar que el láser actúa sobre el pigmento del vello.</li>
                                                          <li>El tratamiento no es efectivo en vellos de color blanco o pelirrojo debido a la falta de pigmentación.</li>
                                                          <li>Se requiere una evaluación previa dentro de la primera sesión para determinar los parámetros exactos según tu tipo de piel y vello.</li>
                                                      </ul>
                                                  </div>
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pieles morenas y oscuras pueden utilizar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si se puede, con el láser ND Yag. Su longitud de onda de 1064 nm permite eliminar el vello
                                                  de forma efectiva sin dañar la piel. Esto minimiza el riesgo de efectos secundarios como
                                                  hiperpigmentación o quemaduras, algo especialmente importante al tratar pieles morenas.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Es seguro combinar acidos, serums, retinol mientras estoy en tratamiento de
                                                  depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Sí puedes combinarlos, pero no al mismo tiempo, debes suspender el uso al menos 1
                                                  semana antes, en caso de que no lo suspendas, tu piel puede terminar más roja e irritada de
                                                  lo que te gustaría, además pueden aparecer manchas o sufrir quemaduras en la piel.
                                                  Puedes retomar el uso 7 días después de realizada la sesión laser.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>






                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Me hice Plasma rico en plaquetas, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Para realizar depilación láser después de un tratamiento de Plasma Rico en Plaquetas,
                                                  debes esperar un mínimo de 15 días y presentar autorización del especialista, ya que un
                                                  intervalo de tiempo menor incrementa el riesgo de irritación y enrojecimiento en la piel
                                                  tratada.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Me inyecte Botox/Rellenos, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si la depilación láser y la aplicación de Bótox se realizan en áreas corporales diferentes, no
                                                  hay problema en combinar los procedimientos.
                                                  Si ambos tratamientos se aplican en la misma área, es vital esperar mínimo 15 días después
                                                  de recibir el Bótox para hacer la depilación láser. Esta precaución se debe a que la piel
                                                  tratada con Bótox puede estar más sensible, y la estimulación del láser podría aumentar el
                                                  riesgo de irritación o inflamación localizada.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Tengo Herpes, ¿Puedo ocupar depilación laser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Es fundamental no realizar el tratamiento durante brotes activos de herpes, ya que la luz del
                                                  láser puede irritar las áreas afectadas, prolongar la curación e incrementar el riesgo de
                                                  diseminación del virus. Por esta razón, antes de cualquier sesión, es crucial acudir al
                                                  médico para que evalúe la situación y determine si es necesario posponer la depilación
                                                  láser.
                                                  Protocolo y Cuidado
                                                  Se requiere una comunicación abierta y honesta con el profesional de la depilación láser,
                                                  informando inmediatamente si se siente alguna incomodidad o si hay signos de un brote
                                                  inminente. Además, se debe notificar al profesional si el paciente está usando alguna crema
                                                  o consumiendo algún medicamento considerado fotosensible.
                                                  El cuidado posterior es esencial e incluye mantener la piel hidratada, evitar la exposición
                                                  solar y abstenerse de rascar las zonas tratadas.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>




                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">Estoy con mi periodo ¿Puedo realizarme depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si puedes, ya que no hay ningún inconveniente o contraindicación en realizar depilación
                                                  láser durante la menstruación.
                                                  Sin embargo, la mayoría de los centros de estética aconsejan postergarla por motivos de
                                                  higiene.
                                                  Si decides realizar depilación láser durante los días de la menstruación, debes asistir con
                                                  tampón, higienizada y evitar en todo momento medicamentos para calmar el dolor o el
                                                  malestar, como el ibuprofeno, ya que este es un medicamento fotosensible, y ocasionaría
                                                  que la piel tuviera una reacción adversa al aplicar el láser..
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación láser sirve para pacientes con síndrome de ovarios poliquísticos?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  El Síndrome de Ovarios Poliquísticos (SOP) es un desorden endocrino que causa un
                                                  desequilibrio hormonal, específicamente la producción excesiva de andrógenos (hormonas
                                                  &quot;masculinas&quot;) en los ovarios.
                                                  Este desequilibrio hormonal conduce a la aparición vello excesivo (Hirsutismo) en áreas
                                                  poco comunes, más oscuro, grueso y difícil de eliminar con métodos tradicionales.
                                                  Este crecimiento de vello puede causar incomodidad, baja autoestima y problemas
                                                  emocionales.
                                                  Ante esto, la depilación láser se presenta como una alternativa efectiva y duradera para
                                                  reducir este tipo de vello, ayudando a las mujeres a recuperar la confianza.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con Diabetes pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Está completamente permitido en personas con diabetes, siempre que la enfermedad se
                                                  encuentre en tratamiento y compensada. Para garantizar la seguridad, si el paciente ha
                                                  iniciado o modificado su medicación recientemente, es esencial aplazar las sesiones hasta
                                                  alcanzar un control permanente y estable de su condición.
                                                  Debido a que la piel de las personas diabéticas es más sensible, existe un riesgo ligeramente
                                                  más elevado de efectos secundarios. Por ello, se deben tomar precauciones específicas:
                                                  1. Hidratación y Sol: Es crucial hidratarse lo suficiente los días antes y después de la
                                                  sesión, y evitar completamente la exposición al sol antes y después del tratamiento,
                                                  ya que la falta de hidratación y la exposición solar pueden causar daños cutáneos e
                                                  ineficacia.
                                                  2. Riesgo con la Insulina: Es una prohibición clave depilar con láser la zona donde se
                                                  ha inyectado insulina recientemente, o inyectar insulina en zonas recién depiladas.
                                                  El calor del láser en la zona de inyección puede aumentar la absorción del
                                                  medicamento y potencialmente causar un episodio de hipoglucemia (baja de
                                                  azúcar).
                                                  En conclusión, la depilación láser es una técnica segura y recomendada para la diabetes,
                                                  pero solo debe llevarse a cabo si se mantiene un control adecuado de la enfermedad.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿La depilación láser puede causar cáncer?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  No, la depilación láser no causa cáncer.
                                                  La depilación láser actúa de forma superficial. Esta técnica emite luz que es absorbida por
                                                  la melanina del vello, esto destruye el folículo piloso sin dañar los tejidos alrededor. Esta
                                                  energía no es ionizante, lo que significa que no altera el ADN, ni provoca mutaciones
                                                  celulares.
                                                  A diferencia de los rayos X o la radiación ultravioleta, la depilación láser no penetran la
                                                  piel. No afectan a los órganos internos.
                                                  Un paciente que atraviesa o atravesó tratamiento de Radioterapia ¿Puede realizarse
                                                  depilación laser?
                                                  En este sentido, el paciente en periodo de tratamiento no podrá por ningún motivo recibir
                                                  depilación láser.
                                                  Una vez resuelto el cáncer y habiendo transcurrido 5 años de la de haberse realizado el
                                                  tratamiento de radioterapia, el paciente podrá realizarse depilación láser, siempre y cuando
                                                  tenga autorización médica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>



                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Puedo utilizar depilación laser si tengo Dermatomiositis?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  La dermatomiositis es una enfermedad contraindicada de forma absoluta para la depilación
                                                  láser.La inflamación cutánea y la fragilidad asociadas con esta enfermedad hacen que
                                                  cualquier exposición a tratamientos láser sea potencialmente de riesgo.
                                                  Se recomienda siempre consultar con tu médico tratante sobre que tratamiento pudiera ser
                                                  viable ante tu patología o si autoriza el uso de la depilación laser según tu condición clínica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con VIH pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Sí, se puede, pero hay que hacerlo con responsabilidad.
                                                  Lo primero es hablar con tu médico, ya que, los medicamentos antirretrovirales, pueden
                                                  volver tu piel un poco más sensible. Eso no significa que no puedas hacerte el láser,
                                                  significa que hay que ajustarlo a ti. Sabemos que no se pueden suspender, es por esto que
                                                  necesitamos que tu doctor dé luz verde antes de comenzar. Ese pequeño certificado es la
                                                  tranquilidad de que tu piel está lista.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>


                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con LUPUS pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Pacientes con lupus se recomienda siempre consultar con tu médico tratante quien será el
                                                  indicado para abordar tu patología como corresponda y dar respuesta sobre que tratamiento
                                                  pudiera ser viable ante tu patología o si autoriza el uso de la depilación laser según tu
                                                  condición clínica.
                                                  Esta precaución debe ser estimada por los pacientes con lupus, debido a que la luz de la
                                                  depilación láser puede desencadenar brotes o reacciones cutáneas intensas, incluso si la
                                                  enfermedad se encuentra en remisión.
                                                  Por otra parte, los efectos adversos de la depilación láser en pacientes con lupus pueden
                                                  incluir irritación severa, manchas, lesiones dolorosas e incluso complicaciones sistémicas.
                                                  Por esta razón, el tratamiento con láser puede estar totalmente contraindicado.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>





                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Puedo utilizar depilación laser si tengo espinillas?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Si puedes utilizar depilación láser, uno de sus beneficios es que al reducir el crecimiento del
                                                  vello, también disminuye significativamente las obstrucciones foliculares que pueden
                                                  provocar brotes.
                                                  Esto se traduce en menos espinillas, menos inflamación y una piel visiblemente más
                                                  uniforme.
                                                  Si hablamos de espinillas o granitos, que surgen después del uso de cera o rasuradora, sí,
                                                  podemos utilizar depilación laser, ya que, en la mayoría de los casos, estas afecciones se
                                                  tratan de foliculitis, una inflamación del vello encarnado causada por fricción, obstrucción
                                                  del poro o bacterias que entran en la piel a través de la depilación por métodos
                                                  tradicionales.
                                                  Si tienes espinillas aisladas o piel con tendencia acneica, el tratamiento puede realizarse
                                                  normalmente, evitando directamente las lesiones inflamadas.
                                                  En casos de brotes activos, es posible que el profesional sugiera postergar la sesión en esa
                                                  zona para evitar irritaciones.
                                                  Nunca se deben aplicar sesiones sobre espinillas infectadas, heridas abiertas o zonas con
                                                  piel comprometida.
                                                  Es clave seguir las indicaciones previas y posteriores al tratamiento: mantener la piel
                                                  limpia, sin exposición al sol y evitando productos irritantes.
                                                  Otro aspecto para considerar sería aquellos pacientes con tratamientos de antibióticos,
                                                  isotretinoina, para lo cual estaría contraindicado el uso de láser, en un plazo no menor a los
                                                  6 meses.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>






                                      <Accordion className="w-full rounded-xl shadow-lg bg-white/90 border border-gray-200" type="single" collapsible>
                                          <AccordionItem value="item-1">
                                              <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4 bg-gradient-to-r from-cyan-100 via-white to-indigo-100 rounded-t-xl text-gray-800 w-full text-left">¿Pacientes con Vitiligo pueden realizarse depilación láser?</AccordionTrigger>
                                              <AccordionContent className="px-6 py-5 text-gray-700 text-base md:text-lg bg-white rounded-b-xl border-t border-gray-100">
                                                  Para quienes padecen vitíligo, la depilación láser presenta consideraciones y dilemas
                                                  específicos debido a la falta de pigmento (melanina), en las áreas afectadas la eficacia del
                                                  láser disminuye, llevando a resultados dispares donde el vello puede persistir, las zonas
                                                  hipopigmentadas podrían no requerir tratamiento, Las zonas con vitíligo son más sensibles
                                                  al sol y pueden serlo al láser, ya que la falta de melanina reduce la capacidad de la piel para
                                                  disipar el calor, existe un riesgo llamado Fenómeno de Koebner, aunque poco frecuente, de
                                                  que el láser desencadene una respuesta inflamatoria que afecte o exacerbe el vitíligo.
                                                  Se recomienda siempre consultar con tu médico tratante sobre que tratamiento pudiera ser
                                                  viable ante tu patología o si autoriza el uso de la depilación laser según tu condición clínica.
                                              </AccordionContent>
                                          </AccordionItem>
                                      </Accordion>
                                  </div>
                              </div>
                          )}
                          {/* ...otros bloques de contenido, como cuidados previos y posteriores, también pueden usar este mismo patrón de ancho y estilo... */}
                      </div>
                  </div>
              )}
          </div>

      </div>
    )
}