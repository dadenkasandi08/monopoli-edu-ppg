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

// =====================================================
// GAMBAR DADU
// =====================================================

const diceImages = {
  1: imgDadu1,
  2: imgDadu2,
  3: imgDadu3,
  4: imgDadu4,
  5: imgDadu5,
  6: imgDadu6,
};

// =====================================================
// WARNA TILE
// =====================================================

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

// =====================================================
// BOARD PAGE
// =====================================================

export default function BoardPage({ onNavigate }) {
  const navigate = useNavigate();

  // ===================================================
  // ZUSTAND
  // ===================================================

  const sessions = useGameStore((state) => state.sessions);
  const activeSessionId = useGameStore((state) => state.activeSessionId);

  const movePlayer = useGameStore((state) => state.movePlayer);

  const nextTurn = useGameStore((state) => state.nextTurn);

  const updatePlayerPoints = useGameStore((state) => state.updatePlayerPoints);
  const finishSession = useGameStore((state) => state.finishSession);

  // ===================================================
  // SESSION
  // ===================================================

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  // ===================================================
  // AUDIO
  // ===================================================

  const moveSoundRef = useRef(null);
  const diceSoundRef = useRef(null);

  // ===================================================
  // LOCK UNTUK MENCEGAH DOUBLE ACTION
  // ===================================================

  const movementLockRef = useRef(false);

  // ===================================================
  // STATE
  // ===================================================

  const [diceResult, setDiceResult] = useState(null);

  const [isRolling, setIsRolling] = useState(false);

  const [showQuiz, setShowQuiz] = useState(false);

  // Popup pilihan kotak soal saat pemain mendarat di Parkir Bebas.
  const [showFreeParkingPicker, setShowFreeParkingPicker] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);

  const [timeLeft, setTimeLeft] = useState(45);

  const [activeTile, setActiveTile] = useState(null);

  // Durasi timer mengikuti pengaturan yang dipilih guru pada sesi baru.
  const timerDuration = Number(activeSession?.timerDuration) || 45;

  useEffect(() => {
    if (!showQuiz) {
      setTimeLeft(timerDuration);
    }
  }, [timerDuration, showQuiz]);

  // ===================================================
  // AUDIO INITIALIZATION
  // ===================================================

  useEffect(() => {
    moveSoundRef.current = new Audio("/step.mp3");

    diceSoundRef.current = new Audio("/rolldice.mp3");

    if (diceSoundRef.current) {
      diceSoundRef.current.loop = true;
    }

    return () => {
      if (moveSoundRef.current) {
        moveSoundRef.current.pause();
      }

      if (diceSoundRef.current) {
        diceSoundRef.current.pause();
      }
    };
  }, []);

  // ===================================================
  // TIMER SOAL
  // ===================================================

  useEffect(() => {
    if (!showQuiz) {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showQuiz, timeLeft]);

  // ===================================================
  // JIKA SESSION HILANG
  // ===================================================

  useEffect(() => {
    if (!activeSession) {
      onNavigate("home");
      navigate("/");
    }
  }, [activeSession, navigate, onNavigate]);

  // ===================================================
  // AGAR SEMUA HOOK SUDAH DIPANGGIL
  // BARU BOLEH RETURN
  // ===================================================

  if (!activeSession) {
    return null;
  }

  // ===================================================
  // DATA SESSION
  // ===================================================

  const { players, board, turnIndex } = activeSession;

  const currentPlayer = players[turnIndex];

  // ===================================================
  // LEADERBOARD
  // ===================================================

  const topPlayers = [...players].sort(
    (a, b) => (b.points || 0) - (a.points || 0),
  );

  // ===================================================
  // SUARA LANGKAH
  // ===================================================

  const playMoveSound = () => {
    if (!moveSoundRef.current) {
      return;
    }

    moveSoundRef.current.currentTime = 0;

    const playPromise = moveSoundRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => console.warn("Suara langkah tertunda:", err));
    }
  };

  // ===================================================
  // SUARA DADU
  // ===================================================

  const startDiceSound = () => {
    if (!diceSoundRef.current) {
      return;
    }

    diceSoundRef.current.currentTime = 0;

    const playPromise = diceSoundRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => console.warn("Suara dadu tertunda:", err));
    }
  };

  const stopDiceSound = () => {
    if (!diceSoundRef.current) {
      return;
    }

    diceSoundRef.current.pause();
    diceSoundRef.current.currentTime = 0;
  };

  // ===================================================
  // POSISI BARU
  // ===================================================

  const calculatePosition = (startPosition, steps, direction, boardLength) => {
    const movement = direction === "backward" ? -steps : steps;

    return (startPosition + movement + boardLength) % boardLength;
  };

  // ===================================================
  // SELESAI DI KOTAK
  // ===================================================

  const resolveLanding = (finalPosition, isBackwardRoll) => {
    const landedTile = board[finalPosition];

    console.log("=================================");

    console.log(isBackwardRoll ? "HASIL DADU KEDUA" : "HASIL DADU PERTAMA");

    console.log("Posisi akhir:", finalPosition);

    console.log("Kotak:", landedTile);

    console.log("=================================");

    // =================================================
    // KOTAK SOAL
    // =================================================

    if (landedTile?.type === "topic") {
      setActiveTile(landedTile);

      setTimeLeft(timerDuration);

      // Tampilkan popup secara langsung.
      setShowQuiz(true);

      // Tetap mengunci permainan sampai guru
      // memberikan keputusan.
      setIsRolling(false);

      movementLockRef.current = true;

      return;
    }

    // =================================================
    // KOTAK MUNDUR
    // =================================================

    if (landedTile?.type === "chance") {
      console.log("Pemain mendapatkan KOTAK MUNDUR.");

      /*
       * Jangan pindah giliran.
       *
       * Pemain harus melempar dadu lagi.
       */

      setTimeout(() => {
        rollDice(true);
      }, 800);

      return;
    }

    // =================================================
    // PARKIR BEBAS: PILIH SATU KOTAK SOAL
    // =================================================

    if (
      landedTile?.id === 10 ||
      landedTile?.title?.toUpperCase().includes("PARKIR BEBAS")
    ) {
      setShowFreeParkingPicker(true);
      setIsRolling(false);
      movementLockRef.current = true;
      return;
    }

    // =================================================
    // KOTAK BIASA
    // =================================================

    setTimeout(() => {
      setIsRolling(false);

      movementLockRef.current = false;

      nextTurn();
    }, 800);
  };

  // ===================================================
  // ANIMASI PERGERAKAN
  // ===================================================

  const animateMovement = (steps, direction, isBackwardRoll) => {
    /*
     * Posisi awal harus diambil pada saat
     * fungsi dipanggil.
     *
     * Jangan menggunakan currentPlayer.position
     * setelah interval berjalan karena state React
     * dapat berubah selama animasi.
     */

    const startPosition =
      useGameStore
        .getState()
        .sessions.find((s) => s.id === useGameStore.getState().activeSessionId)
        ?.players[
        useGameStore
          .getState()
          .sessions.find(
            (s) => s.id === useGameStore.getState().activeSessionId,
          )?.turnIndex
      ]?.position ?? currentPlayer.position;

    let currentStep = 0;

    const stepInterval = setInterval(() => {
      currentStep++;

      // =============================================
      // GERAK PEMAIN
      // =============================================

      if (direction === "backward") {
        movePlayer(-1);
      } else {
        movePlayer(1);
      }

      playMoveSound();

      // =============================================
      // SELESAI
      // =============================================

      if (currentStep >= steps) {
        clearInterval(stepInterval);

        const finalPosition = calculatePosition(
          startPosition,
          steps,
          direction,
          board.length,
        );

        /*
         * Berikan sedikit waktu supaya render posisi
         * terakhir selesai sebelum tile diperiksa.
         */

        setTimeout(() => {
          resolveLanding(finalPosition, isBackwardRoll);
        }, 150);
      }
    }, 350);
  };

  // ===================================================
  // LEMPAR DADU
  // ===================================================

  const rollDice = (isBackwardRoll = false) => {
    /*
     * Lemparan pertama tidak boleh dilakukan ketika
     * proses sedang berjalan.
     *
     * Lemparan kedua boleh dipanggil otomatis walaupun
     * isRolling masih true.
     */

    if (movementLockRef.current && !isBackwardRoll) {
      return;
    }

    // =================================================
    // KUNCI PERMAINAN
    // =================================================

    movementLockRef.current = true;

    setIsRolling(true);

    // =================================================
    // SUARA DADU
    // =================================================

    startDiceSound();

    // =================================================
    // ANIMASI DADU
    // =================================================

    let count = 0;

    const diceInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;

      setDiceResult(randomValue);

      count++;

      // Setelah beberapa kali animasi,
      // tentukan angka final.
      if (count >= 9) {
        clearInterval(diceInterval);

        stopDiceSound();

        // =============================================
        // HASIL AKHIR DADU
        // =============================================

        const finalSteps = Math.floor(Math.random() * 6) + 1;

        setDiceResult(finalSteps);

        // =============================================
        // ANIMASI GERAK
        // =============================================

        const direction = isBackwardRoll ? "backward" : "forward";

        /*
         * Tunggu sedikit supaya gambar dadu final
         * terlihat sebelum pemain mulai bergerak.
         */

        setTimeout(() => {
          animateMovement(finalSteps, direction, isBackwardRoll);
        }, 300);
      }
    }, 100);
  };

  // ===================================================
  // PILIH KOTAK SOAL DARI PARKIR BEBAS
  // ===================================================

  const handleFreeParkingChoice = (tile) => {
    setActiveTile(tile);
    setTimeLeft(timerDuration);
    setShowFreeParkingPicker(false);
    setShowQuiz(true);
  };

  // ===================================================
  // KEPUTUSAN GURU
  // ===================================================

  const handleTeacherDecision = (isCorrect) => {
    // ===============================================
    // JIKA BENAR
    // ===============================================

    if (isCorrect) {
      updatePlayerPoints(10000);
    }

    // ===============================================
    // TUTUP QUIZ
    // ===============================================

    setShowQuiz(false);

    setActiveTile(null);

    setTimeLeft(timerDuration);

    // ===============================================
    // BUKA LOCK
    // ===============================================

    movementLockRef.current = false;

    setIsRolling(false);

    // ===============================================
    // LANJUT PEMAIN BERIKUTNYA
    // ===============================================

    setTimeout(() => {
      nextTurn();
    }, 300);
  };

  // ===================================================
  // CANCEL / KEMBALI
  // ===================================================

  const handleCancel = () => {
    stopDiceSound();

    if (moveSoundRef.current) {
      moveSoundRef.current.pause();
    }

    movementLockRef.current = false;

    onNavigate("home");

    navigate("/");
  };

  // Minta konfirmasi sebelum mengakhiri permainan.
  const handleEndGameRequest = () => {
    if (isRolling) return;
    setShowEndConfirm(true);
  };

  // Simpan status sesi sebagai selesai dan tampilkan hasil akhir.
  const handleConfirmEndGame = () => {
    stopDiceSound();

    if (moveSoundRef.current) {
      moveSoundRef.current.pause();
    }

    setShowEndConfirm(false);
    setShowQuiz(false);
    setShowFreeParkingPicker(false);
    setActiveTile(null);
    setIsRolling(false);
    movementLockRef.current = false;

    finishSession();
    setShowFinalResults(true);
  };

  const handleLeaveFinalResults = () => {
    setShowFinalResults(false);
    onNavigate("home");
    navigate("/");
  };

  // ===================================================
  // GRID BOARD
  // ===================================================

  const getGridPosition = (index) => {
    if (index <= 6) {
      return {
        gridColumn: `${index + 1} / span 1`,
        gridRow: "1 / span 1",
      };
    }

    if (index <= 9) {
      const row = index - 6 + 1;

      return {
        gridColumn: "7 / span 1",
        gridRow: `${row} / span 1`,
      };
    }

    if (index <= 16) {
      const col = 7 - (index - 10);

      return {
        gridColumn: `${col} / span 1`,
        gridRow: "5 / span 1",
      };
    }

    if (index <= 19) {
      const row = 5 - (index - 16);

      return {
        gridColumn: "1 / span 1",
        gridRow: `${row} / span 1`,
      };
    }

    return {
      display: "none",
    };
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-white/10 bg-blend-overlay bg-cover bg-center flex flex-col p-4 md:p-6 gap-4 overflow-x-hidden">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="relative flex justify-center items-center w-full mb-6 mt-2">
        <div className="absolute left-0 top-0">
          <BackButton />
        </div>

        <div className="absolute right-0 top-0">
          <button
            type="button"
            onClick={handleEndGameRequest}
            disabled={isRolling}
            className="rounded-xl bg-red-600 px-3 py-2 text-xs md:text-sm font-bold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Akhiri Permainan
          </button>
        </div>

        <div className="text-center">
          <motion.button
            animate={{
              scale: [1.5, 1.6, 1.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={handleCancel}
          >
            <img src={imgLogo} alt="Logo" className="w-48 md:w-56 h-auto" />
          </motion.button>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1600px] mx-auto items-start">
        {/* =================================================
            BOARD
        ================================================= */}

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
                  {/* BACKGROUND OVERLAY */}

                  {block.bg !== "none" && (
                    <div className="absolute inset-0 bg-white/20 z-0"></div>
                  )}

                  {/* TILE CONTENT */}

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

                  {/* PLAYER TOKEN */}

                  <div className="absolute bottom-1 z-20 flex gap-1 flex-wrap justify-center">
                    {players.map((p) => {
                      if (p.position !== block.id) {
                        return null;
                      }

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
                    })}
                  </div>
                </div>
              );
            })}

            {/* =================================================
                DICE AREA
            ================================================= */}

            <div
              style={{
                gridColumn: "2 / 7",
                gridRow: "2 / 5",
              }}
              className="p-2 md:p-4 flex flex-col items-center justify-center text-center relative"
            >
              {/* CURRENT PLAYER */}

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

              {/* DICE */}

              <div className="my-2 flex flex-col items-center">
                <div className="w-44 h-44 md:w-48 md:h-48 flex items-center justify-center mb-2 transition-transform transform hover:scale-105">
                  {diceResult !== null ? (
                    <img
                      src={diceImages[diceResult]}
                      alt={`Dadu ${diceResult}`}
                      className={`w-full h-full object-contain drop-shadow-lg ${
                        isRolling ? "animate-pulse" : ""
                      }`}
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-slate-800 rounded-xl shadow-md flex items-center justify-center text-xl md:text-3xl font-extrabold text-slate-800">
                      ?
                    </div>
                  )}
                </div>

                {/* DICE BUTTON */}

                <button
                  onClick={() => rollDice(false)}
                  disabled={isRolling || showQuiz || movementLockRef.current}
                  className={`px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-bold text-white shadow-lg transition-all ${
                    isRolling || showQuiz || movementLockRef.current
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                  }`}
                >
                  {isRolling
                    ? "Berjalan..."
                    : showQuiz
                      ? "Menjawab Soal..."
                      : "Lempar Dadu 🎲"}
                </button>
              </div>

              {/* PLAYER STATUS */}

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

        {/* =================================================
            LEADERBOARD
        ================================================= */}

        <div className="w-full lg:w-1/5 bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-xl border-2 border-slate-300 h-fit">
          <h3 className="text-lg md:text-xl font-extrabold text-center text-slate-800 border-b-2 border-slate-200 pb-3 mb-4">
            🏆 Leaderboard
          </h3>

          <div className="flex flex-col gap-3">
            {topPlayers.map((p, i) => (
              <div
                key={p.id}
                className={`flex flex-col p-3 rounded-xl border ${
                  i === 0
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-slate-50 border-slate-200"
                }`}
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

      {/* =================================================
          KONFIRMASI AKHIRI PERMAINAN
      ================================================= */}

      {showEndConfirm && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border-4 border-red-200 bg-white p-6 md:p-8 text-center shadow-2xl">
            <div className="mb-3 text-5xl">🏁</div>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-800">
              Akhiri Permainan?
            </h2>
            <p className="mb-6 text-slate-600">
              Permainan akan dihentikan dan hasil akhir pemain ditampilkan.
              Pastikan semua giliran atau soal yang sedang berlangsung sudah
              selesai.
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowEndConfirm(false)}
                className="w-full rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-300"
              >
                Lanjut Bermain
              </button>
              <button
                type="button"
                onClick={handleConfirmEndGame}
                className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-md transition hover:bg-red-700"
              >
                Ya, Akhiri
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          HASIL AKHIR PERMAINAN
      ================================================= */}

      {showFinalResults && (
        <div className="fixed inset-0 z-[1101] flex items-center justify-center bg-slate-900/85 backdrop-blur-sm p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border-4 border-amber-200 bg-white p-6 md:p-8 shadow-2xl">
            <div className="mb-5 text-center">
              <div className="mb-2 text-5xl">🏆</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Permainan Selesai!
              </h2>
              <p className="mt-2 text-slate-600">
                {activeSession.name} — berikut perolehan akhir setiap pemain.
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              {topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 ${
                    index === 0
                      ? "border-amber-300 bg-amber-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-xl font-black text-slate-500">
                      {index + 1}.
                    </span>
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full ${player.color}`}
                    />
                    <span className="truncate font-bold text-slate-800">
                      {player.name}
                    </span>
                  </div>
                  <span className="shrink-0 font-extrabold text-emerald-700">
                    Rp {(player.points || 0).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            {topPlayers.length > 0 && (
              <p className="mb-6 text-center font-bold text-amber-700">
                🎉 Pemenang: {topPlayers[0].name}!
              </p>
            )}

            <button
              type="button"
              onClick={handleLeaveFinalResults}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-indigo-700"
            >
              Selesai dan Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          PILIHAN KOTAK SOAL DARI PARKIR BEBAS
      ================================================= */}

      {showFreeParkingPicker && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-3xl shadow-2xl border-4 border-emerald-200 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🅿️</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
                Parkir Bebas!
              </h2>
              <p className="text-slate-600">
                <b>{currentPlayer.name}</b>, pilih nomor kotak soal saja.
                Setelah memilih, ambil kartu soal fisik yang tersedia dan jawab
                sesuai instruksi guru. Kamu tidak perlu memilih materi.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {board
                .filter((tile) => tile.type === "topic")
                .map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleFreeParkingChoice(tile)}
                    className="flex min-h-24 flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label={`Pilih kotak nomor ${tile.id + 1}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-1">
                      Kotak
                    </span>
                    <span className="text-3xl font-extrabold text-slate-800">
                      {tile.id + 1}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          QUIZ POPUP
      ================================================= */}

      {showQuiz && activeTile && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-3xl text-center max-w-lg w-full shadow-2xl border-4 border-indigo-200">
            {/* LABEL */}

            <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Waktu Menjawab Soal
            </div>

            {/* TITLE */}

            <h2 className="text-2xl font-extrabold mb-2 text-slate-800">
              {activeTile.title}
            </h2>

            {/* DESCRIPTION */}

            <p className="text-slate-500 text-sm mb-6">
              Guru membacakan soal dari kartu.
              <br />
              Siswa <b>{currentPlayer.name}</b>, silakan jawab sebelum waktu
              habis!
            </p>

            {/* TIMER */}

            <div
              className={`text-7xl font-black mb-8 transition-colors ${
                timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-slate-800"
              }`}
            >
              {timeLeft}

              <span className="text-2xl text-slate-400 ml-1">dtk</span>
            </div>

            {/* TIME OUT */}

            {timeLeft === 0 && (
              <p className="text-red-600 font-bold mb-4 animate-bounce">
                Waktu Habis! Keputusan Guru?
              </p>
            )}

            {/* TEACHER DECISION */}

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
