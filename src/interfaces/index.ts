export type HoverKeys = "locale" | "checkin" | "checkout" | "guests";

export type OrderBy = "none" | "rating" | "pricePerNight" | "locale" | "name";

export type InputTypes = "text" | "email" | "tel" | "password" | "textarea";

export type CardTypes = "credit" | "debit";

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
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  cpf?: string;
  paymentMethod?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export interface BookingInterface {
  id?: string;
  idUser: string | undefined;
  idHotel: number | undefined;
  checkin: string;
  checkout: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  paymentMethod: {
    pix?: boolean;
    cardType?: "credit" | "debit";
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
  rates: number;
  totalPrice: number;
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

export interface HotelCompareInterface {
  id: number;
  name: string;
  rating: number;
  amenities: string;
  description: string;
  pricePerNight: string;
}

export interface MocksStateInterface {
  hotels: HotelDataInterface[];
  error: string;
  isLoading: boolean;
  maxPagination: number;
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

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface SnackBarInterface {
  status: number;
  msg: string;
  isOpened: boolean;
}

export interface HttpStatus {
  status: number;
  msg: string;
}
