"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { parseCSV, generateSlug } from "./lib/trips";

const SHEET_CSV_URL: string =
  "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv";
const SHEET_CSV_URL_INSTAGRAM: string =
  "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv&gid=2082372960";

const DEMO_TRIPS = [
  {
    activo: "SI",
    destacado: "SI",
    titulo: "Maldivas paradisíaca: villa sobre el agua",
    destino: "Maldivas",
    emoji: "🏝️",
    tipo: "Luna de miel",
    duracion: "7 noches",
    descripcion:
      "Resort 5★ en atolón privado, vuelos directos desde Madrid, traslado en hidroavión incluido. Pensión completa premium. Ideal para luna de miel.",
    precio: "1890",
    precio_antiguo: "2490",
    etiqueta: "🔥 Top ventas",
    fechas: "15 Jun, 22 Jun, 06 Jul, 20 Jul, 03 Ago, 17 Ago, 14 Sep, 28 Sep",
    imagen:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Circuito por la Italia clásica",
    destino: "Italia",
    emoji: "🇮🇹",
    tipo: "Grupos",
    duracion: "8 días",
    descripcion:
      "Roma, Florencia y Venecia en autobús con guía oficial. Hoteles 4★ céntricos.",
    precio: "1290",
    precio_antiguo: "",
    etiqueta: "Circuito",
    fechas: "10 May, 07 Jun, 05 Jul, 02 Ago, 06 Sep",
    imagen:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Cabo Verde Todo Incluido",
    destino: "Cabo Verde",
    emoji: "🏖️",
    tipo: "Familia",
    duracion: "7 noches",
    descripcion:
      "Resort 4★ en la playa, vuelos directos y traslados. Plan familia o pareja con todo incluido.",
    precio: "990",
    precio_antiguo: "1290",
    etiqueta: "Oferta",
    fechas: "14 Jun, 28 Jun, 12 Jul, 26 Jul, 09 Ago",
    imagen:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Colombia esencial: Cartagena y Eje Cafetero",
    destino: "Colombia",
    emoji: "🌴",
    tipo: "Single",
    duracion: "10 días",
    descripcion:
      "Vuelos, hoteles boutique, traslados y experiencias locales. Grupo de viajeros singles.",
    precio: "1890",
    precio_antiguo: "",
    etiqueta: "Nuevo",
    fechas: "08 Sep, 22 Sep, 13 Oct, 03 Nov",
    imagen:
      "https://images.unsplash.com/photo-1599651725492-7d1cdda36b66?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Escapada mágica a Disneyland París",
    destino: "Disneyland París",
    emoji: "🏰",
    tipo: "Familia",
    duracion: "4 días",
    descripcion:
      "Hotel Disney, entradas a los 2 parques, vuelos y traslados incluidos.",
    precio: "590",
    precio_antiguo: "",
    etiqueta: "Familia",
    fechas: "Puente Mayo, Verano, Navidad",
    imagen:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Santorini y Mykonos en velero",
    destino: "Grecia",
    emoji: "🏛️",
    tipo: "Luna de miel",
    duracion: "7 días",
    descripcion:
      "Crucero en catamarán privado, hoteles boutique y cenas a bordo.",
    precio: "1590",
    precio_antiguo: "2290",
    etiqueta: "-30%",
    fechas: "20 Jun, 04 Jul, 18 Jul, 01 Ago",
    imagen:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Safari de lujo en Kenia",
    destino: "Kenia",
    emoji: "🦁",
    tipo: "Luna de miel",
    duracion: "8 días",
    descripcion:
      "Masái Mara y Amboseli. Lodges premium, 4x4 privado, todas las comidas y safari nocturno.",
    precio: "2890",
    precio_antiguo: "",
    etiqueta: "Aventura",
    fechas: "05 Jul, 02 Ago, 15 Sep, 12 Oct",
    imagen:
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Japón esencial: Tokio, Kioto y Osaka",
    destino: "Japón",
    emoji: "🗾",
    tipo: "Grupos",
    duracion: "10 días",
    descripcion:
      "Vuelos, hoteles 4★ céntricos, JR Pass, traslados y guía en español. Experiencia única.",
    precio: "2390",
    precio_antiguo: "",
    etiqueta: "Nuevo",
    fechas: "12 Sep, 19 Sep, 10 Oct, 07 Nov",
    imagen:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=85",
  },
  {
    activo: "SI",
    destacado: "NO",
    titulo: "Riviera Maya: paraíso caribeño",
    destino: "México",
    emoji: "🌊",
    tipo: "Familia",
    duracion: "9 días",
    descripcion:
      "Resort 5★ todo incluido en Playa del Carmen, excursiones a cenotes y Chichén Itzá.",
    precio: "1490",
    precio_antiguo: "1890",
    etiqueta: "Oferta",
    fechas: "20 Jun, 04 Jul, 18 Jul, 08 Ago, 22 Ago",
    imagen:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=85",
  },
];

const DEMO_IG_REELS = [
  {
    activo: "SI",
    tipo: "reel",
    titulo: "Luna de miel en Maldivas ✨",
    descripcion: "Así vivieron este viaje nuestros clientes",
    instagram_url:
      "https://www.instagram.com/reel/DMF3zkKoDvn/?igsh=emdhcWE0Z2tzaG5o",
  },
  {
    activo: "SI",
    tipo: "reel",
    titulo: "Safari en Kenia 🦁",
    descripcion: "Una experiencia que no olvidarás",
    instagram_url:
      "https://www.instagram.com/reel/C4S0smRIHJE/?igsh=MXF0eTZqMW5qM3Y2NA==",
  },
  {
    activo: "SI",
    tipo: "reel",
    titulo: "Viaje a Japón 🗾",
    descripcion: "Tokio",
    instagram_url:
      "https://www.instagram.com/reel/DMF35_DIol8/?igsh=Y3ViM2FybmZxN3Jx",
  },
  {
    activo: "SI",
    tipo: "foto",
    titulo: "Viaje a Japón 🗾",
    descripcion: "Tokio",
    instagram_url:
      "https://www.instagram.com/reel/DMF4SjqoyYT/?igsh=d2p6OHVyNnJ5bHFs",
  },
];

// Removed parseCSV

export default function Home() {
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [instagramReels, setInstagramReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Advanced filters state
  const [filterTipo, setFilterTipo] = useState("");
  const [filterPrecio, setFilterPrecio] = useState("");
  const [filterDuracion, setFilterDuracion] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  // Hero banner search state
  const [searchType, setSearchType] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const [isMounted, setIsMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (!selectedTrip) {
      setTimeout(() => setSelectedDate(""), 0);
    }
  }, [selectedTrip]);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  useEffect(() => {
    async function loadData() {
      // 1. Cargar Viajes
      let receivedTrips: any[] = DEMO_TRIPS;
      if (!SHEET_CSV_URL || SHEET_CSV_URL.trim() === "") {
        setAllTrips(DEMO_TRIPS);
      } else {
        try {
          const url = new URL(SHEET_CSV_URL);
          url.searchParams.append("t", Date.now().toString());
          const response = await fetch(url.toString(), { cache: "no-store" });
          if (!response.ok) throw new Error("No se pudo cargar la Sheet");
          const csv = await response.text();
          if (
            csv.trim().toLowerCase().startsWith("<!doctype") ||
            csv.trim().toLowerCase().startsWith("<html")
          ) {
            throw new Error("Sheet returns HTML. Make sure it is public.");
          }
          receivedTrips = parseCSV(csv);
          setAllTrips(receivedTrips);
        } catch (err) {
          console.error("Error cargando Google Sheets");
          setAllTrips(DEMO_TRIPS);
        }
      }

      // 2. Cargar Instagram
      if (!SHEET_CSV_URL_INSTAGRAM || SHEET_CSV_URL_INSTAGRAM.trim() === "") {
        // Fallback: verificar si en la pestaña principal metieron instagram_url
        let igFromTrips = receivedTrips.filter(
          (t) =>
            (t.instagram_url || "").trim() !== "" &&
            (t.activo || "").toUpperCase() === "SI",
        );
        if (igFromTrips.length > 0) {
          setInstagramReels(igFromTrips);
        } else {
          setInstagramReels(DEMO_IG_REELS);
        }
      } else {
        try {
          const url = new URL(SHEET_CSV_URL_INSTAGRAM);
          url.searchParams.append("t", Date.now().toString());
          const response = await fetch(url.toString(), { cache: "no-store" });
          if (!response.ok)
            throw new Error("No se pudo cargar la Sheet de Instagram");
          const csv = await response.text();
          if (
            csv.trim().toLowerCase().startsWith("<!doctype") ||
            csv.trim().toLowerCase().startsWith("<html")
          ) {
            throw new Error(
              "Instagram Sheet returns HTML. Make sure it is public.",
            );
          }
          let igRows = parseCSV(csv).filter(
            (row) =>
              (row.instagram_url || "").trim() !== "" &&
              (row.activo || "").toUpperCase() === "SI",
          );
          if (igRows.length > 0) {
            setInstagramReels(igRows);
          } else {
            // Fallback a los viajes si existe
            let igFromTrips = receivedTrips.filter(
              (t) =>
                (t.instagram_url || "").trim() !== "" &&
                (t.activo || "").toUpperCase() === "SI",
            );
            setInstagramReels(
              igFromTrips.length > 0 ? igFromTrips : DEMO_IG_REELS,
            );
          }
        } catch (err) {
          console.error("Error cargando Google Sheets de Instagram");
          setInstagramReels(DEMO_IG_REELS);
        }
      }

      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    // Advanced data loading removed
  }, []);

  const getFilteredTrips = () => {
    const normalize = (val: any) =>
      String(val || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    let trips = allTrips.filter((t) => {
      const activoVal = (t.activo || "").toUpperCase().replace("Í", "I").trim();
      return (
        activoVal === "SI" ||
        activoVal === "TRUE" ||
        activoVal === "YES" ||
        activoVal === "1"
      );
    });

    // Tipo & searchType Filter
    const applyTypeFilter = (filterVal: string) => {
      if (!filterVal || filterVal === "") return;
      const ft = normalize(filterVal);
      // Remove 's' from the end of the filter (e.g. grupos -> grupo)
      const baseFt = ft.endsWith("s") ? ft.slice(0, -1) : ft;
      trips = trips.filter((t) => {
        const typeStr = normalize(t.tipo);
        return (
          typeStr === ft || typeStr.includes(baseFt) || ft.includes(typeStr)
        );
      });
    };

    applyTypeFilter(filterTipo);
    applyTypeFilter(searchType);

    // Destination search
    const dest = normalize(searchDestination);
    if (dest) {
      trips = trips.filter(
        (t) =>
          normalize(t.destino).includes(dest) ||
          normalize(t.titulo).includes(dest) ||
          normalize(t.descripcion).includes(dest),
      );
    }

    // Precio Filter
    if (filterPrecio && filterPrecio !== "") {
      trips = trips.filter((t) => {
        let priceStr = String(t.precio || "").replace(/[^0-9]/g, "");
        let price = parseInt(priceStr, 10);
        if (isNaN(price)) return false;

        if (filterPrecio === "0-1000") return price <= 1000;
        if (filterPrecio === "1000-2000") return price > 1000 && price <= 2000;
        if (filterPrecio === "2000-99999") return price > 2000;
        return true;
      });
    }

    // Duración Filter
    if (filterDuracion && filterDuracion !== "") {
      trips = trips.filter((t) => {
        let durStr = String(t.duracion || "").toLowerCase();
        let match = durStr.match(/(\d+)/);
        let days = match ? parseInt(match[1], 10) : 0;
        
        if (durStr.includes("semana")) days *= 7;
        else if (durStr.includes("noche")) days += 1;
        
        if (days === 0) return true; // If can't parse easily, include it

        if (filterDuracion === "corto") return days <= 7;
        if (filterDuracion === "medio") return days >= 8 && days <= 11;
        if (filterDuracion === "largo") return days >= 12;
        return true;
      });
    }

    if (searchFrom || searchTo) {
      const fromDate = searchFrom ? new Date(searchFrom) : null;
      const toDate = searchTo ? new Date(searchTo) : null;

      if (fromDate) fromDate.setHours(0, 0, 0, 0);
      if (toDate) toDate.setHours(23, 59, 59, 999);

      trips = trips.filter((t) => {
        const fechasStrs = (t.fechas || "")
          .split(",")
          .map((f: string) => f.trim())
          .filter((f: string) => f);
        if (fechasStrs.length === 0) return true;

        const tripDates = fechasStrs
          .map((f: string) => {
            const parts = f.split(" ");
            if (parts.length >= 2) {
              const d = parseInt(parts[0], 10);
              const mStr = parts[1].toLowerCase();
              const months: Record<string, number> = {
                ene: 0,
                feb: 1,
                mar: 2,
                abr: 3,
                may: 4,
                jun: 5,
                jul: 6,
                ago: 7,
                sep: 8,
                oct: 9,
                nov: 10,
                dic: 11,
              };
              const m = months[mStr];
              if (m !== undefined && !isNaN(d)) {
                const currentYear = new Date().getFullYear();
                let td = new Date(currentYear, m, d);
                if (
                  td.getTime() <
                  new Date().getTime() - 60 * 24 * 60 * 60 * 1000
                ) {
                  td = new Date(currentYear + 1, m, d);
                }
                return td;
              }
            }
            return null;
          })
          .filter((d: Date | null) => d !== null);

        if (tripDates.length === 0) return true;

        return tripDates.some((td: Date) => {
          if (fromDate && toDate) return td >= fromDate && td <= toDate;
          if (fromDate) return td >= fromDate;
          if (toDate) return td <= toDate;
          return true;
        });
      });
    }

    return trips;
  };

  const trips = getFilteredTrips();
  const isFiltered = searchDestination !== "" || filterTipo !== "" || filterPrecio !== "" || filterDuracion !== "";

  const resetFilters = () => {
    setFilterTipo("");
    setFilterPrecio("");
    setFilterDuracion("");
    setSearchDestination("");
    setSearchType("");
    setSearchFrom("");
    setSearchTo("");
  };

  const handleSearchClick = () => {
    const el = document.getElementById("viajes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`config-banner ${!SHEET_CSV_URL || SHEET_CSV_URL.trim() === "" ? "show" : ""}`}
        id="configBanner"
      >
        ⚙️ <strong>Modo demo:</strong> Para conectar tu Google Sheet, edita la
        variable <code>SHEET_CSV_URL</code> al inicio del código.
      </div>

      <Header />

      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              Atención personalizada 24h en Madrid
            </div>
            <h1>
              Viajes que no se <em>olvidan,</em>
              <br />a precios que <span className="underline">sí</span>.
            </h1>
            <p className="hero-sub">
              Somos HyK Travel. Diseñamos lunas de miel, viajes en familia,
              escapadas en grupo y singles, viajes +55 y corporativos. Con la
              flexibilidad y atención personal que mereces.
            </p>
            <div className="hero-actions">
              <a href="#viajes" className="btn-primary">
                Ver ofertas del mes
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=34648659370"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img hero-img-1"></div>
            <div className="hero-img hero-img-2"></div>
            <div className="hero-img hero-img-3"></div>
            <div className="floating-badge floating-badge-1">
              ⭐ <span>Atención 24 horas</span>
            </div>
            <div className="floating-badge floating-badge-2">
              ✈️ <span>Todo tipo de viajes</span>
            </div>
          </div>
        </div>
      </section>

      <div className="search-section">
        <div className="search-bar">
          <div className="search-field">
            <label>¿Dónde quieres ir?</label>
            <input
              type="text"
              placeholder="Maldivas, Caribe, Italia..."
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>Tipo</label>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Luna de miel">💑 Luna de miel</option>
              <option value="Familia">👪 Familia</option>
              <option value="Grupos">🚌 Grupos</option>
              <option value="Single">👤 Single</option>
            </select>
          </div>
          <div className="search-field">
            <label>Precio</label>
            <select
              value={filterPrecio}
              onChange={(e) => setFilterPrecio(e.target.value)}
            >
              <option value="">Cualquiera</option>
              <option value="0-1000">Hasta 1.000€</option>
              <option value="1000-2000">1.000€ – 2.000€</option>
              <option value="2000-99999">+2.000€</option>
            </select>
          </div>
          <div className="search-field">
            <label>Duración</label>
            <select
              value={filterDuracion}
              onChange={(e) => setFilterDuracion(e.target.value)}
            >
              <option value="">Cualquiera</option>
              <option value="corto">Hasta 7 días</option>
              <option value="medio">8–11 días</option>
              <option value="largo">12+ días</option>
            </select>
          </div>
          <button className="search-btn clear-btn" onClick={resetFilters} style={{ background: "transparent", color: "var(--ink-soft)", border: "1.5px solid var(--sand)" }}>
            ✕ Limpiar
          </button>
          <button className="search-btn" onClick={handleSearchClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Buscar
          </button>
        </div>
      </div>

      <section id="viajes" style={{ paddingTop: "1rem" }}>
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--coral)" }}>
              Resultados
            </span>
            <h2 className="section-title">
              {isFiltered ? (
                <>
                  Viajes <em>encontrados</em>
                </>
              ) : (
                <>
                  Viajes <em>destacados</em>
                  <br />
                  de la temporada
                </>
              )}
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="filter-count" style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
              Mostrando <span style={{ fontWeight: 700, color: "var(--ink)" }}>{trips.length}</span> viaje{trips.length !== 1 ? 's' : ''}
            </span>
            <p className="section-subtitle" style={{ marginTop: "0.5rem" }}>
              {isFiltered ? "Coinciden con los filtros aplicados" : "Selección de viajes con precios cerrados y fechas disponibles."}
            </p>
          </div>
        </div>

        <div id="trips-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Cargando los mejores viajes...</p>
            </div>
          ) : trips.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                No hemos encontrado viajes con esos filtros
              </h3>
              <p>
                Prueba a buscar otro destino o contáctanos para diseñarte uno a
                medida.
              </p>
            </div>
          ) : (
            <div className="trips-grid">
              {trips.map((trip, idx) => {
                const isFeatured =
                  (trip.destacado || "").toUpperCase() === "SI";
                const tagText = trip.etiqueta || "";
                const tagClass =
                  tagText.includes("🔥") ||
                  tagText.includes("-") ||
                  tagText.toLowerCase().includes("oferta")
                    ? "hot"
                    : tagText.toLowerCase().includes("nuevo")
                      ? "new"
                      : "";
                const fechas = (trip.fechas || "")
                  .split(",")
                  .map((f: string) => f.trim())
                  .filter((f: string) => f);
                const maxFechas = isFeatured ? 4 : 3;
                const fechasMostradas = fechas.slice(0, maxFechas);
                const fechasExtra = fechas.length - maxFechas;
                const msg = encodeURIComponent(
                  `Hola! Me interesa el viaje: ${trip.titulo}. ¿Podrías darme más información?`,
                );
                const waLink = `https://api.whatsapp.com/send?phone=34648659370&text=${msg}`;

                return (
                  <article
                    key={idx}
                    className={`trip-card ${isFeatured ? "featured" : ""}`}
                  >
                    {isFeatured ? (
                      <>
                        <div className="featured-bg">
                          <img src={trip.imagen} loading="lazy" alt={trip.titulo || "Viaje descacado"} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1}} />
                        </div>
                        <div className="featured-overlay">
                          <div className="featured-badge">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Viaje Destacado
                          </div>
                          {tagText && (
                            <span
                              className={`trip-tag ${tagClass}`}
                              style={{
                                position: "absolute",
                                top: "1.5rem",
                                right: "1.5rem",
                                left: "auto",
                              }}
                            >
                              {tagText}
                            </span>
                          )}

                          <div className="featured-content">
                            <div
                              className="trip-meta"
                              style={{ color: "var(--cream)", opacity: 0.9 }}
                            >
                              <span>
                                {trip.emoji || "✈️"} {trip.destino || ""}
                              </span>
                              {trip.duracion && (
                                <>
                                  <span>•</span>
                                  <span>{trip.duracion}</span>
                                </>
                              )}
                              {trip.tipo && (
                                <>
                                  <span>•</span>
                                  <span>{trip.tipo}</span>
                                </>
                              )}
                            </div>
                            <h3
                              className="trip-title"
                              style={{
                                color: "white",
                                fontSize: "2.5rem",
                                marginBottom: "1rem",
                              }}
                            >
                              {trip.titulo || ""}
                            </h3>
                            <p
                              className="trip-desc"
                              style={{
                                color: "white",
                                opacity: 0.85,
                                fontSize: "1.1rem",
                                maxWidth: "600px",
                                marginBottom: "2rem",
                              }}
                            >
                              {trip.descripcion || ""}
                            </p>

                            {fechasMostradas.length > 0 && (
                              <div className="trip-dates">
                                {fechasMostradas.map((f: string, i: number) => (
                                  <span
                                    key={i}
                                    className="date-chip"
                                    style={{
                                      background: "rgba(255,255,255,0.15)",
                                      color: "white",
                                      borderColor: "rgba(255,255,255,0.1)",
                                    }}
                                  >
                                    {f}
                                  </span>
                                ))}
                                {fechasExtra > 0 && (
                                  <span
                                    className="date-chip"
                                    style={{
                                      background: "rgba(255,255,255,0.15)",
                                      color: "white",
                                      borderColor: "rgba(255,255,255,0.1)",
                                    }}
                                  >
                                    +{fechasExtra} fechas
                                  </span>
                                )}
                              </div>
                            )}

                            <div
                              className="trip-footer"
                              style={{
                                borderTopColor: "rgba(255,255,255,0.2)",
                                marginTop: "auto",
                                paddingTop: "1.5rem",
                              }}
                            >
                              <div>
                                <span
                                  className="trip-price-label"
                                  style={{ color: "rgba(255,255,255,0.8)" }}
                                >
                                  Precio desde
                                </span>
                                <div>
                                  {trip.precio_antiguo && (
                                    <span
                                      className="trip-price-old"
                                      style={{ color: "rgba(255,255,255,0.6)" }}
                                    >
                                      {trip.precio_antiguo}€
                                    </span>
                                  )}
                                  <span
                                    className="trip-price-amount"
                                    style={{
                                      color: "var(--turquoise)",
                                      fontSize: "2.5rem",
                                    }}
                                  >
                                    {trip.precio}€
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedTrip(trip)}
                                className="trip-btn"
                                style={{
                                  background: "var(--turquoise)",
                                  color: "var(--ink)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontFamily: "inherit"
                                }}
                              >
                                Ver detalles
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="trip-image">
                          <img src={trip.imagen} loading="lazy" alt={trip.titulo || "Viaje"} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1}} />
                          {tagText && (
                            <span className={`trip-tag ${tagClass}`}>
                              {tagText}
                            </span>
                          )}
                        </div>
                        <div className="trip-info">
                          <div className="trip-meta">
                            <span>
                              {trip.emoji || "✈️"} {trip.destino || ""}
                            </span>
                            {trip.duracion && (
                              <>
                                <span>•</span>
                                <span>{trip.duracion}</span>
                              </>
                            )}
                            {trip.tipo && (
                              <>
                                <span>•</span>
                                <span>{trip.tipo}</span>
                              </>
                            )}
                          </div>
                          <h3 className="trip-title">{trip.titulo || ""}</h3>
                          <p className="trip-desc">{trip.descripcion || ""}</p>
                          {fechasMostradas.length > 0 && (
                            <div className="trip-dates">
                              {fechasMostradas.map((f: string, i: number) => (
                                <span key={i} className="date-chip">
                                  {f}
                                </span>
                              ))}
                              {fechasExtra > 0 && (
                                <span className="date-chip">
                                  +{fechasExtra} fechas
                                </span>
                              )}
                            </div>
                          )}
                          <div className="trip-footer">
                            <div>
                              <span className="trip-price-label">Desde</span>
                              <div>
                                {trip.precio_antiguo && (
                                  <span className="trip-price-old">
                                    {trip.precio_antiguo}€
                                  </span>
                                )}
                                <span className="trip-price-amount">
                                  {trip.precio}€
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedTrip(trip)}
                              className="trip-btn"
                              style={{ border: "none", cursor: "pointer", fontFamily: "inherit" }}
                            >
                              Ver detalles
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

<section
        className="ofertas-destacadas"
        style={{
          background: "var(--cream-warm)",
          padding: "5rem 3rem",
          marginTop: "3rem",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="section-header"
            style={{
              marginBottom: "3rem",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <span className="eyebrow" style={{ color: "var(--coral)" }}>
                Selección Especial
              </span>
              <h2 className="section-title" style={{ margin: "0 auto" }}>
                Ofertas <em>Destacadas</em>
              </h2>
              <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
                Disfruta de nuestras mejores oportunidades de viaje por tiempo
                limitado.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {/* Oferta 1 */}
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
              }} >
              <div style={{ position: "relative", height: "240px" }}>
                <img loading="lazy"
                  src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=85"
                  alt="Maldivas"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "var(--coral)",
                    color: "white",
                    padding: "0.4rem 1rem",
                    borderRadius: "2rem",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                  }}
                >
                  -30% Dto.
                </div>
              </div>
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--turquoise-deep)",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Maldivas
                  </span>
                  <span
                    style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}
                  >
                    7 noches
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    lineHeight: "1.2",
                  }}
                >
                  Villa sobre el agua
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "0.95rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.5",
                  }}
                >
                  Resort 5★ en atolón privado con régimen de Todo Incluido y
                  vuelos directos desde Madrid.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "var(--ink-soft)",
                        fontSize: "0.85rem",
                      }}
                    >
                      2.490€
                    </span>
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        color: "var(--ink)",
                        lineHeight: "1",
                      }}
                    >
                      1.743€
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTrip(allTrips.find(t => generateSlug(t.titulo) === "maldivas-paradisiaca-villa-sobre-el-agua"))}
                    style={{
                      background: "var(--coral)",
                      color: "white",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "2rem",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "background 0.3s",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }} >
                    Ver Oferta
                  </button>
                </div>
              </div>
            </div>

            {/* Oferta 2 */}
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
              }} >
              <div style={{ position: "relative", height: "240px" }}>
                <img loading="lazy"
                  src="https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=85"
                  alt="Riviera Maya"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "var(--turquoise)",
                    color: "var(--ink)",
                    padding: "0.4rem 1rem",
                    borderRadius: "2rem",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                  }}
                >
                  2x1 Vuelos
                </div>
              </div>
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--turquoise-deep)",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                    }}
                  >
                    México
                  </span>
                  <span
                    style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}
                  >
                    9 días
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    lineHeight: "1.2",
                  }}
                >
                  Paraíso Caribeño
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "0.95rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.5",
                  }}
                >
                  Hotel boutique a pie de playa con excursiones exclusivas a
                  cenotes y ruinas mayas.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "var(--ink-soft)",
                        fontSize: "0.85rem",
                      }}
                    >
                      1.890€
                    </span>
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        color: "var(--ink)",
                        lineHeight: "1",
                      }}
                    >
                      1.490€
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTrip(allTrips.find(t => generateSlug(t.titulo) === "riviera-maya-paraiso-caribeno"))}
                    style={{
                      background: "var(--ink)",
                      color: "white",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "2rem",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "background 0.3s",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }} >
                    Ver Oferta
                  </button>
                </div>
              </div>
            </div>

            {/* Oferta 3 */}
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
              }} >
              <div style={{ position: "relative", height: "240px" }}>
                <img loading="lazy"
                  src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=85"
                  alt="Japón"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "var(--coral)",
                    color: "white",
                    padding: "0.4rem 1rem",
                    borderRadius: "2rem",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                  }}
                >
                  Últimas Plazas
                </div>
              </div>
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--turquoise-deep)",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Japón
                  </span>
                  <span
                    style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}
                  >
                    10 días
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    lineHeight: "1.2",
                  }}
                >
                  Esencia Nipona
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "0.95rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.5",
                  }}
                >
                  Circuito guiado en español descubriendo la mezcla de tradición
                  y ultra-modernidad.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "var(--ink-soft)",
                        fontSize: "0.85rem",
                      }}
                    >
                      2.950€
                    </span>
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        color: "var(--ink)",
                        lineHeight: "1",
                      }}
                    >
                      2.390€
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTrip(allTrips.find(t => generateSlug(t.titulo) === "japon-esencial-tokio-kioto-y-osaka"))}
                    style={{
                      background: "var(--coral)",
                      color: "white",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "2rem",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "background 0.3s",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }} >
                    Ver Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="instagram-section" id="instagram">
        <div className="instagram-header">
          <div>
            <span className="eyebrow">Síguenos en Instagram</span>
            <h2 className="section-title">
              La vida real
              <br />
              de <em>nuestros viajes</em>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div className="instagram-profile">
              <div className="instagram-avatar">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <div className="instagram-handle">
                  @hyktravel.es
                  <span>Agencia de Viajes · Madrid</span>
                </div>
              </div>
            </div>
            <a
              href="https://www.instagram.com/hyktravel.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-follow-btn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Seguir en Instagram
            </a>
          </div>
        </div>

        {/* GRID MIXTO: Fotos + Reels de Instagram */}
        <div
          id="ig-content"
          className="instagram-grid"
          style={{ marginTop: "2rem" }}
        >
          {isMounted ? (
            instagramReels && instagramReels.length > 0 ? (
              instagramReels.slice(0, 4).map((t, idx) => {
                let igUrl = (t.instagram_url || "").trim();
                let embedUrl = igUrl.split("?")[0];

                // We just use the raw URL for InstagramEmbed, it handles embed URLs itself ideally

                return (
                  <div
                    className="reel-card"
                    key={idx}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      background: "white",
                    }}
                  >
                    <div
                      className="ig-embed-wrapper"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <a href="#" className="btn-secondary" style={{ margin: "2rem" }}>Ver en Instagram</a>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div
                  className="reel-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    background: "white",
                  }}
                >
                  <div
                    className="ig-embed-wrapper"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#" className="btn-secondary" style={{ margin: "2rem" }}>Ver en Instagram</a>
                  </div>
                </div>
                <div
                  className="reel-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    background: "white",
                  }}
                >
                  <div
                    className="ig-embed-wrapper"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#" className="btn-secondary" style={{ margin: "2rem" }}>Ver en Instagram</a>
                  </div>
                </div>
                <div
                  className="reel-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    background: "white",
                  }}
                >
                  <div
                    className="ig-embed-wrapper"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#" className="btn-secondary" style={{ margin: "2rem" }}>Ver en Instagram</a>
                  </div>
                </div>
                <div
                  className="reel-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    background: "white",
                  }}
                >
                  <div
                    className="ig-embed-wrapper"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#" className="btn-secondary" style={{ margin: "2rem" }}>Ver en Instagram</a>
                  </div>
                </div>
              </>
            )
          ) : (
            <div
              style={{
                minHeight: "480px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p style={{ color: "var(--ink-soft)" }}>Cargando Instagram...</p>
            </div>
          )}
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.85rem",
            color: "var(--ink-soft)",
          }}
        >
          ✨ El contenido se actualiza automáticamente desde la Google Sheet —
          Laura añade fotos y reels de Instagram en la pestaña
          &quot;Instagram&quot;
        </p>
      </section>

      <section
        className="categories"
        id="categorias"
        style={{ paddingTop: "2rem" }}
      >
        <div className="categories-inner">
          <div className="section-header">
            <div>
              <span className="eyebrow">Diseñamos para ti</span>
              <h2 className="section-title">
                El viaje perfecto
                <br />
                para <em>cada momento</em>
              </h2>
            </div>
            <p className="section-subtitle">
              Da igual con quién o cómo viajes. Tenemos una propuesta hecha para
              ti.
            </p>
          </div>
          <div className="cat-grid">
            <a href="#" className="cat-card">
              <div className="cat-icon">💍</div>
              <h3 className="cat-title">Luna de Miel</h3>
              <p className="cat-desc">
                El viaje de vuestra vida, diseñado al detalle
              </p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">👨‍👩‍👧‍👦</div>
              <h3 className="cat-title">Familia</h3>
              <p className="cat-desc">
                Aventuras pensadas para todas las edades
              </p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">🎉</div>
              <h3 className="cat-title">Grupos</h3>
              <p className="cat-desc">
                Viajes organizados con buen rollo asegurado
              </p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">🌍</div>
              <h3 className="cat-title">Single</h3>
              <p className="cat-desc">
                Conoce gente nueva en destinos increíbles
              </p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">🌅</div>
              <h3 className="cat-title">Viajes +55</h3>
              <p className="cat-desc">Disfruta a tu ritmo, sin prisas</p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">🎁</div>
              <h3 className="cat-title">Lista de boda</h3>
              <p className="cat-desc">Que tus invitados regalen experiencias</p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">💼</div>
              <h3 className="cat-title">Corporativos</h3>
              <p className="cat-desc">
                Viajes de empresa y eventos profesionales
              </p>
            </a>
            <a href="#" className="cat-card">
              <div className="cat-icon">🐾</div>
              <h3 className="cat-title">Con animales</h3>
              <p className="cat-desc">
                Viajar con tu mascota, sin complicaciones
              </p>
            </a>
          </div>
        </div>
      </section>

      <div
        className="stats-bar"
        style={{
          margin: "4rem auto 2rem",
          maxWidth: "1400px",
          padding: "0 3rem",
        }}
      >
        <div>
          <div className="stat-number">
            24<em>h</em>
          </div>
          <div className="stat-label">Atención al cliente</div>
        </div>
        <div>
          <div className="stat-number">
            8<em>+</em>
          </div>
          <div className="stat-label">Tipos de viaje</div>
        </div>
        <div>
          <div className="stat-number">
            100<em>%</em>
          </div>
          <div className="stat-label">Personalizado</div>
        </div>
        <div>
          <div className="stat-number">
            +10<em>años</em>
          </div>
          <div className="stat-label">De experiencia</div>
        </div>
      </div>

      <section className="why-section">
        <div className="why-inner">
          <div className="section-header">
            <div>
              <span className="eyebrow" style={{ color: "var(--turquoise)" }}>
                Lo que nos diferencia
              </span>
              <h2 className="section-title">
                Tres razones para
                <br />
                viajar <em>con nosotros</em>
              </h2>
            </div>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="why-title">Innovación</h3>
              <p className="why-desc">
                Buscamos constantemente nuevas formas de sorprenderte, con
                propuestas únicas que no encontrarás en ninguna otra agencia.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="why-title">Creatividad</h3>
              <p className="why-desc">
                Diseñamos itinerarios únicos y descubrimos destinos y
                actividades fuera de lo común. Cada viaje es una historia
                diferente.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <h3 className="why-title">Flexibilidad</h3>
              <p className="why-desc">
                Cada viajero es único. Nos adaptamos a tus deseos, tu calendario
                y tu presupuesto. Sin paquetes rígidos, sin letra pequeña.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona">
        <div className="section-header">
          <div>
            <span className="eyebrow">Cómo trabajamos</span>
            <h2 className="section-title">
              Reservar con nosotros
              <br />
              es <em>fácil</em>
            </h2>
          </div>
        </div>
        <div className="how-grid">
          <div>
            <div className="step-number">01</div>
            <h3 className="step-title">Cuéntanos tu idea</h3>
            <p className="step-desc">
              Elige uno de nuestros viajes o cuéntanos qué tienes en mente. Por
              WhatsApp, teléfono o email. Estamos disponibles 24h.
            </p>
          </div>
          <div>
            <div className="step-number">02</div>
            <h3 className="step-title">Diseñamos juntos</h3>
            <p className="step-desc">
              Te enviamos una propuesta personalizada con vuelos, hoteles,
              traslados y experiencias. Sin compromiso, sin presión.
            </p>
          </div>
          <div>
            <div className="step-number">03</div>
            <h3 className="step-title">Disfruta sin preocupaciones</h3>
            <p className="step-desc">
              Nos ocupamos de cada detalle antes y durante tu viaje. Tú solo
              tienes que disfrutar. Asistencia personal 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonios-section">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div>
            <span className="eyebrow">Historias reales</span>
            <h2 className="section-title">
              Lo que dicen <br />
              <em>nuestros viajeros</em>
            </h2>
          </div>
        </div>
        <div className="testimonios-grid">
          <div className="testimonio-card">
            <div className="testimonio-stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="testimonio-text">
              Laura nos diseñó la luna de miel de nuestros sueños. Cada detalle
              estaba pensado, los hoteles fueron espectaculares y siempre estuvo
              disponible. No volvemos a reservar nada por nuestra cuenta.
            </p>
            <div className="testimonio-author">
              <div className="testimonio-avatar">M</div>
              <div>
                <div className="testimonio-name">Manuel y Ana</div>
                <div className="testimonio-trip">Luna de miel en Maldivas</div>
              </div>
            </div>
          </div>
          <div className="testimonio-card">
            <div className="testimonio-stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="testimonio-text">
              Fuimos a Punta Cana un grupo de 12 personas y todo salió perfecto.
              Los traslados a tiempo, el resort increíble y el precio el mejor
              que encontramos. Un 10.
            </p>
            <div className="testimonio-author">
              <div
                className="testimonio-avatar"
                style={{
                  background:
                    "linear-gradient(135deg, var(--coral), var(--coral-deep))",
                }}
              >
                C
              </div>
              <div>
                <div className="testimonio-name">Carlos y amigos</div>
                <div className="testimonio-trip">Viaje de fin de curso</div>
              </div>
            </div>
          </div>
          <div className="testimonio-card">
            <div className="testimonio-stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="testimonio-text">
              Descubrir Japón con todo organizado ha sido una maravilla. El tren
              bala, las excursiones privadas y el Ryokan... una experiencia que
              nunca olvidaremos. ¡Repetiremos seguro!
            </p>
            <div className="testimonio-author">
              <div
                className="testimonio-avatar"
                style={{
                  background:
                    "linear-gradient(135deg, var(--ink), var(--ink-soft))",
                }}
              >
                S
              </div>
              <div>
                <div className="testimonio-name">Silvia G.</div>
                <div className="testimonio-trip">Circuito por Japón</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="presupuesto-section" id="contacto">
        <div className="presupuesto-inner">
          <div className="presupuesto-left">
            <span className="eyebrow" style={{ color: "var(--turquoise)" }}>
              Atención en 24h
            </span>
            <h2>
              Tu viaje a medida <br />
              en <em>60 segundos</em>
            </h2>
            <p>
              Rellena este breve formulario y prepararemos una propuesta única
              para ti, sin compromiso.
            </p>
            <div className="presupuesto-features">
              <div className="presupuesto-feature">
                Asesoramiento personal y gratuito
              </div>
              <div className="presupuesto-feature">
                Presupuesto en PDF interactivo
              </div>
              <div className="presupuesto-feature">
                Reserva segura y atención 24/7
              </div>
            </div>
          </div>
          <div className="presupuesto-right">
            <form
              className="presupuesto-form"
              onSubmit={(e) => { 
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                setFormStatus("submitting");
                
                (async () => {
                try {
                  const response = await fetch("https://formsubmit.co/ajax/info@hyktravel.es", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      _subject: "Nuevo Presupuesto Web - HyK Travel",
                      Nombre: String(data.nombre || ""),
                      Teléfono: String(data.telefono || ""),
                      Destino: String(data.destino || ""),
                      Fecha: String(data.fecha || ""),
                      Pasajeros: String(data.pasajeros || ""),
                    }),
                  });
                  
                  if (response.ok) {
                    setFormStatus("success");
                    form.reset();
                    setTimeout(() => setFormStatus("idle"), 5000);
                  } else {
                    setFormStatus("error");
                    setTimeout(() => setFormStatus("idle"), 5000); 
                  } 
                } catch (error) { 
                  setFormStatus("error"); 
                  setTimeout(() => setFormStatus("idle"), 5000); 
                } 
              })(); } }
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="form-input"
                    placeholder="+34 600..."
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="destino">Destino o idea</label>
                <input
                  type="text"
                  id="destino"
                  name="destino"
                  className="form-input"
                  placeholder="Ej: Japón, Caribe, o 'Sorpréndeme'"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fecha">¿Cuándo?</label>
                  <input
                    type="text"
                    id="fecha"
                    name="fecha"
                    className="form-input"
                    placeholder="Mes que viene..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pasajeros">Viajeros</label>
                  <select
                    id="pasajeros"
                    name="pasajeros"
                    className="form-select"
                    defaultValue="2"
                  >
                    <option value="1">1 Persona</option>
                    <option value="2">2 Personas</option>
                    <option value="3">3 Personas</option>
                    <option value="4+">4 o más</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="form-submit" 
                disabled={formStatus === "submitting" || formStatus === "success"}
                style={formStatus === "success" ? { background: "var(--turquoise)", color: "var(--ink)" } : {}}
              >
                {formStatus === "submitting" ? (
                  "Enviando..."
                ) : formStatus === "success" ? (
                  "¡Presupuesto solicitado!"
                ) : formStatus === "error" ? (
                  "Error: Inténtalo de nuevo"
                ) : (
                  <>
                    Solicitar Presupuesto
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              <div className="form-note">
                🔒 Tus datos están seguros. No enviamos spam.
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="directorios-section">
        <div
          className="section-header"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          <div>
            <h2 className="section-title" style={{ fontSize: "1.75rem" }}>
              Encuéntranos en <em>directorios</em>
            </h2>
            <p className="section-subtitle" style={{ fontSize: "0.9rem" }}>
              Colaboramos y estamos presentes en las mejores plataformas
            </p>
          </div>
        </div>
        <div className="directorios-grid">
          <a href="#" className="directorio-card">
            <div className="directorio-icon" style={{ color: "#4285F4" }}>
              G
            </div>
            <div>
              <div className="directorio-name">Google My Business</div>
              <div className="directorio-desc">
                Reseñas y ubicación verificada
              </div>
            </div>
            <div className="directorio-status done">VERIFICADO</div>
          </a>
          <a href="#" className="directorio-card">
            <div className="directorio-icon" style={{ color: "#E0004D" }}>
              B
            </div>
            <div>
              <div className="directorio-name">Bodas.net</div>
              <div className="directorio-desc">
                Especialistas en Lunas de Miel
              </div>
            </div>
            <div className="directorio-status pending">EN PROCESO</div>
          </a>
          <a href="#" className="directorio-card">
            <div className="directorio-icon" style={{ color: "#00AF87" }}>
              T
            </div>
            <div>
              <div className="directorio-name">Trustpilot</div>
              <div className="directorio-desc">
                Opiniones reales de viajeros
              </div>
            </div>
            <div className="directorio-status free">PRÓXIMAMENTE</div>
          </a>
          <a href="#" className="directorio-card">
            <div className="directorio-icon" style={{ color: "#0071C2" }}>
              B.
            </div>
            <div>
              <div className="directorio-name">Booking Partners</div>
              <div className="directorio-desc">
                Agencia afiliada certificada
              </div>
            </div>
            <div className="directorio-status done">ACTIVO</div>
          </a>
        </div>
      </section>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          padding: "20px"
        }} onClick={() => setSelectedTrip(null)}>
          <div style={{
            background: "var(--cream-warm)",
            borderRadius: "1rem",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column"
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedTrip(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "18px",
                color: "#333",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              ✕
            </button>
            
            <div style={{
              width: "100%",
              height: "250px",
              backgroundImage: `url('${selectedTrip.imagen}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem"
            }} />
            
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem" }}>{selectedTrip.emoji || "✈️"}</span>
                <span style={{ background: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "600", color: "var(--ink-soft)" }}>
                  {selectedTrip.destino}
                </span>
                {selectedTrip.duracion && (
                  <span style={{ background: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "600", color: "var(--ink-soft)" }}>
                    {selectedTrip.duracion}
                  </span>
                )}
                {selectedTrip.tipo && (
                  <span style={{ background: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "600", color: "var(--ink-soft)" }}>
                    {selectedTrip.tipo}
                  </span>
                )}
              </div>
              
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "var(--ink)", fontFamily: "Outfit, sans-serif" }}>{selectedTrip.titulo}</h2>
              
              <p style={{ color: "var(--ink-soft)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                {selectedTrip.descripcion}
              </p>
              
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
                <div style={{ marginBottom: "0.5rem", fontWeight: "600", color: "var(--ink)" }}>Fechas disponibles</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedTrip.fechas ? (
                    selectedTrip.fechas.split(",").map((f: string, i: number) => {
                      const fecha = f.trim();
                      const isSelected = selectedDate === fecha;
                      return (
                        <button 
                          key={i} 
                          onClick={() => setSelectedDate(isSelected ? "" : fecha)}
                          style={{ 
                            background: isSelected ? "var(--turquoise)" : "var(--cream)", 
                            color: isSelected ? "white" : "var(--ink)",
                            padding: "6px 12px", 
                            borderRadius: "20px", 
                            fontSize: "0.9rem", 
                            border: isSelected ? "1px solid var(--turquoise)" : "1px solid var(--sand)",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontWeight: isSelected ? "600" : "normal",
                            transition: "all 0.2s"
                          }}>
                          {fecha}
                        </button>
                      );
                    })
                  ) : (
                    <span style={{ color: "var(--ink-soft)" }}>Consultar disponibilidad</span>
                  )}
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--sand)", paddingTop: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>Precio desde</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    {selectedTrip.precio_antiguo && (
                      <span style={{ textDecoration: "line-through", color: "var(--ink-soft)", fontSize: "1.1rem" }}>
                        {selectedTrip.precio_antiguo}€
                      </span>
                    )}
                    <span style={{ fontSize: "2rem", fontWeight: "700", color: "var(--turquoise)", fontFamily: "Outfit, sans-serif" }}>
                      {selectedTrip.precio}€
                    </span>
                  </div>
                </div>
                
                <a 
                  href={`https://api.whatsapp.com/send?phone=34648659370&text=${encodeURIComponent(`Hola! Me interesa el viaje: ${selectedTrip.titulo}${selectedDate ? ` en las fechas de ${selectedDate}` : ''}. ¿Podrías darme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--coral)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "2rem",
                    textDecoration: "none",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "opacity 0.2s"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  ¡Me interesa!
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      
    </>
  );
}
