import { useState } from "react";

export default function CvAutocomplete() {
  const allOptions = ["JavaScript", "TypeScript", "React", "Node.js"];
  const [query, setQuery] = useState("");

  const filtered = allOptions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ width: 300 }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      {query && (
        <ul style={{
          border: "1px solid #ddd",
          marginTop: 4,
          padding: 0,
          listStyle: "none"
        }}>
          {filtered.map((item) => (
            <li
              key={item}
              style={{ padding: 8, cursor: "pointer" }}
              onClick={() => setQuery(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
