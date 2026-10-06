import { motion } from "framer-motion";
import imgHistory from "../assets/history_button.png";
import imgPetunjuk from "../assets/petunjuk_permainan_button.png";
import imgStart from "../assets/new_game2.png";
import imgLogo from "../assets/logo.png";
import imgAbout from "../assets/tentang_kami_button.png";
import imgBankSoal from "../assets/bank_soal_button.png";
import { useNavigate } from "react-router-dom";

function HomePage({ onNavigate }) {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    onNavigate(page);
    navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/background.jpg')] bg-black/30 bg-blend-overlay bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4">
      {/* Judul Halaman */}
      <div className="text-center mb-12">
        <motion.button
          animate={{ scale: [1.3, 1.4, 1.3] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="drop-shadow-md hover:drop-shadow-xl"
          onClick={() => handleNavigate("/")}
        >
          <img src={imgLogo} alt="Logo" className="w-48 md:w-56 h-auto" />
        </motion.button>
      </div>

      {/* Container untuk 5 Tombol Gambar - Gap diperlebar agar tidak saling bertabrakan */}
      <div className="flex flex-col items-center w-full max-w-7xl">
        {/* Baris 1: History & Manual (2 Tombol) */}
        <div className="flex justify-between gap-10 w-full">
          <motion.button
            animate={{ scale: [1.3, 1.4, 1.3] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.3 }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={() => handleNavigate("history")}
          >
            {/* Diperbesar menjadi w-48 (HP) dan md:w-56 (Laptop) */}
            <img
              src={imgHistory}
              alt="History"
              className="w-48 md:w-56 h-auto"
            />
          </motion.button>

          <motion.button
            animate={{ scale: [1.3, 1.4, 1.3] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.3 }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={() => handleNavigate("manual")}
          >
            <img
              src={imgPetunjuk}
              alt="Petunjuk"
              className="w-48 md:w-56 h-auto"
            />
          </motion.button>
        </div>

        {/* Baris 2: New Game (Tombol Tengah dengan Efek Detak Jantung) */}
        <div className="flex justify-center w-full z-10">
          <motion.button
            animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.5 }}
            className="drop-shadow-xl hover:drop-shadow-2xl"
            onClick={() => handleNavigate("start")}
          >
            {/* Tombol Utama jauh diperbesar menjadi w-64 (HP) dan md:w-80 (Laptop) */}
            <img
              src={imgStart}
              alt="New Game"
              className="w-96 md:w-80 h-auto"
            />
          </motion.button>
        </div>

        {/* Baris 3: About & Daftar Soal (2 Tombol) */}
        <div className="flex justify-between gap-10 w-full">
          <motion.button
            animate={{ scale: [1.3, 1.4, 1.3] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.3 }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={() => handleNavigate("about")}
          >
            {/* Diperbesar menjadi w-48 (HP) dan md:w-56 (Laptop) */}
            <img src={imgAbout} alt="About" className="w-48 md:w-56 h-auto" />
          </motion.button>

          <motion.button
            animate={{ scale: [1.3, 1.4, 1.3] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.3 }}
            className="drop-shadow-md hover:drop-shadow-xl"
            onClick={() => handleNavigate("bank-soal")}
          >
            <img
              src={imgBankSoal}
              alt="Bank soal"
              className="w-48 md:w-56 h-auto"
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
