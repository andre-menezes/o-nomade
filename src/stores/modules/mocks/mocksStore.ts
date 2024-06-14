import { defineStore } from "pinia";
import axios from "axios";

interface HotelData {
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
  amenities: string[];
  rating: number;
  number_of_rooms: number;
  price_per_night: number;
  cancellation_policy: string;
}

export const useMocksStore = defineStore("mocks", {
  state: () => ({
    hotels: [] as HotelData[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchHotelData() {
      this.loading = true;
      this.error = null;
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
      } finally {
        this.loading = false;
      }
    },
    getHotelDataById(id: number) {
      try {
        const hotel = this.hotels.find((hotel) => hotel.id === id);
        return Promise.resolve(hotel);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getHotelsByCity(city: string) {
      try {
        const hotels = this.hotels.filter(
          (hotel) => hotel.location.city.toLowerCase() === city.toLowerCase()
        );
        return Promise.resolve(hotels);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getHotelsByName(name: string) {
      try {
        const hotels = this.hotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(name.toLowerCase())
        );
        return Promise.resolve(hotels);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getHotelsByAmenities(amenities: string[]) {
      try {
        const hotels = this.hotels.filter((hotel) =>
          amenities.every((amenity) => hotel.amenities.includes(amenity))
        );
        return Promise.resolve(hotels);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export default useMocksStore;
