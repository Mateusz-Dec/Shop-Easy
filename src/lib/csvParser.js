// Prosty CSV parser obsługujący pola cytowane ("..."), automatyczne wykrywanie separatora i usuwanie BOM
export function parseCSV(text, sep = "auto") {
  if (typeof text !== "string") return [];

  // Remove BOM if present
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  // Normalize line endings
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Auto-detect separator from first few lines
  const candidateSeps = [",", ";", "\t", "|"];
  if (sep === "auto" || !candidateSeps.includes(sep)) {
    const lines = text.split("\n").slice(0, 8).filter(Boolean);
    const counts = candidateSeps.map((s) => {
      return lines.reduce((acc, l) => acc + (l.split(s).length - 1), 0);
    });
    // pick separator with highest count
    const maxIndex = counts.indexOf(Math.max(...counts));
    sep = candidateSeps[maxIndex] || ",";
  }

  const rows = [];
  let current = "";
  let inQuotes = false;
  const addCell = (row, cell) => row.push(cell);

  const row = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        // escaped quote
        current += '"';
        i++; // skip next
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === sep) {
      addCell(row, current);
      current = "";
      continue;
    }

    if (!inQuotes && ch === "\n") {
      addCell(row, current);
      rows.push(row.slice());
      row.length = 0;
      current = "";
      continue;
    }

    current += ch;
  }
  // final cell
  if (current !== "" || row.length) {
    addCell(row, current);
    rows.push(row.slice());
  }

  // trim cells and remove completely empty trailing rows
  return rows
    .map((r) => r.map((c) => c.trim()))
    .filter((r) => r.some((c) => c !== ""));
}
