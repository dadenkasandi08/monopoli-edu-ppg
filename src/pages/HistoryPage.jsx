import { useGameStore } from "../store/useGameStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/UI/BackButton";
import imgLogo from "../assets/logo.png";

export default function HistoryPage({ onNavigate }) {
  const { sessions, resumeSession } = useGameStore();
  const navigate = useNavigate();

  const handleResume = (id) => {
    resumeSession(id);
    onNavigate("board");
    navigate("/board");
  };

  const handleBack = () => {
    onNavigate("home");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[url('/src/assets/background.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <motion.button
          animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="drop-shadow-md hover:drop-shadow-xl"
          onClick={handleBack}
        >
          <img src={imgLogo} alt="Logo" className="w-48 md:w-56 h-auto" />
        </motion.button>
      </div>
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 min-h-[70vh]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Riwayat Permainan
          </h1>
          <BackButton />
        </div>

        {sessions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            Belum ada riwayat permainan.
          </div>
        ) : (
          <div className="grid gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="border-2 border-slate-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 hover:border-indigo-300 transition"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {session.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">
                    {new Date(session.date).toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    Pemain: {session.players.map((p) => p.name).join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleResume(session.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md w-full md:w-auto"
                >
                  Lanjutkan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
