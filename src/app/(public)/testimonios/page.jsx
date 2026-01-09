import TestimonialCard from "@/Componentes/TestimonialCard";



export default function Testimonios() {
    return (
        <section className="mt-50 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    Lo que dicen  <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">nuestras clientas</span>
                </h1>

                <p className="mt-4 text-gray-500 text-lg">
                    Experiencias reales de personas que confiaron en nosotros
                </p>





                <div className="mt-30 grid grid-cols-1 md:grid-cols-4 gap-10">


                    <TestimonialCard
                        nombre="María C."
                        puntuacion={5}
                        servicio="Piernas Completas"
                        comentario="La mejor inversión que he hecho. Los resultados son increíbles y el trato es excelente. Ya no tengo que preocuparme por depilarme constantemente."
                    />

                    <TestimonialCard
                        nombre="Laura P."
                        puntuacion={5}
                        servicio="Rostro Completo"
                        comentario="Profesionales de verdad. Me explicaron todo el proceso, me sentí segura en todo momento. Los resultados superaron mis expectativas."
                    />

                    <TestimonialCard
                        nombre="Carolina R."
                        puntuacion={5}
                        servicio="Pack Completo"
                        comentario="Rápido, eficiente y sin dolor. Llevaba años buscando algo así. Totalmente recomendado para quienes quieren olvidarse del vello."
                    />

                    <TestimonialCard
                        nombre="Andrea Z."
                        puntuacion={5}
                        servicio="Pack Completo"
                        comentario="Tenia miedo pero el trato fue exepcional , lo recomiendo 100 % No tuve irritacion ni ningun problema despues de las sesiones ademas son muy amables."
                    />







                </div>
            </div>
        </section>
    );
}