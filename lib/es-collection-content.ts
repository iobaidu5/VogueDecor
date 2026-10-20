type ArticleBlock = {
  type: 'heading' | 'paragraph';
  level?: number;
  text?: string;
  content?: Array<{ type: string; text: string; bold?: boolean }>;
};

const paragraph = (text: string): ArticleBlock => ({
  type: 'paragraph',
  content: [{ type: 'p', text, bold: false }],
});

const collectionContent = (title: string, description: string): ArticleBlock[] => [
  { type: 'heading', level: 1, text: title },
  paragraph(description),
];

export const esCollectionContent: Record<string, ArticleBlock[]> = {
  chairs: collectionContent(
    'Sillas para restaurantes',
    'Encuentra sillas comerciales que combinan comodidad, resistencia y personalidad. Desde acabados de madera hasta diseños tapizados, cada pieza está pensada para acompañar el ritmo de un restaurante, una cafetería o un espacio de hostelería.',
  ),
  barstools: collectionContent(
    'Taburetes de bar para restaurantes',
    'Nuestros taburetes de bar aportan altura, comodidad y carácter a barras, islas y mesas altas. Elige entre diseños con respaldo, opciones giratorias y materiales fáciles de mantener para crear un espacio que invite a quedarse.',
  ),
  'table-tops': collectionContent(
    'Cubiertas de mesa para restaurantes',
    'Crea una mesa que se adapte a tu espacio con cubiertas duraderas y fáciles de combinar. Nuestros acabados ayudan a definir el ambiente y funcionan con una amplia variedad de bases comerciales.',
  ),
  'table-bases': collectionContent(
    'Bases de mesa para restaurantes',
    'Una buena base aporta estabilidad y completa el diseño de la mesa. Explora opciones de hierro y metal pensadas para soportar el uso diario y combinar con distintas cubiertas.',
  ),
  'outdoor-furniture': collectionContent(
    'Mobiliario exterior para restaurantes',
    'Amplía tu experiencia al aire libre con muebles comerciales diseñados para patios, terrazas y espacios exteriores. Elige piezas resistentes que mantengan su estilo durante toda la temporada.',
  ),
  sale: collectionContent(
    'Ofertas en mobiliario para restaurantes',
    'Descubre oportunidades en sillas, taburetes, mesas y otros artículos seleccionados. Las existencias son limitadas y todos los productos de esta sección se venden como venta final.',
  ),
  booth: collectionContent(
    'Cabinas para restaurantes',
    'Las cabinas aportan comodidad y una sensación más acogedora a cualquier comedor. Encuentra configuraciones comerciales pensadas para proyectos de restaurantes, cafeterías y espacios de hostelería.',
  ),
};
