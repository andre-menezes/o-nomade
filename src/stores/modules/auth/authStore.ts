import axios from "axios";
import { defineStore } from "pinia";
import { AuthStateInterface, UserDTO, UserInterface } from "@/interfaces";
import md5 from "md5";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthStateInterface["user"],
    isLoading: false as AuthStateInterface["isLoading"],
    error: null as AuthStateInterface["error"],
    isAuthenticated: false,
  }),

  actions: {
    async register(
      user: UserInterface
    ): Promise<{ status: string; msg: string }> {
      const usersFromLocalStorage = localStorage.getItem("users");
      let users: UserDTO[] = [];

      if (usersFromLocalStorage !== null) {
        users = JSON.parse(usersFromLocalStorage) as UserDTO[];
      }

      if (users.length && users.find((u: UserDTO) => u.email === user.email))
        return { status: "error", msg: "Usuário inválido" };

      const lastId = users.length ? users[users.length - 1].id : 1;

      const newUser: UserDTO = {
        id: lastId,
        email: user.email,
        password: md5(user.password),
      };

      const token = md5(JSON.stringify(user));

      const userAuthenticated = { ...newUser, token };
      users.push(userAuthenticated);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(
        "userAuthenticated",
        JSON.stringify(userAuthenticated)
      );

      return { status: "success", msg: "Usuário cadastrado com sucesso" };
    },

    loadAuthFromLocalStorage() {
      const userAuthenticated = localStorage.getItem("userAuthenticated");
      console.log("user authenticated", userAuthenticated);
      this.isAuthenticated = !!userAuthenticated;
    },

    // async login(email: string, password: string) {
    //   this.isLoading = true;
    //   try {
    //     const response = await axios.post("/api/login", { email, password });
    //     this.user = response.data.user;
    //     this.error = null;
    //     this.saveAuthToLocalStorage();
    //   } catch (err: any) {
    //     this.error =
    //       err.response?.data?.message || "Falha ao autenticar o usuário";
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    // loadAuthFromLocalStorage() {
    //   return true;
    // },

    // logout() {
    //   this.user = null;
    // },
  },

  getters: {
    userName: (state) => state.user?.name || "",
    userEmail: (state) => state.user?.email || "",
  },
});
