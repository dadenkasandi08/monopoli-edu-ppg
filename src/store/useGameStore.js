import { create } from "zustand";
import { persist } from "zustand/middleware";

// Susunan 20 Kotak Papan Monopoli (ID 0 - 19)
// const defaultBoard = [
//   { id: 0, type: 'corner', title: '🏁 START 🏁', desc: 'Mulai dari sini', theme: 'gray', bg: 'none' },
//   { id: 1, type: 'topic', title: 'Danau Toba, Sumatera Utara', desc: 'Ambil Kartu Danau Toba', theme: 'green', bg: '/island/danauToba.png' },
//   { id: 2, type: 'topic', title: 'Jam Gadang, Sumatera Barat', desc: 'Ambil Kartu Jam Gadang', theme: 'yellow', bg: '/island/jamGadang.png' },
//   { id: 3, type: 'topic', title: 'Pulau Natuna, Kepulauan Riau', desc: 'Ambil Kartu Pulau Natuna', theme: 'sky', bg: '/island/pulauNatuna.png' },
//   { id: 4, type: 'topic', title: 'Jembatan Ampera, Sumatera Selatan', desc: 'Ambil Kartu Jembatan Ampera', theme: 'yellow-bright', bg: '/island/jembatanAmpera.png' },
//   { id: 5, type: 'topic', title: 'Candi Prambanan', desc: 'Ambil Kartu Candi Prambanan', theme: 'purple', bg: '/island/candiPrambanan.png' }, // Sudut Kanan Atas
//   { id: 6, type: 'chance', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red', bg: 'none' },
//   { id: 7, type: 'topic', title: 'Uluwatu, Bali', desc: 'Ambil Kartu Uluwatu', theme: 'sky', bg: '/island/uluwatu.png' },
//   { id: 8, type: 'topic', title: 'Desa Sade, Pulau Lombok', desc: 'Ambil Kartu Desa Sade', theme: 'pink', bg: '/island/desaSade.png' },
//   { id: 9, type: 'topic', title: 'Gunung Bromo, Jawa Timur', desc: 'Ambil Kartu Gunung Bromo', theme: 'yellow', bg: '/island/gunungBromo.png' },
//   { id: 10, type: 'corner', title: '🅿️ PARKIR BEBAS 🅿️️', desc: 'Aman dari tugas', theme: 'gray', bg: 'none' }, // Sudut Kanan Bawah
//   { id: 11, type: 'topic', title: 'Pulau Moyo, Sumbawa', desc: 'Ambil Kartu Pulau Moyo', theme: 'green', bg: '/island/pulauMoyo.png' },
//   { id: 12, type: 'topic', title: 'Labuan Bajo, NTT', desc: 'Ambil Kartu Labuan Bajo', theme: 'yellow', bg: '/island/labuanBajo.png' },
//   { id: 13, type: 'topic', title: 'Pulau Derawan, Kalimantan Timur', desc: 'Ambil Kartu Pulau Derawan', theme: 'sky', bg: '/island/pulauDerawan.png' },
//   { id: 14, type: 'topic', title: 'Monumen Khatulistiwa, Kalimantan Barat', desc: 'Ambil Kartu Monumen Khatulistiwa', theme: 'yellow-bright', bg: '/island/monumenKhatulistiwa.png' },
//   { id: 15, type: 'corner', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red', bg: 'none' }, // Sudut Kiri Bawah
//   { id: 16, type: 'topic', title: 'Tana Toraja, Sulawesi Selatan', desc: 'Ambil Kartu Tana Toraja', theme: 'yellow', bg: '/island/tanaToraja.png' },
//   { id: 17, type: 'topic', title: 'Pulau Wakatobi, Sulawesi Tenggara', desc: 'Ambil Kartu Pulau Wakatobi', theme: 'purple', bg: '/island/pulauWakatobi.png' },
//   { id: 18, type: 'topic', title: 'Raja Ampat, Papua Barat Daya', desc: 'Ambil Kartu Raja Ampat', theme: 'pink', bg: '/island/rajaAmpat.png' },
//   { id: 19, type: 'topic', title: 'Pegunungan Arfak, Papua Barat', desc: 'Ambil Kartu Pegunungan Arfak', theme: 'purple', bg: '/island/pegununganArfak.png' },
// ];
const defaultBoard = [
  {
    id: 0,
    type: "corner",
    title: "🏁 START 🏁",
    desc: "Mulai dari sini",
    theme: "gray",
    bg: "none",
  },

  {
    id: 1,
    type: "topic",
    title: "Danau Toba, Sumatera Utara",
    desc: "Ambil Kartu Danau Toba",
    theme: "green",
    bg: "/island/danauToba.png",
  },

  {
    id: 2,
    type: "topic",
    title: "Jam Gadang, Sumatera Barat",
    desc: "Ambil Kartu Jam Gadang",
    theme: "yellow",
    bg: "/island/jamGadang.png",
  },

  {
    id: 3,
    type: "topic",
    title: "Pulau Natuna, Kepulauan Riau",
    desc: "Ambil Kartu Pulau Natuna",
    theme: "sky",
    bg: "/island/pulauNatuna.png",
  },

  {
    id: 4,
    type: "topic",
    title: "Jembatan Ampera, Sumatera Selatan",
    desc: "Ambil Kartu Jembatan Ampera",
    theme: "yellow-bright",
    bg: "/island/jembatanAmpera.png",
  },

  {
    id: 5,
    type: "topic",
    title: "Candi Prambanan",
    desc: "Ambil Kartu Candi Prambanan",
    theme: "purple",
    bg: "/island/candiPrambanan.png",
  },

  // ================================================
  // MUNDUR
  // ================================================

  {
    id: 6,
    type: "chance",
    title: "🔙 Mundur 🔙",
    desc: "Kocok kembali dadu, lalu mundur sejumlah dadu.",
    theme: "red",
    bg: "none",
  },

  {
    id: 7,
    type: "topic",
    title: "Uluwatu, Bali",
    desc: "Ambil Kartu Uluwatu",
    theme: "sky",
    bg: "/island/uluwatu.png",
  },

  {
    id: 8,
    type: "topic",
    title: "Desa Sade, Pulau Lombok",
    desc: "Ambil Kartu Desa Sade",
    theme: "pink",
    bg: "/island/desaSade.png",
  },

  {
    id: 9,
    type: "topic",
    title: "Gunung Bromo, Jawa Timur",
    desc: "Ambil Kartu Gunung Bromo",
    theme: "yellow",
    bg: "/island/gunungBromo.png",
  },

  {
    id: 10,
    type: "corner",
    title: "🅿️ PARKIR BEBAS 🅿️",
    desc: "Aman dari tugas",
    theme: "gray",
    bg: "none",
  },

  {
    id: 11,
    type: "topic",
    title: "Pulau Moyo, Sumbawa",
    desc: "Ambil Kartu Pulau Moyo",
    theme: "green",
    bg: "/island/pulauMoyo.png",
  },

  {
    id: 12,
    type: "topic",
    title: "Labuan Bajo, NTT",
    desc: "Ambil Kartu Labuan Bajo",
    theme: "yellow",
    bg: "/island/labuanBajo.png",
  },

  {
    id: 13,
    type: "topic",
    title: "Pulau Derawan, Kalimantan Timur",
    desc: "Ambil Kartu Pulau Derawan",
    theme: "sky",
    bg: "/island/pulauDerawan.png",
  },

  {
    id: 14,
    type: "topic",
    title: "Monumen Khatulistiwa, Kalimantan Barat",
    desc: "Ambil Kartu Monumen Khatulistiwa",
    theme: "yellow-bright",
    bg: "/island/monumenKhatulistiwa.png",
  },

  // ================================================
  // MUNDUR
  // ================================================

  {
    id: 15,
    type: "chance",
    title: "🔙 Mundur 🔙",
    desc: "Kocok kembali dadu, lalu mundur sejumlah dadu.",
    theme: "red",
    bg: "none",
  },

  {
    id: 16,
    type: "topic",
    title: "Tana Toraja, Sulawesi Selatan",
    desc: "Ambil Kartu Tana Toraja",
    theme: "yellow",
    bg: "/island/tanaToraja.png",
  },

  {
    id: 17,
    type: "topic",
    title: "Pulau Wakatobi, Sulawesi Tenggara",
    desc: "Ambil Kartu Pulau Wakatobi",
    theme: "purple",
    bg: "/island/pulauWakatobi.png",
  },

  {
    id: 18,
    type: "topic",
    title: "Raja Ampat, Papua Barat Daya",
    desc: "Ambil Kartu Raja Ampat",
    theme: "pink",
    bg: "/island/rajaAmpat.png",
  },

  {
    id: 19,
    type: "topic",
    title: "Pegunungan Arfak, Papua Barat",
    desc: "Ambil Kartu Pegunungan Arfak",
    theme: "purple",
    bg: "/island/pegununganArfak.png",
  },
];

const playerColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
];

const defaultQuestionSets = [
  {
    id: "default-set-ct",
    name: "Soal Berpikir Komputasional (Bawaan)",
    date: new Date().toISOString(),
    questions: {
      1: [
        // Danau Toba
        "Apa yang dimaksud dengan dekomposisi dalam berpikir komputasional? Jelaskan dengan bahasamu sendiri. (Poin: 2)",
        "Kelasmu akan mengadakan kegiatan kebersihan kelas. Pecahkan kegiatan tersebut menjadi minimal 4 tugas kecil. (Poin: 2)",
        "Bersama kelompok, pecahkan kegiatan membuat presentasi di kelas menjadi beberapa bagian tugas. (Poin: 2)",
        "Bacalah dengan lantang: “Dekomposisi adalah proses memecah masalah besar menjadi bagian-bagian yang lebih kecil.” Setelah membaca, berikan satu contohnya. (Poin: 2)",
        "Sebutkan satu masalah di sekolah yang menurutmu terlalu besar jika dikerjakan sekaligus. Jelaskan bagaimana kamu akan memecahnya. (Poin: 2)",
      ],
      2: [
        // Jam Gadang
        "Apa yang dimaksud dengan pengenalan pola dalam berpikir komputasional? (Poin: 2)",
        "Lanjutkan pola berikut: 2 – 4 – 8 – 16 – ... Sebutkan dua angka berikutnya. (Poin: 2)",
        "Lanjutkan: 5 – 10 – 15 – 20 – ... Sebutkan tiga angka berikutnya. (Poin: 2)",
        "Bacalah: “Pengenalan pola adalah proses menemukan kesamaan atau pola dalam suatu masalah.” Kemudian berikan satu contoh. (Poin: 2)",
        "Setiap kali hujan deras, halaman sekolah menjadi tergenang. Pola apa yang kamu temukan? (Poin: 2)",
      ],
      3: [
        // Pulau Natuna
        "Sistem MPLS berjalan kacau karena banyak kegiatan yang bentrok. Pilihlah sub-tugas yang tepat: Menyusun jadwal harian MOS, Membeli seragam baru panitia, Membentuk koordinator tiap kelompok siswa baru, Menyiapkan materi pengenalan sekolah, Mengecat ulang gerbang sekolah, Menentukan titik kumpul dan denah lokasi.",
        "Budi mengeluh PR menumpuk di akhir pekan. Ia menguraikan sub-masalah penyebabnya: tidak ada jadwal belajar rutin, tidak mencatat deadline tugas, dan tugas dikerjakan mendadak. Budi menerapkan konsep .....",
        "Dalam data peminjaman perpustakaan, guru menemukan bahwa buku tentang teknologi paling sering dipinjam pada hari Jumat. Kemampuan menemukan kecenderungan tersebut disebut apa?",
        "Manakah situasi berikut yang termasuk contoh pengenalan pola? Siswa membawa bekal jarang jajan, Membagi tugas panitia perpisahan, Antrean kantin selalu panjang pada jam istirahat kedua, atau Nilai olahraga siswa naik setelah rutin ekskul?",
        "Saat membuat denah sekolah untuk siswa baru, hal yang perlu ditonjolkan adalah: Letak ruang kelas/kantin/toilet/gerbang, Warna cat, Nama pohon, atau Jumlah lampu?",
      ],
      4: [
        // Jembatan Ampera
        "Apa yang dimaksud dengan abstraksi dalam berpikir komputasional? (Poin: 2)",
        "Kamu ingin mencari lokasi sebuah kelas di sekolah. Informasi apa yang penting untuk kamu ketahui? (Poin: 2)",
        "Untuk membuat jadwal pelajaran digital, pilih informasi yang penting dari berikut ini: Nama guru – mata pelajaran – warna sepatu guru – jam pelajaran – ruang kelas. (Poin: 2)",
        "Bacalah dengan jelas: “Abstraksi adalah memilih informasi yang penting dan mengabaikan informasi yang tidak diperlukan.” (Poin: 2)",
        "Pilih satu masalah sehari-hari. Tentukan 3 informasi penting yang diperlukan untuk menyelesaikan masalah tersebut. (Poin: 2)",
      ],
      5: [
        // Candi Prambanan
        "Saat membuat kartu pelajar, informasi mana saja yang perlu dicantumkan: Nama siswa, NISN, Makanan favorit siswa, Foto siswa?",
        "Urutkan langkah berikut menjadi urutan upacara yang benar: Pembina upacara memberi amanat, Petugas mengibarkan bendera, Peserta menyanyikan lagu Indonesia Raya, Peserta berbaris rapi di lapangan, Upacara ditutup doa.",
        "Untuk mengeprint tugas, siswa memilih dokumen, memilih menu cetak, menentukan jumlah halaman, lalu menekan tombol print. Langkah-langkah tersebut merupakan penerapan konsep berpikir komputasional .....",
        "Koperasi siswa mengalami kerugian. Pilih 4 penyebab untuk diselidiki: Pencatatan kas tidak konsisten, Warna seragam petugas, Barang kadaluarsa tidak terjual, Harga beli naik, Jadwal piket, atau Barang hilang tanpa tercatat?",
        "Koneksi Wi-Fi lambat. Penyebabnya adalah jumlah perangkat terhubung, kapasitas bandwidth, dan router usang. Hal tersebut merupakan penerapan konsep ..... dalam berpikir komputasional.",
      ],
      6: [
        // Gunung Bromo
        "Apa yang dimaksud dengan algoritma dalam berpikir komputasional? (Poin: 2)",
        "Sebutkan langkah-langkah membuat mi instan secara berurutan. (Poin: 2)",
        "Buat algoritma sederhana untuk mengirim tugas melalui WhatsApp (Poin: 2)",
        "Bacalah: “Algoritma adalah langkah-langkah yang sistematis dan berurutan untuk menyelesaikan masalah.” Berikan satu contoh algoritma. (Poin: 2)",
        "Susun dengan benar: Buka aplikasi → Nyalakan komputer → Login → Pilih dokumen. (Poin: 2)",
      ],
      7: [
        // Uluwatu, Bali
        "Jika setiap hari hujan deras halaman sekolah tergenang air, konsep berpikir komputasional apa yang digunakan untuk menemukan hubungan tersebut?",
        "Manakah situasi berikut yang termasuk contoh pengenalan pola? Nilai kebugaran siswa ekskul basket tinggi, Kemacetan gerbang terjadi pukul 06.30–06.45, Membagi tugas panitia, atau Buku fiksi sering dipinjam menjelang akhir semester?",
        "Saat membuat aplikasi jadwal pelajaran, informasi manakah yang penting ditampilkan: Nama mata pelajaran, Jam pelajaran, Warna baju guru, atau Nama guru pengajar?",
        "Saat membuat denah evakuasi bencana yang ditempel di kelas, dua informasi penting yang wajib ada adalah titik kumpul dan jalur keluar/evakuasi terdekat. Hal ini merupakan penerapan konsep .....",
        "Urutkan prosedur menyalakan proyektor: Hubungkan kabel HDMI ke laptop, Colokkan proyektor ke stop kontak, Tekan tombol power proyektor, Atur fokus dan posisi layar.",
      ],
      8: [
        // Desa Sade
        "Kelompokmu mendapat tugas besar dengan waktu terbatas. Gunakan minimal 2 konsep berpikir komputasional untuk menyelesaikannya. (Poin: 3)",
        "Semua anggota harus menyebutkan 4 konsep utama berpikir komputasional tanpa melihat catatan. (Poin: 3)",
        "Antrean kantin sangat panjang saat istirahat. Bagaimana berpikir komputasional dapat membantu menyelesaikan masalah tersebut? (Poin: 3)",
        "Kelompokkan: Keyboard, Windows, Guru, Monitor, Microsoft Word. (Poin: 3)",
        "Satu anggota menjelaskan salah satu konsep berpikir komputasional tanpa menyebut namanya. Anggota lain harus menebaknya. (Poin: 3)",
      ],
      11: [
        // Pulau Moyo
        "Sebutkan 4 konsep utama berpikir komputasional dalam waktu 10 detik. (Poin: 2)",
        "Lempar dadu satu kali lagi. (Poin: 2)",
        "Baca dengan lantang: “Pecahkan masalah, cari pola, pilih yang penting, susun langkah.” (Poin: 2)",
        "Pilih: maju 2 langkah atau mendapatkan Rp20.000. (Poin: 2)",
        "Semua anggota menyebutkan satu konsep berpikir komputasional. Jika semuanya benar → $ 20.000 (Poin: 2)",
      ],
      12: [
        // Labuan Bajo
        "Setelah bermain, jelaskan dengan bahasamu sendiri apa itu berpikir komputasional. (Poin: 1)",
        "Konsep mana yang paling mudah kamu pahami? Mengapa? (Poin: 1)",
        "Konsep mana yang paling sulit kamu pahami? Mengapa? (Poin: 1)",
        "Bagaimana berpikir komputasional dapat membantu kamu dalam kehidupan sehari-hari? (Poin: 1)",
        "Apa manfaat kerja sama kelompok dalam permainan ini? (Poin: 1)",
      ],
      13: [
        // Pulau Derawan
        "Dalam waktu 30 detik, sebutkan minimal 3 kegiatan sehari-hari yang dapat menggunakan dekomposisi. (Poin: 2)",
        "Kelompokmu akan membuat video pembelajaran. Sebutkan minimal 4 pekerjaan yang harus dilakukan agar video selesai. (Poin: 2)",
        "“Dekomposisi berarti menghilangkan masalah yang sulit.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Pilih satu anggota kelompok. Berikan satu masalah sederhana dan minta temanmu memecahnya menjadi beberapa bagian. (Poin: 2)",
        "Buat satu contoh penggunaan dekomposisi dalam kegiatan belajar di kelas X. (Poin: 2)",
      ],
      14: [
        // Monumen Khatulistiwa
        "Setiap anggota menyebutkan satu pola yang pernah ditemukan dalam kehidupan sehari-hari. (Poin: 2)",
        "“Dengan menemukan pola, kita dapat membantu memperkirakan kejadian berikutnya.” Benar atau salah? (Poin: 2)",
        "Kamu belajar 30 menit setiap malam dan biasanya lebih siap menghadapi kuis. Pola apa yang dapat kamu lihat? (Poin: 2)",
        "Buat sebuah pola angka sederhana. Temanmu harus menebak angka berikutnya. (Poin: 2)",
        "Temukan satu pola dalam kegiatan belajar di kelas dan jelaskan manfaatnya. (Poin: 2)",
      ],
      16: [
        // Tana Toraja
        "Kamu ingin memesan makanan melalui aplikasi. Sebutkan 3 informasi penting yang diperlukan. (Poin: 2)",
        "“Abstraksi berarti menghilangkan semua informasi dari sebuah masalah.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Saat membuat peta sekolah, apakah warna rambut siswa merupakan informasi penting? Mengapa? (Poin: 2)",
        "Sebutkan 5 informasi tentang suatu kegiatan kepada temanmu. Temanmu harus memilih informasi yang paling penting. (Poin: 2)",
        "Berikan satu contoh abstraksi yang kamu gunakan ketika menggunakan HP atau komputer. (Poin: 2)",
      ],
      17: [
        // Pulau Wakatobi
        "Petugas piket membersihkan kelas mulai dari menyiapkan alat kebersihan, menyapu, menghapus papan tulis, hingga merapikan meja. Rangkaian langkah ini merupakan penerapan konsep berpikir komputasional .....",
        "Bazar OSIS sepi pengunjung. Pilih hal yang layak diselidiki: Promosi kurang gencar, Warna spanduk, Waktu pelaksanaan bertepatan hari ujian, Jumlah stan sedikit, Nama panitia, atau Harga tiket mahal?",
        "Presentasi kelompok berantakan karena pembagian tugas tidak jelas, tidak ada latihan bersama, dan ada anggota tidak hadir. Ini contoh penerapan konsep apa dalam berpikir komputasional?",
        "Manakah pernyataan yang menunjukkan pengenalan pola? Siswa bersepeda selalu datang lebih pagi, Sampah plastik terbanyak setiap Jumat, Membuat denah sekolah, atau Partisipasi lomba tinggi jika hadiah voucher makanan?",
        "Guru piket memperhatikan siswa yang membawa sepeda motor selalu datang lebih pagi dibanding yang naik angkutan umum. Guru piket menerapkan konsep .....",
      ],
      18: [
        // Raja Ampat
        "Perhatikan algoritma berikut: Masukkan bumbu → Rebus air → Masukkan mi → Sajikan. Apa kesalahannya? (Poin: 2)",
        "“Urutan langkah tidak penting dalam algoritma.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Pilih satu teman. Jelaskan langkah-langkah suatu kegiatan tanpa menyebut nama kegiatannya. Temanmu harus menebaknya. (Poin: 2)",
        "Sebutkan 4 kegiatan dalam kehidupan sehari-hari yang dapat dibuat menjadi algoritma. (Poin: 2)",
        "Buat algoritma sederhana agar kamu tidak terlambat masuk sekolah. (Poin: 2)",
      ],
      19: [
        // Pegunungan Arfak
        "Saat membuat formulir pendaftaran ekstrakurikuler baru, informasi manakah yang penting untuk diminta dari siswa: Nama lengkap, Kelas, Hewan peliharaan, atau Pilihan ekstrakurikuler?",
        "Saat membuat kartu pelajar, informasi penting yang perlu dicantumkan adalah nama, kelas, NISN, dan foto siswa. Hal ini telah menerapkan konsep berpikir komputasional .....",
        "Urutkan prosedur peminjaman buku yang benar: Siswa memilih buku, Petugas mencatat data peminjaman, Siswa menunjukkan kartu anggota, Siswa membawa buku pulang.",
        "Sebelum menggunakan komputer di lab, Sinta menekan tombol power, menunggu komputer menyala, lalu membuka aplikasi. Langkah-langkah tersebut merupakan penerapan konsep berpikir komputasional .....",
        "Acara perpisahan molor 2 jam. Pilihlah 3 penyebab masalah tersebut: MC tidak mengatur waktu, Warna dekorasi kurang menarik, Sound system bermasalah, Tamu datang awal, atau Sesi foto tidak dibatasi waktu?",
      ],
    },
  },
];

export const useGameStore = create(
  persist(
    (set) => ({
      board: defaultBoard,
      sessions: [],
      activeSessionId: null,
      questionSets: defaultQuestionSets,

      saveQuestionSet: (id, name, questions) =>
        set((state) => {
          const newSet = {
            id: id || Date.now().toString(),
            name,
            questions,
            date: new Date().toISOString(),
          };
          if (id) {
            return {
              questionSets: state.questionSets.map((q) =>
                q.id === id ? newSet : q,
              ),
            };
          }
          return { questionSets: [newSet, ...state.questionSets] };
        }),

      deleteQuestionSet: (id) =>
        set((state) => ({
          questionSets: state.questionSets.filter((q) => q.id !== id),
        })),

      createSession: (sessionName, playerNames, timerDuration = 45) =>
        set((state) => {
          const newPlayers = playerNames.map((name, index) => ({
            id: index + 1,
            name: name || `Pemain ${index + 1}`,
            position: 0,
            points: 0,
            color: playerColors[index % playerColors.length],
          }));

          const newSession = {
            id: Date.now().toString(),
            name: sessionName || "Sesi Tanpa Nama",
            date: new Date().toISOString(),
            players: newPlayers,
            turnIndex: 0,
            board: defaultBoard,
            timerDuration: Number(timerDuration) || 45,
          };

          return {
            sessions: [newSession, ...state.sessions],
            activeSessionId: newSession.id,
          };
        }),

      resumeSession: (sessionId) => set({ activeSessionId: sessionId }),

      // Tandai sesi aktif sebagai selesai tanpa menghapus riwayat atau skor.
      finishSession: () =>
        set((state) => {
          const sessionIndex = state.sessions.findIndex(
            (session) => session.id === state.activeSessionId,
          );

          if (sessionIndex === -1) return state;

          const updatedSessions = [...state.sessions];
          updatedSessions[sessionIndex] = {
            ...updatedSessions[sessionIndex],
            status: "finished",
            endedAt: new Date().toISOString(),
            date: new Date().toISOString(),
          };

          return { sessions: updatedSessions };
        }),

      // movePlayer: (steps) => set((state) => {
      //   const sessionIndex = state.sessions.findIndex(s => s.id === state.activeSessionId);
      //   if (sessionIndex === -1) return state;

      //   const session = state.sessions[sessionIndex];
      //   const currentPlayer = session.players[session.turnIndex];
      //   const newPosition = (currentPlayer.position + steps) % session.board.length;

      //   const updatedPlayers = session.players.map((p, index) =>
      //     index === session.turnIndex ? { ...p, position: newPosition } : p
      //   );

      //   const updatedSessions = [...state.sessions];
      //   updatedSessions[sessionIndex] = { ...session, players: updatedPlayers, date: new Date().toISOString() };

      //   return { sessions: updatedSessions };
      // }),

      movePlayer: (steps) =>
        set((state) => {
          const sessionIndex = state.sessions.findIndex(
            (s) => s.id === state.activeSessionId,
          );

          if (sessionIndex === -1) {
            return state;
          }

          const session = state.sessions[sessionIndex];

          const currentPlayer = session.players[session.turnIndex];

          const boardLength = session.board.length;

          // =============================================
          // NORMALISASI POSISI
          // =============================================

          const newPosition =
            (currentPlayer.position + steps + boardLength) % boardLength;

          // =============================================
          // UPDATE PEMAIN
          // =============================================

          const updatedPlayers = session.players.map((player, index) =>
            index === session.turnIndex
              ? {
                  ...player,
                  position: newPosition,
                }
              : player,
          );

          // =============================================
          // UPDATE SESSION
          // =============================================

          const updatedSessions = [...state.sessions];

          updatedSessions[sessionIndex] = {
            ...session,
            players: updatedPlayers,
            date: new Date().toISOString(),
          };

          return {
            sessions: updatedSessions,
          };
        }),

      nextTurn: () =>
        set((state) => {
          const sessionIndex = state.sessions.findIndex(
            (s) => s.id === state.activeSessionId,
          );
          if (sessionIndex === -1) return state;

          const session = state.sessions[sessionIndex];
          const updatedSessions = [...state.sessions];
          updatedSessions[sessionIndex] = {
            ...session,
            turnIndex: (session.turnIndex + 1) % session.players.length,
          };

          return { sessions: updatedSessions };
        }),

      updatePlayerPoints: (pointsToAdd) =>
        set((state) => {
          const sessionIndex = state.sessions.findIndex(
            (s) => s.id === state.activeSessionId,
          );
          if (sessionIndex === -1) return state;

          const session = state.sessions[sessionIndex];

          // Update poin pada pemain yang sedang mendapat giliran
          const updatedPlayers = session.players.map((p, index) =>
            index === session.turnIndex
              ? { ...p, points: (p.points || 0) + pointsToAdd }
              : p,
          );

          const updatedSessions = [...state.sessions];
          updatedSessions[sessionIndex] = {
            ...session,
            players: updatedPlayers,
            date: new Date().toISOString(),
          };

          return { sessions: updatedSessions };
        }),
    }),
    {
      name: "monopoli-edu-storage",
      version: 7, // Diperbarui agar memuat 20 kotak
      migrate: (persistedState, version) => {
        if (version < 7)
          return { ...persistedState, questionSets: defaultQuestionSets };
        return persistedState;
      },
    },
  ),
);
