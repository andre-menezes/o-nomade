import { defineStore } from "pinia";
import axios from "axios";
import { HotelDataInterface, MocksStateInterface } from "@/interfaces";

export const useMocksStore = defineStore({
  id: "mocks",
  state: (): MocksStateInterface => ({
    hotels: [],
    error: "",
    time: 1500,
  }),
  actions: {
    async fetchHotelData(this: {
      hotels: HotelDataInterface[];
      error: string;
    }) {
      try {
        const cachedHotels = localStorage.getItem("hotels");
        if (cachedHotels) {
          this.hotels = JSON.parse(cachedHotels);
        } else {
          const response = await axios.get("/hotels.json");
          this.hotels = response.data;
          localStorage.setItem("hotels", JSON.stringify(this.hotels));
        }
      } catch (error) {
        this.error = "Erro ao buscar os dados dos hotéis";
      }
    },
  },
  getters: {
    getHotelById:
      (state) =>
      (id: number): HotelDataInterface | undefined => {
        try {
          const hotel = state.hotels.find(
            (hotel: HotelDataInterface) => hotel.id === id
          );
          return hotel;
        } catch (error) {
          throw new Error(`Erro ao buscar hotel com ID ${id}`);
        }
      },

    getHotelsByLocale:
      (state) =>
      (locale: string): HotelDataInterface[] => {
        try {
          const hotels = state.hotels.filter(
            (hotel: HotelDataInterface) =>
              hotel.location.city.toLowerCase() === locale.toLowerCase()
          );
          return hotels;
        } catch (error) {
          throw new Error(`Erro ao buscar hotéis em ${locale}`);
        }
      },

    getBestRatingHotels: (state) => (): HotelDataInterface[] => {
      try {
        const bestRating = state.hotels
          .sort((a, b) => b.rating - a.rating)
          .filter((hotel: HotelDataInterface) => hotel.rating === 5);
        return bestRating;
      } catch (error) {
        throw new Error("Erro ao buscar os hotéis mais bem avaliados");
      }
    },
    getAllHotel: (state) => (): HotelDataInterface[] => {
      try {
        return state.hotels;
      } catch (error) {
        throw new Error("Erro ao buscar todos os hotéis");
      }
    },
  },
});
