import { useState, useRef, useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { motion } from "framer-motion";
import BackButton from "../components/UI/BackButton";
import { useNavigate } from "react-router-dom";
import imgLogo from "../assets/logo.png";
import imgDadu1 from "../assets/dadu1.png";
import imgDadu2 from "../assets/dadu2.png";
import imgDadu3 from "../assets/dadu3.png";
import imgDadu4 from "../assets/dadu4.png";
import imgDadu5 from "../assets/dadu5.png";
import imgDadu6 from "../assets/dadu6.png";

// Buat objek mapping untuk memudahkan pemanggilan berdasarkan angka
const diceImages = {
  1: imgDadu1,
  2: imgDadu2,
  3: imgDadu3,
  4: imgDadu4,
  5: imgDadu5,
  6: imgDadu6,
};

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
  const navigate = useNavigate();

  const sessions = useGameStore((state) => state.sessions);
  const activeSessionId = useGameStore((state) => state.activeSessionId);
  const movePlayer = useGameStore((state) => state.movePlayer);
  const nextTurn = useGameStore((state) => state.nextTurn);
  const updatePlayerPoints = useGameStore((state) => state.updatePlayerPoints);

  const moveSoundRef = useRef(null);
  const diceSoundRef = useRef(null);
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const [showQuiz, setShowQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeTile, setActiveTile] = useState(null);

  if (!activeSession) {
    onNavigate("home");
    navigate("/");
    return null;
  }

  const { players, board, turnIndex } = activeSession;
  const currentPlayer = players[turnIndex];

  const topPlayers = [...players].sort(
    (a, b) => (b.points || 0) - (a.points || 0),
  );

  // --- PERBAIKAN INISIALISASI AUDIO & CLEANUP MEMORI ---
  useEffect(() => {
    moveSoundRef.current = new Audio("/step.mp3");
    diceSoundRef.current = new Audio("/rolldice.mp3");

    if (diceSoundRef.current) {
      diceSoundRef.current.loop = true;
    }

    // Matikan suara jika pemain tiba-tiba keluar dari halaman
    return () => {
      if (moveSoundRef.current) moveSoundRef.current.pause();
      if (diceSoundRef.current) diceSoundRef.current.pause();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (showQuiz && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [showQuiz, timeLeft]);

  // --- PERBAIKAN PEMUTARAN AUDIO (Menghindari Error Browser) ---
  const playMoveSound = () => {
    if (moveSoundRef.current) {
      moveSoundRef.current.currentTime = 0;
      const playPromise = moveSoundRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Langkah tertunda:", err));
      }
    }
  };

  const handleTeacherDecision = (isCorrect) => {
    if (isCorrect) {
      updatePlayerPoints(10000);
    }
    setShowQuiz(false);
    nextTurn();
  };

  const handleCancel = () => {
    onNavigate("home");
    navigate("/");
  };

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Mainkan suara dadu dengan aman
    if (diceSoundRef.current) {
      diceSoundRef.current.currentTime = 0;
      const playPromise = diceSoundRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Suara dadu tertunda:", err));
      }
    }

    let count = 0;
    // Interval diubah sedikit ke 100ms agar browser punya waktu me-render gambar
    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count > 8) {
        clearInterval(interval);

        // Hentikan suara dadu
        if (diceSoundRef.current) {
          diceSoundRef.current.pause();
          diceSoundRef.current.currentTime = 0;
        }

        const finalSteps = Math.floor(Math.random() * 6) + 1;
        setDiceResult(finalSteps);

        let currentStep = 0;
        const stepInterval = setInterval(() => {
          currentStep++;
          movePlayer(1);
          playMoveSound();

          if (currentStep >= finalSteps) {
            clearInterval(stepInterval);
            setIsRolling(false);

            const finalPosition =
              (currentPlayer.position + finalSteps) % board.length;
            const landedTile = board[finalPosition];

            if (landedTile.type === "topic") {
              setActiveTile(landedTile);
              setTimeLeft(30);
              setTimeout(() => setShowQuiz(true), 500);
            } else {
              setTimeout(() => nextTurn(), 1200);
            }
          }
        }, 350);
      }
    }, 100);
  };

  const getGridPosition = (index) => {
    if (index <= 6)
      return { gridColumn: `${index + 1} / span 1`, gridRow: "1 / span 1" };
    else if (index <= 9) {
      const row = index - 6 + 1;
      return { gridColumn: "7 / span 1", gridRow: `${row} / span 1` };
    } else if (index <= 16) {
      const col = 7 - (index - 10);
      return { gridColumn: `${col} / span 1`, gridRow: "5 / span 1" };
    } else if (index <= 19) {
      const row = 5 - (index - 16);
      return { gridColumn: "1 / span 1", gridRow: `${row} / span 1` };
    } else return { display: "none" };
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-white/10 bg-blend-overlay bg-cover bg-center flex flex-col p-4 md:p-6 gap-4 overflow-x-hidden">
      {/* Header */}
      <div className="relative flex justify-center items-center w-full mb-6 mt-2">
        <div className="absolute left-0 top-0">
          <BackButton />
        </div>
        <div className="text-center">
          <motion.button
            animate={{ scale: [1.5, 1.6, 1.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={handleCancel}
          >
            <img src={imgLogo} alt="Logo" className="w-48 md:w-56 h-auto" />
          </motion.button>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1600px] mx-auto items-start">
        {/* Papan Game */}
        <div className="w-full lg:w-4/5 flex flex-col">
          <div className="grid grid-cols-7 grid-rows-5 gap-2 w-full bg-white/60 backdrop-blur-sm p-3 rounded-2xl shadow-xl border-4 border-slate-800">
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
                  className={`${colorClass}/20 relative p-1.5 bg-cover bg-center rounded-md border-2 border-dashed border-slate-700 flex flex-col justify-center items-center text-center shadow-sm min-h-[80px] md:min-h-[100px]`}
                >
                  {block.bg !== "none" && (
                    <div className="absolute inset-0 bg-white/20 z-0"></div>
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center font-bold text-[10px] md:text-md rounded-full bg-white border border-slate-400 mb-0.5 shadow-sm">
                      {block.id + 1}
                    </div>
                    <p className="font-bold text-[11px] md:text-lg text-black drop-shadow-md leading-tight">
                      {block.title}
                    </p>
                    <p className="hidden md:block text-xs text-black mt-0.5 line-clamp-2 drop-shadow-md font-medium">
                      {block.desc}
                    </p>
                  </div>

                  <div className="absolute bottom-1 z-20 flex gap-1 flex-wrap justify-center">
                    {players.map((p) => {
                      if (p.position === block.id) {
                        return (
                          <motion.div
                            key={p.id}
                            layoutId={`player-token-${p.id}`}
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 25,
                              mass: 1,
                            }}
                            className={`w-6 h-6 md:w-10 md:h-10 rounded-full ${p.color} border-2 border-white shadow-md flex items-center justify-center text-[10px] md:text-md text-white font-extrabold relative z-50`}
                            title={p.name}
                          >
                            {p.name.charAt(0)}
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            })}

            {/* Area Lempar Dadu */}
            <div
              style={{ gridColumn: "2 / 7", gridRow: "2 / 5" }}
              className=" p-2 md:p-4 flex flex-col items-center justify-center text-center relative"
            >
              <div className="mb-2">
                <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Giliran Pemain
                </span>
                <h2 className="text-base md:text-xl font-black flex items-center justify-center gap-2 mt-0.5 text-slate-800">
                  <span
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${currentPlayer.color} inline-block shadow-sm`}
                  ></span>
                  {currentPlayer.name}
                </h2>
              </div>

              <div className="my-2 flex flex-col items-center">
                <div className="w-44 h-44 md:w-48 md:h-48 flex items-center justify-center mb-2 transition-transform transform hover:scale-105">
                  {diceResult !== null ? (
                    <img
                      src={diceImages[diceResult]} // <-- GUNAKAN OBJEK MAPPING
                      alt={`Dadu ${diceResult}`}
                      className={`w-full h-full object-contain drop-shadow-lg ${isRolling ? "animate-pulse" : ""}`}
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-slate-800 rounded-xl shadow-md flex items-center justify-center text-xl md:text-3xl font-extrabold text-slate-800">
                      ?
                    </div>
                  )}
                </div>
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className={`px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-bold text-white shadow-lg transition-all ${
                    isRolling
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                  }`}
                >
                  {isRolling ? "Mengacak..." : "Lempar Dadu 🎲"}
                </button>
              </div>

              <div className="flex gap-2 mt-2 text-[9px] md:text-[10px] text-slate-700 flex-wrap justify-center">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1 bg-white px-2 py-1 md:px-2.5 md:py-1 rounded-full border border-slate-300 shadow-sm font-medium"
                  >
                    <span
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${p.color}`}
                    ></span>
                    {p.name}: Ktk {p.position + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-full lg:w-1/5 bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-xl border-2 border-slate-300 h-fit">
          <h3 className="text-lg md:text-xl font-extrabold text-center text-slate-800 border-b-2 border-slate-200 pb-3 mb-4">
            🏆 Leaderboard
          </h3>
          <div className="flex flex-col gap-3">
            {topPlayers.map((p, i) => (
              <div
                key={p.id}
                className={`flex flex-col p-3 rounded-xl border ${i === 0 ? "bg-yellow-50 border-yellow-200" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${p.color}`}
                  ></span>
                  <span className="font-bold text-3xl text-slate-800 truncate">
                    {i + 1}. {p.name}
                  </span>
                </div>
                <span className="text-green-600 font-extrabold text-base pl-5">
                  Rp {(p.points || 0).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Kuis */}
      {showQuiz && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-3xl text-center max-w-lg w-full shadow-2xl border-4 border-indigo-200 transform transition-all">
            <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Waktu Menjawab Soal
            </div>
            <h2 className="text-2xl font-extrabold mb-2 text-slate-800">
              Pulau {activeTile?.title}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Guru membacakan soal dari kartu. Siswa <b>{currentPlayer.name}</b>
              , silakan jawab sebelum waktu habis!
            </p>

            <div
              className={`text-7xl font-black mb-8 transition-colors ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-slate-800"}`}
            >
              {timeLeft}
              <span className="text-2xl text-slate-400 ml-1">dtk</span>
            </div>

            {timeLeft === 0 && (
              <p className="text-red-600 font-bold mb-4 animate-bounce">
                Waktu Habis! Keputusan Guru?
              </p>
            )}

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => handleTeacherDecision(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold w-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Benar (+Rp 10.000)
              </button>
              <button
                onClick={() => handleTeacherDecision(false)}
                className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-bold w-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Salah (Rp 0)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
