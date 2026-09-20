import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

export default function StartPage({ onNavigate }) {
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
  };

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-black/50 bg-blend-overlay bg-cover bg-center flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
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
              onClick={() => onNavigate("home")}
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
    </div>
  );
}
