// app/page.jsx
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import { Case1 } from "@/Componentes/carruselMarcas";
import PostPortada from "@/app/(public)/postPortada/page";
import SeccionComuncacion from "@/app/(public)/seccionComuncacion/page";
import Testimonios from "@/app/(public)/testimonios/page";
import SeccionContacto from "@/app/(public)/seccionContacto/page";
import PortadaCelulares from "@/app/(public)/portadaCelulares/page";


export default function Home({ searchParams }) {


    return (
        <main>
            <Portada></Portada>
           <PortadaCelulares></PortadaCelulares>
            <PostPortada></PostPortada>
            <SeccionComuncacion></SeccionComuncacion>
            <Testimonios></Testimonios>

        </main>
    );
}