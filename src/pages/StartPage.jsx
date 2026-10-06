import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imgLogo from "../assets/logo.png";

export default function StartPage({ onNavigate }) {
  const navigate = useNavigate();
  const createSession = useGameStore((state) => state.createSession);

  const [sessionName, setSessionName] = useState("");
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["", ""]);

  // Handle perubahan jumlah pemain
  const handleNumPlayersChange = (e) => {
    const count = parseInt(e.target.value);
    setNumPlayers(count);
    // Sesuaikan panjang array nama pemain
    const newNames = [...playerNames];
    while (newNames.length < count) newNames.push("");
    setPlayerNames(newNames.slice(0, count));
  };

  const handleCancel = () => {
    onNavigate("home");
    navigate("/"); // Navigasi ke halaman beranda
  };

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (!sessionName) return alert("Silakan isi nama sesi/kelas!");
    createSession(sessionName, playerNames);
    onNavigate("board"); // Pindah ke halaman papan
    navigate("/board"); // Navigasi ke halaman papan
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-black/30 bg-blend-overlay bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <motion.button
          animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="drop-shadow-md hover:drop-shadow-xl"
          onClick={() => handleCancel}
        >
          <img src={imgLogo} alt="Logo" className="w-48 md:w-56 h-auto" />
        </motion.button>
      </div>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">
            Sesi Baru
          </h2>

          <form onSubmit={handleStart} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Nama Sesi / Kelas
              </label>
              <input
                type="text"
                required
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="Contoh: Kelas 7A Kelompok 1"
                className="w-full p-2 border-2 border-slate-300 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Jumlah Pemain
              </label>
              <select
                value={numPlayers}
                onChange={handleNumPlayersChange}
                className="w-full p-2 border-2 border-slate-300 rounded-lg outline-none focus:border-indigo-500"
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Orang
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 mt-2">
              <label className="block text-sm font-bold text-slate-700">
                Nama Pemain
              </label>
              {playerNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  placeholder={`Pemain ${idx + 1}`}
                  className="w-full p-2 border-2 border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
              >
                Mulai Bermain
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
