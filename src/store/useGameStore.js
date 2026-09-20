import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultBoard = [
  // ... (Gunakan array defaultBoard yang persis sama dengan kode Anda sebelumnya yang berisi pulau-pulau) ...
  { id: 0, type: 'corner', title: '🏁 START 🏁', desc: 'Mulai dari sini', theme: 'gray', bg: 'none' },
  { id: 1, type: 'topic', title: 'Danau Toba, Sumatera Utara', desc: 'Ambil Kartu Danau Toba', theme: 'green', bg: '/island/danauToba.png' },
  { id: 2, type: 'topic', title: 'Jam Gadang, Sumatera Barat', desc: 'Ambil Kartu Jam Gadang', theme: 'yellow', bg: '/island/jamGadang.png' },
  { id: 3, type: 'corner', title: 'Pulau Natuna, Kepulauan Riau', desc: 'Ambil Kartu Pulau Natuna', theme: 'sky', bg: '/island/pulauNatuna.png' },
  { id: 4, type: 'topic', title: 'Jembatan Ampera, Sumatera Selatan', desc: 'Ambil Kartu Jembatan Ampera', theme: 'yellow-bright', bg: '/island/jembatanAmpera.png' },
  { id: 5, type: 'topic', title: 'Monas, DKI Jakarta', desc: 'Ambil Kartu Monas', theme: 'pink', bg: '/island/monas.png' },
  { id: 6, type: 'topic', title: 'Gedung Sate', desc: 'Ambil Kartu Gedung Sate', theme: 'green', bg: '/island/gedungSate.png' },
  { id: 7, type: 'corner', title: 'Candi Prambanan', desc: 'Ambil Kartu Candi Prambanan', theme: 'purple', bg: '/island/candiPrambanan.png' },
  { id: 8, type: 'topic', title: 'Gunung Bromo, Jawa Timur', desc: 'Ambil Kartu Gunung Bromo', theme: 'yellow', bg: '/island/gunungBromo.png' },
  { id: 9, type: 'corner', title: 'Uluwatu, Bali', desc: 'Ambil Kartu Uluwatu', theme: 'sky', bg: '/island/uluWatu.png' },
  { id: 10, type: 'corner', title: '🅿️ PARKIR BEBAS 🅿️', desc: 'Aman dari tugas', theme: 'gray', bg: 'none' },
  { id: 11, type: 'topic', title: 'Desa Sade, Pulau Lombok', desc: 'Ambil Kartu Desa Sade', theme: 'pink', bg: '/island/desaSade.png' },
  { id: 12, type: 'topic', title: 'Pulau Moyo, Sumbawa', desc: 'Ambil Kartu Pulau Moyo', theme: 'green', bg: '/island/pulauMoyo.png' },
  { id: 13, type: 'topic', title: 'Labuan Bajo, NTT', desc: 'Ambil Kartu Labuan Bajo', theme: 'yellow', bg: '/island/labuanBajo.png' },
  { id: 14, type: 'chance', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur.', theme: 'red', bg: 'none' },
  { id: 15, type: 'topic', title: 'Pulau Derawan, Kaltim', desc: 'Ambil Kartu Pulau Derawan', theme: 'sky', bg: '/island/pulauDerawan.png' },
  { id: 16, type: 'topic', title: 'Monumen Khatulistiwa, Kalbar', desc: 'Ambil Kartu Monumen Khatulistiwa', theme: 'yellow-bright', bg: '/island/monumenKhatulistiwa.png' },
  { id: 17, type: 'topic', title: 'TN. Tanjung Puting, Kalteng', desc: 'Ambil Kartu TN. Tanjung Puting', theme: 'green', bg: '/island/tnTanjungPuting.png' },
  { id: 18, type: 'topic', title: 'Tana Toraja, Sulsel', desc: 'Ambil Kartu Tana Toraja', theme: 'yellow', bg: '/island/tanaToraja.png' },
  { id: 19, type: 'corner', title: 'Pulau Wakatobi, Sultra', desc: 'Ambil Kartu Pulau Wakatobi', theme: 'purple', bg: '/island/pulauWakatobi.png' },
  { id: 20, type: 'corner', title: 'Air Terjun Moramo, Sultra', desc: 'Ambil Kartu Air Terjun Moramo', theme: 'sky', bg: '/island/airTerjunMoramo.png' },
  { id: 21, type: 'topic', title: 'Raja Ampat, Papua Barat', desc: 'Ambil Kartu Raja Ampat', theme: 'pink', bg: '/island/rajaAmpat.png' },
  { id: 22, type: 'corner', title: 'Pegunungan Arfak, Papua', desc: 'Ambil Kartu Pegunungan Arfak', theme: 'purple', bg: '/island/pegununganArfak.png' },
  { id: 23, type: 'corner', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur.', theme: 'red', bg: 'none' },
];

const playerColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];

export const useGameStore = create(
  persist(
    (set) => ({
      sessions: [], // Array untuk menyimpan riwayat permainan
      activeSessionId: null, // Sesi mana yang sedang dimainkan
      topics: [], // Array untuk menyimpan topik
      activeTopicId: null, // Topik mana yang sedang aktif

      createTopic: (topicName, questions) => set((state) => {
        const questionsList = questions.map((q, index) => ({
          id: index + 1,
          question: q.question,
        }));
        const newTopic = { id: Date.now().toString(), name: topicName, questions: questionsList };
        return {
          topics: [...state.topics, newTopic],
          activeTopicId: newTopic.id
        };
      }),

      // Aksi membuat permainan baru
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

      // Aksi melanjutkan permainan dari history
      resumeSession: (sessionId) => set({ activeSessionId: sessionId }),

      // Aksi pergerakan (diupdate hanya untuk sesi aktif)
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
      version: 4, // Reset storage otomatis agar format lama tidak bentrok dengan sistem sesi baru
      migrate: (persistedState, version) => {
        if (version < 4) return { sessions: [], activeSessionId: null };
        return persistedState;
      },
    }
  )
);