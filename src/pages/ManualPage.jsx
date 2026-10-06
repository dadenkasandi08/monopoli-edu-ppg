import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imgLogo from "../assets/logo.png";

export default function ManualPage({ onNavigate }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    onNavigate("home");
    navigate("/"); // Navigasi kembali ke halaman beranda
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-black/30 bg-blend-overlay bg-cover bg-center flex flex-col items-center p-4 py-10 md:p-8">
      {/* Animasi Logo di Atas */}
      <div className="text-center mb-6">
        <motion.button
          animate={{ scale: [1.3, 1.4, 1.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="drop-shadow-md hover:drop-shadow-xl"
          onClick={handleCancel}
        >
          <img src={imgLogo} alt="Logo" className="w-40 md:w-48 h-auto" />
        </motion.button>
      </div>

      {/* Kontainer Panduan Bermain dengan Efek Kaca (Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-4xl border-2 border-white/50"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 text-center drop-shadow-sm">
          📜 Panduan Bermain
        </h2>

        <div className="space-y-6 text-slate-800">
          {/* Persiapan */}
          <div className="bg-white/80 p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="text-2xl">👥</span> 1. Persiapan Kelompok
            </h3>
            <p className="font-medium text-slate-700 ml-8">
              Buatlah kelompok yang beranggotakan{" "}
              <span className="font-bold">6 - 7 orang</span>. Bermainlah dengan
              kompak dan kumpulkan uang monopoli sebanyak-banyaknya!
            </p>
          </div>

          {/* Pembagian Peran */}
          <div className="bg-white/80 p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎭</span> 2. Pembagian Peran Kelompok
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  🎲 Pelempar Dadu & Pion
                </span>
                <span className="text-sm text-slate-600">
                  Melempar dadu dan menggerakkan bidak di papan.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  📝 Pencatat Jawaban
                </span>
                <span className="text-sm text-slate-600">
                  Menulis hasil diskusi kelompok di lembar jawaban.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  🏃 Pembawa Jawaban
                </span>
                <span className="text-sm text-slate-600">
                  Membawa dan menunjukkan jawaban ke guru.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  💰 Bendahara
                </span>
                <span className="text-sm text-slate-600">
                  Memegang dan mengatur uang Monopoli kelompok.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  🃏 Penjaga Kartu
                </span>
                <span className="text-sm text-slate-600">
                  Mengambil kartu & membacakan pertanyaan dengan lantang.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-extrabold text-slate-800">
                  🛡️ Pengawas & Koordinator
                </span>
                <span className="text-sm text-slate-600">
                  Mengatur giliran, mengingatkan waktu, & menjaga ketertiban.
                </span>
              </li>
            </ul>
          </div>

          {/* Sistem Pergantian Peran */}
          <div className="bg-indigo-50 p-5 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="text-2xl">🔄</span> 3. Sistem Pergantian Peran
            </h3>
            <p className="font-medium text-slate-700 ml-8 mb-3">
              Agar semua siswa mendapat pengalaman yang sama, peran{" "}
              <b>tidak boleh</b> dipegang oleh orang yang sama terus. Setelah
              satu putaran (giliran) selesai,{" "}
              <b>semua anggota bergeser satu peran ke posisi berikutnya</b>:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-bold text-indigo-900 bg-white p-3 rounded-lg border border-indigo-200">
              <span>Pelempar Dadu</span>{" "}
              <span className="text-indigo-400">➡️</span>
              <span>Pencatat Jawaban</span>{" "}
              <span className="text-indigo-400">➡️</span>
              <span>Pembawa Jawaban</span>{" "}
              <span className="text-indigo-400">➡️</span>
              <span>Bendahara</span> <span className="text-indigo-400">➡️</span>
              <span>Penjaga Kartu</span>{" "}
              <span className="text-indigo-400">➡️</span>
              <span>Koordinator</span>{" "}
              <span className="text-indigo-400">➡️</span>
              <span className="text-indigo-600 italic">Kembali ke Awal</span>
            </div>
          </div>

          {/* Alur Bermain */}
          <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-200 text-center">
            <h3 className="text-lg font-extrabold text-green-800 mb-2">
              Alur Utama Permainan
            </h3>
            <p className="font-bold text-green-700 flex flex-wrap justify-center gap-x-2 gap-y-1">
              <span>Lembar Dadu</span> <span>➔</span>
              <span>Gerakkan Pion</span> <span>➔</span>
              <span>Ambil Kartu</span> <span>➔</span>
              <span>Diskusikan</span> <span>➔</span>
              <span>Catat Jawaban</span> <span>➔</span>
              <span>Periksa ke Guru</span> <span>➔</span>
              <span>Kelola Uang</span> <span>➔</span>
              <span className="text-green-900 underline">Berganti Peran</span>
            </p>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="mt-8 text-center">
          <button
            onClick={handleCancel}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 text-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </motion.div>
    </div>
  );
}
