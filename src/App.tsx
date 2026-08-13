import React, { useState } from 'react';

interface Fasilitas {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

interface FeaturedFasilitas {
  name: string;
  image: string;
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
    id: 'community',
    name: 'Community',
    subtitle: 'FACILITIES PROVIDED',
    description: "Ruang kolaborasi terbuka dan komunitas aktif untuk saling berdiskusi, berbagi wawasan, dan membangun relasi profesional.",
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop',
  },
  {
    id: 'company',
    name: 'Company',
    subtitle: 'FACILITIES PROVIDED',
    description: "Fasilitas pembelajaran modern berstandar industri, proyek interaktif, dan materi kurikulum yang selalu diperbarui.",
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
  },
  {
    id: 'working-space',
    name: 'Working Space',
    subtitle: 'FACILITIES PROVIDED',
    description: "Co-working space yang nyaman, tenang, dan kondusif untuk mendukung produktivitas dalam menyelesaikan proyek maupun tugas & kerjaan harian.",
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop',
  },
  {
    id: 'learning facilities',
    name: 'LEARNING FACILITIES',
    subtitle: 'FACILITIES PROVIDED',
    description: "Wadah bagi siswa untuk merintis startup, mendapatkan mentorship langsung, serta akses ke ekosistem industri digital.",
    image: 'https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/SAN-Academy3.png',
  },
  {
    id: 'library',
    name: 'LIBRARY',
    subtitle: 'FACILITIES PROVIDED',
    description: "Library atau perpustakaan digital wadah bagi siswa untuk merintis dan belajar.",
    image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=800&auto=format&fit=crop',
  },
];

const FEATURED_FASILITAS: FeaturedFasilitas[] = [
  { name: 'COMMUNITY', image: 'https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Untitled%20(33).png' },
  { name: 'LEARNING', image: 'https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/SAN-Academy3.png' },
  { name: 'WORKING SPACE', image: 'https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Co-Working%20Space2.png' },
  { name: 'COMPANY', image: 'https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/SAN.png' },
];

const COURSES_DATA: Course[] = [
  { id: '1', title: 'Aeno Navigation', description: 'Master deep space trajectory, celestial orbits, and interstellar navigation fundamentals.', image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&auto=format&fit=crop' },
  { id: '2', title: 'Ring of Saturn & Study in Gas Giants', description: 'Comprehensive study of Saturnian ring structures and planetary gas dynamics.', image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop' },
  { id: '3', title: 'Saturn Studies & Science', description: 'An in-depth analysis of atmospheric compositions and satellite moon systems.', image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=400&auto=format&fit=crop' },
  { id: '4', title: 'Saturn Planets & Exoplanets', description: 'Discover exoplanetary atmospheres and habits in neighboring solar systems.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop' },
  { id: '5', title: 'Deep Space Speciation & Galaxy Studies', description: 'Exploring galactic evolution, dark matter mapping, and deep ocean worlds.', image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop' },
];

const MISSIONS_DATA: Mission[] = [
  { id: '1', title: 'Artemis II Launch', date: 'Jan 1, 2025', patchUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=100&auto=format&fit=crop' },
  { id: '2', title: 'Europa Clipper Probe', date: 'Apr 2, 2025', patchUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=100&auto=format&fit=crop' },
  { id: '3', title: 'Saturn Moon Mission', date: 'Jun 5, 2025', patchUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop' },
  { id: '4', title: 'Mars Surface Rover', date: 'Oct 3, 2025', patchUrl: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=100&auto=format&fit=crop' },
];

export const App: React.FC = () => {
  const [activeFasilitasIndex, setActiveFasilitasIndex] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const currentFasilitas = FASILITAS_DATA[activeFasilitasIndex];
  
  const prevFasilitasName = FASILITAS_DATA[(activeFasilitasIndex - 1 + FASILITAS_DATA.length) % FASILITAS_DATA.length].name;
  const nextFasilitasName = FASILITAS_DATA[(activeFasilitasIndex + 1) % FASILITAS_DATA.length].name;

  const handleNextFasilitas = () => {
    setActiveFasilitasIndex((prev) => (prev + 1) % FASILITAS_DATA.length);
  };

  const handlePrevFasilitas = () => {
    setActiveFasilitasIndex((prev) => (prev - 1 + FASILITAS_DATA.length) % FASILITAS_DATA.length);
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Keyframe Animations for Galaxy Frame */}
      <style>{`
        @keyframes galaxySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes reverseGalaxySpin {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes cosmicPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        .animate-galaxy-spin {
          animation: galaxySpin 22s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverseGalaxySpin 30s linear infinite;
        }
        .animate-cosmic-pulse {
          animation: cosmicPulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Global Background Stars & Nebula Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-[#0a071d] to-[#04020a] pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0818]/80 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 font-serif">
              Skill Activation Network
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#planets" className="hover:text-cyan-400 transition-colors">Fasilitas</a>
            <a href="#trailer" className="hover:text-cyan-400 transition-colors">Course Catalog</a>
            <a href="#tickets" className="hover:text-cyan-400 transition-colors">Tickets</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">Blog</a>
          </nav>

          <button className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]">
            Enroll
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="planets" className="relative min-h-screen pt-28 pb-12 flex flex-col justify-between items-center px-4 overflow-hidden z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto z-10 mt-4">
          <p className="text-cyan-400 tracking-[0.3em] text-xs font-semibold mb-2 uppercase">
            {currentFasilitas.subtitle}
          </p>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wider font-normal mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {currentFasilitas.name}
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto min-h-[60px]">
            {currentFasilitas.description}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button className="bg-slate-100 text-slate-950 hover:bg-cyan-400 transition-all duration-300 px-8 py-3 rounded-full font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              GET STARTED
            </button>
          </div>
        </div>

        {/* Central Banner */}
        <div className="relative w-full max-w-5xl my-6 flex items-center justify-between z-10 px-2">
          <button 
            onClick={handlePrevFasilitas} 
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase p-4 group select-none"
          >
            <span className="group-hover:-translate-x-1 transition-transform">‹</span> {prevFasilitasName}
          </button>

          {/* Central Galaxy Frame Container */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center group select-none transition-all duration-300">
            
            {/* Outer Galaxy Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-fuchsia-600 to-purple-600 opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-700 animate-cosmic-pulse" />

            {/* Layer 1: Rotating Outer Galaxy Ring */}
            <div className="absolute -inset-3 rounded-full p-[3px] bg-[conic-gradient(from_0deg,#06b6d4,#8b5cf6,#ec4899,#3b82f6,#06b6d4)] animate-galaxy-spin opacity-90 shadow-[0_0_35px_rgba(139,92,246,0.7)]" />

            {/* Layer 2: Counter-Rotating Orbit Ring */}
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-cyan-300/50 animate-reverse-spin opacity-80" />

            {/* Layer 3: Inner Circle Container */}
            <div className="relative w-full h-full rounded-full aspect-square bg-[#080415] flex items-center justify-center shadow-[inset_0_0_40px_rgba(147,51,234,0.7),0_0_30px_rgba(34,211,238,0.5)] border border-cyan-400/50 overflow-hidden">
            
              {/* Gambar Background */}
              <img 
                src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Fasilitas Background" 
                className="absolute inset-0 w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 group-hover:scale-110 opacity-95"
              />

              {/* Overlay Halus */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none rounded-full" />

              {/* Logo SAN Academy Putih */}
              <div className="relative z-10 w-[85%] h-[85%] rounded-full aspect-square bg-purple shadow-[0_0_40px_rgba(255,255,255,0.95),0_0_60px_rgba(34,211,238,0.85)] flex items-center justify-center border-2 border-purple-300/80 transition-transform duration-500 group-hover:scale-105 overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/FebrianyRenata02/san-academy-bootcamp/refs/heads/main/src/assets/Untitled%20(33).png" 
                  alt="SAN Academy Bootcamp Logo" 
                  className="w-full h-full object-cover rounded-full aspect-square animate-float"
                />
              </div>

              {/* Inner Glowing Ring Highlight */}
              <div className="absolute inset-0 rounded-full border border-cyan-300/40 shadow-[inset_0_0_25px_rgba(0,0,0,0.7)] pointer-events-none z-20" />

            </div>

          </div>

          <button 
            onClick={handleNextFasilitas} 
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase p-4 group select-none"
          >
            {nextFasilitasName} <span className="group-hover:translate-x-1 transition-transform">›</span>
          </button>
        </div>

        <div className="z-10 text-center flex flex-col items-center gap-2 mt-2">
          <button className="bg-slate-100 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded-full font-bold text-xs transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            EXPLORE DEEP SPACE
          </button>
          
          {/* Ikon Mouse Scroll Custom */}
          <div className="w-6 h-10 rounded-full border-2 border-slate-400/60 flex items-start justify-center p-1 mt-2 animate-bounce shadow-[0_0_12px_rgba(34,211,238,0.4)]">
            <div className="w-1.5 h-3.5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Fasilitas */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-purple-900/30 relative z-10">
        <h2 className="text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-12 uppercase">
          FEATURED FACILITIES
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURED_FASILITAS.map((item, index) => (
            <div 
              key={index} 
              className="bg-purple-950/20 border border-purple-800/30 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer backdrop-blur-sm"
              onClick={() => {
                const foundIndex = FASILITAS_DATA.findIndex(f => f.name.toLowerCase() === item.name.toLowerCase());
                if (foundIndex !== -1) setActiveFasilitasIndex(foundIndex);
              }}
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md group-hover:bg-cyan-400/40 transition-all" />
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="relative w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300 border border-purple-500/30" 
                />
              </div>
              <h3 className="font-serif tracking-wider text-base mb-1 text-slate-200 group-hover:text-cyan-300 transition-colors">{item.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-950/30 border border-purple-800/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-md">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
            <div className="relative w-48 h-48 rounded-full bg-purple border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center overflow-hidden p-2">
              <img 
                src="https://raw.githubusercontent.com/FebrianyRenata02/skill-activation-network/refs/heads/main/src/assets/Untitled%20(33).png" 
                alt="Skill Activation Network Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif text-slate-100 mb-2">Skill Activation Network</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            Skill Activation Network provides an industry-standard learning environment equipped with workspaces, Co-Working Spaces, Open Courses & Bootcamps, and a complete library to support your learning and career success.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section id="trailer" className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <h2 className="text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-12 uppercase">
          COURSE CATALOG
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => (
            <div 
              key={course.id} 
              className="bg-[#100a26]/80 border border-purple-900/40 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="overflow-hidden relative h-44">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100a26] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base mb-2 text-slate-200 group-hover:text-cyan-300 transition-colors">{course.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{course.description}</p>
                </div>
                <button className="bg-purple-900/40 hover:bg-cyan-500 hover:text-slate-950 border border-purple-700/50 py-2.5 rounded-xl text-xs font-bold text-cyan-300 transition-all duration-300 w-full shadow-sm">
                  ENROLL NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Missions */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-purple-900/30 relative z-10">
        <h2 className="text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-12 uppercase">
          MISSIONS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {MISSIONS_DATA.map((mission) => (
            <div key={mission.id} className="flex flex-col items-center text-center group">
              <div className="relative w-20 h-20 rounded-full bg-purple-900/30 border border-purple-500/40 flex items-center justify-center p-2 mb-4 group-hover:border-cyan-400 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <img src={mission.patchUrl} alt={mission.title} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-xs text-cyan-400 font-mono mb-1">{mission.date}</span>
              <h4 className="font-semibold text-sm text-slate-200">{mission.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Global Space Community */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <h2 className="text-center text-xs tracking-[0.3em] font-bold text-cyan-400 mb-12 uppercase">
          GLOBAL SPACE COMMUNITY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-950/20 border border-purple-800/30 rounded-2xl p-6 hover:border-purple-600/50 transition-colors">
            <h3 className="font-semibold text-sm mb-2 text-slate-200">Latest community star map updates</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Explore user-submitted astronomical observations updated live from observatories worldwide.
            </p>
            <a href="#enroll" className="text-xs font-semibold text-cyan-400 hover:underline">ENROLL NOW</a>
          </div>

          <div className="bg-purple-950/20 border border-purple-800/30 rounded-2xl p-6 hover:border-purple-600/50 transition-colors">
            <h3 className="font-semibold text-sm mb-2 text-slate-200">New galaxy accent design challenge winner</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Congratulations to our community UI designers for creating stunning space visualization interfaces.
            </p>
            <a href="#enroll" className="text-xs font-semibold text-cyan-400 hover:underline">ENROLL NOW</a>
          </div>

          <div className="bg-purple-950/20 border border-purple-800/30 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-600/50 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-wider text-cyan-400">🌐 LIVE NETWORK MAP</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              50,000+ active students collaborating across 120 countries.
            </p>
          </div>
        </div>
      </section>

      {/* Footer & Subscription */}
      <section id="blog" className="py-20 px-6 max-w-4xl mx-auto text-center w-full border-t border-purple-900/30 relative z-10">
        <h2 className="text-2xl md:text-3xl font-serif mb-3 tracking-wider">STAY INFORMED</h2>
        <p className="text-slate-400 text-xs md:text-sm mb-8">
          Explore planet discovery news, weekly astronomical research updates, and course announcements.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <input 
            type="email" 
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email" 
            className="bg-purple-950/50 border border-purple-800/40 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-cyan-400 flex-1 text-slate-200 placeholder-slate-500"
          />
          <button 
            type="submit" 
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            <span>Subscribe</span>
            <span>➔</span>
          </button>
        </form>

        {subscribed && (
          <p className="text-cyan-400 text-xs font-semibold mb-6 animate-pulse">
            ✨ Thank you for subscribing to SAN Academy space updates!
          </p>
        )}

        <blockquote className="italic text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
          "The universe is a place of boundless opportunity and fascination."
        </blockquote>
      </section>

      <footer className="border-t border-purple-900/40 py-10 px-6 text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-serif text-slate-300 font-bold text-base tracking-wider">Skill Ativation Network</span>
            <p>© {new Date().getFullYear()} SAN Co., Ltd. All rights reserved.</p>
          </div>

          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
