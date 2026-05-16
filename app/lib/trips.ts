export const DEMO_TRIPS = [
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
    etiqueta: "Descuento",
    fechas: "14 Jun, 28 Jun, 12 Jul, 26 Jul",
    imagen:
      "https://images.unsplash.com/photo-1589139423668-8742d4bc80bd?w=800&q=85",
  },
];

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv";

// Helper para parsear CSV
export function parseCSVLine(line: string) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current);
  return result;
}

export function fixImageUrl(url: string) {
  if (!url) return '';
  url = url.trim();

  // Formato: https://drive.google.com/file/d/ID/view
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  // Formato: https://drive.google.com/open?id=ID
  const driveOpen = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpen) {
    return `https://drive.google.com/uc?export=view&id=${driveOpen[1]}`;
  }

  // Formato: https://docs.google.com/uc?id=ID
  const docsMatch = url.match(/docs\.google\.com.*[?&]id=([a-zA-Z0-9_-]+)/);
  if (docsMatch) {
    return `https://drive.google.com/uc?export=view&id=${docsMatch[1]}`;
  }

  // Ya es uc?export=view — dejar tal cual
  if (url.includes('uc?export=view')) return url;

  // Cualquier otra URL (Unsplash, etc.) — dejar tal cual
  return url;
}

export function parseCSV(str: string) {
  const lines = str.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  let headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());
  
  // Heuristic: if user accidentally shifted columns by adding an empty one
  if (headers[3] === "" && headers[4] === "destino" && headers[5] === "emoji") {
    headers[3] = "destino";
    headers[4] = "emoji";
    headers[5] = "tipo";
  } else if (!headers.includes("tipo")) {
    const emojiIdx = headers.indexOf("emoji");
    if (emojiIdx >= 0 && emojiIdx + 1 < headers.length) {
       headers[emojiIdx + 1] = "tipo";
    }
  }

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const obj: any = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = (values[i] || "").trim();
    });
    if (!obj.tipo) obj.tipo = "";
    if (!obj.destino) obj.destino = "";
    if (obj.imagen) obj.imagen = fixImageUrl(obj.imagen);
    return obj;
  });
}

export const generateSlug = (title: string) => {
  return (title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Data fetching function for Server Components or API
export async function getTrips() {
  if (!SHEET_CSV_URL || SHEET_CSV_URL.trim() === "") {
    return DEMO_TRIPS;
  }
  
  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } }); // Cache 1 minute
    if (!response.ok) throw new Error("No se pudo cargar la Sheet");
    const csv = await response.text();
    if (csv.trim().toLowerCase().startsWith("<html")) {
      throw new Error("Sheet returns HTML. Make sure it is public.");
    }
    return parseCSV(csv);
  } catch (err) {
    console.error("Error cargando Google Sheets");
    return DEMO_TRIPS;
  }
}

export async function getTripBySlug(slug: string) {
  const trips = await getTrips();
  return trips.find((t: any) => generateSlug(t.titulo) === slug);
}
