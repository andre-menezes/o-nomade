import { defineStore } from "pinia";
import axios from "axios";

interface User {
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

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthState["user"],
    token: null as AuthState["token"],
    isLoading: false as AuthState["isLoading"],
    error: null as AuthState["error"],
  }),

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true;
      try {
        const response = await axios.post("/api/login", { email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        this.error = null;
        this.saveAuthToLocalStorage();
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Falha ao autenticar o usuário";
      } finally {
        this.isLoading = false;
      }
    },

    async register(newUser: User) {
      this.isLoading = true;
      try {
        const response = await axios.post("/api/register", newUser);
        this.token = response.data.token;
        this.user = response.data.user;
        this.error = null;
        this.saveAuthToLocalStorage();
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Falha ao cadastrar o novo usuário";
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },

    saveAuthToLocalStorage() {
      if (this.token && this.user) {
        localStorage.setItem("authToken", this.token);
        localStorage.setItem("authUser", JSON.stringify(this.user));
      }
    },

    loadAuthFromLocalStorage() {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("authUser");
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name || "",
    userEmail: (state) => state.user?.email || "",
  },
});
