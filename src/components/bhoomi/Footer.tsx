import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/5">
            <img src="https://i.ibb.co/nNhzBtYf/logo-3.png" alt="Bhoomi" className="h-6 w-6 object-contain" />
          </span>
          <span className="text-sm text-foreground/70">
            © 2026 Bhoomi. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social link"
              className="h-9 w-9 grid place-items-center rounded-full text-foreground/60 hover:text-brand hover:bg-secondary transition"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
