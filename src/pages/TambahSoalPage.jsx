import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

export default function QuestionBankPage({ onNavigate }) {
  const { questionSets, saveQuestionSet, deleteQuestionSet, sessions } =
    useGameStore();

  // Ambil data pulau (hanya yang bertipe 'topic')
  const defaultBoard =
    sessions.length > 0 ? sessions[0].board : useGameStore.getState().board;
  const topicIslands = defaultBoard
    ? defaultBoard.filter((b) => b.type === "topic")
    : [];

  const [view, setView] = useState("list"); // 'list', 'form', 'print'
  const [currentSetId, setCurrentSetId] = useState(null);
  const [setName, setSetName] = useState("");

  // questions akan menyimpan data dengan format: { [islandId]: ['soal1', 'soal2', 'soal3', 'soal4', 'soal5'] }
  const [questions, setQuestions] = useState({});

  const handleCreateNew = () => {
    setCurrentSetId(null);
    setSetName("");
    setQuestions({});
    setView("form");
  };

  const handleEdit = (qSet) => {
    setCurrentSetId(qSet.id);
    setSetName(qSet.name);
    setQuestions(qSet.questions || {});
    setView("form");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!setName) return alert("Nama set soal harus diisi!");
    saveQuestionSet(currentSetId, setName, questions);
    setView("list");
  };

  // Update input soal pada urutan tertentu (0 - 4)
  const handleQuestionChange = (islandId, index, text) => {
    setQuestions((prev) => {
      // Ambil array soal yang sudah ada, atau buat array kosong berisi 5 slot
      const currentQs = prev[islandId] || ["", "", "", "", ""];
      const newQs = [...currentQs];
      newQs[index] = text; // Update teks pada urutan yang diketik
      return { ...prev, [islandId]: newQs };
    });
  };

  const handlePrint = (qSet) => {
    setSetName(qSet.name);
    setQuestions(qSet.questions || {});
    setView("print");
    setTimeout(() => {
      window.print();
      setView("list");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ---------------- MODE DAFTAR / FORM (Sembunyi saat Print) ---------------- */}
      <div className="print:hidden p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-extrabold text-slate-800">
              {view === "form" ? "Editor Set Soal" : "Bank Soal Guru"}
            </h1>
            <button
              onClick={() =>
                view === "form" ? setView("list") : onNavigate("home")
              }
              className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-bold text-slate-700"
            >
              Kembali
            </button>
          </div>

          {/* VIEW: LIST */}
          {view === "list" && (
            <div>
              <button
                onClick={handleCreateNew}
                className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md w-full md:w-auto"
              >
                + Buat Set Soal Baru
              </button>

              {questionSets.length === 0 ? (
                <div className="text-center text-slate-500 py-10 bg-slate-100 rounded-xl">
                  Belum ada set soal yang disimpan.
                </div>
              ) : (
                <div className="grid gap-4">
                  {questionSets.map((qSet) => (
                    <div
                      key={qSet.id}
                      className="border-2 border-slate-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 hover:border-indigo-300 transition"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {qSet.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          Dibuat:{" "}
                          {new Date(qSet.date).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleEdit(qSet)}
                          className="flex-1 md:flex-none bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-2 px-4 rounded-lg shadow-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePrint(qSet)}
                          className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm"
                        >
                          Cetak
                        </button>
                        <button
                          onClick={() => deleteQuestionSet(qSet.id)}
                          className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: FORM */}
          {view === "form" && (
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nama Set Soal (Materi)
                </label>
                <input
                  type="text"
                  required
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  placeholder="Contoh: Soal Sejarah Kemerdekaan Kelas 8"
                  className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-100 p-4 md:p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                  <span>Isi Pertanyaan (Maks 5 per Pulau)</span>
                  <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Kosongkan jika tidak diperlukan
                  </span>
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {topicIslands.map((island) => {
                    const islandQs = questions[island.id] || [
                      "",
                      "",
                      "",
                      "",
                      "",
                    ]; // Pastikan ada 5 slot array
                    return (
                      <div
                        key={island.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                      >
                        <h4 className="font-bold text-indigo-700 mb-3 border-b-2 border-indigo-100 pb-2 flex items-center gap-2">
                          🗺️ {island.title}
                        </h4>

                        {/* Looping 5 kotak input pertanyaan */}
                        <div className="flex flex-col gap-2">
                          {islandQs.map((q, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                              <span className="bg-slate-100 text-slate-500 font-bold px-2 py-1.5 rounded text-xs mt-0.5">
                                {idx + 1}
                              </span>
                              <textarea
                                rows="1"
                                value={q}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    island.id,
                                    idx,
                                    e.target.value,
                                  )
                                }
                                placeholder={`Ketik pertanyaan ${idx + 1}...`}
                                className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 text-sm resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition text-lg mt-4"
              >
                💾 Simpan Set Soal
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ---------------- MODE CETAK (Hanya Tampil Saat Print) ---------------- */}
      {view === "print" && (
        <div className="hidden print:block print:w-[210mm] print:bg-white text-black">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-wider">
              {setName}
            </h1>
            <p className="text-sm text-slate-600">
              Gunting kartu berdasarkan garis putus-putus pembatas.
            </p>
          </div>

          {/* Grid Kertas A4 (Menggunakan 3 kolom agar muat banyak kartu kecil) */}
          <div className="grid grid-cols-3 gap-2">
            {topicIslands.flatMap((island) => {
              const islandQs = questions[island.id] || [];
              // Saring hanya pertanyaan yang teks-nya diisi (tidak kosong)
              const filledQs = islandQs.filter((q) => q.trim() !== "");

              // Jika pulau ini sama sekali tidak diisi soal, cetak 1 kartu kosong sebagai penanda
              if (filledQs.length === 0) {
                return (
                  <div
                    key={`${island.id}-empty`}
                    className="hidden border-2 border-dashed border-black p-3 break-inside-avoid min-h-[50mm]  flex-col justify-center items-center text-center relative"
                  >
                    <div className="absolute top-2 left-0 w-full flex justify-center">
                      <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Kartu Pulau
                      </span>
                    </div>
                    <h2 className="text-sm font-bold mt-4 mb-1 border-b border-black pb-1 w-full line-clamp-2">
                      {island.title}
                    </h2>
                    <p className="text-xs italic text-gray-500">
                      (Belum ada soal)
                    </p>
                  </div>
                );
              }

              // Jika diisi, cetak sejumlah pertanyaan yang diisi (Bisa 1 sampai 5 kartu)
              return filledQs.map((q, idx) => (
                <div
                  key={`${island.id}-${idx}`}
                  className="border-2 border-dashed border-black p-3 break-inside-avoid min-h-[50mm] flex flex-col justify-center items-center text-center relative"
                >
                  {/* Label Atas Kartu */}
                  <div className="absolute top-2 left-0 w-full flex justify-between px-2">
                    <span className="bg-black text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Kartu Pulau
                    </span>
                    <span className="bg-gray-300 text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase border border-black">
                      Soal {idx + 1}
                    </span>
                  </div>

                  {/* Judul & Isi Soal */}
                  <h2 className="text-sm font-extrabold mt-5 mb-2 border-b border-black pb-1 w-full leading-tight">
                    {island.title}
                  </h2>
                  <p className="text-[11px] font-medium leading-snug">{q}</p>
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
}
