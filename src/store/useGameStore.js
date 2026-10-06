import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Susunan 20 Kotak Papan Monopoli (ID 0 - 19)
const defaultBoard = [
  { id: 0, type: 'corner', title: '🏁 START 🏁', desc: 'Mulai dari sini', theme: 'gray', bg: 'none' },
  { id: 1, type: 'topic', title: 'Danau Toba, Sumatera Utara', desc: 'Ambil Kartu Danau Toba', theme: 'green', bg: '/island/danauToba.png' },
  { id: 2, type: 'topic', title: 'Jam Gadang, Sumatera Barat', desc: 'Ambil Kartu Jam Gadang', theme: 'yellow', bg: '/island/jamGadang.png' },
  { id: 3, type: 'corner', title: 'Pulau Natuna, Kepulauan Riau', desc: 'Ambil Kartu Pulau Natuna', theme: 'sky', bg: '/island/pulauNatuna.png' },
  { id: 4, type: 'topic', title: 'Jembatan Ampera, Sumatera Selatan', desc: 'Ambil Kartu Jembatan Ampera', theme: 'yellow-bright', bg: '/island/jembatanAmpera.png' },
  { id: 5, type: 'corner', title: 'Candi Prambanan', desc: 'Ambil Kartu Candi Prambanan', theme: 'purple', bg: '/island/candiPrambanan.png' }, // Sudut Kanan Atas
  { id: 6, type: 'topic', title: 'Gunung Bromo, Jawa Timur', desc: 'Ambil Kartu Gunung Bromo', theme: 'yellow', bg: '/island/gunungBromo.png' },
  { id: 7, type: 'corner', title: 'Uluwatu, Bali', desc: 'Ambil Kartu Uluwatu', theme: 'sky', bg: '/island/uluwatu.png' },
  { id: 8, type: 'topic', title: 'Desa Sade, Pulau Lombok', desc: 'Ambil Kartu Desa Sade', theme: 'pink', bg: '/island/desaSade.png' },
  { id: 9, type: 'chance', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red', bg: 'none' },
  { id: 10, type: 'corner', title: '🅿️ PARKIR BEBAS 🅿️', desc: 'Aman dari tugas', theme: 'gray', bg: 'none' }, // Sudut Kanan Bawah
  { id: 11, type: 'topic', title: 'Pulau Moyo, Sumbawa', desc: 'Ambil Kartu Pulau Moyo', theme: 'green', bg: '/island/pulauMoyo.png' },
  { id: 12, type: 'topic', title: 'Labuan Bajo, NTT', desc: 'Ambil Kartu Labuan Bajo', theme: 'yellow', bg: '/island/labuanBajo.png' },
  { id: 13, type: 'topic', title: 'Pulau Derawan, Kalimantan Timur', desc: 'Ambil Kartu Pulau Derawan', theme: 'sky', bg: '/island/pulauDerawan.png' },
  { id: 14, type: 'topic', title: 'Monumen Khatulistiwa, Kalimantan Barat', desc: 'Ambil Kartu Monumen Khatulistiwa', theme: 'yellow-bright', bg: '/island/monumenKhatulistiwa.png' },
  { id: 15, type: 'corner', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red', bg: 'none' }, // Sudut Kiri Bawah
  { id: 16, type: 'topic', title: 'Tana Toraja, Sulawesi Selatan', desc: 'Ambil Kartu Tana Toraja', theme: 'yellow', bg: '/island/tanaToraja.png' },
  { id: 17, type: 'corner', title: 'Pulau Wakatobi, Sulawesi Tenggara', desc: 'Ambil Kartu Pulau Wakatobi', theme: 'purple', bg: '/island/pulauWakatobi.png' },
  { id: 18, type: 'topic', title: 'Raja Ampat, Papua Barat Daya', desc: 'Ambil Kartu Raja Ampat', theme: 'pink', bg: '/island/rajaAmpat.png' },
  { id: 19, type: 'corner', title: 'Pegunungan Arfak, Papua Barat', desc: 'Ambil Kartu Pegunungan Arfak', theme: 'purple', bg: '/island/pegununganArfak.png' },
];

const playerColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];

const defaultQuestionSets = [
  {
    id: 'default-set-ct',
    name: 'Soal Berpikir Komputasional (Bawaan)',
    date: new Date().toISOString(),
    questions: {
      1: [ // Danau Toba
        "Apa yang dimaksud dengan dekomposisi dalam berpikir komputasional? Jelaskan dengan bahasamu sendiri. (Poin: 2)",
        "Kelasmu akan mengadakan kegiatan kebersihan kelas. Pecahkan kegiatan tersebut menjadi minimal 4 tugas kecil. (Poin: 2)",
        "Bersama kelompok, pecahkan kegiatan membuat presentasi di kelas menjadi beberapa bagian tugas. (Poin: 2)",
        "Bacalah dengan lantang: “Dekomposisi adalah proses memecah masalah besar menjadi bagian-bagian yang lebih kecil.” Setelah membaca, berikan satu contohnya. (Poin: 2)",
        "Sebutkan satu masalah di sekolah yang menurutmu terlalu besar jika dikerjakan sekaligus. Jelaskan bagaimana kamu akan memecahnya. (Poin: 2)"
      ],
      2: [ // Jam Gadang
        "Apa yang dimaksud dengan pengenalan pola dalam berpikir komputasional? (Poin: 2)",
        "Lanjutkan pola berikut: 2 – 4 – 8 – 16 – ... Sebutkan dua angka berikutnya. (Poin: 2)",
        "Lanjutkan: 5 – 10 – 15 – 20 – ... Sebutkan tiga angka berikutnya. (Poin: 2)",
        "Bacalah: “Pengenalan pola adalah proses menemukan kesamaan atau pola dalam suatu masalah.” Kemudian berikan satu contoh. (Poin: 2)",
        "Setiap kali hujan deras, halaman sekolah menjadi tergenang. Pola apa yang kamu temukan? (Poin: 2)"
      ],
      4: [ // Jembatan Ampera
        "Apa yang dimaksud dengan abstraksi dalam berpikir komputasional? (Poin: 2)",
        "Kamu ingin mencari lokasi sebuah kelas di sekolah. Informasi apa yang penting untuk kamu ketahui? (Poin: 2)",
        "Untuk membuat jadwal pelajaran digital, pilih informasi yang penting dari berikut ini: Nama guru – mata pelajaran – warna sepatu guru – jam pelajaran – ruang kelas. (Poin: 2)",
        "Bacalah dengan jelas: “Abstraksi adalah memilih informasi yang penting dan mengabaikan informasi yang tidak diperlukan.” (Poin: 2)",
        "Pilih satu masalah sehari-hari. Tentukan 3 informasi penting yang diperlukan untuk menyelesaikan masalah tersebut. (Poin: 2)"
      ],
      6: [ // Gunung Bromo
        "Apa yang dimaksud dengan algoritma dalam berpikir komputasional? (Poin: 2)",
        "Sebutkan langkah-langkah membuat mi instan secara berurutan. (Poin: 2)",
        "Buat algoritma sederhana untuk mengirim tugas melalui WhatsApp (Poin: 2)",
        "Bacalah: “Algoritma adalah langkah-langkah yang sistematis dan berurutan untuk menyelesaikan masalah.” Berikan satu contoh algoritma. (Poin: 2)",
        "Susun dengan benar: Buka aplikasi → Nyalakan komputer → Login → Pilih dokumen. (Poin: 2)"
      ],
      8: [ // Desa Sade
        "Kelompokmu mendapat tugas besar dengan waktu terbatas. Gunakan minimal 2 konsep berpikir komputasional untuk menyelesaikannya. (Poin: 3)",
        "Semua anggota harus menyebutkan 4 konsep utama berpikir komputasional tanpa melihat catatan. (Poin: 3)",
        "Antrean kantin sangat panjang saat istirahat. Bagaimana berpikir komputasional dapat membantu menyelesaikan masalah tersebut? (Poin: 3)",
        "Kelompokkan: Keyboard, Windows, Guru, Monitor, Microsoft Word. (Poin: 3)",
        "Satu anggota menjelaskan salah satu konsep berpikir komputasional tanpa menyebut namanya. Anggota lain harus menebaknya. (Poin: 3)"
      ],
      11: [ // Pulau Moyo
        "Sebutkan 4 konsep utama berpikir komputasional dalam waktu 10 detik. (Poin: 2)",
        "Lempar dadu satu kali lagi. (Poin: 2)",
        "Baca dengan lantang: “Pecahkan masalah, cari pola, pilih yang penting, susun langkah.” (Poin: 2)",
        "Pilih: maju 2 langkah atau mendapatkan Rp20.000. (Poin: 2)",
        "Semua anggota menyebutkan satu konsep berpikir komputasional. Jika semuanya benar → $ 20.000 (Poin: 2)"
      ],
      12: [ // Labuan Bajo
        "Setelah bermain, jelaskan dengan bahasamu sendiri apa itu berpikir komputasional. (Poin: 1)",
        "Konsep mana yang paling mudah kamu pahami? Mengapa? (Poin: 1)",
        "Konsep mana yang paling sulit kamu pahami? Mengapa? (Poin: 1)",
        "Bagaimana berpikir komputasional dapat membantu kamu dalam kehidupan sehari-hari? (Poin: 1)",
        "Apa manfaat kerja sama kelompok dalam permainan ini? (Poin: 1)"
      ],
      13: [ // Pulau Derawan
        "Dalam waktu 30 detik, sebutkan minimal 3 kegiatan sehari-hari yang dapat menggunakan dekomposisi. (Poin: 2)",
        "Kelompokmu akan membuat video pembelajaran. Sebutkan minimal 4 pekerjaan yang harus dilakukan agar video selesai. (Poin: 2)",
        "“Dekomposisi berarti menghilangkan masalah yang sulit.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Pilih satu anggota kelompok. Berikan satu masalah sederhana dan minta temanmu memecahnya menjadi beberapa bagian. (Poin: 2)",
        "Buat satu contoh penggunaan dekomposisi dalam kegiatan belajar di kelas X. (Poin: 2)"
      ],
      14: [ // Monumen Khatulistiwa
        "Setiap anggota menyebutkan satu pola yang pernah ditemukan dalam kehidupan sehari-hari. (Poin: 2)",
        "“Dengan menemukan pola, kita dapat membantu memperkirakan kejadian berikutnya.” Benar atau salah? (Poin: 2)",
        "Kamu belajar 30 menit setiap malam dan biasanya lebih siap menghadapi kuis. Pola apa yang dapat kamu lihat? (Poin: 2)",
        "Buat sebuah pola angka sederhana. Temanmu harus menebak angka berikutnya. (Poin: 2)",
        "Temukan satu pola dalam kegiatan belajar di kelas dan jelaskan manfaatnya. (Poin: 2)"
      ],
      16: [ // Tana Toraja
        "Kamu ingin memesan makanan melalui aplikasi. Sebutkan 3 informasi penting yang diperlukan. (Poin: 2)",
        "“Abstraksi berarti menghilangkan semua informasi dari sebuah masalah.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Saat membuat peta sekolah, apakah warna rambut siswa merupakan informasi penting? Mengapa? (Poin: 2)",
        "Sebutkan 5 informasi tentang suatu kegiatan kepada temanmu. Temanmu harus memilih informasi yang paling penting. (Poin: 2)",
        "Berikan satu contoh abstraksi yang kamu gunakan ketika menggunakan HP atau komputer. (Poin: 2)"
      ],
      18: [ // Raja Ampat
        "Perhatikan algoritma berikut: Masukkan bumbu → Rebus air → Masukkan mi → Sajikan. Apa kesalahannya? (Poin: 2)",
        "“Urutan langkah tidak penting dalam algoritma.” Benar atau salah? Jelaskan. (Poin: 2)",
        "Pilih satu teman. Jelaskan langkah-langkah suatu kegiatan tanpa menyebut nama kegiatannya. Temanmu harus menebaknya. (Poin: 2)",
        "Sebutkan 4 kegiatan dalam kehidupan sehari-hari yang dapat dibuat menjadi algoritma. (Poin: 2)",
        "Buat algoritma sederhana agar kamu tidak terlambat masuk sekolah. (Poin: 2)"
      ]
    }
  }
];

export const useGameStore = create(
  persist(
    (set) => ({
      sessions: [], 
      activeSessionId: null, 
      questionSets: defaultQuestionSets, 

      saveQuestionSet: (id, name, questions) => set((state) => {
        const newSet = { id: id || Date.now().toString(), name, questions, date: new Date().toISOString() };
        if (id) {
          return { questionSets: state.questionSets.map(q => q.id === id ? newSet : q) };
        }
        return { questionSets: [newSet, ...state.questionSets] };
      }),

      deleteQuestionSet: (id) => set((state) => ({
        questionSets: state.questionSets.filter(q => q.id !== id)
      })),

      createSession: (sessionName, playerNames) => set((state) => {
        const newPlayers = playerNames.map((name, index) => ({
          id: index + 1,
          name: name || `Pemain ${index + 1}`,
          position: 0,
          points: 0,
          color: playerColors[index % playerColors.length]
        }));
        
        const newSession = {
          id: Date.now().toString(),
          name: sessionName || 'Sesi Tanpa Nama',
          date: new Date().toISOString(),
          players: newPlayers,
          turnIndex: 0,
          board: defaultBoard,
        };

        return {
          sessions: [newSession, ...state.sessions],
          activeSessionId: newSession.id
        };
      }),

      resumeSession: (sessionId) => set({ activeSessionId: sessionId }),

      movePlayer: (steps) => set((state) => {
        const sessionIndex = state.sessions.findIndex(s => s.id === state.activeSessionId);
        if (sessionIndex === -1) return state;

        const session = state.sessions[sessionIndex];
        const currentPlayer = session.players[session.turnIndex];
        const newPosition = (currentPlayer.position + steps) % session.board.length;
        
        const updatedPlayers = session.players.map((p, index) => 
          index === session.turnIndex ? { ...p, position: newPosition } : p
        );

        const updatedSessions = [...state.sessions];
        updatedSessions[sessionIndex] = { ...session, players: updatedPlayers, date: new Date().toISOString() };

        return { sessions: updatedSessions };
      }),

      nextTurn: () => set((state) => {
        const sessionIndex = state.sessions.findIndex(s => s.id === state.activeSessionId);
        if (sessionIndex === -1) return state;

        const session = state.sessions[sessionIndex];
        const updatedSessions = [...state.sessions];
        updatedSessions[sessionIndex] = { 
          ...session, 
          turnIndex: (session.turnIndex + 1) % session.players.length 
        };

        return { sessions: updatedSessions };
      }),
    }),
    { 
      name: 'monopoli-edu-storage',
      version: 7, // Diperbarui agar memuat 20 kotak
      migrate: (persistedState, version) => {
        if (version < 7) return { ...persistedState, questionSets: defaultQuestionSets };
        return persistedState;
      },
    }
  )
);