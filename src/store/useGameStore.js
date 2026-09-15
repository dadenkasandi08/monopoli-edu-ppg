import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultBoard = [
  { id: 0, type: 'corner', title: '🏁 START 🏁', desc: 'Mulai dari sini', theme: 'gray' },
  
  { id: 1, type: 'topic', title: '🧩 Dekomposisi 1 🧩', desc: 'Ambil Kartu Dekomposisi', theme: 'green' },
  { id: 2, type: 'topic', title: '🔍 Pola 1 🔍', desc: 'Ambil Kartu Pengenalan Pola', theme: 'yellow' },
  { id: 3, type: 'corner', title: '📋 Algoritma 1 📋', desc: 'Ambil Kartu Algoritma', theme: 'sky' },
  { id: 4, type: 'topic', title: '⭐ BONUS 1 ⭐', desc: 'Ambil Kartu Bonus atau dapatkan 10 poin', theme: 'yellow-bright' },
  { id: 5, type: 'topic', title: '🎯 Abstraksi 1 🎯', desc: 'Ambil Kartu Abstraksi', theme: 'pink' },
  { id: 6, type: 'topic', title: '🧩 Dekomposisi 2 🧩', desc: 'Ambil Kartu Dekomposisi', theme: 'green' },
  { id: 7, type: 'corner', title: '⚡ Tantangan 1 ⚡', desc: 'Tantangan acak CT', theme: 'purple' },

  { id: 8, type: 'topic', title: '🔍 Pola 2 🔍', desc: 'Ambil Kartu Pengenalan Pola', theme: 'yellow' },
  { id: 9, type: 'corner', title: '📋 Algoritma 2 📋', desc: 'Ambil Kartu Algoritma', theme: 'sky' },
  { id: 10, type: 'corner', title: '🅿️ PARKIR BEBAS 🅿️', desc: 'Aman dari tugas', theme: 'gray' },
  { id: 11, type: 'topic', title: '🎯 Abstraksi 2 🎯', desc: 'Ambil Kartu Abstraksi', theme: 'pink' },
  { id: 12, type: 'topic', title: '🧩 Dekomposisi 3 🧩', desc: 'Ambil Kartu Dekomposisi', theme: 'green' },

  { id: 13, type: 'topic', title: '🔍 Pola 3 🔍', desc: 'Ambil Kartu Pengenalan Pola', theme: 'yellow' },
  { id: 14, type: 'chance', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red' },
  { id: 15, type: 'topic', title: '📋 Algoritma 3 📋', desc: 'Ambil Kartu Algoritma', theme: 'sky' },
  { id: 16, type: 'topic', title: '⭐ BONUS 2 ⭐', desc: 'Ambil Kartu Bonus atau dapatkan 10 poin', theme: 'yellow-bright' },
  { id: 17, type: 'topic', title: '🧩 Dekomposisi 4 🧩', desc: 'Ambil Kartu Dekomposisi', theme: 'green' },
  { id: 18, type: 'topic', title: '🔍 Pola 4 🔍', desc: 'Ambil Kartu Pengenalan Pola', theme: 'yellow' },

  { id: 19, type: 'corner', title: '⚡ Tantangan 2 ⚡', desc: 'Tantangan acak CT', theme: 'purple' },
  { id: 20, type: 'corner', title: '📋 Algoritma 4 📋', desc: 'Ambil Kartu Algoritma', theme: 'sky' },
  { id: 21, type: 'topic', title: '🎯 Abstraksi 3 🎯', desc: 'Ambil Kartu Abstraksi', theme: 'pink' },
  { id: 22, type: 'corner', title: '💭 Refleksi 💭', desc: 'Ambil kartu refleksi', theme: 'purple' },
  { id: 23, type: 'corner', title: '🔙 Mundur 🔙', desc: 'Kocok kembali dadu, lalu mundur sejumlah dadu.', theme: 'red' },
];

export const useGameStore = create(
  persist(
    (set) => ({
      players: [
        { id: 1, name: 'Pemain 1', position: 0, color: 'bg-red-500' },
        { id: 2, name: 'Pemain 2', position: 0, color: 'bg-blue-500' },
      ],
      turnIndex: 0,
      board: defaultBoard,

      addPlayer: (name, color) => set((state) => ({
        players: [...state.players, { id: Date.now(), name, position: 0, color }]
      })),
      
      updateBoardBlock: (id, newTitle, newDesc) => set((state) => ({
        board: state.board.map(block => 
          block.id === id ? { ...block, title: newTitle, desc: newDesc } : block
        )
      })),

      movePlayer: (steps) => set((state) => {
        const currentPlayer = state.players[state.turnIndex];
        const newPosition = (currentPlayer.position + steps) % state.board.length;
        const updatedPlayers = state.players.map((p, index) => 
          index === state.turnIndex ? { ...p, position: newPosition } : p
        );
        return { players: updatedPlayers };
      }),

      nextTurn: () => set((state) => ({
        turnIndex: (state.turnIndex + 1) % state.players.length
      }))
    }),
    { name: 'monopoli-edu-storage' }
  )
);