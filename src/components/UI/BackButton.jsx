// Jika Anda menggunakan React Router (Vite/CRA)
import { useNavigate } from "react-router-dom";

// Jika Anda menggunakan Next.js, gunakan ini:
// import { useRouter } from "next/router";

const BackButton = ({ onClick, label = "Kembali" }) => {
  const navigate = useNavigate(); // Ganti jadi useRouter() jika Next.js

  const handleBack = () => {
    // Jika ada fungsi onClick kustom yang dikirim, jalankan fungsi tersebut
    if (onClick) {
      onClick();
    } else {
      // Jika tidak, jalankan perintah default kembali ke halaman sebelumnya
      navigate(-1); // Gunakan router.back() jika memakai Next.js
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-white border-2 border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
    >
      {/* Ikon Panah Kiri */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
