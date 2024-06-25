import moment from "moment";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    adults: 1,
    children: 0,
    rooms: 1,
    checkin: moment().format("YYYY-MM-DD"),
    checkout: moment().add(1, "d").format("YYYY-MM-DD"),
    days: 0,
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
    setCheckin(value: string) {
      this.checkin = value;
    },
    setCheckout(value: string) {
      this.checkout = value;
    },
  },

  getters: {
    getAdults: (state) => state.adults,
    getChildren: (state) => state.children,
    getRooms: (state) => state.rooms,
    getCheckin: (state) => state.checkin,
    getCheckout: (state) => state.checkout,
    getDays: (state) => state.days,
  },
});
