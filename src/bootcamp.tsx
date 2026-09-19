import React, { useEffect, useRef } from "react";

const illustrations = [
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80",
];

const customTopics = [
  "UI/UX Design",
  "Full-Stack Web Developer",
  "DevOps Engineer",
  "Cyber Security",
  "Blockchain & Solidity",
];

const weeksList = [
  "Minggu 1 - 3",
  "Minggu 4 - 7",
  "Minggu 8 - 10",
  "Minggu 11 - 13",
  "Minggu 14 - 16",
];

// Canvas Background Partikel
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
          "radial-gradient(ellipse at top, rgba(30, 10, 56, 0.4) 0%, #0a071d 45%, #05030e 100%)",
      }}
    />
  );
};

export const Bootcamp: React.FC = () => {
  const handleBackToHome = () => {
    if (window.opener) {
      window.close();
    } else {
      window.location.hash = "#/learning-path";
    }
  };

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-x-hidden font-sans">
      <style>{`
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
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0818]/90 border-b border-cyan-900/30 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 h-20 flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-3 group focus:outline-none bg-transparent border-0 cursor-pointer p-0 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0e0a20] border border-cyan-500/40 flex items-center justify-center overflow-hidden p-1 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 transition-colors">
              <img
                src="https://raw.githubusercontent.com/FebrianyRenata02/SAN-Academy-2/refs/heads/main/img/san-academy2.png"
                alt="Logo SAN Academy"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-bold tracking-widest font-serif animate-text-shimmer drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              SAN Academy
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-300">
            <button
              onClick={handleBackToHome}
              className="hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-0 text-slate-300 text-sm font-medium"
            >
              Beranda
            </button>
            <span className="text-cyan-400 font-semibold cursor-default">
              Bootcamp
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBackToHome}
              className="hidden sm:inline-flex bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] items-center justify-center border-0 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1 py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-cyan-400 tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3 uppercase">
            PROGRAM EKSKLUSIF
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal mb-6 text-slate-100">
            Bootcamp Intensif
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Program pelatihan penuh praktik yang dirancang khusus untuk membimbing Anda dari pemula hingga siap kerja di industri tech global.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif text-cyan-300 mb-8 text-center sm:text-left">
            Kurikulum & Materi Pembelajaran
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customTopics.map((topicName, index) => (
              <div
                key={index}
                className="bg-[#0e0a20]/80 border border-cyan-900/40 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-cyan-400/60 hover:-translate-y-1.5 transition-all duration-300 group backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={illustrations[index]}
                      alt={topicName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a20] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 bg-[#0b0818]/90 border border-cyan-900/40 text-cyan-300 text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                      {weeksList[index]}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 text-[11px] font-mono">
                        Modul 0{index + 1}
                      </span>
                      <span className="text-[11px] text-cyan-400 font-semibold">
                        Tersedia
                      </span>
                    </div>
                    <h3 className="text-lg font-serif text-slate-100 group-hover:text-cyan-300 transition-colors mb-3">
                      {topicName}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed mb-4">
                      Pelajari materi mendalam dan studi kasus praktis sesuai standar industri pada sesi pembelajaran ini.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-cyan-900/30 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Status: <span className="text-cyan-400 font-semibold">Aktif</span>
                    </span>
                    <a
                      href="index.html#/bootcamp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                    >
                      Detail &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-8 py-4 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300"
            >
              Daftar Program Bootcamp Sekarang
            </a>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-cyan-900/30 py-8 bg-[#05030d] z-10 text-center text-xs text-slate-500">
        <p>© 2026 SAN Academy Co., Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Bootcamp;