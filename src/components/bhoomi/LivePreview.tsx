import { useState, useEffect, useRef } from "react";
import { Sprout, Store, LayoutDashboard } from "lucide-react";

const TABS = [
  {
    id: "farmer",
    label: "Farmer",
    icon: Sprout,
    url: "https://pavanstarkin-tech.github.io/bhumi-app/",
    type: "phone",
    videoUrl: "https://pavanstarkin-tech.github.io/bhumi-app/assets/assets/splash.mp4",
  },
  {
    id: "admin",
    label: "Admin",
    icon: LayoutDashboard,
    url: "https://pavanstarkin-tech.github.io/bhumi-app/#/admin",
    type: "desktop",
  },
  {
    id: "shopkeeper",
    label: "Shopkeeper",
    icon: Store,
    url: "https://pavanstarkin-tech.github.io/bhumi-app/#/shop",
    type: "desktop",
  },
];

function LoadingOverlay({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafb",
        zIndex: 10,
        borderRadius: "inherit",
        gap: 16,
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "4px solid #e2e8f0",
          borderTopColor: "#16a34a",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
        Loading {label} panel…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function PhoneFrame({
  url,
  title,
  loadIframe,
  videoUrl,
}: {
  url: string;
  title: string;
  loadIframe: boolean;
  videoUrl?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [videoActive, setVideoActive] = useState(!!videoUrl);
  const [videoFadeOut, setVideoFadeOut] = useState(false);

  useEffect(() => {
    if (!loadIframe) {
      setLoaded(false);
      return;
    }
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [url, loadIframe]);

  // Reset video state when tab/URL becomes active or changes
  useEffect(() => {
    if (videoUrl && loadIframe) {
      setVideoActive(true);
      setVideoFadeOut(false);
    } else {
      setVideoActive(false);
      setVideoFadeOut(false);
    }
  }, [url, videoUrl, loadIframe]);

  const handleVideoEnd = () => {
    setVideoFadeOut(true);
    setTimeout(() => {
      setVideoActive(false);
    }, 500);
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative rounded-[2.4rem] bg-neutral-900 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.25)]"
        style={{ width: "min(255px,66vw)", aspectRatio: "9/21" }}
      >
        <div 
          className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white"
          style={{ overscrollBehavior: "contain" }}
        >
          {videoActive && videoUrl && loadIframe && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#000",
                zIndex: 20,
                opacity: videoFadeOut ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                src={videoUrl}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                onError={handleVideoEnd}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <button
                onClick={handleVideoEnd}
                className="absolute top-4 right-4 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/90 bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
                style={{
                  letterSpacing: "0.05em",
                }}
              >
                Skip
                <svg
                  className="w-3 h-3 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
          {(!loaded || !loadIframe) && <LoadingOverlay label={title.replace(" Panel", "")} />}
          {loadIframe && (
            <iframe
              src={url}
              title={title}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              loading="lazy"
              className="border-0"
              onLoad={() => setLoaded(true)}
              style={{
                width: "166.7%",
                height: "166.7%",
                transform: "scale(0.6)",
                transformOrigin: "top left",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.4s ease",
                overscrollBehavior: "contain",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopFrame({ url, title, loadIframe }: { url: string; title: string; loadIframe: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loadIframe) {
      setLoaded(false);
      return;
    }
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [url, loadIframe]);

  return (
    <div className="w-full max-w-[900px] mx-auto rounded-2xl border border-black/10 bg-neutral-900 p-2 shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
      {/* macOS-style title bar */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          {(!loaded || !loadIframe) && (
            <span style={{ marginLeft: 8, fontSize: 11, color: "#6b7280" }}>
              Loading…
            </span>
          )}
        </div>
        {title.toLowerCase().includes("admin") && (
          <span className="text-[11px] font-semibold text-neutral-300 bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-700">
            Passcode: 9282
          </span>
        )}
      </div>

      {/* Screen */}
      <div
        className="rounded-xl overflow-hidden bg-white relative"
        style={{ aspectRatio: "16/9", overscrollBehavior: "contain" }}
      >
        {(!loaded || !loadIframe) && <LoadingOverlay label={title.replace(" Panel", "")} />}
        {loadIframe && (
          <iframe
            src={url}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            loading="lazy"
            className="border-0"
            onLoad={() => setLoaded(true)}
            style={{
              width: "133.3%",
              height: "133.3%",
              transform: "scale(0.75)",
              transformOrigin: "top left",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
              overscrollBehavior: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}

export function LivePreview() {
  const [activeTab, setActiveTab] = useState("farmer");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="preview" ref={containerRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Live Preview
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Experience the Web Panels
          </h2>
          <p className="mt-4 text-foreground/70">
            Explore Bhoomi's Farmer, Admin, and Shopkeeper interfaces live.
            {activeTab === "admin" && (
              <span className="block mt-2 text-brand font-semibold animate-pulse">
                Admin Passcode: 9282
              </span>
            )}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-12 flex justify-center" data-reveal>
          <div className="inline-flex items-center gap-1 rounded-2xl bg-muted p-1.5 shadow-inner">
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: isActive ? "#16a34a" : "transparent",
                    color: isActive ? "#fff" : "#64748b",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(22,163,74,0.35)"
                      : "none",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-10" data-reveal>
          {current.type === "phone" ? (
            <PhoneFrame
              url={current.url}
              title={`${current.label} Panel`}
              loadIframe={isInView}
              videoUrl={current.videoUrl}
            />
          ) : (
            <DesktopFrame url={current.url} title={`${current.label} Panel`} loadIframe={isInView} />
          )}
        </div>

      </div>
    </section>
  );
}
