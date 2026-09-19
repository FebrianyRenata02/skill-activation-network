import React, { useState, useEffect, useRef } from "react";

interface ProgramItem {
  id: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
  link?: string;
  isBootcamp?: boolean;
  isKampus?: boolean;
}

const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "kuliah",
    title: "Kuliah",
    description:
      "Program pendidikan formal berstandar industri dengan fokus pada penguasaan teori dan praktik teknologi modern.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    actionText: "Lihat Program →",
    isKampus: true,
  },
  {
    id: "bootcamp",
    title: "Bootcamp",
    description:
      "Pelatihan intensif singkat untuk menguasai skill digital spesifik langsung dari praktisi berpengalaman.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    actionText: "Lihat Program →",
    isBootcamp: true,
  },
  {
    id: "magang",
    title: "Magang",
    description:
      "Kesempatan mendapatkan pengalaman kerja nyata di industri teknologi melalui proyek kolaboratif.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    actionText: "Pelajari Detail →",
    link: "https://wa.me/",
  },
  {
    id: "kerja-paruh-waktu",
    title: "Kerja Paruh Waktu",
    description:
      "Peluang fleksibel bagi talenta muda untuk berkontribusi dalam proyek profesional sambil belajar.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    actionText: "Pelajari Detail →",
    link: "https://wa.me/",
  },
];

const NetworkConstellationCanvas: React.FC = () => {
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

    const particleCount = Math.floor((width * height) / 11000);
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
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
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
          "radial-gradient(circle at 50% 25%, #180a33 0%, #0c051a 55%, #06020f 100%)",
      }}
    />
  );
};

export const LearningPath: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Navigasi ke Beranda (Root URL)
  const navigateToHome = () => {
    setMobileMenuOpen(false);
    window.location.href = `${window.location.origin}/`;
  };

  // Navigasi ke University (#/kampus)
  const openKampusTab = () => {
    setMobileMenuOpen(false);
    const targetUrl = `${window.location.origin}/#/kampus`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  // Navigasi ke Bootcamp (#/bootcamp)
  const openBootcampTab = () => {
    setMobileMenuOpen(false);
    const targetUrl = `${window.location.origin}/#/bootcamp`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmitOpenClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubmitted(true);
      setEmailInput("");
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between selection:bg-purple-400 selection:text-slate-950 relative overflow-x-clip font-sans">
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
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(34, 211, 238, 0.75), 0 0 45px rgba(59, 130, 246, 0.45);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Latar Belakang Konstelasi */}
      <NetworkConstellationCanvas />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
        aria-label="Contact via WhatsApp"
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
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#0a0518] border-b border-purple-900/40 w-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            type="button"
            onClick={navigateToHome}
            className="flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0 text-left focus:outline-none group"
            aria-label="Kembali ke Beranda"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0e0a20] border border-cyan-500/40 flex items-center justify-center overflow-hidden p-1.5 shadow-[0_0_18px_rgba(34,211,238,0.3)] group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <img
                src="https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/san-academy2.png"
                alt="SAN Academy Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-widest font-serif animate-text-shimmer drop-shadow-[0_0_12px_rgba(34,211,238,0.35)] whitespace-nowrap">
              SAN Academy
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-300">
            <button
              type="button"
              onClick={navigateToHome}
              className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 focus:outline-none"
            >
              Beranda
            </button>
            <span className="text-cyan-300 font-semibold cursor-default">
              Learning Path
            </span>
            <button
              type="button"
              onClick={openBootcampTab}
              className="hover:text-cyan-300 transition-colors duration-200 bg-transparent border-0 cursor-pointer text-slate-300 text-xs sm:text-sm font-medium p-0 focus:outline-none"
            >
              Bootcamp
            </button>
            <button
              type="button"
              onClick={openKampusTab}
              className="hover:text-cyan-300 transition-colors duration-200 bg-transparent border-0 cursor-pointer text-slate-300 text-xs sm:text-sm font-medium p-0 focus:outline-none"
            >
              Kuliah & Kampus
            </button>
          </nav>

          {/* Desktop CTA & Hamburger Button Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 animate-pulse-glow whitespace-nowrap"
            >
              Gabung Kelas
            </a>

            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-200 hover:text-cyan-400 focus:outline-none p-2 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                // Ikon Silang (X)
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
                // Ikon Hamburger (Garis 3)
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

        {/* Mobile Dropdown Solid (Pekat Solid, Bebas Tabrakan Teks) */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#0a0418] border-b border-purple-900/60 shadow-2xl px-6 pt-5 pb-7 flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-5">
              <button
                type="button"
                onClick={navigateToHome}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Beranda
              </button>
              <span className="text-sm font-semibold text-cyan-400 cursor-default">
                Learning Path
              </span>
              <button
                type="button"
                onClick={openBootcampTab}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Bootcamp
              </button>
              <button
                type="button"
                onClick={openKampusTab}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Kuliah & Kampus
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSection("daftar-open-class")}
                className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Daftar Open Class
              </button>

              <button
                type="button"
                onClick={navigateToHome}
                className="w-full mt-2 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-sm shadow-lg border-0 cursor-pointer transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1">
        <section
          id="program"
          className="py-16 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full"
        >
          <div className="text-left mb-10">
            <p className="text-cyan-300 tracking-[0.25em] text-[10px] sm:text-xs font-bold uppercase mb-2">
              KURIKULUM UNGGULAN
            </p>
            <h2 className="text-2xl sm:text-4xl font-serif text-slate-100 tracking-wide font-normal">
              Program Kelas Pilihan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS_DATA.map((prog) => (
              <div
                key={prog.id}
                className="bg-[#110726]/80 border border-purple-500/20 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1.5 group backdrop-blur-md shadow-xl"
              >
                <div>
                  <div className="relative w-full h-44 overflow-hidden bg-purple-950/40">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#110726] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg text-slate-100 mb-2 group-hover:text-cyan-200 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed font-light line-clamp-3">
                      {prog.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  {prog.isKampus ? (
                    <button
                      type="button"
                      onClick={openKampusTab}
                      className="inline-flex items-center text-xs font-semibold text-cyan-300 hover:text-cyan-100 transition-colors gap-1.5 group-hover:translate-x-1 duration-300 bg-transparent border-0 p-0 cursor-pointer"
                    >
                      <span>Lihat Program →</span>
                    </button>
                  ) : prog.isBootcamp ? (
                    <button
                      type="button"
                      onClick={openBootcampTab}
                      className="inline-flex items-center text-xs font-semibold text-cyan-300 hover:text-cyan-100 transition-colors gap-1.5 group-hover:translate-x-1 duration-300 bg-transparent border-0 p-0 cursor-pointer"
                    >
                      <span>Lihat Program →</span>
                    </button>
                  ) : (
                    <a
                      href={prog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-cyan-300 hover:text-cyan-100 transition-colors gap-1.5 group-hover:translate-x-1 duration-300"
                    >
                      <span>{prog.actionText}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Daftar Open Class */}
          <div
            id="daftar-open-class"
            className="mt-16 md:mt-20 bg-gradient-to-r from-[#12072b]/95 via-[#160936]/90 to-[#0e163b]/90 border border-purple-500/30 rounded-3xl p-8 sm:p-12 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative"
          >
            <div className="text-left max-w-xl">
              <p className="text-cyan-300 tracking-[0.25em] text-[10px] sm:text-xs font-semibold uppercase mb-2">
                DAFTAR OPEN CLASS
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-100 mb-3 tracking-wide">
                Amankan Kursi Anda Sekarang
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Dapatkan informasi eksklusif dan notifikasi jadwal kelas langsung melalui email Anda.
              </p>
            </div>

            <form
              onSubmit={handleSubmitOpenClass}
              className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 shrink-0"
            >
              <input
                type="email"
                placeholder="Masukkan email Anda"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="bg-[#090317]/80 border border-purple-500/30 rounded-full px-6 py-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-300 w-full sm:w-80 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.35)] shrink-0"
              >
                DAFTAR
              </button>
            </form>

            {isSubmitted && (
              <div className="absolute -bottom-6 left-8 text-cyan-300 text-xs font-medium">
                Pendaftaran berhasil! Cek email Anda untuk konfirmasi jadwal.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-cyan-900/40 py-8 px-4 sm:px-8 text-xs bg-[#06020f]/95 backdrop-blur-md relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
            <span className="font-serif tracking-wider text-slate-100 font-semibold text-sm animate-text-shimmer drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]">
              SAN Academy
            </span>
            <span className="text-slate-600 select-none">|</span>
            <span className="text-slate-400 text-xs tracking-normal">
              © 2026 SAN Academy Co., Ltd. All rights reserved.
            </span>
          </div>

          <nav className="flex items-center gap-6 sm:gap-8 text-xs font-medium">
            <button
              type="button"
              onClick={openKampusTab}
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
            >
              Kuliah & Kampus
            </button>
            <button
              type="button"
              onClick={openBootcampTab}
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
            >
              Bootcamp
            </button>
            <a
              href="#daftar-open-class"
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Daftar Open Class
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LearningPath;
