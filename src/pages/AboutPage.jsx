import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imgLogo from "../assets/logo.png";

// NANTINYA: Import foto asli Anda di sini jika sudah ada
// contoh: import foto1 from "../assets/foto_anggota1.jpg";

export default function AboutPage({ onNavigate }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    onNavigate("home");
    navigate("/"); // Navigasi kembali ke halaman beranda
  };

  // Data 6 Anggota Tim (Silakan ubah nama, peran, dan sumber fotonya nanti)
  const teamMembers = [
    {
      id: 1,
      name: "Nama Anggota 1",
      role: "Project Manager",
      photo: "https://via.placeholder.com/150?text=Foto+1", // Ganti dengan variabel impor (misal: foto1)
    },
    {
      id: 2,
      name: "Nama Anggota 2",
      role: "Lead Developer",
      photo: "https://via.placeholder.com/150?text=Foto+2",
    },
    {
      id: 3,
      name: "Nama Anggota 3",
      role: "UI/UX Designer",
      photo: "https://via.placeholder.com/150?text=Foto+3",
    },
    {
      id: 4,
      name: "Nama Anggota 4",
      role: "Game Designer",
      photo: "https://via.placeholder.com/150?text=Foto+4",
    },
    {
      id: 5,
      name: "Nama Anggota 5",
      role: "Content Creator",
      photo: "https://via.placeholder.com/150?text=Foto+5",
    },
    {
      id: 6,
      name: "Nama Anggota 6",
      role: "Quality Assurance",
      photo: "https://via.placeholder.com/150?text=Foto+6",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-black/30 bg-blend-overlay bg-cover bg-center flex flex-col items-center p-4 py-10 md:p-8">
      {/* Animasi Logo / Tombol Kembali */}
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

      {/* Kontainer Utama dengan Efek Kaca (Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-5xl border-2 border-white/50 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 drop-shadow-sm">
          Tentang Monopoli Edu
        </h1>
        <p className="text-lg text-slate-700 font-medium mb-10 max-w-2xl mx-auto">
          Monopoli Edu adalah permainan papan interaktif yang dirancang khusus
          untuk proses belajar dengan cara yang menyenangkan.
        </p>

        <hr className="border-slate-300 mb-8 w-3/4 mx-auto" />

        <h2 className="text-2xl font-bold text-indigo-700 mb-8">
          Tim Pengembang Kami
        </h2>

        {/* Grid 6 Orang Anggota */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md border border-slate-200 transition-all hover:shadow-lg"
            >
              {/* Bingkai Foto Bulat */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-indigo-200 mb-4 shadow-inner">
                <img
                  src={member.photo}
                  alt={`Foto ${member.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Anggota */}
              <h3 className="text-sm md:text-lg font-bold text-slate-800 leading-tight">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-indigo-600 font-semibold mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tombol Kembali */}
        <div className="mt-12">
          <button
            onClick={handleCancel}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-10 rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-95 text-lg"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
