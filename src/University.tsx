import React, { useState, useEffect, useRef } from "react";

interface ProdiItem {
  id: number;
  degree: string;
  title: string;
  description: string;
  link: string;
}

const PRODI_DATA: ProdiItem[] = [
  {
    id: 1,
    degree: "SARJANA (S1)",
    title: "Teknik Informatika",
    description:
      "Mempelajari pengembangan perangkat lunak, kecerdasan buatan, arsitektur data, dan komputasi awan modern.",
    link: "index.html#/kampus",
  },
  {
    id: 2,
    degree: "SARJANA (S1)",
    title: "Sistem Informasi",
    description:
      "Fokus pada integrasi solusi teknologi informasi dengan manajemen strategi bisnis korporasi global.",
    link: "index.html#/kampus",
  },
  {
    id: 3,
    degree: "DIPLOMA (D3)",
    title: "Teknologi Multimedia",
    description:
      "Pendidikan vokasi yang mendalam di bidang desain interaktif, animasi digital, dan produksi media kreatif.",
    link: "index.html#/kampus",
  },
];

// Canvas Background Partikel Jaringan Ungu
const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.floor((width * height) / 12000);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.22;
            ctx.strokeStyle = `rgba(216, 180, 254, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "rgba(233, 213, 255, 0.65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(30, 10, 56, 0.45) 0%, #0a071d 45%, #05030e 100%)",
      }}
    />
  );
};

export const University: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const prodiSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToProdi = () => {
    setMobileMenuOpen(false);
    if (prodiSectionRef.current) {
      prodiSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBackToHome = () => {
    setMobileMenuOpen(false);
    window.location.href = `${window.location.origin}/`;
  };

  const handleGoToLearningPath = () => {
    setMobileMenuOpen(false);
    window.location.href = `${window.location.origin}/#/learning-path`;
  };

  const handleGoToBootcamp = () => {
    setMobileMenuOpen(false);
    window.location.href = `${window.location.origin}/#/bootcamp`;
  };

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-x-hidden font-sans">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes textShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #e2e8f0 0%, #22d3ee 50%, #e2e8f0 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 4s linear infinite;
        }
      `}</style>

      {/* Latar Belakang Konstelasi */}
      <ConstellationCanvas />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
        aria-label="Hubungi WhatsApp"
      >
        <img
          src="https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/whatsapp-icon.png"
          alt="WhatsApp Icon"
          width="56"
          height="56"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          loading="lazy"
        />
      </a>

      {/* Header Sticky Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#0a0518] border-b border-purple-900/40 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 md:px-20 h-16 sm:h-20 flex items-center justify-between">
          <div
            onClick={handleBackToHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Navbar */}
            <div className="w-10 h-10 rounded-xl bg-[#0e0a20] border border-cyan-500/40 flex items-center justify-center overflow-hidden p-1 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 transition-colors">
              <img
                src="https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/san-academy2.png"
                alt="Logo SAN University"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("src/assets")) {
                    target.src = "/SAN%20University.png";
                  }
                }}
              />
            </div>
            <span className="text-xl font-bold tracking-widest font-serif animate-text-shimmer drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] whitespace-nowrap">
              SAN University
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-300">
            <button
              onClick={handleBackToHome}
              className="hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-slate-300 text-sm font-medium"
            >
              Beranda Utama
            </button>
            <button
              onClick={handleGoToLearningPath}
              className="hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-slate-300 text-sm font-medium"
            >
              Learning Path
            </button>
            <button
              onClick={handleGoToBootcamp}
              className="hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-slate-300 text-sm font-medium"
            >
              Bootcamp
            </button>
            <button
              onClick={handleScrollToProdi}
              className="hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-slate-300 text-sm font-medium"
            >
              Program Studi
            </button>
          </nav>

          {/* Desktop CTA Button & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToHome}
              className="hidden lg:inline-flex bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] items-center justify-center border-0 cursor-pointer whitespace-nowrap"
            >
              Kembali ke Beranda
            </button>

            {/* Hamburger Button (Mobile) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-200 hover:text-cyan-400 focus:outline-none p-2 rounded-lg transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? (
                // Ikon Silang (X) persis seperti referensi
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Ikon Garis 3 Hamburger
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Solid (PERSIS SEPERTI GAMBAR PERTAMA: SOLID HITAM-UNGU PEKAT, TIDAK TRANSPARAN & TIDAK MENIMPA KONTEN) */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#0a0418] border-b border-purple-900/60 shadow-2xl px-6 pt-5 pb-7 flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-5">
              <button
                onClick={handleBackToHome}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Beranda Utama
              </button>
              <button
                onClick={handleGoToLearningPath}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Learning Path
              </button>
              <button
                onClick={handleGoToBootcamp}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Bootcamp
              </button>
              <button
                onClick={handleScrollToProdi}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Program Studi
              </button>
              <button
                onClick={handleScrollToProdi}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Fakultas
              </button>

              {/* Tombol aksi biru solid full-width seperti tombol Enroll di referensi */}
              <button
                onClick={handleBackToHome}
                className="w-full mt-2 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-sm shadow-lg border-0 cursor-pointer transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1 py-12 sm:py-16 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-left max-w-3xl mb-16 sm:mb-24 pt-4 sm:pt-6">
          <p className="text-cyan-400 tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4 uppercase">
            PENDIDIKAN TINGGI FORMAL 2026
          </p>
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif font-normal mb-6 text-slate-100 leading-tight">
            Membangun Masa Depan Bersama SAN University
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-2xl">
            Selamat datang di portal resmi program akademik{" "}
            <span className="text-slate-200 font-medium">SAN University</span>.
            Dapatkan gelar sarjana dan diploma dengan standar kurikulum global dan
            berbasis teknologi masa depan.
          </p>
          <div>
            <button
              onClick={handleScrollToProdi}
              className="inline-block bg-white hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase border-0 cursor-pointer"
            >
              LIHAT PROGRAM STUDI
            </button>
          </div>
        </div>

        {/* Section Program Studi Unggulan */}
        <div
          ref={prodiSectionRef}
          className="max-w-7xl mx-auto pt-8 scroll-mt-28"
        >
          <p className="text-cyan-400 tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-2 uppercase">
            FAKULTAS & JURUSAN
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-slate-100 mb-10 font-normal">
            Pilihan Program Studi Unggulan
          </h2>

          {/* Grid 3 Kartu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODI_DATA.map((prodi) => (
              <div
                key={prodi.id}
                className="bg-[#0e0a20]/80 border border-cyan-900/40 rounded-3xl p-8 flex flex-col justify-between hover:border-cyan-400/60 hover:-translate-y-1.5 transition-all duration-300 group backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] min-h-[280px]"
              >
                <div>
                  <span className="text-cyan-400 text-[11px] font-mono font-semibold tracking-wider block mb-3 uppercase">
                    {prodi.degree}
                  </span>
                  <h3 className="text-xl font-serif text-slate-100 group-hover:text-cyan-300 transition-colors mb-3">
                    {prodi.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                    {prodi.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-900/30">
                  <a
                    href={prodi.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-200 transition-colors gap-1.5 group-hover:translate-x-1 duration-300"
                  >
                    <span>Daftar Kuliah →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-cyan-900/30 py-8 px-6 sm:px-12 md:px-20 bg-[#05030d] z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-serif font-semibold">
              SAN University
            </span>
            <span>|</span>
            <span>© 2026 SAN University Co., Ltd. All rights reserved.</span>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={handleBackToHome}
              className="text-slate-400 hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-xs"
            >
              Beranda Utama
            </button>
            <button
              onClick={handleScrollToProdi}
              className="text-slate-400 hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-xs"
            >
              Program Studi
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default University;
