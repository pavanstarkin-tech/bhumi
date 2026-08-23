import { ArrowRight, Download } from "lucide-react";
import heroRight from "@/assets/Hero-Right.png";

export function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#ffffff" }}
    >

      {/* Main two-column layout */}
      <div className="relative mx-auto max-w-7xl px-8 lg:px-12 min-h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-0 lg:gap-8 py-28 lg:py-0">

          {/* ── LEFT column ── */}
          <div className="flex-1 flex flex-col items-start text-left z-10">

            {/* Logo */}
            <div
              className="float-slow"
              style={{
                display: "grid",
                placeItems: "center",
                height: 80,
                width: 80,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(45,106,79,0.18)",
                padding: 10,
                marginBottom: 32,
              }}
            >
              <img
                src="https://i.ibb.co/nNhzBtYf/logo-3.png"
                alt="Bhoomi logo"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Headline */}
            <h1
              data-reveal
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#0f172a",
                margin: 0,
              }}
            >
              AI‑Powered Farming,{" "}
              <span style={{ color: "#16a34a" }}>Simplified</span>
            </h1>

            {/* Subtitle */}
            <p
              data-reveal
              style={{
                marginTop: 20,
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                color: "#475569",
                lineHeight: 1.7,
                maxWidth: 460,
              }}
            >
              From soil to sale – Bhoomi connects farmers, shopkeepers, and
              consumers on one intelligent platform.
            </p>

            {/* Stat pills */}
            <div
              data-reveal
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}
            >
              {[
                { value: "50K+", label: "Farmers" },
                { value: "98%",  label: "Accuracy" },
                { value: "12+",  label: "Languages" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(22,163,74,0.15)",
                    borderRadius: 16,
                    padding: "10px 20px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#16a34a" }}>
                    {value}
                  </span>
                  <span style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div
              data-reveal
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36, alignItems: "center" }}
            >
              <a
                href="#features"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  background: "#16a34a",
                  padding: "14px 28px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 10px 32px rgba(22,163,74,0.38)",
                  transition: "transform 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Explore Features <ArrowRight size={17} />
              </a>
              <button
                onClick={onDownload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(8px)",
                  padding: "14px 28px",
                  color: "#16a34a",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "1.5px solid rgba(22,163,74,0.28)",
                  cursor: "pointer",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(22,163,74,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(22,163,74,0.28)";
                }}
              >
                <Download size={17} /> Download APK
              </button>
            </div>
          </div>

          {/* ── RIGHT column: image as-is ── */}
          <div
            data-reveal
            style={{
              flex: "1.1",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              alignSelf: "stretch",
              position: "relative",
              minHeight: 480,
            }}
          >
            <img
              src={heroRight}
              alt="Bhoomi app mockups"
              loading="eager"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "100%",
                maxWidth: 680,
                height: "auto",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
