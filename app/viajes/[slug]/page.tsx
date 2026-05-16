import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTripBySlug } from "../../lib/trips";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const msg = encodeURIComponent(
    `¡Hola HyK Travel 👋! Me gustaría consultar disponibilidad para el viaje: ${trip.titulo}.`
  );
  const waLink = `https://api.whatsapp.com/send?phone=34648659370&text=${msg}`;

  const fechas = (trip.fechas || "")
    .split(",")
    .map((f: string) => f.trim())
    .filter((f: string) => f);

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--cream)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <div className="trip-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", background: "white", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
            
            {/* Left side: Image */}
            <div style={{ width: "100%", height: "100%", background: "var(--sand)", minHeight: "400px", position: "relative" }}>
               <img src={trip.imagen || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85"} alt={trip.titulo} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            </div>

            {/* Right side: Content */}
            <div style={{ padding: "3rem 3rem 3rem 0" }}>
              <div className="trip-meta" style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem", color: "var(--ink-soft)" }}>
                <span style={{ background: "rgba(109, 213, 208, 0.15)", color: "var(--teal)", padding: "0.25rem 0.75rem", borderRadius: "100px", fontWeight: 500, fontSize: "0.9rem" }}>
                  {trip.emoji || "✈️"} {trip.destino || "Destino increíble"}
                </span>
                {trip.duracion && (
                  <span style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>• {trip.duracion}</span>
                )}
                {trip.tipo && (
                  <span style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>• {trip.tipo}</span>
                )}
              </div>

              <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.5rem", color: "var(--ink)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                {trip.titulo}
              </h1>

              <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--ink-soft)", marginBottom: "2rem" }}>
                {trip.descripcion}
              </p>

              {fechas.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1rem" }}>Fechas de Salida:</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {fechas.map((f: string, i: number) => (
                      <span key={i} style={{ 
                        background: "var(--cream)", 
                        border: "1px solid var(--sand)", 
                        padding: "0.5rem 1rem", 
                        borderRadius: "100px", 
                        fontSize: "0.9rem",
                        color: "var(--ink-soft)"
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--sand)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-light)", marginBottom: "0.25rem" }}>Precio por persona desde</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    {trip.precio_antiguo && (
                      <span style={{ textDecoration: "line-through", color: "var(--coral)", opacity: 0.8, fontSize: "1.2rem", fontWeight: 500 }}>
                        {trip.precio_antiguo}€
                      </span>
                    )}
                    <span style={{ fontSize: "2.5rem", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-playfair), serif", lineHeight: 1 }}>
                      {trip.precio}€
                    </span>
                  </div>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", fontSize: "1.1rem", background: "var(--ink)", color: "white" }}
                >
                  Consultar 
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 900px) {
            .trip-detail-grid {
              grid-template-columns: 1fr !important;
            }
            .trip-detail-grid > div:last-child {
              padding: 2rem !important;
            }
            .trip-detail-grid > div:first-child {
               min-height: 300px !important;
            }
          }
          @media (max-width: 600px) {
             .trip-detail-grid > div:last-child > div:last-child {
                flex-direction: column;
                align-items: flex-start;
                gap: 1.5rem;
             }
             .trip-detail-grid > div:last-child > div:last-child a {
                width: 100%;
                justify-content: center;
             }
          }
        `
      }} />
    </>
  );
}
