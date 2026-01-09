"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56995043704" // tu número con código de país
            accountName="Macar Repuestos Chile"
            avatar="/logoOriginal.png" // opcional: logo o imagen en public/
            statusMessage=""
            chatMessage="¡Hola! 👋 ¿Que repuestos estas buscando?"
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}