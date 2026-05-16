import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define the content for each dynamic page
const PAGES_CONTENT: Record<string, { title: string; subtitle: string; icon?: string; content: () => React.ReactNode }> = {
  "luna-de-miel": {
    title: "Luna de Miel",
    subtitle: "El viaje más especial de vuestras vidas",
    icon: "💑",
    content: () => (
      <div className="page-content">
        <p>Diseñamos vuestra luna de miel a medida con hoteles románticos, experiencias exclusivas (cenas en la playa, spas privados) y destinos paradisíacos como Maldivas, Bali, Polinesia o safaris en África con extensión a playa.</p>
        <p>Cuidamos cada detalle para que solo tengáis que preocuparos de disfrutar y crear recuerdos inolvidables.</p>
      </div>
    ),
  },
  "familia": {
    title: "Viajes en Familia",
    subtitle: "Aventuras para todas las edades",
    icon: "👪",
    content: () => (
      <div className="page-content">
        <p>Creamos viajes familiares con actividades pensadas para niños y adultos. Desde escapadas a parques temáticos como Disneyland París hasta safaris adaptados o resorts Todo Incluido en el Caribe.</p>
        <p>Aseguramos habitaciones familiares, traslados cómodos y un ritmo de viaje adecuado para toda la familia.</p>
      </div>
    ),
  },
  "grupos": {
    title: "Viajes en Grupo",
    subtitle: "Descubrir el mundo en buena compañía",
    icon: "🚌",
    content: () => (
      <div className="page-content">
        <p>Circuitos organizados con guía de habla hispana, traslados, visitas incluidas y alojamientos seleccionados. Ideal para conocer gente nueva o viajar con tu grupo de amigos o asociación.</p>
        <p>Ofrecemos salidas regulares y grupos exclusivos a medida.</p>
      </div>
    ),
  },
  "single": {
    title: "Viajes Single",
    subtitle: "Viaja a tu aire o con otros singles",
    icon: "👤",
    content: () => (
      <div className="page-content">
        <p>Grupos exclusivos para personas que viajan solas. Una oportunidad fantástica para explorar nuevos destinos y ampliar tu círculo de amistades.</p>
        <p>Posibilidad de compartir habitación para ahorrar el suplemento individual, o disfrutar de tu propia privacidad. ¡Tú decides!</p>
      </div>
    ),
  },
  "viajes-55": {
    title: "Viajes +55",
    subtitle: "Momentos para disfrutar sin prisas",
    icon: "🌅",
    content: () => (
      <div className="page-content">
        <p>Propuestas culturales, de relax y circuitos diseñados para mayores de 55 años. Viajes con un ritmo más relajado, guías expertos y servicios premium.</p>
        <p>Nos ocupamos del equipaje, los seguros de viaje y cualquier necesidad especial.</p>
      </div>
    ),
  },
  "corporativos": {
    title: "Viajes Corporativos",
    subtitle: "Servicios integrales para empresas",
    icon: "💼",
    content: () => (
      <div className="page-content">
        <p>Gestión eficiente de viajes de negocios, eventos de empresa, incentivos y congresos. Optimizamos su presupuesto y ahorramos tiempo a sus empleados.</p>
        <p>Atención 24/7 para imprevistos y facturación simplificada.</p>
      </div>
    ),
  },
  "animales": {
    title: "Viajar con Animales",
    subtitle: "Tus mejores amigos también viajan",
    icon: "🐾",
    content: () => (
      <div className="page-content">
        <p>Sabemos lo importante que es tu mascota. Organizamos escapadas pet-friendly, vuelos en cabina o bodega con todas las garantías y alojamientos que admiten animales de compañía.</p>
        <p>Te asesoramos sobre la documentación sanitaria necesaria para cada destino.</p>
      </div>
    ),
  },
  "lista-de-boda": {
    title: "Lista de Boda",
    subtitle: "El mejor regalo es el mundo",
    icon: "🎁",
    content: () => (
      <div className="page-content">
        <p>Abrid vuestra lista de boda en HyK Travel. Vuestros invitados podrán regalaros etapas del viaje o aportaciones económicas para hacer realidad la luna de miel de vuestros sueños.</p>
        <p>Gestión online 100% gratuita y diseño de tarjetas personalizadas para las invitaciones.</p>
      </div>
    ),
  },
  "viajes-cam": {
    title: "Viajes CAM",
    subtitle: "Comunidad de Madrid",
    icon: "🏛️",
    content: () => (
      <div className="page-content">
        <p>Escapadas e itinerarios financiados o bonificados para residentes en la Comunidad de Madrid. Somos agencia adherida para la gestión de bonos turísticos y programas oficiales.</p>
      </div>
    ),
  },
  "ocio": {
    title: "Ocio y Entradas",
    subtitle: "Complementa tu viaje",
    icon: "🎭",
    content: () => (
      <div className="page-content">
        <p>Venta de entradas para musicales, parques temáticos, museos, excursiones de un día y experiencias gastronómicas.</p>
      </div>
    ),
  },
  "blog": {
    title: "Blog de Viajes",
    subtitle: "Inspiración para tu próxima aventura",
    icon: "📝",
    content: () => (
      <div className="page-content">
        <p>Descubre guías de destinos, consejos útiles para hacer la maleta, normativas de viaje y mucho más. Próximamente publicaremos artículos de nuestros viajeros.</p>
      </div>
    ),
  },
  "terminos-y-condiciones": {
    title: "Términos y Condiciones",
    subtitle: "Condiciones generales de contratación",
    content: () => (
      <div className="page-content legal-content">
        <h3>1. Regulación Jurídica Aplicable</h3>
        <p>Las presentes Condiciones Generales están sujetas a lo dispuesto en el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios.</p>
        <h3>2. Organización</h3>
        <p>La organización técnica de los viajes combinados contenidos en este sitio web es realizada por HyK Travel, Agencia de Viajes con licencia y domicilio en Madrid.</p>
        <h3>3. Precios y Pagos</h3>
        <p>Los precios están indicados en Euros e incluyen los impuestos aplicables. En el momento de la confirmación de la reserva deberá abonarse un depósito, y el resto antes de la entrega de la documentación.</p>
        <h3>4. Anulaciones y Cesiones</h3>
        <p>En todo momento el usuario puede desistir de los servicios solicitados, teniendo derecho a la devolución de las cantidades que hubiera abonado, pero debiendo indemnizar a la agencia con los gastos de gestión y penalización previstos.</p>
      </div>
    ),
  },
  "formulario-de-desistimiento": {
    title: "Formulario de Desistimiento",
    subtitle: "Ejercicio del derecho de desistimiento",
    content: () => (
      <div className="page-content legal-content">
        <p>(Sólo debe cumplimentar y enviar el presente formulario si desea desistir del contrato)</p>
        <div style={{ padding: "2rem", background: "#fff", borderRadius: "12px", border: "1px solid var(--sand)" }}>
          <p><strong>A la atención de:</strong> HyK Travel<br/><strong>Email:</strong> info@hyktravel.es<br/><strong>Teléfono:</strong> 648 659 370</p>
          <p style={{ marginTop: "2rem" }}>Por la presente le comunico que desisto de mi contrato de viaje / prestación de servicios:</p>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><strong>Referencia de la reserva:</strong> ___________________________________</li>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><strong>Fecha de la reserva:</strong> __________________________________________</li>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><strong>Nombre del consumidor:</strong> ________________________________________</li>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}><strong>Domicilio del consumidor:</strong> ______________________________________</li>
          </ul>
          <p style={{ marginTop: "3rem" }}><strong>Firma:</strong> ___________________________ <strong>Fecha:</strong> ___________________</p>
        </div>
      </div>
    ),
  },
  "aviso-legal": {
    title: "Aviso Legal",
    subtitle: "Información legal del sitio web",
    content: () => (
      <div className="page-content legal-content">
        <h3>1. Información Corporativa</h3>
        <p>En virtud de las obligaciones establecidas por la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, le informamos que el presente sitio web es propiedad de HyK Travel, con dirección en Madrid y correo de contacto info@hyktravel.es.</p>
        <h3>2. Propiedad Intelectual e Industrial</h3>
        <p>Todos los contenidos, textos, imágenes, y códigos fuente son propiedad de HyK Travel o de terceros a los que se han adquirido sus derechos de explotación, y están protegidos por los derechos de Propiedad Intelectual e Industrial.</p>
        <h3>3. Limitación de Responsabilidad</h3>
        <p>HyK Travel no se hace responsable de posibles errores en los contenidos, ni de los daños o perjuicios que pudieran derivarse de interferencias omisiones, interrupciones, virus informáticos o averías telefónicas.</p>
      </div>
    ),
  },
  "politica-de-privacidad": {
    title: "Política de Privacidad",
    subtitle: "Cómo tratamos tu información",
    content: () => (
      <div className="page-content legal-content">
        <h3>RESPONSABLE</h3>
        <p>HyK Travel. Contacto DPO: info@hyktravel.es</p>
        <h3>FINALIDAD</h3>
        <p>Gestión de las reservas de viajes combinados, servicios turísticos sueltos y envío de información comercial en caso de consentimiento expreso.</p>
        <h3>LEGITIMACIÓN</h3>
        <p>Ejecución de un contrato e interés legítimo. Para el envío de boletines informativos (newsletter), la legitimación será el consentimiento del usuario.</p>
        <h3>CONSERVACIÓN DE LOS DATOS</h3>
        <p>Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales (ej. 5 años para ley de viajes combinados).</p>
        <h3>DESTINATARIOS</h3>
        <p>Los datos se comunicarán a proveedores de servicios turísticos (hoteles, aerolíneas, touroperadores) para la formalización y ejecución de la reserva.</p>
      </div>
    ),
  },
  "proteccion-de-datos": {
    title: "Protección de Datos",
    subtitle: "Tus derechos ARCO",
    content: () => (
      <div className="page-content legal-content">
        <p>De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 relativo a la protección de datos de las personas físicas (RGPD), se le informa sobre el tratamiento de sus datos.</p>
        <h3>Derechos del Usuario</h3>
        <p>Cualquier persona tiene derecho a obtener confirmación sobre si en HyK Travel estamos tratando datos personales que les conciernan, o no.</p>
        <ul>
          <li><strong>Derecho de Acceso:</strong> Conocer qué datos suyos estamos tratando.</li>
          <li><strong>Derecho de Rectificación:</strong> Solicitar la corrección de datos inexactos.</li>
          <li><strong>Derecho de Supresión (Olvido):</strong> Solicitar que eliminemos sus datos en determinadas circunstancias.</li>
          <li><strong>Derecho a la Limitación:</strong> Solicitar la congelación temporal del tratamiento en ciertos supuestos.</li>
          <li><strong>Derecho a la Portabilidad:</strong> Obtener sus datos en formato electrónico estructurado.</li>
        </ul>
        <p>Para ejercitar estos derechos, puede dirigir un escrito adjuntando fotocopia de su DNI a info@hyktravel.es.</p>
      </div>
    ),
  },
  "uso-de-cookies": {
    title: "Política de Cookies",
    subtitle: "Información sobre cookies y tecnologías de rastreo",
    content: () => (
      <div className="page-content legal-content">
        <h3>¿Qué son las cookies?</h3>
        <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>
        <h3>Tipos de cookies que utilizamos</h3>
        <ul>
          <li><strong>Cookies técnicas:</strong> Necesarias para la navegación y el buen funcionamiento de la web.</li>
          <li><strong>Cookies de análisis:</strong> Tratadas por nosotros o terceros para cuantificar el número de usuarios y realizar medición estadística.</li>
          <li><strong>Cookies comportamentales:</strong> Permiten la gestión eficaz de los espacios publicitarios.</li>
        </ul>
        <h3>Revocación y eliminación de cookies</h3>
        <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador.</p>
      </div>
    ),
  },
  "accesibilidad": {
    title: "Accesibilidad",
    subtitle: "Compromiso con la accesibilidad web",
    content: () => (
      <div className="page-content legal-content">
        <p>En HyK Travel estamos comprometidos con hacer que nuestro sitio web sea accesible y utilizable por todas las personas, independientemente de sus capacidades técnicas o físicas.</p>
        <p>Hemos diseñado este portal siguiendo las pautas de accesibilidad WCAG 2.1 buscando alcanzar un nivel AA.</p>
        <h3>Medidas adoptadas</h3>
        <ul>
          <li>Uso de semántica HTML clara.</li>
          <li>Contraste suficiente entre colores de texto y fondo (relación mínima 4.5:1).</li>
          <li>Imágenes acompañadas de texto alternativo.</li>
          <li>Navegación usable mediante teclado.</li>
        </ul>
        <p>Si encuentra alguna dificultad para acceder a la información, por favor contacte con nosotros en info@hyktravel.es y le facilitaremos el contenido a la mayor brevedad.</p>
      </div>
    ),
  },
};

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = PAGES_CONTENT[slug];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="dynamic-page">
      <div className="page-header" style={{ 
        padding: "5rem 2rem", 
        background: "var(--ink)", 
        color: "white",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {pageData.icon && (
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{pageData.icon}</div>
          )}
          <h1 style={{ 
            fontFamily: "var(--font-playfair), serif", 
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            marginBottom: "1rem",
            lineHeight: 1.1
          }}>
            {pageData.title}
          </h1>
          <p style={{ 
            fontSize: "1.2rem", 
            opacity: 0.9,
            fontFamily: "var(--font-outfit)"
          }}>
            {pageData.subtitle}
          </p>
        </div>
      </div>
      
      <div className="page-container" style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "4rem 2rem"
      }}>
        <div className="content-wrapper" style={{
          background: "white",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "var(--ink-soft)"
        }}>
          {pageData.content()}
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <p style={{ marginBottom: "1.5rem", fontWeight: 500 }}>¿Listo para empezar tu viaje a medida?</p>
          <Link href="/#contacto" className="btn-primary" style={{ display: "inline-block" }}>
            Solicitar Presupuesto Gratuito
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .page-content p { margin-bottom: 1.5rem; }
        .legal-content h3 { color: var(--ink); font-family: var(--font-playfair); font-size: 1.5rem; margin: 2rem 0 1rem; }
        .legal-content ul { margin-left: 1.5rem; margin-bottom: 1.5rem; }
        .legal-content li { margin-bottom: 0.5rem; }
        @media (max-width: 768px) {
          .content-wrapper { padding: 2rem !important; }
        }
      `}} />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(PAGES_CONTENT).map((slug) => ({
    slug,
  }));
}
