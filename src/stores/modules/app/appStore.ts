import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    adults: 1,
    children: 0,
    rooms: 1,
  }),

  actions: {
    increaseAdults() {
      this.adults++;
    },
    increaseChildren() {
      this.children++;
    },
    increaseRooms() {
      this.rooms++;
    },
    decreaseAdults() {
      this.adults--;
    },
    decreaseChildren() {
      this.children--;
    },
    decreaseRooms() {
      this.rooms--;
    },
  },

  getters: {
    getAdults: (state) => {
      return state.adults;
    },
    getChildren: (state) => {
      return state.children;
    },
    getRooms: (state) => {
      return state.rooms;
    },
  },
});
