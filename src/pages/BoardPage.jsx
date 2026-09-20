import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

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

export default function BoardPage({ onNavigate }) {
  // 1. Ambil state global
  const sessions = useGameStore((state) => state.sessions);
  const activeSessionId = useGameStore((state) => state.activeSessionId);
  const movePlayer = useGameStore((state) => state.movePlayer);
  const nextTurn = useGameStore((state) => state.nextTurn);

  // 2. Cari sesi aktif saat ini
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // Jika tidak ada sesi aktif, otomatis kembali ke beranda
  if (!activeSession) {
    onNavigate("home");
    return null;
  }

  // 3. Deklarasikan variabel dari sesi aktif
  const { players, board, turnIndex } = activeSession;
  const currentPlayer = players[turnIndex];

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalSteps = Math.floor(Math.random() * 6) + 1;
        setDiceResult(finalSteps);
        movePlayer(finalSteps);
        setIsRolling(false);
        setTimeout(() => {
          nextTurn();
        }, 1200);
      }
    }, 80);
  };

  // Helper yang DIPERBARUI untuk memetakan index kotak (0-19) ke koordinat Grid 7x5
  const getGridPosition = (index) => {
    if (index <= 6) {
      // Sisi Atas (Kiri ke Kanan): Baris 1, Kolom 1 sampai 7
      return { gridColumn: `${index + 1} / span 1`, gridRow: "1 / span 1" };
    } else if (index <= 9) {
      // Sisi Kanan (Atas ke Bawah): Kolom 7, Baris 2 sampai 4
      const row = index - 6 + 1; // Index 7 -> Baris 2, dst.
      return { gridColumn: "7 / span 1", gridRow: `${row} / span 1` };
    } else if (index <= 16) {
      // Sisi Bawah (Kanan ke Kiri): Baris 5, Kolom 7 turun ke 1
      const col = 7 - (index - 10); // Index 10 -> Kolom 7, dst.
      return { gridColumn: `${col} / span 1`, gridRow: "5 / span 1" };
    } else if (index <= 19) {
      // Sisi Kiri (Bawah ke Atas): Kolom 1, Baris 4 naik ke 2
      const row = 5 - (index - 16); // Index 17 -> Baris 4, dst.
      return { gridColumn: "1 / span 1", gridRow: `${row} / span 1` };
    } else {
      // Mencegah error jika data di Store belum dikurangi menjadi 20
      return { display: "none" };
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

      {/* Papan Sirkuit Monopoli (Grid 7x5) - Hapus 'aspect-square' agar bisa memanjang */}
      <div className="grid grid-cols-7 grid-rows-5 gap-2 w-full max-w-7xl bg-green-600 p-3 rounded-2xl shadow-xl border-4 border-slate-800">
        {/* Render Kotak-kotak Papan */}
        {board.map((block) => {
          const gridStyle = getGridPosition(block.id);
          const colorClass = getThemeColor(block.theme);

          const blockStyle = {
            ...gridStyle,
            backgroundImage:
              block.bg !== "none" ? `url('${block.bg}')` : "none",
          };

          return (
            <div
              key={block.id}
              style={blockStyle}
              className={`${colorClass}/20 relative p-1.5 bg-cover bg-center rounded-md border-2 border-dashed border-slate-700 flex flex-col justify-center items-center text-center shadow-sm overflow-hidden`}
            >
              {block.bg !== "none" && (
                <div className="absolute inset-0 bg-white/50 z-0"></div>
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 flex items-center justify-center font-bold text-md rounded-full bg-white border border-slate-400 mb-0.5 shadow-sm">
                  {block.id + 1}
                </div>
                <p className="font-bold text-lg text-slate-900 drop-shadow-md">
                  {block.title}
                </p>
                <p className="text-sm text-slate-800 mt-0.5 line-clamp-2 drop-shadow-md">
                  {block.desc}
                </p>
              </div>

              <div className="absolute bottom-1 z-20 flex gap-1 flex-wrap justify-center">
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

        {/* Bagian Tengah Sirkuit (Kotak kosong untuk Dadu) */}
        {/* Menggunakan Baris 2 sampai 4 (gridRow: "2 / 5") dan Kolom 2 sampai 6 (gridColumn: "2 / 7") */}
        <div
          style={{ gridColumn: "2 / 7", gridRow: "2 / 5" }}
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
