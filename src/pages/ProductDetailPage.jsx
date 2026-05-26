import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jerseys } from '../data/jerseys';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

// Reuse jersey illustration SVG from JerseyCard
const JerseyIllustration = ({ jersey }) => {
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

  const patterns = {
    atletico: 'stripes',
    acmilan: 'stripes',
    juventus: 'half',
  };

  const [c1, c2] = colorMap[jersey.image] || ['#333', '#666'];
  const pType = patterns[jersey.image] || 'plain';

  return (
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <defs>
        {pType === 'stripes' && (
          <pattern id={`detail-stripe-${jersey.image}`} x="0" y="0" width="20" height="200" patternUnits="userSpaceOnUse">
            <rect x="0" width="10" height="200" fill={c1} />
            <rect x="10" width="10" height="200" fill={c2} />
          </pattern>
        )}
        <filter id="shadow2">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      <ellipse cx="100" cy="215" rx="55" ry="6" fill="#000" opacity="0.3" />
      <g filter="url(#shadow2)">
        <path
          d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
          fill={pType === 'stripes' ? `url(#detail-stripe-${jersey.image})` : c1}
        />
        {pType === 'half' && (
          <path d="M100 42 Q85 40 70 50 L60 60 L40 180 L100 180 Z" fill={c2} />
        )}
        <path d="M85 42 Q100 35 115 42 L113 55 Q100 50 87 55 Z" fill={c2} />
        <path d="M60 60 L30 90 L45 100 L62 75 Z" fill={c1} opacity="0.85" />
        <path d="M140 60 L170 90 L155 100 L138 75 Z" fill={c1} opacity="0.85" />
        <circle cx="78" cy="90" r="12" fill={c2} opacity="0.8" />
        <text x="78" y="95" textAnchor="middle" fontSize="8" fill={c1} fontWeight="bold" fontFamily="sans-serif">
          {jersey.club.substring(0, 2).toUpperCase()}
        </text>
        <text x="100" y="148" textAnchor="middle" fontSize="32" fill={c2} fontWeight="900" fontFamily="Impact, sans-serif" opacity="0.55">
          {(jersey.id % 30) + 1}
        </text>
        <path
          d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
          fill="none" stroke={c2} strokeWidth="1.5" opacity="0.25"
        />
      </g>
    </svg>
  );
};

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const jersey = jerseys.find(j => j.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!jersey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-white/30 mb-4">PRODUK TIDAK DITEMUKAN</p>
          <Link to="/" className="btn-lime">← Kembali ke Katalog</Link>
        </div>
      </div>
    );
  }

  const discount = jersey.originalPrice
    ? Math.round((1 - jersey.price / jersey.originalPrice) * 100)
    : null;

  const related = jerseys
    .filter(j => j.id !== jersey.id && (j.league === jersey.league || j.club === jersey.club))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(jersey);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/30 mb-10">
        <Link to="/" className="hover:text-[#b5f23e] transition-colors">Katalog</Link>
        <span>/</span>
        <span className="text-white/50">{jersey.league}</span>
        <span>/</span>
        <span className="text-[#b5f23e]">{jersey.name}</span>
      </nav>

      {/* Main product area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative">
          <div className={`relative bg-gradient-to-br ${jersey.gradient} bg-opacity-10 aspect-square flex items-center justify-center p-16 border border-white/5`}>
            <div className="absolute inset-0 diagonal-stripe opacity-20" />
            <div className={`absolute inset-0 bg-gradient-to-br ${jersey.gradient} opacity-10`} />
            <div className="relative w-full h-full max-w-[320px] max-h-[320px] mx-auto animate-float">
              <JerseyIllustration jersey={jersey} />
            </div>
            {discount && (
              <div className="absolute top-4 right-4 bg-[#b5f23e] text-[#0a0f0d] text-xs font-bold font-mono px-3 py-1.5">
                -{discount}% OFF
              </div>
            )}
            {jersey.badge && (
              <div className="absolute top-4 left-4 bg-[#0a0f0d] border border-[#b5f23e] text-[#b5f23e] text-xs font-bold font-mono px-3 py-1.5">
                {jersey.badge}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b5f23e] mb-1">{jersey.league}</p>
            <h1 className="font-display text-4xl sm:text-5xl text-white uppercase leading-tight mb-2">
              {jersey.name}
            </h1>
            <p className="font-body text-white/40">{jersey.club} · {jersey.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-4 h-4 ${s <= Math.floor(jersey.rating) ? 'text-[#b5f23e]' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-mono text-sm text-white/50">{jersey.rating} ({jersey.reviews} ulasan)</span>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl text-[#b5f23e]">{formatPrice(jersey.price)}</span>
              {jersey.originalPrice && (
                <span className="font-mono text-sm text-white/30 line-through">{formatPrice(jersey.originalPrice)}</span>
              )}
            </div>
          </div>

          <p className="font-body text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
            {jersey.description}
          </p>

          {/* Size select */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">Pilih Ukuran</p>
              <button className="font-mono text-xs text-[#b5f23e]/60 hover:text-[#b5f23e] transition-colors uppercase tracking-wider">
                Panduan Ukuran →
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {jersey.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border font-mono text-sm font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-[#b5f23e] border-[#b5f23e] text-[#0a0f0d]'
                      : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-red-400/60 text-xs font-mono mt-2">* Pilih ukuran terlebih dahulu</p>}
          </div>

          {/* Qty + Add to cart */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center border border-white/10">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-12 text-white/50 hover:text-white transition-colors text-lg font-light"
              >−</button>
              <span className="w-10 h-12 flex items-center justify-center font-mono text-sm text-white">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-10 h-12 text-white/50 hover:text-white transition-colors text-lg font-light"
              >+</button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!jersey.inStock || !selectedSize}
              className={`flex-1 h-12 font-mono text-xs uppercase tracking-widest font-bold transition-all ${
                added
                  ? 'bg-white text-[#0a0f0d]'
                  : 'bg-[#b5f23e] text-[#0a0f0d] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed'
              }`}
            >
              {!jersey.inStock ? 'Stok Habis' : added ? '✓ Ditambahkan!' : 'Tambah ke Keranjang'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
            {[
              { icon: '🚚', label: 'Gratis Ongkir', sub: '> Rp 500rb' },
              { icon: '✅', label: 'Produk Original', sub: '100% Asli' },
              { icon: '↩️', label: 'Retur 7 Hari', sub: 'Tanpa Syarat' },
            ].map(b => (
              <div key={b.label} className="text-center">
                <p className="text-2xl mb-1">{b.icon}</p>
                <p className="font-body text-xs font-semibold text-white/70">{b.label}</p>
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#b5f23e]" />
            <h3 className="font-display text-3xl text-white uppercase tracking-wide">Produk Terkait</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(rel => (
              <Link to={`/product/${rel.id}`} key={rel.id} className="group">
                <div className={`bg-gradient-to-br ${rel.gradient} bg-opacity-10 border border-white/5 aspect-square flex items-center justify-center p-8 group-hover:border-[#b5f23e]/30 transition-all mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 diagonal-stripe opacity-20" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${rel.gradient} opacity-10`} />
                  <div className="relative w-full h-full max-w-[100px] max-h-[100px] mx-auto">
                    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path
                        d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
                        fill={rel.accentColor}
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-1">{rel.league}</p>
                <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{rel.name}</p>
                <p className="font-display text-lg text-[#b5f23e] mt-1">{formatPrice(rel.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
