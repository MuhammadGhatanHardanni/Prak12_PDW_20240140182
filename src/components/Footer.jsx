const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#080c09] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#b5f23e] flex items-center justify-center">
                <span className="font-display text-[#0a0f0d] text-base">K</span>
              </div>
              <span className="font-display text-2xl tracking-widest text-white">KITMAN</span>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              Toko jersey sepak bola online terpercaya. Koleksi lengkap dari seluruh liga dunia dengan kualitas terjamin.
            </p>
            <div className="flex gap-3 mt-6">
              {['Instagram', 'TikTok', 'WhatsApp'].map(s => (
                <button key={s} className="border border-white/10 text-white/30 text-xs font-mono uppercase tracking-wider px-3 py-2 hover:border-[#b5f23e] hover:text-[#b5f23e] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Navigasi</p>
            <ul className="space-y-3">
              {['Katalog', 'Best Seller', 'New Arrivals', 'Sale', 'Tentang Kami'].map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-white/50 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Informasi</p>
            <ul className="space-y-3">
              {['Cara Pemesanan', 'Pengiriman', 'Retur & Garansi', 'FAQ', 'Kontak'].map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-white/50 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-mono text-xs text-white/20 uppercase tracking-widest">
            © 2026 KITMAN.
          </p>
          <p className="font-mono text-xs text-white/20 uppercase tracking-widest">
            Made with ⚽ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
