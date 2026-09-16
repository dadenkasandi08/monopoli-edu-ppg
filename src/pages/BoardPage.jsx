import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

// Tambahkan fungsi mapping ini di atas komponen App
const getThemeColor = (theme) => {
  switch (theme) {
    case "green":
      return "bg-green-200";
    case "yellow":
      return "bg-yellow-200";
    case "sky":
      return "bg-sky-200";
    case "yellow-bright":
      return "bg-yellow-300";
    case "pink":
      return "bg-pink-300";
    case "purple":
      return "bg-purple-300";
    case "red":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

export default function BoardPage() {
  const { players, board, turnIndex, movePlayer, nextTurn } = useGameStore();
  const currentPlayer = players[turnIndex];
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // Fungsi untuk melempar dadu & menggerakkan pemain
  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Efek animasi angka acak bergulir sebentar
    let count = 0;
    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalSteps = Math.floor(Math.random() * 6) + 1;
        setDiceResult(finalSteps);

        // Gerakkan pemain di state
        movePlayer(finalSteps);
        setIsRolling(false);

        // Pindah giliran ke pemain berikutnya setelah jeda singkat
        setTimeout(() => {
          nextTurn();
        }, 1200);
      }
    }, 80);
  };

  // Helper untuk memetakan index kotak (0-23) ke koordinat Grid 7x7 melingkar
  const getGridPosition = (index) => {
    if (index <= 6) {
      // Sisi Atas (Kiri ke Kanan): Baris 1, Kolom 1 sampai 7
      return { gridColumn: `${index + 1} / span 1`, gridRow: "1 / span 1" };
    } else if (index <= 12) {
      // Sisi Kanan (Atas ke Bawah): Kolom 7, Baris 2 sampai 7
      const row = index - 6 + 1;
      return { gridColumn: "7 / span 1", gridRow: `${row} / span 1` };
    } else if (index <= 18) {
      // Sisi Bawah (Kanan ke Kiri): Baris 7, Kolom 6 turun ke 1
      const col = 7 - (index - 12);
      return { gridColumn: `${col} / span 1`, gridRow: "7 / span 1" };
    } else {
      // Sisi Kiri (Bawah ke Atas): Kolom 1, Baris 6 naik ke 2
      const row = 7 - (index - 18);
      return { gridColumn: "1 / span 1", gridRow: `${row} / span 1` };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-1">
        Monopoli Edu
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Topik: Computational Thinking
      </p>

      {/* Papan Sirkuit Monopoli (Grid 7x7) */}
      <div className="grid grid-cols-7 grid-rows-7 gap-2 w-full max-w-7xl aspect-square bg-green-600 p-3 rounded-2xl shadow-xl border-4 border-slate-800">
        {/* Render Kotak-kotak Papan Berdasarkan Keliling Sirkuit */}
        {board.map((block) => {
          const style = getGridPosition(block.id);
          const colorClass = getThemeColor(block.theme); // Mengambil kelas warna secara aman
          return (
            <div
              key={block.id}
              style={style}
              className={`${colorClass} relative p-1.5 rounded-md border-2 border-dashed border-slate-700 flex flex-col justify-center items-center text-center shadow-sm overflow-hidden`}
            >
              {/* Nomor Kotak */}
              <div className="w-5 h-5 flex items-center justify-center font-bold text-md rounded-full bg-white border border-slate-400 mb-0.5">
                {block.id + 1}
              </div>
              <p className="font-bold text-lg ">{block.title}</p>
              <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">
                {block.desc}
              </p>

              {/* Bidak Pemain yang Berada di Kotak Ini */}
              <div className="absolute bottom-1 flex gap-1 flex-wrap justify-center">
                {players.map((p) => {
                  if (p.position === block.id) {
                    return (
                      <div
                        key={p.id}
                        className={`w-10 h-10 rounded-full ${p.color} border-2 border-white shadow-md flex items-center justify-center text-md text-white font-extrabold`}
                        title={p.name}
                      >
                        {p.name.charAt(0)}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}

        {/* Bagian Tengah Sirkuit: Dadu, Giliran, & Tombol Lempar */}
        <div
          style={{ gridColumn: "2 / 7", gridRow: "2 / 7" }}
          className="bg-slate-50 rounded-xl border-4 border-dashed border-slate-500 p-4 flex flex-col items-center justify-center shadow-inner text-center"
        >
          <div className="mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Giliran Pemain
            </span>
            <h2 className="text-lg font-bold flex items-center justify-center gap-2 mt-0.5">
              <span
                className={`w-3.5 h-3.5 rounded-full ${currentPlayer.color} inline-block`}
              ></span>
              {currentPlayer.name}
            </h2>
          </div>

          {/* Kotak Dadu Interaktif */}
          <div className="my-2 flex flex-col items-center">
            <div className="w-14 h-14 bg-white border-2 border-slate-800 rounded-xl shadow-md flex items-center justify-center text-2xl font-extrabold text-slate-800 mb-2 transition-transform transform hover:scale-105">
              {diceResult !== null ? diceResult : "🎲"}
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all ${
                isRolling
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {isRolling ? "Mengocok..." : "Lempar Dadu 🎲"}
            </button>
          </div>

          {/* Status Posisi Semua Pemain */}
          <div className="flex gap-2 mt-2 text-[10px] text-slate-600 flex-wrap justify-center">
            {players.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${p.color}`}></span>
                <span className="font-medium">
                  {p.name}: Kotak {p.position + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
