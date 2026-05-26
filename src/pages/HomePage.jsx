import { useState, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import JerseyCard from '../components/JerseyCard';
import FilterBar from '../components/FilterBar';
import { jerseys } from '../data/jerseys';

const HomePage = ({ onAddToCart }) => {
  const [filters, setFilters] = useState({
    league: 'Semua Liga',
    category: 'Semua',
    sort: 'default',
    search: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredJerseys = useMemo(() => {
    let result = [...jerseys];

    if (filters.league !== 'Semua Liga') {
      result = result.filter(j => j.league === filters.league);
    }
    if (filters.category !== 'Semua') {
      result = result.filter(j => j.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(j =>
        j.name.toLowerCase().includes(q) ||
        j.club.toLowerCase().includes(q) ||
        j.league.toLowerCase().includes(q)
      );
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  return (
    <div>
      <HeroSection />

      {/* Catalog section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b5f23e] mb-2">Koleksi Terlengkap</p>
            <h2 className="font-display text-5xl sm:text-6xl text-white uppercase tracking-wide">
              Katalog
            </h2>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari jersey, klub..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="bg-[#111810] border border-white/10 text-white text-sm font-body placeholder-white/20 px-4 py-2.5 pl-10 w-full sm:w-64 focus:outline-none focus:border-[#b5f23e] transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-white/30">
            {filteredJerseys.length} produk ditemukan
          </p>
          {(filters.league !== 'Semua Liga' || filters.category !== 'Semua' || filters.search) && (
            <button
              onClick={() => setFilters({ league: 'Semua Liga', category: 'Semua', sort: 'default', search: '' })}
              className="font-mono text-xs uppercase tracking-widest text-[#b5f23e]/60 hover:text-[#b5f23e] transition-colors"
            >
              Reset filter ×
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredJerseys.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-stagger">
            {filteredJerseys.map(jersey => (
              <JerseyCard
                key={jersey.id}
                jersey={jersey}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">⚽</div>
            <p className="font-display text-3xl text-white/30 uppercase tracking-wider mb-2">Tidak Ditemukan</p>
            <p className="font-body text-white/20 text-sm">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </section>

      {/* Banner CTA */}
      <section className="relative overflow-hidden bg-[#b5f23e] py-16 px-8 mt-8">
        <div className="absolute inset-0 diagonal-stripe opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#0a0f0d]/50 mb-2">Promo Spesial</p>
          <h3 className="font-display text-5xl sm:text-7xl text-[#0a0f0d] uppercase leading-tight mb-4">
            Gratis Ongkir<br />Se-Indonesia
          </h3>
          <p className="font-body text-[#0a0f0d]/60 mb-6 max-w-md mx-auto">
            Untuk setiap pembelian di atas Rp 500.000. Berlaku hingga akhir bulan.
          </p>
          <button className="bg-[#0a0f0d] text-[#b5f23e] font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#1a2a1a] transition-colors">
            Belanja Sekarang →
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
