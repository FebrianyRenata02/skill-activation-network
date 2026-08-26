import React, { useState, useCallback } from "react";

interface Fasilitas {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  externalLink?: string;
}

interface FeaturedFasilitas {
  name: string;
  image: string;
  externalLink?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Mission {
  id: string;
  title: string;
  date: string;
  patchUrl: string;
}

const FASILITAS_DATA: Fasilitas[] = [
  {
    id: "community",
    name: "Community",
    subtitle: "FACILITIES PROVIDED",
    description:
      "Ruang kolaborasi terbuka dan komunitas aktif untuk saling berdiskusi, berbagi wawasan, dan membangun relasi profesional.",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop",
  },
  {
    id: "company",
    name: "Company",
    subtitle: "FACILITIES PROVIDED",
    description:
      "Fasilitas pembelajaran modern berstandar industri, proyek interaktif, dan materi kurikulum yang selalu diperbarui.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    externalLink: "https://san-global-digital.vercel.app/",
  },
  {
    id: "working-space",
    name: "Working Space",
    subtitle: "FACILITIES PROVIDED",
    description:
      "Co-working space yang nyaman, tenang, dan kondusif untuk mendukung produktivitas dalam menyelesaikan proyek maupun tugas & kerjaan harian.",
    image:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop",
  },
  {
    id: "learning-facilities",
    name: "LEARNING FACILITIES",
    subtitle: "FACILITIES PROVIDED",
    description:
      "Wadah bagi siswa untuk merintis startup, mendapatkan mentorship langsung, serta akses ke ekosistem industri digital.",
    image:
      "https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/san-academy2.png",
    externalLink: "https://san-academy-fkyn.vercel.app/",
  },
  {
    id: "library",
    name: "LIBRARY",
    subtitle: "FACILITIES PROVIDED",
    description:
      "Library atau perpustakaan digital wadah bagi siswa untuk merintis dan belajar.",
    image:
      "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=800&auto=format&fit=crop",
  },
];

const FEATURED_FASILITAS: FeaturedFasilitas[] = [
  {
    name: "COMMUNITY",
    image:
      "https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Untitled%20(33).png",
  },
  {
    name: "LEARNING FACILITIES",
    image:
      "https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/san-academy2.png",
    externalLink: "https://san-academy-fkyn.vercel.app/",
  },
  {
    name: "WORKING SPACE",
    image:
      "https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Co-Working%20Space2.png",
  },
  {
    name: "COMPANY",
    image:
      "https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/SAN.png",
    externalLink: "https://san-global-digital.vercel.app/",
  },
];

const COURSES_DATA: Course[] = [
  {
    id: "1",
    title: "Aeno Navigation",
    description:
      "Master deep space trajectory, celestial orbits, and interstellar navigation fundamentals.",
    image:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ring of Saturn & Study in Gas Giants",
    description:
      "Comprehensive study of Saturnian ring structures and planetary gas dynamics.",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Saturn Studies & Science",
    description:
      "An in-depth analysis of atmospheric compositions and satellite moon systems.",
    image:
      "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=400&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Saturn Planets & Exoplanets",
    description:
      "Discover exoplanetary atmospheres and habits in neighboring solar systems.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Deep Space Speciation & Galaxy Studies",
    description:
      "Exploring galactic evolution, dark matter mapping, and deep ocean worlds.",
    image:
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop",
  },
];

const MISSIONS_DATA: Mission[] = [
  {
    id: "1",
    title: "Artemis II Launch",
    date: "Jan 1, 2025",
    patchUrl:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=100&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Europa Clipper Probe",
    date: "Apr 2, 2025",
    patchUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=100&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Saturn Moon Mission",
    date: "Jun 5, 2025",
    patchUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Mars Surface Rover",
    date: "Oct 3, 2025",
    patchUrl:
      "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=100&auto=format&fit=crop",
  },
];

export const App: React.FC = () => {
  const [activeFasilitasIndex, setActiveFasilitasIndex] = useState<number>(0);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const currentFasilitas = FASILITAS_DATA[activeFasilitasIndex];

  const prevFasilitasName =
    FASILITAS_DATA[
      (activeFasilitasIndex - 1 + FASILITAS_DATA.length) % FASILITAS_DATA.length
    ].name;
  const nextFasilitasName =
    FASILITAS_DATA[(activeFasilitasIndex + 1) % FASILITAS_DATA.length].name;

  const handleNextFasilitas = useCallback(() => {
    setActiveFasilitasIndex((prev) => (prev + 1) % FASILITAS_DATA.length);
  }, []);

  const handlePrevFasilitas = useCallback(() => {
    setActiveFasilitasIndex(
      (prev) => (prev - 1 + FASILITAS_DATA.length) % FASILITAS_DATA.length,
    );
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleFasilitasRedirect = () => {
    if (currentFasilitas.externalLink) {
      window.location.href = currentFasilitas.externalLink;
    }
  };

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-x-clip font-sans">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes galaxySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes reverseGalaxySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cosmicPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-galaxy-spin {
          animation: galaxySpin 120s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverseGalaxySpin 150s linear infinite;
        }
        .animate-cosmic-pulse {
          animation: cosmicPulse 18s ease-in-out infinite;
        }
        .shine-text {
          background: linear-gradient(
            110deg,
            #22d3ee 30%,
            #ffffff 50%,
            #8b5cf6 70%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 16s linear infinite;
        }
      `}</style>

      {/* Background Global */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-[#0a071d] to-[#04020a] pointer-events-none z-0" />

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
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        />
      </a>

      {/* Header Sticky Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0818]/90 border-b border-purple-900/40 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest font-serif shine-text truncate">
              Skill Activation Network
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <div className="relative flex items-center gap-3">
              <a
                href="#planets"
                className="hover:text-cyan-400 transition-colors"
              >
                Fasilitas
              </a>
              <div className="flex items-center gap-1.5 pl-2 border-l border-purple-800/50">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                    SEE MORE
                  </span>
                  <span
                    className={`transform transition-transform duration-300 text-xs ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>
              </div>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-[#0b0818]/95 backdrop-blur-xl border border-purple-900/50 rounded-2xl shadow-2xl py-2 z-50 flex flex-col">
                  {FASILITAS_DATA.map((fasilitas, idx) => (
                    <button
                      key={fasilitas.id}
                      onClick={() => {
                        setActiveFasilitasIndex(idx);
                        setIsServicesOpen(false);
                      }}
                      className="text-left px-4 py-2.5 text-xs text-slate-300 hover:text-cyan-400 hover:bg-purple-950/40 transition-colors"
                    >
                      {fasilitas.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#trailer"
              className="hover:text-cyan-400 transition-colors"
            >
              Course Catalog
            </a>
            <a
              href="#team-work"
              className="hover:text-cyan-400 transition-colors"
            >
              Team Work
            </a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">
              Blog
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:block bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-2 rounded-full font-bold text-sm transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Enroll
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-slate-300 p-1 focus:outline-none shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0b0818]/95 backdrop-blur-2xl border-b border-purple-900/50 px-4 py-4 flex flex-col gap-3 text-center">
            <a
              href="#planets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 text-sm py-1 font-medium"
            >
              Fasilitas
            </a>
            <a
              href="#trailer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 text-sm py-1 font-medium"
            >
              Course Catalog
            </a>
            <a
              href="#team-work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 text-sm py-1 font-medium"
            >
              Team Work
            </a>
            <a
              href="#blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 text-sm py-1 font-medium"
            >
              Blog
            </a>
            <button className="sm:hidden bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 px-4 py-2 rounded-full font-bold text-xs w-full mt-1">
              Enroll
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1">
        {/* Hero Section */}
        <section
          id="planets"
          className="relative min-h-[calc(100vh-80px)] py-8 sm:py-12 flex flex-col justify-between items-center px-4 sm:px-6 max-w-7xl mx-auto w-full text-center"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-purple-600/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

          <div className="text-left md:text-center max-w-3xl mx-auto z-10 mt-2 sm:mt-4">
            <p className="text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-semibold mb-2 uppercase">
              {currentFasilitas.subtitle}
            </p>
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-serif tracking-wider font-normal mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
              {currentFasilitas.name}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto min-h-[50px] px-2">
              {currentFasilitas.description}
            </p>

            <div className="mt-4 sm:mt-6 flex items-center justify-start md:justify-center gap-4">
              <button
                onClick={handleFasilitasRedirect}
                className="bg-slate-100 text-slate-950 hover:bg-cyan-400 transition-all duration-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              >
                GET STARTED
              </button>
            </div>
          </div>

          {/* Banner Navigasi Central */}
          <div className="relative w-full my-6 flex flex-col md:flex-row items-center justify-between z-10 px-2 gap-4">
            <button
              onClick={handlePrevFasilitas}
              className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase p-4 group select-none text-left"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">
                ‹
              </span>{" "}
              {prevFasilitasName}
            </button>

            <div
              onClick={handleFasilitasRedirect}
              className={`relative w-48 h-48 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center group select-none transition-all duration-700 ${
                currentFasilitas.externalLink ? "cursor-pointer" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-fuchsia-600 to-purple-600 opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-1000 animate-cosmic-pulse" />
              <div className="absolute -inset-3 rounded-full p-[3px] bg-[conic-gradient(from_0deg,#06b6d4,#8b5cf6,#ec4899,#3b82f6,#06b6d4)] animate-galaxy-spin opacity-90 shadow-[0_0_35px_rgba(139,92,246,0.7)]" />
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-cyan-300/50 animate-reverse-spin opacity-80" />

              <div className="relative w-full h-full rounded-full aspect-square bg-[#080415] flex items-center justify-center shadow-[inset_0_0_40px_rgba(147,51,234,0.7),0_0_30px_rgba(34,211,238,0.5)] border border-cyan-400/50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1548&auto=format&fit=crop"
                  alt="Fasilitas Background"
                  className="absolute inset-0 w-full h-full object-cover rounded-full aspect-square transition-transform duration-1000 group-hover:scale-110 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none rounded-full" />
                <div className="relative z-10 w-[85%] h-[85%] rounded-full aspect-square bg-purple-950 shadow-[0_0_40px_rgba(255,255,255,0.95),0_0_60px_rgba(34,211,238,0.85)] flex items-center justify-center border-2 border-purple-300/80 transition-transform duration-700 group-hover:scale-105 overflow-hidden">
                  <img
                    src="https://raw.githubusercontent.com/FebrianyRenata02/san-academy-bootcamp/refs/heads/main/src/assets/Untitled%20(33).png"
                    alt="SAN Academy Bootcamp Logo"
                    className="w-full h-full object-cover rounded-full aspect-square"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border border-cyan-300/40 shadow-[inset_0_0_25px_rgba(0,0,0,0.7)] pointer-events-none z-20" />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-4 mt-2">
              <button
                onClick={handlePrevFasilitas}
                className="text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-400 bg-purple-950/60 px-4 py-2 rounded-full border border-purple-800/50"
              >
                ‹ {prevFasilitasName}
              </button>
              <button
                onClick={handleNextFasilitas}
                className="text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-400 bg-purple-950/60 px-4 py-2 rounded-full border border-purple-800/50"
              >
                {nextFasilitasName} ›
              </button>
            </div>

            <button
              onClick={handleNextFasilitas}
              className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase p-4 group select-none text-right"
            >
              {nextFasilitasName}{" "}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                ›
              </span>
            </button>
          </div>

          <div className="z-10 text-center flex flex-col items-center gap-2 mt-2">
            <button
              onClick={handleFasilitasRedirect}
              className="bg-slate-100 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded-full font-bold text-xs transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              EXPLORE DEEP SPACE
            </button>

            <div className="w-6 h-10 rounded-full border-2 border-slate-400/60 flex items-start justify-center p-1 mt-2 animate-bounce shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              <div className="w-1.5 h-3.5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Featured Fasilitas Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-purple-900/30">
          <h2 className="text-left md:text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-8 md:mb-12 uppercase">
            FEATURED FACILITIES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURED_FASILITAS.map((item, index) => (
              <div
                key={index}
                className="bg-purple-950/20 border border-purple-800/30 rounded-2xl p-6 text-left md:text-center hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1 group cursor-pointer backdrop-blur-sm"
                onClick={() => {
                  if (item.externalLink) {
                    window.location.href = item.externalLink;
                  } else {
                    const foundIndex = FASILITAS_DATA.findIndex(
                      (f) => f.name.toLowerCase() === item.name.toLowerCase(),
                    );
                    if (foundIndex !== -1) setActiveFasilitasIndex(foundIndex);
                  }
                }}
              >
                <div className="relative w-20 h-20 mb-4 md:mx-auto">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md group-hover:bg-cyan-400/40 transition-all duration-500" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500 border border-purple-500/30"
                  />
                </div>
                <h3 className="font-serif tracking-wider text-base mb-1 text-slate-200 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 bg-purple-950/30 border border-purple-800/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 backdrop-blur-md">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-purple-950 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center overflow-hidden p-2">
                <img
                  src="https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Untitled%20(33).png"
                  alt="Skill Activation Network Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-2">
                Skill Activation Network
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                Skill Activation Network provides an industry-standard learning
                environment equipped with workspaces, Co-Working Spaces, Open
                Courses & Bootcamps, and a complete library to support your
                learning and career success.
              </p>
            </div>
          </div>
        </section>


        {/* Team Work Section */}
        <section
          id="team-work"
          className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-purple-900/30"
        >
          <h2 className="text-left md:text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-8 md:mb-12 uppercase">
            Team Work
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {MISSIONS_DATA.map((mission) => (
              <div
                key={mission.id}
                className="flex flex-col items-start md:items-center text-left md:text-center group"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-900/30 border border-purple-500/40 flex items-center justify-center p-2 mb-3 sm:mb-4 group-hover:border-cyan-400 transition-colors duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <img
                    src={mission.patchUrl}
                    alt={mission.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-xs text-cyan-400 font-mono mb-1">
                  {mission.date}
                </span>
                <h4 className="font-semibold text-xs sm:text-sm text-slate-200">
                  {mission.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Footer & Subscription Section */}
        <section
          id="blog"
          className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-purple-900/30"
        >
          <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-cyan-950/30 border border-purple-800/30 rounded-3xl p-8 sm:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-xl">
              <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-2">
                Join our newsletter stream
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Receive weekly updates regarding courses, space missions, and
                community achievements.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="bg-[#0b0818] border border-purple-800/60 rounded-full px-5 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-72"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-3 rounded-full font-bold text-xs transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {subscribed && (
            <div className="mt-4 text-center text-cyan-400 text-xs font-medium animate-pulse">
              Thank you for subscribing to our network stream!
            </div>
          )}
        </section>
      </main>

      {/* Footer Bottom */}
      <footer className="w-full border-t border-purple-900/40 py-6 px-4 sm:px-6 text-xs z-10 bg-[#05030d]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-slate-200 font-semibold shine-text">
              Skill Activation Network
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">
              © 2026 SAN Co., Ltd. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a
              href="#privacy"
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy
            </a>
            <a href="#terms" className="hover:text-cyan-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
