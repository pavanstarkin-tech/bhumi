import { useState, useEffect, useRef } from "react";

const FARMER_APP = {
  id: "farmer",
  label: "Farmer App",
  url: "https://pavanstarkin-tech.github.io/bhumi-app/",
  type: "phone",
  videoUrl: "https://pavanstarkin-tech.github.io/bhumi-app/assets/assets/splash.mp4",
};

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
        Loading {label}…
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
          {(!loaded || !loadIframe) && <LoadingOverlay label={title} />}
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

export function LivePreview() {
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

  return (
    <section id="preview" ref={containerRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Live Preview
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Experience Bhoomi Live
          </h2>
          <p className="mt-4 text-foreground/70">
            Interact with the live Bhoomi mobile application right in your browser.
          </p>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="mt-12" data-reveal>
          <PhoneFrame
            url={FARMER_APP.url}
            title={FARMER_APP.label}
            loadIframe={isInView}
            videoUrl={FARMER_APP.videoUrl}
          />
        </div>

      </div>
    </section>
  );
}

