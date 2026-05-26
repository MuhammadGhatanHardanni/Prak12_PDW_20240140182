import { Link } from 'react-router-dom';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const badgeStyles = {
  lime: 'bg-[#b5f23e] text-[#0a0f0d]',
  red: 'bg-red-500 text-white',
  sky: 'bg-sky-500 text-white',
  yellow: 'bg-yellow-400 text-[#0a0f0d]',
  orange: 'bg-orange-500 text-white',
  purple: 'bg-purple-600 text-white',
};

// SVG jersey shape based on club
const JerseyIllustration = ({ jersey }) => {
  const { gradient, accentColor, image } = jersey;

  // Simple pattern variations by image key
  const patterns = {
    arsenal: { type: 'plain', stripes: false, stripeDir: 'v' },
    mancity: { type: 'plain', stripes: false },
    liverpool: { type: 'plain', stripes: false },
    chelsea: { type: 'plain', stripes: false },
    realmadrid: { type: 'plain', stripes: false },
    barcelona: { type: 'plain', stripes: true, stripeDir: 'v' },
    atletico: { type: 'stripes', stripes: true, stripeDir: 'v' },
    acmilan: { type: 'stripes', stripes: true, stripeDir: 'v' },
    juventus: { type: 'half', stripes: false },
    bayernmunich: { type: 'plain', stripes: false },
    dortmund: { type: 'plain', stripes: false },
    persija: { type: 'plain', stripes: false },
    persib: { type: 'plain', stripes: false },
    baliUnited: { type: 'plain', stripes: false },
    rmUCL: { type: 'plain', stripes: false },
    psg: { type: 'plain', stripes: false },
  };

  const p = patterns[image] || { type: 'plain' };

  // Color maps
  const colorMap = {
    arsenal: ['#CC0000', '#FFFFFF'],
    mancity: ['#1C2C5B', '#97C1E7'],
    liverpool: ['#CC0000', '#C8AA6E'],
    chelsea: ['#034694', '#DBA111'],
    realmadrid: ['#FFFFFF', '#D4AF37'],
    barcelona: ['#004D98', '#A50044'],
    atletico: ['#CC0000', '#FFFFFF'],
    acmilan: ['#CC0000', '#1A1A1A'],
    juventus: ['#1A1A1A', '#FFFFFF'],
    bayernmunich: ['#DC052D', '#FFFFFF'],
    dortmund: ['#FDE100', '#1A1A1A'],
    persija: ['#F56E00', '#FFFFFF'],
    persib: ['#003DA5', '#FFFFFF'],
    baliUnited: ['#E3291C', '#F7941D'],
    rmUCL: ['#FFFFFF', '#D4AF37'],
    psg: ['#003E7E', '#DA291C'],
  };

  const [c1, c2] = colorMap[image] || ['#333', '#666'];

  return (
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {p.type === 'stripes' && (
          <pattern id={`stripe-${image}`} x="0" y="0" width="20" height="200" patternUnits="userSpaceOnUse">
            <rect x="0" width="10" height="200" fill={c1} />
            <rect x="10" width="10" height="200" fill={c2} />
          </pattern>
        )}
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="215" rx="55" ry="6" fill="#000" opacity="0.25" />

      {/* Jersey body */}
      <g filter="url(#shadow)">
        {/* Main body */}
        <path
          d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
          fill={p.type === 'stripes' ? `url(#stripe-${image})` : c1}
        />
        {/* Half split for juventus-style */}
        {p.type === 'half' && (
          <path
            d="M100 42 Q85 40 70 50 L60 60 L40 180 L100 180 Z"
            fill={c2}
          />
        )}
        {/* Collar */}
        <path
          d="M85 42 Q100 35 115 42 L113 55 Q100 50 87 55 Z"
          fill={c2}
        />
        {/* Left sleeve */}
        <path
          d="M60 60 L30 90 L45 100 L62 75 Z"
          fill={p.type === 'stripes' ? c1 : (image === 'mancity' || image === 'psg' ? c2 : c1)}
          opacity="0.85"
        />
        {/* Right sleeve */}
        <path
          d="M140 60 L170 90 L155 100 L138 75 Z"
          fill={p.type === 'stripes' ? c2 : (image === 'mancity' || image === 'psg' ? c2 : c1)}
          opacity="0.85"
        />
        {/* Accent stripe down the middle for some */}
        {(image === 'arsenal' || image === 'liverpool' || image === 'bayernmunich') && (
          <rect x="93" y="60" width="14" height="120" fill={c2} opacity="0.12" />
        )}
        {/* Chest badge placeholder */}
        <circle cx="78" cy="90" r="10" fill={c2} opacity="0.7" />
        <text x="78" y="94" textAnchor="middle" fontSize="7" fill={c1} fontWeight="bold" fontFamily="sans-serif">
          {jersey.club.substring(0, 2).toUpperCase()}
        </text>
        {/* Number on back placeholder (front number) */}
        <text x="100" y="145" textAnchor="middle" fontSize="28" fill={c2} fontWeight="900" fontFamily="Impact, sans-serif" opacity="0.6">
          {(jersey.id % 30) + 1}
        </text>
        {/* Outline */}
        <path
          d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
          fill="none"
          stroke={c2}
          strokeWidth="1.5"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

const JerseyCard = ({ jersey, onAddToCart }) => {
  const discount = jersey.originalPrice
    ? Math.round((1 - jersey.price / jersey.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${jersey.id}`} className="block">
      <div className="card-jersey group jersey-hover h-full flex flex-col relative">
        {/* Badge */}
        {jersey.badge && (
          <div className={`absolute top-3 left-3 z-10 text-xs font-mono font-bold uppercase tracking-widest px-2 py-1 ${badgeStyles[jersey.badgeColor] || 'bg-white/10 text-white'}`}>
            {jersey.badge}
          </div>
        )}

        {/* Out of stock overlay */}
        {!jersey.inStock && (
          <div className="absolute inset-0 bg-[#0a0f0d]/70 z-20 flex items-center justify-center">
            <span className="font-mono text-sm uppercase tracking-widest text-white/60 border border-white/20 px-4 py-2">
              Stok Habis
            </span>
          </div>
        )}

        {/* Image area */}
        <div className="relative bg-gradient-to-b from-white/5 to-transparent aspect-square overflow-hidden flex items-center justify-center p-8">
          {/* Background pattern */}
          <div className="absolute inset-0 diagonal-stripe opacity-30" />
          <div className={`absolute inset-0 bg-gradient-to-br ${jersey.gradient} opacity-10`} />

          <div className="jersey-img relative z-10 w-full h-full max-w-[180px] max-h-[180px] mx-auto">
            <JerseyIllustration jersey={jersey} />
          </div>

          {/* Discount badge */}
          {discount && (
            <div className="absolute bottom-3 right-3 bg-[#b5f23e] text-[#0a0f0d] text-xs font-bold font-mono px-2 py-1">
              -{discount}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">
                {jersey.league}
              </p>
              <h3 className="font-body font-semibold text-white text-sm leading-tight">
                {jersey.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <svg className="w-3.5 h-3.5 text-[#b5f23e]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/50 text-xs font-mono">{jersey.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="tag">{jersey.category}</span>
            {jersey.isNew && <span className="tag text-[#b5f23e] bg-[#b5f23e]/10">Baru</span>}
          </div>

          {/* Price & CTA */}
          <div className="mt-auto flex items-end justify-between gap-2">
            <div>
              <p className="font-display text-xl text-[#b5f23e] tracking-wide leading-tight">
                {formatPrice(jersey.price)}
              </p>
              {jersey.originalPrice && (
                <p className="text-white/30 text-xs font-mono line-through">
                  {formatPrice(jersey.originalPrice)}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(jersey);
              }}
              disabled={!jersey.inStock}
              className="shrink-0 w-9 h-9 bg-[#b5f23e] text-[#0a0f0d] flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Tambah ke keranjang"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JerseyCard;
