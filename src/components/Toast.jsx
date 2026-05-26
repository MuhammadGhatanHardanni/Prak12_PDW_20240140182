import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#b5f23e] text-[#0a0f0d] px-5 py-3 font-body font-semibold text-sm flex items-center gap-3 shadow-2xl animate-slide-up">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
};

export default Toast;
