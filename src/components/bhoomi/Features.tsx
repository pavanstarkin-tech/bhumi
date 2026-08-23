import { LeafyGreen, Store, Mic, CloudSun, Map, FileText, type LucideIcon } from "lucide-react";

const items: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LeafyGreen, title: "AI Crop Diagnosis", desc: "Snap a photo, get instant disease detection and treatment plans." },
  { icon: Store, title: "Smart Marketplace", desc: "Buy, sell, or rent farming inputs and produce directly within the app." },
  { icon: Mic, title: "Voice Assistant", desc: "Hands‑free guidance in your local language, even offline." },
  { icon: CloudSun, title: "Weather & Mandi Prices", desc: "Hyper‑local weather and live market rates for informed decisions." },
  { icon: Map, title: "Land Mapping", desc: "Digitize your farm boundaries with polygon mapping." },
  { icon: FileText, title: "Government Schemes", desc: "Browse and apply for relevant subsidies and support programmes." },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Features</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Everything a modern farm needs
          </h2>
          <p className="mt-4 text-foreground/70">
            One platform for diagnosis, trade, and intelligence — built for the field.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              data-reveal
              className="group rounded-2xl bg-card p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(45,106,79,0.12)] transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl grid place-items-center bg-secondary text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
