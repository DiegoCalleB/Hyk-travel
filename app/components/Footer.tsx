import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" style={{ marginBottom: "1rem" }}>
              <div className="logo-mark" style={{ width: "130px", height: "85px" }}>
                <svg viewBox="0 0 200 80" fill="none">
                  <path d="M15 35 Q 30 15, 70 22 Q 110 28, 130 45 Q 115 60, 75 55 Q 25 50, 15 35 Z" fill="#6DD5D0" opacity="0.75" />
                  <text x="65" y="48" fontFamily="var(--font-playfair), serif" fontSize="32" fontWeight="500" fill="#FAF7F2" letterSpacing="-1">HyK</text>
                  <text x="65" y="65" fontFamily="var(--font-outfit), sans-serif" fontSize="10" fontWeight="400" fill="#FAF7F2" letterSpacing="3">TRAVEL</text>
                  <path d="M138 28 L155 22 L150 30 L160 28 L152 36 L145 36 Z" fill="#FF6B8A" />
                </svg>
              </div>
            </Link>
            <p>Tu agencia de viajes en Madrid. Diseñamos experiencias únicas con asesoramiento humano, creatividad y flexibilidad total. Atención 24h.</p>
          </div>
          <div className="footer-col">
            <h4>Tipos de viaje</h4>
            <ul>
              <li><Link href="/luna-de-miel">Luna de miel</Link></li>
              <li><Link href="/familia">Familia</Link></li>
              <li><Link href="/grupos">Grupos</Link></li>
              <li><Link href="/single">Single</Link></li>
              <li><Link href="/viajes-55">Viajes +55</Link></li>
              <li><Link href="/corporativos">Corporativos</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Más páginas</h4>
            <ul>
              <li><Link href="/animales">Animales</Link></li>
              <li><Link href="/lista-de-boda">Lista de boda</Link></li>
              <li><Link href="/viajes-cam">Viajes CAM</Link></li>
              <li><Link href="/ocio">Ocio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal y Contacto</h4>
            <ul>
              <li><Link href="/terminos-y-condiciones">Términos y condiciones</Link></li>
              <li><Link href="/formulario-de-desistimiento">Formulario de desistimiento</Link></li>
              <li><Link href="/aviso-legal">Aviso legal</Link></li>
              <li><Link href="/politica-de-privacidad">Política de privacidad</Link></li>
              <li><Link href="/proteccion-de-datos">Protección de datos</Link></li>
              <li><Link href="/uso-de-cookies">Uso de cookies</Link></li>
              <li><Link href="/accesibilidad">Accesibilidad</Link></li>
              <li style={{ marginTop: "1rem" }}><a href="tel:+34648659370">📞 (+34) 648 659 370</a></li>
              <li><a href="mailto:info@hyktravel.es">✉️ info@hyktravel.es</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HyK Travel. Todos los derechos reservados.</p>
        </div>
      </footer>

      <a href="https://api.whatsapp.com/send?phone=34648659370" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
