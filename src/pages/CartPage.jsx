import { Link } from 'react-router-dom';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const CartPage = ({ cart, onUpdateQty, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center">
          <div className="text-7xl mb-6">🛒</div>
          <p className="font-display text-4xl text-white/30 uppercase tracking-wide mb-2">Keranjang Kosong</p>
          <p className="font-body text-white/30 text-sm mb-8">Belum ada jersey yang dipilih.</p>
          <Link to="/" className="btn-lime">← Kembali Belanja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b5f23e] mb-2">Keranjang Belanja</p>
        <h1 className="font-display text-5xl text-white uppercase">
          Cart ({cart.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-[#111810] border border-white/5 p-4 hover:border-white/10 transition-colors">
              {/* Jersey mini preview */}
              <div className={`w-20 h-20 shrink-0 bg-gradient-to-br ${item.gradient} bg-opacity-10 border border-white/5 flex items-center justify-center`}>
                <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-12 h-14">
                  <path
                    d="M60 60 L30 90 L45 100 L40 180 L160 180 L155 100 L170 90 L140 60 L130 50 Q115 40 100 42 Q85 40 70 50 Z"
                    fill={item.accentColor || '#555'}
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{item.league}</p>
                <p className="font-body font-semibold text-white text-sm truncate">{item.name}</p>
                {item.size && <p className="font-mono text-xs text-white/30 mt-0.5">Ukuran: {item.size}</p>}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-white/10">
                    <button
                      onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}
                      className="w-7 h-7 text-white/40 hover:text-white transition-colors text-sm"
                    >−</button>
                    <span className="w-7 text-center font-mono text-xs text-white">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}
                      className="w-7 h-7 text-white/40 hover:text-white transition-colors text-sm"
                    >+</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-display text-lg text-[#b5f23e]">{formatPrice(item.price * item.qty)}</p>
                    <button
                      onClick={() => onRemove(item.id, item.size)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#111810] border border-white/5 p-6 h-fit">
          <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-6">Ringkasan</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="font-body text-sm text-white/50">Subtotal</span>
              <span className="font-mono text-sm text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-sm text-white/50">Ongkir</span>
              <span className="font-mono text-sm text-white">
                {shipping === 0 ? <span className="text-[#b5f23e]">GRATIS</span> : formatPrice(shipping)}
              </span>
            </div>
            {subtotal < 500000 && (
              <p className="text-xs font-mono text-white/30">
                Tambah {formatPrice(500000 - subtotal)} lagi untuk gratis ongkir
              </p>
            )}
          </div>

          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">Total</span>
              <span className="font-display text-3xl text-[#b5f23e]">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Promo code */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Kode promo"
              className="flex-1 bg-[#0a0f0d] border border-white/10 text-white text-xs font-mono px-3 py-2 focus:outline-none focus:border-[#b5f23e] placeholder-white/20 uppercase tracking-wider"
            />
            <button className="bg-white/5 border border-white/10 text-white/50 text-xs font-mono px-3 py-2 hover:border-[#b5f23e] hover:text-[#b5f23e] transition-colors uppercase tracking-wider">
              Pakai
            </button>
          </div>

          <button className="w-full btn-lime text-center block">
            Checkout Sekarang →
          </button>

          <Link to="/" className="block text-center mt-4 font-mono text-xs uppercase tracking-wider text-white/30 hover:text-white transition-colors">
            ← Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
