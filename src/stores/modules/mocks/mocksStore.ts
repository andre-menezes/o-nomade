import { defineStore } from "pinia";
import axios from "axios";

export interface HotelData {
  id: number;
  name: string;
  location: {
    city: string;
    state: string;
    address: string;
    country: string;
    zip_code: string;
  };
  description: string;
  image: string;
  amenities: string[];
  rating: number;
  numberOfRooms: number;
  pricePerNight: number;
  cancellationPolicy: string;
}

interface MocksState {
  hotels: HotelData[];
  error: string;
  time: number;
}

export const useMocksStore = defineStore({
  id: "mocks",
  state: (): MocksState => ({
    hotels: [],
    error: "",
    time: 1500,
  }),
  actions: {
    async fetchHotelData(this: { hotels: HotelData[]; error: string }) {
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
      (id: number): HotelData | undefined => {
        try {
          const hotel = state.hotels.find((hotel) => hotel.id === id);
          return hotel;
        } catch (error) {
          throw new Error(`Erro ao buscar hotel com ID ${id}`);
        }
      },

    getHotelsByLocale:
      (state) =>
      (locale: string): HotelData[] => {
        try {
          const hotels = state.hotels.filter(
            (hotel) =>
              hotel.location.city.toLowerCase() === locale.toLowerCase()
          );
          return hotels;
        } catch (error) {
          throw new Error(`Erro ao buscar hotéis em ${locale}`);
        }
      },

    getBestRatingHotels: (state) => (): HotelData[] => {
      try {
        const bestRating = state.hotels
          .sort((a, b) => b.rating - a.rating)
          .filter((hotel) => hotel.rating === 5);
        return bestRating;
      } catch (error) {
        throw new Error("Erro ao buscar os hotéis mais bem avaliados");
      }
    },
    getAllHotel: (state) => (): HotelData[] => {
      try {
        return state.hotels;
      } catch (error) {
        throw new Error("Erro ao buscar todos os hotéis");
      }
    },
  },
});
