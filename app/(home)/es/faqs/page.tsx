'use client';

import BreadCrumb from 'components/breadCrum';
import { useState } from 'react';

const faqData = [
  {
    question: '¿Qué hace que los muebles de Vogue Decor tengan calidad comercial?',
    answer: 'Todos nuestros muebles están fabricados con materiales de alta calidad y diseñados para soportar el uso diario en espacios comerciales con mucho movimiento. Cada pieza combina durabilidad, comodidad y estilo para responder a las necesidades de restaurantes y establecimientos de hostelería.',
  },
  {
    question: '¿Ofrecen muebles para espacios interiores y exteriores?',
    answer: 'Sí. Ofrecemos una amplia selección de muebles de calidad comercial para interiores y exteriores, desde sillas de comedor y taburetes de bar hasta mesas para patio.',
  },
  {
    question: '¿Aceptan pedidos personalizados?',
    answer: 'Sí. Trabajamos con pedidos personalizados adaptados a las necesidades de cada proyecto. Ponte en contacto con nosotros para conocer las soluciones disponibles.',
  },
  {
    question: '¿Cómo puedo hacer un pedido para mi restaurante o cafetería?',
    answer: 'Puedes comprar directamente en línea, visitarnos en tienda o contactarnos para realizar un pedido personalizado. Nuestro equipo te ayudará con la selección, la personalización y la entrega.',
  },
  {
    question: '¿Existe un pedido mínimo para los pedidos personalizados?',
    answer: 'Sí. Los pedidos personalizados requieren un mínimo de 150 unidades o más. Nuestro equipo confirmará los detalles y preparará una cotización según las necesidades de tu proyecto.',
  },
  {
    question: '¿Cuánto suele tardar la entrega?',
    answer: 'Los plazos dependen de la ubicación y de la disponibilidad de los productos. Consulta la información de envío para conocer los detalles. Los pedidos personalizados pueden variar según el proyecto y el calendario de producción.',
  },
  {
    question: '¿Ofrecen ayuda con el diseño o la distribución de restaurantes?',
    answer: 'Sí. Nuestro equipo puede ayudarte a planificar la distribución y recomendar productos para que tu espacio sea funcional y coherente.',
  },
  {
    question: '¿De qué materiales están hechas sus sillas y mesas?',
    answer: 'Utilizamos materiales premium como acero inoxidable, madera maciza, HPL y cuero sintético de microfibra, todos seleccionados por su resistencia, fácil mantenimiento y durabilidad.',
  },
  {
    question: '¿Sus productos tienen garantía?',
    answer: 'Sí. Nuestros productos de calidad comercial cuentan con una garantía limitada del fabricante de un año.',
  },
  {
    question: '¿Cómo se limpian y mantienen los muebles de calidad comercial?',
    answer: 'La mayoría de nuestros muebles puede limpiarse con un paño suave y jabón neutro. Evita los productos químicos agresivos y los materiales abrasivos para proteger los acabados y las telas.',
  },
  {
    question: '¿Puedo ver muestras o visitar su showroom antes de comprar?',
    answer: 'Sí. Puedes visitar nuestro showroom durante el horario de atención o concertar una cita para ver nuestra selección de muebles y acabados.',
  },
  {
    question: '¿Ofrecen precios mayoristas o descuentos profesionales?',
    answer: 'Está disponible bajo consulta. Ponte en contacto con nosotros para obtener más información.',
  },
];

export default function SpanishFAQsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <>
      <div className="relative h-60 w-full md:h-72">
        <img
          src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50"
          alt="Banner principal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="min-h-screen bg-white px-4 py-16 text-gray-900 md:px-16">
        <div className="mb-4">
          <BreadCrumb currentPage="FAQs" />
        </div>
        <h1 className="mb-8 text-3xl font-bold">Preguntas frecuentes</h1>
        <div className="mx-auto max-w-4xl">
          {faqData.map((faq, index) => (
            <div key={faq.question} className="border-b border-gray-200">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="flex w-full items-center justify-between py-6 text-left font-medium transition-colors hover:bg-gray-50"
              >
                <span className="pr-4 text-md">{faq.question}</span>
                <span className="flex-shrink-0 text-xl">{openAccordion === index ? '−' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-6 text-sm text-gray-700">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
