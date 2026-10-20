'use client';

import BreadCrumb from 'components/breadCrum';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const tabs = [
  {
    id: 'terms',
    label: 'Términos',
    content: (
      <>
        <p className="text-xs"><strong>VOGUE DECOR</strong></p>
        <p className="text-xs"><strong>Fecha de entrada en vigor:</strong> 2025-10-01</p>
        <h2 className="mt-4 text-sm font-semibold">1. Aceptación de los términos</h2>
        <p className="text-xs">Te damos la bienvenida al sitio web de Vogue Decor, vogue-decor.com (el «Sitio»). Al acceder o utilizar el Sitio, confirmas que has leído, entendido y aceptado estos términos de servicio, tanto si tienes una cuenta como si no.</p>
        <p className="text-xs"><strong>SI NO ACEPTAS ESTOS TÉRMINOS, NO UTILICES EL SITIO.</strong></p>
        <h2 className="mt-4 text-sm font-semibold">2. Cuenta y seguridad</h2>
        <p className="text-xs">Puedes crear una cuenta para agilizar el pago y guardar tus direcciones. Mantén tus credenciales en privado y avisa inmediatamente a nuestro equipo si sospechas que alguien ha accedido a tu cuenta sin autorización.</p>
        <h2 className="mt-4 text-sm font-semibold">3. Pedidos y formación del contrato</h2>
        <p className="text-xs">Un pedido realizado en el Sitio constituye una oferta para comprar los productos indicados. El contrato vinculante se forma cuando enviamos una confirmación del pedido o un aviso de envío. Podemos cancelar o rechazar pedidos por errores de precio, disponibilidad u otros motivos razonables.</p>
        <h2 className="mt-4 text-sm font-semibold">4. Precios y pagos</h2>
        <p className="text-xs">Los precios se muestran en CAD salvo que se indique lo contrario y no incluyen impuestos ni gastos de envío, a menos que se especifique expresamente. Los importes finales se calculan al pagar.</p>
        <h2 className="mt-4 text-sm font-semibold">5. Envíos y recogida</h2>
        <p className="text-xs"><strong>Envío gratuito:</strong> Los pedidos superiores a $2,999 en Canadá pueden recibir envío gratuito durante las promociones aplicables.</p>
        <p className="text-xs">Los plazos habituales de transporte son estimados y pueden variar según la ubicación, el producto y el transportista. La recogida está disponible en Montreal y Toronto; algunas recogidas en Toronto requieren dos días hábiles de aviso.</p>
        <p className="text-xs">Consulta nuestra <Link className="text-black underline" href="/es/terms-and-conditions?tab=shipping">política de envíos y devoluciones</Link>.</p>
        <h2 className="mt-4 text-sm font-semibold">6. Devoluciones, cancelaciones y reembolsos</h2>
        <p className="text-xs">Las devoluciones y los cambios se rigen por nuestra política de devoluciones. El plazo estándar es de 14 días después de la entrega para los artículos elegibles. Los pedidos personalizados o comerciales pueden tener condiciones especiales.</p>
        <h2 className="mt-4 text-sm font-semibold">7. Garantía y cuidado de los productos</h2>
        <p className="text-xs">Garantizamos que nuestros productos están libres de defectos de fabricación durante el periodo indicado en la página del producto. Si no se indica otro plazo, la garantía estándar es de 12 meses desde la entrega. El desgaste normal, el uso indebido y los daños accidentales no están cubiertos.</p>
        <h2 className="mt-4 text-sm font-semibold">8. Limitación de responsabilidad</h2>
        <p className="text-xs">En la medida permitida por la ley, nuestra responsabilidad por reclamaciones relacionadas con tu compra o el uso de los productos se limita al precio de compra de los productos afectados.</p>
        <h2 className="mt-4 text-sm font-semibold">9. Propiedad intelectual</h2>
        <p className="text-xs">Todo el contenido del Sitio, incluidos textos, imágenes, diseños, marcas y código, pertenece a Vogue Decor o se utiliza bajo licencia. No puedes reproducirlo ni distribuirlo sin autorización previa por escrito.</p>
        <h2 className="mt-4 text-sm font-semibold">10. Privacidad y cookies</h2>
        <p className="text-xs">Nuestra <Link className="text-black underline" href="/es/terms-and-conditions?tab=privacy">política de privacidad</Link> explica cómo recopilamos y utilizamos los datos personales.</p>
        <h2 className="mt-4 text-sm font-semibold">11. Ley aplicable</h2>
        <p className="text-xs">Estos términos se rigen por las leyes de la provincia de Quebec y las leyes federales de Canadá que resulten aplicables.</p>
        <h2 className="mt-4 text-sm font-semibold">12. Idioma</h2>
        <p className="text-xs">Si eres consumidor en Quebec, puedes solicitar una versión oficial en francés de estos términos.</p>
        <h2 className="mt-4 text-sm font-semibold">13. Cambios en los términos</h2>
        <p className="text-xs">Podemos actualizar estos términos. Los cambios importantes se publicarán en esta página con una nueva fecha de entrada en vigor.</p>
        <h2 className="mt-4 text-sm font-semibold">14. Contacto</h2>
        <p className="text-xs">Atención al cliente: +1 (888) 880-8232<br />Correo electrónico: info@voguedecor.com</p>
      </>
    ),
  },
  {
    id: 'privacy',
    label: 'Privacidad',
    content: (
      <>
        <p className="text-xs"><strong>VOGUE DECOR</strong></p>
        <p className="text-xs"><strong>Fecha de entrada en vigor:</strong> 2025-10-01</p>
        <h2 className="mt-4 text-sm font-semibold">1. Introducción</h2>
        <p className="text-xs">Vogue Decor respeta la privacidad y la seguridad de tu información personal. Esta política explica qué datos recopilamos al utilizar nuestros servicios, cómo los usamos y qué opciones tienes a tu disposición.</p>
        <h2 className="mt-4 text-sm font-semibold">2. Información que recopilamos</h2>
        <ul className="list-none pl-6 text-xs">
          <li>Identidad y contacto: nombre, empresa, correo electrónico, teléfono y direcciones.</li>
          <li>Cuenta: nombre de usuario, contraseña cifrada y preferencias.</li>
          <li>Transacciones: pedidos, facturas, devoluciones y reclamaciones.</li>
          <li>Datos técnicos: dirección IP, navegador, dispositivo y analítica.</li>
          <li>Marketing y atención al cliente: preferencias, comunicaciones y solicitudes.</li>
        </ul>
        <h2 className="mt-4 text-sm font-semibold">3. Cómo utilizamos la información</h2>
        <p className="text-xs">Utilizamos la información para procesar pedidos y pagos, organizar envíos y devoluciones, prestar atención al cliente, mejorar y proteger el Sitio, enviar comunicaciones relacionadas con tus pedidos y cumplir nuestras obligaciones legales.</p>
        <h2 className="mt-4 text-sm font-semibold">4. Conservación y seguridad</h2>
        <p className="text-xs">Conservamos la información durante el tiempo necesario para prestar nuestros servicios, cumplir obligaciones legales y resolver disputas. Aplicamos medidas razonables para protegerla, aunque ningún sistema puede garantizar una seguridad absoluta.</p>
        <h2 className="mt-4 text-sm font-semibold">5. Contacto sobre privacidad</h2>
        <p className="text-xs">Para preguntas sobre privacidad, escribe a info@voguedecor.com o llama al +1 (888) 880-8232.</p>
      </>
    ),
  },
  {
    id: 'shipping',
    label: 'Envíos y devoluciones',
    content: (
      <>
        <p className="text-xs"><strong>VOGUE DECOR</strong></p>
        <h2 className="mt-4 text-sm font-semibold">Envíos</h2>
        <p className="text-xs">Los gastos y los plazos de envío dependen del producto, el destino y el transportista. Los plazos indicados son estimados y pueden cambiar durante periodos de alta demanda.</p>
        <h2 className="mt-4 text-sm font-semibold">Preparación</h2>
        <p className="text-xs">Los artículos que requieren preparación pueden tardar entre 10 y 15 días hábiles antes de salir del almacén. Te informaremos si tu pedido necesita un plazo diferente.</p>
        <h2 className="mt-4 text-sm font-semibold">Devoluciones y cambios</h2>
        <p className="text-xs">Los artículos elegibles pueden devolverse dentro de los 14 días posteriores a la entrega. Los artículos personalizados, comerciales o marcados como venta final pueden no admitir devoluciones. Ponte en contacto con atención al cliente antes de enviar cualquier devolución.</p>
        <h2 className="mt-4 text-sm font-semibold">Reembolsos</h2>
        <p className="text-xs">Los reembolsos se emiten al método de pago original después de recibir e inspeccionar los productos devueltos.</p>
        <h2 className="mt-4 text-sm font-semibold">Contacto</h2>
        <p className="text-xs">Para consultas sobre envíos y devoluciones, escribe a info@voguedecor.com o llama al +1 (888) 880-8232.</p>
      </>
    ),
  },
];

export default function SpanishTermsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'terms';
    setActiveTab(tab);
  }, [searchParams]);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content ?? tabs[0]?.content;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 md:px-8">
      <BreadCrumb currentPage="Terms of Service" />
      <h1 className="mb-6 text-3xl font-bold">Términos, privacidad y envíos</h1>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              router.push(`/es/terms-and-conditions?tab=${tab.id}`);
            }}
            className={`px-4 py-2 text-sm ${activeTab === tab.id ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <article className="space-y-2 text-gray-800">{activeContent}</article>
    </div>
  );
}
