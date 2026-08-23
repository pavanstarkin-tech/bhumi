import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/bhoomi/Navbar";
import { Hero } from "@/components/bhoomi/Hero";
import { Features } from "@/components/bhoomi/Features";
import { Screenshots } from "@/components/bhoomi/Screenshots";
import { LivePreview } from "@/components/bhoomi/LivePreview";
import { DownloadSection, DownloadModal } from "@/components/bhoomi/Download";
import { Footer } from "@/components/bhoomi/Footer";
import { useReveal } from "@/components/bhoomi/useReveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <main>
        <Hero onDownload={() => setOpen(true)} />
        <Features />
        <Screenshots />
        <LivePreview />
        <DownloadSection onOpen={() => setOpen(true)} />
      </main>
      <Footer />
      <DownloadModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
