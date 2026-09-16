import { motion } from "framer-motion";
import imgHistory from "../assets/history.png";
import imgPetunjuk from "../assets/petunjuk.png";
import imgStart from "../assets/start.png";
import imgAbout from "../assets/about.png";
import imgBankSoal from "../assets/bank_soal.png";

function HomePage() {
  return (
    <div className="min-h-screen bg-[url('/src/assets/background.png')] bg-black/20 bg-blend-overlay bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4">
      {/* Judul Halaman */}
      <div className="text-center mb-12">
        <h1 className="text-7xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4">
          Monopoli Edu
        </h1>
      </div>

      {/* Container untuk 5 Tombol Gambar - Gap diperlebar agar tidak saling bertabrakan */}
      <div className="flex flex-col items-center w-full max-w-7xl">
        {/* Baris 1: History & Manual (2 Tombol) */}
        <div className="flex justify-between gap-10 w-full">
          <motion.button
            animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.6 }}
            className="drop-shadow-md hover:drop-shadow-xl"
          >
            {/* Diperbesar menjadi w-48 (HP) dan md:w-56 (Laptop) */}
            <img
              src={imgHistory}
              alt="History"
              className="w-48 md:w-56 h-auto"
            />
          </motion.button>

          <motion.button
            animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.6 }}
            className="drop-shadow-md hover:drop-shadow-xl"
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
            animate={{ scale: [2, 2.2, 2] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 2.2 }}
            whileTap={{ scale: 1.95 }}
            className="drop-shadow-xl hover:drop-shadow-2xl"
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
            animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.6 }}
            className="drop-shadow-md hover:drop-shadow-xl"
          >
            {/* Diperbesar menjadi w-48 (HP) dan md:w-56 (Laptop) */}
            <img src={imgAbout} alt="About" className="w-48 md:w-56 h-auto" />
          </motion.button>

          <motion.button
            animate={{ scale: [1.5, 1.6, 1.5] }} // Skala detak disesuaikan sedikit karena tombolnya sudah besar
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.6 }}
            className="drop-shadow-md hover:drop-shadow-xl"
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
