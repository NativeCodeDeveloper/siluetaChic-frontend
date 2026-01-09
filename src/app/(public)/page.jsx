// app/page.jsx
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import { Case1 } from "@/Componentes/carruselMarcas";
import PostPortada from "@/app/(public)/postPortada/page";
import SeccionComuncacion from "@/app/(public)/seccionComuncacion/page";
import Testimonios from "@/app/(public)/testimonios/page";



export default function Home({ searchParams }) {


    return (
        <main>
            <Portada>
            </Portada>
            <PostPortada></PostPortada>
            <SeccionComuncacion></SeccionComuncacion>
            <Testimonios></Testimonios>
        </main>
    );
}