import { leagues, categories, sortOptions } from '../data/jerseys';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* League filter */}
      <div>
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Liga</p>
        <div className="flex flex-wrap gap-2">
          {leagues.map(league => (
            <button
              key={league}
              onClick={() => onFilterChange('league', league)}
              className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 border transition-all duration-150 ${
                filters.league === league
                  ? 'bg-[#b5f23e] text-[#0a0f0d] border-[#b5f23e]'
                  : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white/80'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* Category + Sort row */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Kategori</p>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onFilterChange('category', cat)}
                className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 border transition-all duration-150 ${
                  filters.category === cat
                    ? 'border-[#b5f23e] text-[#b5f23e]'
                    : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Urutkan</p>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="bg-[#111810] border border-white/10 text-white/70 text-xs font-mono uppercase tracking-wider px-3 py-1.5 focus:outline-none focus:border-[#b5f23e] transition-colors cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
