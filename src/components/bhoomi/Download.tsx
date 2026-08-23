import { Download, X, Smartphone } from "lucide-react";
import { useEffect } from "react";

const APK_URL = "https://github.com/pavanstarkin-tech/bhumi/releases/download/v1.0.0/app-release.apk";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APK_URL)}`;

export function DownloadSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="download" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-brand text-white p-10 md:p-16 text-center shadow-[0_30px_80px_rgba(45,106,79,0.35)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #52B788 0, transparent 40%), radial-gradient(circle at 80% 80%, #D4A373 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Get Started</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Get the Bhoomi App
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Install Bhoomi on your Android device and put an intelligent farming
              companion in your pocket.
            </p>
            <button
              onClick={onOpen}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand hover:-translate-y-0.5 transition pulse-cta"
            >
              <Download size={18} /> Download APK for Android
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/50 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition"
        >
          <X size={18} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-xl bg-secondary text-brand grid place-items-center">
            <Smartphone size={22} />
          </div>
          <h3 className="mt-4 text-2xl font-bold">Download Bhoomi APK</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Or scan the QR code with your phone.
          </p>
          <div className="mt-6 rounded-2xl border border-black/10 p-3 bg-white">
            <img src={QR_URL} alt="APK QR code" className="h-[220px] w-[220px]" />
          </div>
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-6 py-4 font-semibold hover:bg-brand/90 transition"
          >
            <Download size={18} /> Direct Download
          </a>
        </div>
      </div>
    </div>
  );
}
