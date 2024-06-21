export type HoverKeys = "locale" | "checkin" | "checkout" | "guests";

export type OrderBy = "rating" | "pricePerNight" | "locale" | "name";

export interface MenuInterface {
  name: string;
  icon: string;
  path: string;
  active: boolean;
}

export interface DatePickerInterface {
  role: string;
  value: string;
}

export interface GuestsInterface {
  adults: number;
  children: number;
  rooms: number;
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  cpf: string;
  paymentMethod?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export interface AuthStateInterface {
  user: UserInterface | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface HotelDataInterface {
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

export interface MocksStateInterface {
  hotels: HotelDataInterface[];
  error: string;
  time: number;
}

export interface SearchParamsInterface {
  locale: string;
  checkin: string;
  checkout: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
}
