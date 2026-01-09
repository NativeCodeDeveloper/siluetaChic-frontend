// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";

// Añado metadata optimizada para SEO / indexación de búsqueda (Open Graph, Twitter, robots, keywords, canonical)
// Asunción: uso NEXT_PUBLIC_SITE_URL si está definida; si no, se usa https://macarrepuestos.cl como fallback.
export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://macarrepuestos.cl");

export const metadata = {
    title: {
        default: "MaCar Repuestos | Especialistas en Maxus",
        template: "%s | MaCar Repuestos",
    },
    description:
        "MaCar Repuestos - Repuestos, accesorios y piezas (originales y alternas) para vehículos Maxus. Stock disponible, envío a todo Chile y asesoría técnica especializada.",
    keywords: [
        "repuestos Maxus",
        "piezas Maxus",
        "repuestos Maxus Chile",
        "repuestos Maxus Santiago",
        "partes Maxus",
        "MaCar Repuestos",
        "Maxus repuestos",
        "T60",
        "T90",
        "V80",
    ],
    authors: [{ name: "MaCar Repuestos", url: metadataBase.href }],
    publisher: "MaCar Repuestos",
    robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: metadataBase.href,
    },
    openGraph: {
        title: "MaCar Repuestos | Repuestos para Maxus",
        description:
            "Repuestos, accesorios y piezas para Maxus — stock, envío a todo Chile y asesoría técnica.",
        url: metadataBase.href,
        siteName: "MaCar Repuestos",
        images: [
            {
                url: `${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`,
                width: 1200,
                height: 630,
                alt: "MaCar Repuestos - Logo",
            },
        ],
        locale: "es_CL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MaCar Repuestos | Repuestos para Maxus",
        description:
            "Repuestos, accesorios y piezas para Maxus — stock, envío a todo Chile y asesoría técnica.",
        images: [`${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`],
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="es">
            <body className="min-h-screen bg-white">
            {/* Aquí usamos el componente cliente que ya maneja Motion */}
            <AnimatedLayout>{children}</AnimatedLayout>
            </body>
            </html>
        </ClerkProvider>
    );
}