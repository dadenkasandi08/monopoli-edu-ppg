import { useGameStore } from "../store/useGameStore";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/UI/BackButton";

export default function HistoryPage({ onNavigate }) {
  const { sessions, resumeSession } = useGameStore();
  const navigate = useNavigate();

  const handleResume = (id) => {
    resumeSession(id);
    onNavigate("board");
    navigate("/board");
  };

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-black/50 bg-blend-overlay bg-cover bg-center p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 min-h-[70vh]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Riwayat Permainan
          </h1>
          <BackButton onClick={() => onNavigate("home")} />
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
