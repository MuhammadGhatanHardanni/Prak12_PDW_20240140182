import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const handleAddToCart = (jersey, size = null) => {
    setCart(prev => {
      const key = `${jersey.id}-${size}`;
      const exists = prev.find(item => `${item.id}-${item.size}` === key);
      if (exists) {
        return prev.map(item =>
          `${item.id}-${item.size}` === key
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...jersey, size, qty: 1 }];
    });
    setToast(`${jersey.name} ditambahkan!`);
  };

  const handleUpdateQty = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemove(id, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const handleRemove = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-chalk">
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
