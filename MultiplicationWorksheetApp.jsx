import React, { useState } from "react";

const MIN = 1;
const MAX = 12;
const QUESTIONS_PER_PAGE = 50;
const MIN_PAGES = 1;
const MAX_PAGES = 20;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblems(numPages) {
  const problems = [];
  for (let p = 0; p < numPages; p++) {
    const pageProblems = [];
    for (let i = 0; i < QUESTIONS_PER_PAGE; i++) {
      const a = getRandomInt(MIN, MAX);
      const b = getRandomInt(MIN, MAX);
      pageProblems.push({ a, b });
    }
    problems.push(pageProblems);
  }
  return problems;
}

export default function MultiplicationWorksheetApp() {
  const [numPages, setNumPages] = useState(1);
  const [problems, setProblems] = useState(() => generateProblems(1));

  const handlePagesChange = (e) => {
    const value = Math.max(MIN_PAGES, Math.min(MAX_PAGES, Number(e.target.value)));
    setNumPages(value);
  };

  const handleGenerate = () => {
    setProblems(generateProblems(numPages));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Multiplication Worksheet Generator</h1>
      <div style={{ marginBottom: 16 }}>
        <label>
          Number of pages:
          <select value={numPages} onChange={handlePagesChange} style={{ marginLeft: 8 }}>
            {Array.from({ length: MAX_PAGES }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <button onClick={handleGenerate} style={{ marginLeft: 16 }}>Generate</button>
        <button onClick={handlePrint} style={{ marginLeft: 8 }}>Print</button>
      </div>
      <div id="printable-area">
        {problems.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`worksheet-page${pageIndex < problems.length - 1 ? ' worksheet-break' : ''}`}
            style={{ marginBottom: 40 }}
          >
            <h2>Page {pageIndex + 1}</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {Array.from({ length: 10 }).map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array.from({ length: 5 }).map((_, colIdx) => {
                      const idx = rowIdx * 5 + colIdx;
                      const prob = page[idx];
                      return (
                        <td key={colIdx} style={{ padding: 8, fontSize: 18, border: "1px solid #ccc", width: "20%" }}>
                          {prob ? `${prob.a} × ${prob.b} = ` : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
          button, select, label, h1 { display: none !important; }
          .worksheet-page {
            box-sizing: border-box;
            padding: 0.5in 0.7in;
            margin: 0 !important;
          }
          .worksheet-break {
            page-break-after: always;
          }
        }
        @page {
          size: auto;
          margin: 0.5in 0.7in;
        }
      `}</style>
    </div>
  );
} 