import axios from "axios";
import { defineStore } from "pinia";
import { AuthStateInterface, UserInterface } from "@/interfaces";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthStateInterface["user"],
    token: null as AuthStateInterface["token"],
    isLoading: false as AuthStateInterface["isLoading"],
    error: null as AuthStateInterface["error"],
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

    async register(newUser: UserInterface) {
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
