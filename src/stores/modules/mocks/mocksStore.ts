import { defineStore } from "pinia";
import { HotelDataInterface, MocksStateInterface } from "@/interfaces";
import API from "@/config/axios";
import { LIMIT } from "@/utils";

function returnError() {
  console.log({
    status: 404,
    msg: "Erro ao buscar os dados dos hotéis:",
  });
}

export const useMocksStore = defineStore({
  id: "mocks",
  state: (): MocksStateInterface => ({
    hotels: [],
    error: "",
    isLoading: false,
    time: 1500,
    maxPagination: 1,
  }),

  actions: {
    async fetchPagination() {
      this.isLoading = true;
      try {
        const response = await API.get("/hotels");
        this.maxPagination = Math.floor(response.data.length / LIMIT);
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchHotelData(page: number) {
      this.isLoading = true;
      try {
        const response = await API.get(`/hotels?_page=${page}`);
        const hotelIds = new Set(this.hotels.map((hotel) => hotel.id));
        response.data.data.forEach((newHotel: HotelDataInterface) => {
          if (!hotelIds.has(newHotel.id)) {
            this.hotels.push(newHotel);
            hotelIds.add(newHotel.id);
          }
        });
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
      return this.hotels;
    },

    async fetchHotelByLocale(locale: string) {
      this.isLoading = true;
      try {
        const response = await API.get("/hotels");
        const hotels = response.data;
        return hotels.filter((h: HotelDataInterface) =>
          h.location.city.toLowerCase().includes(locale.toLowerCase())
        );
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBestRatingHotel() {
      this.isLoading = true;
      try {
        const response = await API.get("/hotels");
        const hotels = response.data;
        return hotels.filter((h: HotelDataInterface) => h.rating >= 5);
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchHotelById(id: number) {
      this.isLoading = true;
      try {
        const response = await API.get(`/hotels?id=${id}`);
        return response.data[0];
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },
  },
});
