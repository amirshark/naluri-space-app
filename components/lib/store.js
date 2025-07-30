import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { API_BASE } from '@env';

export const usePiStore = create(persist(
  (set) => ({
    pi: 3,
    accuracy: 0,
    isRunning: false,

    fetchPi: async () => {
      try {
        const res = await fetch(`${API_BASE}/pi`);
        const data = await res.json();
        set({ pi: data.pi, accuracy: data.accuracy });
      } catch (err) {
        console.error('Failed to fetch Pi:', err);
      }
    },

    start: async () => {
      await fetch(`${API_BASE}/start`, { method: 'POST' });
      set({ isRunning: true });
    },

    pause: async () => {
      await fetch(`${API_BASE}/pause`, { method: 'POST' });
      set({ isRunning: false });
    },

    reset: async () => {
      await fetch(`${API_BASE}/reset`, { method: 'POST' });
      set({ pi: 3, accuracy: 0, isRunning: false });
    }
  }),
  {
    name: 'pi-storage',
    storage: AsyncStorage
  }
));
