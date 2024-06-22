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
    register(user: UserInterface): { status: string; msg: string } {
      const usersFromLocalStorage = localStorage.getItem("users");
      let users: UserDTO[] = [];

      if (usersFromLocalStorage !== null) {
        users = JSON.parse(usersFromLocalStorage) as UserDTO[];
      }

      if (users.length && users.find((u: UserDTO) => u.email === user.email))
        return { status: "error", msg: "Usuário inválido" };

      const newUser: UserDTO = {
        name: user.name,
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
      this.isAuthenticated = !!userAuthenticated;
    },

    login(email: string, password: string): { status: string; msg: string } {
      const usersFromLocalStorage = localStorage.getItem("users");
      let users: UserDTO[] = [];

      if (usersFromLocalStorage !== null) {
        users = JSON.parse(usersFromLocalStorage) as UserDTO[];
      }

      const user = users.find((u: UserDTO) => u.email === email);

      if (!user) return { status: "error", msg: "Usuário não encontrado" };

      if (user.password !== md5(password))
        return { status: "error", msg: "Usuário ou senha incorretos" };

      localStorage.setItem("userAuthenticated", JSON.stringify(user));
      this.isAuthenticated = true;
      this.user = user;
      return { status: "success", msg: "Login efetuado com sucesso" };
    },

    // logout() {
    //   this.user = null;
    // },
  },

  getters: {
    userName: (state) => state.user?.name || "",
    userEmail: (state) => state.user?.email || "",
  },
});
