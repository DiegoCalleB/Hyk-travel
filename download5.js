const fs = require('fs');

function parseCSVLine(line) {
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

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  let headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());
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
    const obj = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = (values[i] || "").trim();
    });
    if (!obj.tipo) obj.tipo = "";
    if (!obj.destino) obj.destino = "";
    return obj;
  });
}

async function fetchSheet() {
  const url = "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv";
  const response = await fetch(url);
  const text = await response.text();
  const trips = parseCSV(text).filter(t => t.activo.toUpperCase() === "SI");
  
  const normalize = (val) => String(val || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  trips.forEach((t, index) => {
     console.log(`Trip ${index}: tipo='${t.tipo}' => normalized='${normalize(t.tipo)}'`);
  });
}
fetchSheet();
