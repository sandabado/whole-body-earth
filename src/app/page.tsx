export default function Home() {
  return (
    <main
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          color: "var(--flux)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          marginBottom: "2rem",
        }}
      >
        ● FEED FIRST · ARTIST-OWNED · ZERO EXTRACTION
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: "1.5rem",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        Infrastructure,<br />Not a Label.
      </h1>

      <p
        style={{
          color: "var(--ghost)",
          fontSize: "1.125rem",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        Whole Body Studios provides production, distribution, and sync licensing
        for artists who retain everything. We earn on services rendered — never
        on ownership. The artist eats first. Always.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <a
          href="/apply"
          style={{
            background: "var(--plasma)",
            border: "none",
            borderRadius: "2px",
            color: "var(--void)",
            display: "inline-block",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            padding: "0.875rem 2rem",
          }}
        >
          Apply for Partnership →
        </a>
        <a
          href="/services"
          style={{
            background: "transparent",
            border: "3px solid var(--mercury)",
            borderRadius: "2px",
            color: "var(--bone)",
            display: "inline-block",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            padding: "0.875rem 2rem",
          }}
        >
          View Services
        </a>
      </div>

      <footer
        style={{
          color: "var(--ghost)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          marginTop: "4rem",
        }}
      >
        So It Is Built. So It Holds. So It Is. 🍀
      </footer>
    </main>
  );
}
