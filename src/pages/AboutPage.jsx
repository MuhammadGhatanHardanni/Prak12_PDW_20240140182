const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Header */}
      <div className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b5f23e] mb-3">Tentang Kami</p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white uppercase leading-none mb-6">
          ABOUT<br /><span className="text-gradient">KITMAN</span>
        </h1>
        <p className="font-body text-white/50 text-lg max-w-2xl leading-relaxed">
          KITMAN adalah toko jersey sepak bola online yang menghadirkan koleksi paling lengkap di Indonesia, 
          dari liga domestik hingga kompetisi Eropa bergengsi.
        </p>
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#b5f23e]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#b5f23e]">Cerita Kami</span>
          </div>
          <h2 className="font-display text-3xl text-white uppercase mb-4">Passionate About Football</h2>
          <p className="font-body text-white/50 text-sm leading-relaxed mb-4">
            Didirikan oleh para pecinta sepak bola sejati, KITMAN hadir untuk memenuhi kebutuhan fans yang 
            ingin tampil dengan jersey klub favorit mereka dengan kualitas premium dan harga yang terjangkau.
          </p>
          <p className="font-body text-white/50 text-sm leading-relaxed">
            Nama "Kitman" diambil dari peran penting di balik layar dunia sepak bola — orang yang menjaga 
            dan menyiapkan perlengkapan tim. Itu adalah komitmen kami: menjaga kualitas dan menyiapkan 
            jersey terbaik untuk Anda.
          </p>
        </div>

        {/* Stats card */}
        <div className="bg-[#111810] border border-white/5 p-8 relative overflow-hidden">
          <div className="absolute inset-0 diagonal-stripe opacity-20" />
          <div className="relative grid grid-cols-2 gap-6">
            {[
              { n: '2019', l: 'Tahun Berdiri' },
              { n: '100+', l: 'Produk Tersedia' },
              { n: '20+', l: 'Klub Partner' },
              { n: '10rb+', l: 'Pelanggan Puas' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display text-4xl text-[#b5f23e]">{s.n}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-white/30 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-px bg-[#b5f23e]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#b5f23e]">Nilai Kami</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '⚽', title: 'Kualitas Premium', desc: 'Setiap jersey dipilih dengan standar kualitas ketat. Kami hanya menjual produk yang kami percaya layak dipakai.' },
            { icon: '🚀', title: 'Pengiriman Cepat', desc: 'Order hari ini, kami proses dalam 24 jam. Pengiriman ke seluruh Indonesia dengan mitra ekspedisi terpercaya.' },
            { icon: '💚', title: 'Cinta Sepak Bola', desc: 'Kami bukan sekadar penjual jersey. Kami adalah fans yang memahami betapa pentingnya jersey bagi seorang supporter.' },
          ].map(v => (
            <div key={v.title} className="bg-[#111810] border border-white/5 p-6 hover:border-[#b5f23e]/20 transition-colors">
              <p className="text-3xl mb-4">{v.icon}</p>
              <h3 className="font-body font-semibold text-white mb-2">{v.title}</h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border border-[#b5f23e]/20 bg-[#b5f23e]/5 p-8 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripe opacity-10" />
        <div className="relative">
          <h3 className="font-display text-3xl text-white uppercase mb-4">Hubungi Kami</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'WhatsApp', value: '+62 812-3456-7890', sub: 'Senin–Sabtu 09.00–21.00' },
              { label: 'Email', value: 'hello@kitman.id', sub: 'Respon dalam 24 jam' },
              { label: 'Instagram', value: '@kitman.id', sub: 'DM untuk fast response' },
            ].map(c => (
              <div key={c.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#b5f23e] mb-1">{c.label}</p>
                <p className="font-body font-semibold text-white text-sm">{c.value}</p>
                <p className="font-mono text-[10px] text-white/30 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack note */}
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="font-mono text-xs text-white/20 uppercase tracking-widest">
          Tugas Pemrograman Web · Dibangun dengan React + Vite + Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
