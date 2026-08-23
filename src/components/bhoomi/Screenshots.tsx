import { useEffect, useRef } from "react";

const shots = [
  "https://i.ibb.co/Lq1tsTC/cart.jpg",
  "https://i.ibb.co/PsCHx6Yx/reel-drone.jpg",
  "https://i.ibb.co/twVhLLGd/reel-rice-mechene.jpg",
  "https://i.ibb.co/CpGvfNP6/reel-tracktor.jpg",
  "https://i.ibb.co/qYS8kmXJ/subsites.jpg",
  "https://i.ibb.co/hJQQryfM/advisary-comete.jpg",
  "https://i.ibb.co/FkWF2Zy9/ai-assistent.jpg",
  "https://i.ibb.co/d0p0xMdJ/area-selection.jpg",
  "https://i.ibb.co/4nzFz5Dd/dash.jpg",
  "https://i.ibb.co/mCRHz3pb/deses-detechtion-marking.jpg",
  "https://i.ibb.co/j9twRVjd/desese-daignosis.jpg",
  "https://i.ibb.co/21wT34pZ/farmar-onnbording.jpg",
  "https://i.ibb.co/svdQdD4K/languages.jpg",
  "https://i.ibb.co/9CZjCfd/mechinary.jpg",
  "https://i.ibb.co/SX4FLVWv/myfarm.jpg",
  "https://i.ibb.co/Z6Sm605z/onbvord1.jpg",
  "https://i.ibb.co/SDpBh9wq/profile.jpg",
  "https://i.ibb.co/QFDy7FWk/reels.jpg",
  "https://i.ibb.co/YFJwFtT8/roleselection.jpg",
  "https://i.ibb.co/tP4wXpLM/theme.jpg",
  "https://i.ibb.co/MkQd9KL8/multilingual-assistent.jpg",
  "https://i.ibb.co/jvZ1tjWx/logo.jpg",
  "https://i.ibb.co/hRW1x95g/introbackstroy.jpg",
];

const PHONE_W  = 210;
const PHONE_H  = 440;
const SPACING  = 250;           // px between phone centres
const N        = shots.length;
const TOTAL    = N * SPACING;   // full loop length
const SPEED    = 1.6;           // px per frame (≈60 fps → ~2.6 s per phone at centre)

/** Return the 3D style values for a phone at horizontal offset `x` from centre */
function get3D(x: number) {
  const t    = x / SPACING;           // normalised position (0 = centre)
  const absT = Math.abs(t);
  const rotateY = -(t) * 24;          // right side angled back, left side angled back
  const scale   = Math.max(0.55, 1 - absT * 0.13);
  const z       = -(absT * absT) * 60; // quadratic depth falloff
  const opacity = Math.max(0, 1.15 - absT * 0.26);
  const zIndex  = Math.round(100 - absT * 10);
  return { rotateY, scale, z, opacity, zIndex };
}

function PhoneFrame({ src }: { src: string }) {
  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: "2.2rem",
        backgroundColor: "#111",
        padding: 7,
        position: "relative",
        boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div style={{
        position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)",
        height: 17, width: 72,
        borderBottomLeftRadius: 13, borderBottomRightRadius: 13,
        backgroundColor: "#111", zIndex: 10,
      }} />
      {/* Power button */}
      <div style={{ position: "absolute", right: -3, top: 88, width: 3, height: 34, backgroundColor: "#3a3a3a", borderRadius: "0 3px 3px 0" }} />
      {/* Volume buttons */}
      <div style={{ position: "absolute", left: -3, top: 70,  width: 3, height: 26, backgroundColor: "#3a3a3a", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: -3, top: 103, width: 3, height: 26, backgroundColor: "#3a3a3a", borderRadius: "3px 0 0 3px" }} />
      {/* Glass sheen */}
      <div style={{
        position: "absolute", top: 7, left: 7, right: 7, bottom: 7, borderRadius: "1.7rem",
        background: "linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 55%)",
        pointerEvents: "none", zIndex: 5,
      }} />
      {/* Screen */}
      <div style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: "1.7rem" }}>
        <img
          src={src} alt="App screenshot"
          loading="lazy" draggable={false}
          style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

export function Screenshots() {
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);   // continuously increasing scroll offset
  const pausedRef = useRef(false);

  useEffect(() => {
    let raf: number;

    const tick = () => {
      // Advance offset
      if (!pausedRef.current) offsetRef.current += SPEED;

      const offset = offsetRef.current % TOTAL;

      phoneRefs.current.forEach((el, i) => {
        if (!el) return;

        // Raw x for this phone given current offset
        let x = i * SPACING - offset;

        // Wrap into [-TOTAL/2 , +TOTAL/2) so phones cycle right→left endlessly
        x = ((x % TOTAL) + TOTAL) % TOTAL - TOTAL / 2;

        // 3D transforms computed from position
        const { rotateY, scale, z, opacity, zIndex } = get3D(x);

        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity   = String(Math.min(1, opacity));
        el.style.zIndex    = String(zIndex);
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);   // ← runs once; reads refs, no stale closures

  return (
    <section
      id="screenshots"
      style={{
        padding: "96px 0 80px",
        background: "linear-gradient(180deg,#ffffff 0%,#edf7f1 100%)",
        overflow: "hidden",
      }}
    >
      {/* ── Heading ── */}
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "0 24px" }} data-reveal>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#16a34a" }}>
          Screenshots
        </p>
        <h2 style={{ marginTop: 12, fontSize: "clamp(1.9rem,5vw,3rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a" }}>
          See the App in Action
        </h2>
        <p style={{ marginTop: 14, color: "#64748b", fontSize: 16 }}>
          Real device frames gliding in 3D — hover to pause.
        </p>
      </div>

      {/* ── 3-D stage ── */}
      <div
        data-reveal
        style={{
          marginTop: 72,
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          /* fade edges so phones slide in/out smoothly */
          WebkitMaskImage: "linear-gradient(to right,transparent 0%,black 14%,black 86%,transparent 100%)",
          maskImage:        "linear-gradient(to right,transparent 0%,black 14%,black 86%,transparent 100%)",
        }}
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          style={{
            position: "relative",
            height: PHONE_H + 60,
            transformStyle: "preserve-3d",
          }}
        >
          {shots.map((src, i) => (
            <div
              key={i}
              ref={(el) => { phoneRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                /* Centre the phone card on its anchor point */
                marginLeft:  -(PHONE_W  / 2),
                marginTop:   -(PHONE_H  / 2),
                transformStyle: "preserve-3d",
                willChange:  "transform, opacity",
                /* initial hide to avoid flash before first RAF tick */
                opacity: 0,
              }}
            >
              <PhoneFrame src={src} />
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#94a3b8" }}>
        Scrolling right → left &nbsp;·&nbsp; Hover to pause
      </p>
    </section>
  );
}
