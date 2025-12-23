import { describe, it, expect } from "vitest";
import { parseCSV } from "../../lib/csvParser.js";

describe("parseCSV", () => {
  it("parses quoted fields with commas", () => {
    const csv = 'title,price\n"Big, Item",12.5\nSimple,3';
    const rows = parseCSV(csv);
    expect(rows[0]).toEqual(["title", "price"]);
    expect(rows[1]).toEqual(["Big, Item", "12.5"]);
    expect(rows[2]).toEqual(["Simple", "3"]);
  });

  it("detects semicolon as separator", () => {
    const csv = "title;price\nA;1\nB;2";
    const rows = parseCSV(csv);
    expect(rows[0]).toEqual(["title", "price"]);
    expect(rows[1]).toEqual(["A", "1"]);
  });

  it("handles BOM and tabs", () => {
    const bom = String.fromCharCode(0xfeff);
    const csv = bom + "a\tb\n1\t2";
    const rows = parseCSV(csv);
    expect(rows[0]).toEqual(["a", "b"]);
    expect(rows[1]).toEqual(["1", "2"]);
  });
});
