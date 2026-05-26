import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Pitch lines */}
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            {/* Pitch outline */}
            <rect x="120" y="80" width="1200" height="640" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            {/* Center circle */}
            <circle cx="720" cy="400" r="120" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            {/* Center line */}
            <line x1="720" y1="80" x2="720" y2="720" stroke="#b5f23e" strokeWidth="2"/>
            {/* Center spot */}
            <circle cx="720" cy="400" r="5" fill="#b5f23e"/>
            {/* Left penalty box */}
            <rect x="120" y="240" width="200" height="320" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            <rect x="120" y="300" width="100" height="200" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            {/* Right penalty box */}
            <rect x="1120" y="240" width="200" height="320" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            <rect x="1220" y="300" width="100" height="200" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            {/* Corner arcs */}
            <path d="M120 80 Q150 80 150 110" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            <path d="M1320 80 Q1290 80 1290 110" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            <path d="M120 720 Q150 720 150 690" fill="none" stroke="#b5f23e" strokeWidth="2"/>
            <path d="M1320 720 Q1290 720 1290 690" fill="none" stroke="#b5f23e" strokeWidth="2"/>
          </svg>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d] via-[#0a0f0d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent" />
      </div>

      {/* Floating jersey silhouettes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none">
        {/* Large background jersey */}
        <div className="absolute right-[-5%] top-[10%] w-[70%] opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>
          <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
              fill="#b5f23e" />
          </svg>
        </div>
        {/* Medium jersey */}
        <div className="absolute right-[15%] top-[20%] w-[50%] opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
              fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl animate-stagger">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#b5f23e]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#b5f23e]">
              Musim 2024/25
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-white mb-6 uppercase">
            WEAR
            <br />
            YOUR
            <br />
            <span className="text-gradient">PASSION</span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
            Koleksi jersey sepak bola terlengkap. Dari Premier League hingga BRI Liga 1 — 
            temukan jersey klub favoritmu dengan kualitas premium.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a href="#catalog" className="btn-lime inline-flex items-center gap-2">
              Jelajahi Katalog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#catalog" className="btn-outline inline-flex items-center gap-2">
              Best Seller
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-white/5">
            {[
              { num: '100+', label: 'Produk' },
              { num: '20+', label: 'Klub' },
              { num: '6', label: 'Liga' },
              { num: '4.8★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-[#b5f23e]">{stat.num}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0d] to-transparent" />
    </section>
  );
};

export default HeroSection;
