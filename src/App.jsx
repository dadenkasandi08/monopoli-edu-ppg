import { useState, useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import BoardPage from "./pages/BoardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import StartPage from "./pages/StartPage";
import QuestionBankPage from "./pages/TambahSoalPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // State untuk melacak apakah pengguna sudah klik pop-up
  const [isReady, setIsReady] = useState(false);
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    // 1. Inisialisasi Audio saat web dibuka
    const audio = new Audio("/bg_music.mp3");
    audio.loop = true; // Musik berulang
    audio.volume = 0.5; // Atur volume 50%
    backgroundMusicRef.current = audio;

    // Bersihkan memori saat aplikasi ditutup
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, []);

  // 2. Fungsi yang dijalankan saat tombol pop-up diklik
  const handleReady = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current
        .play()
        .catch((err) => console.warn("Gagal memutar audio:", err));
    }
    // Sembunyikan pop-up setelah diklik
    setIsReady(true);
  };

  return (
    <>
      {/* --- TAMPILAN POP-UP "ARE YOU READY?" --- */}
      {!isReady && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center transform transition-all scale-100">
            <div className="text-6xl mb-4 animate-bounce">🎲</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
              Are you ready?
            </h2>
            <p className="text-slate-500 mb-8 text-sm md:text-base">
              Nyalakan suara (volume) perangkatmu untuk pengalaman bermain yang
              lebih seru!
            </p>
            <button
              onClick={handleReady}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 text-lg"
            >
              Mulai Bermain!
            </button>
          </div>
        </div>
      )}

      {/* --- KONTEN UTAMA APLIKASI --- */}
      {/* Aplikasi tetap di-render di latar belakang, namun terhalang pop-up sampai diklik */}
      <Routes>
        <Route path="/" element={<HomePage onNavigate={setCurrentPage} />} />
        <Route
          path="/start"
          element={<StartPage onNavigate={setCurrentPage} />}
        />
        <Route
          path="/history"
          element={<HistoryPage onNavigate={setCurrentPage} />}
        />
        <Route
          path="/board"
          element={<BoardPage onNavigate={setCurrentPage} />}
        />
        <Route
          path="/about"
          element={<AboutPage onNavigate={setCurrentPage} />}
        />
        <Route
          path="/manual"
          element={<ManualPage onNavigate={setCurrentPage} />}
        />
        <Route
          path="/bank-soal"
          element={<QuestionBankPage onNavigate={setCurrentPage} />}
        />
      </Routes>
    </>
  );
}
