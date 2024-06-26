import { defineStore } from "pinia";
import {
  AuthStateInterface,
  HttpStatus,
  SearchParamsInterface,
  UserInterface,
  UserLogin,
} from "@/interfaces";
import md5 from "md5";
import API from "@/config/axios";

function returnError() {
  console.log("Erro");
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthStateInterface["user"],
    isLoading: false as AuthStateInterface["isLoading"],
    error: null as AuthStateInterface["error"],
    isAuthenticated: false,
    booking: {
      locale: "",
      checkin: new Date().toLocaleDateString(),
      checkout: new Date().toLocaleDateString(),
      guests: {
        adults: 1,
        children: 0,
        rooms: 1,
      },
    } as SearchParamsInterface,
  }),

  actions: {
    async fetchUserRegister(
      user: UserInterface
    ): Promise<HttpStatus | undefined> {
      this.isLoading = true;
      try {
        const response = await API.get("/users");
        const allUsers = await response.data;
        const userExists = allUsers.some(
          (u: UserInterface) => u.email === user.email
        );
        if (userExists) {
          return { status: 404, msg: "Usuário inválido" };
        }

        user.password = md5(user.password);
        const newUser = await API.post("/users", user);
        if (newUser.status === 201) {
          this.isAuthenticated = true;
          this.user = newUser.data;
          localStorage.setItem(
            "userAuthenticated",
            JSON.stringify(newUser.data)
          );
        }
        return { status: 201, msg: "Usuário cadastrado com sucesso" };
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserLogin(user: UserLogin): Promise<HttpStatus | undefined> {
      this.isLoading = true;
      try {
        const response = await API.get("/users");
        const allUsers = response.data;
        const findUser = allUsers.find(
          (u: UserInterface) => u.email === user.email
        );

        if (!findUser || findUser.password !== md5(user.password)) {
          return { status: 404, msg: "Usuário ou senha inválidos" };
        }

        this.isAuthenticated = true;
        this.user = findUser;
        delete findUser.password;
        localStorage.setItem("userAuthenticated", JSON.stringify(findUser));
        return { status: 200, msg: "Usuário autenticado com sucesso" };
      } catch (error) {
        returnError();
      } finally {
        this.isLoading = false;
      }
    },

    loadAuthFromLocalStorage() {
      const userAuthenticated = localStorage.getItem("userAuthenticated");
      if (userAuthenticated) {
        this.user = JSON.parse(userAuthenticated);
      }
      this.isAuthenticated = !!userAuthenticated;
    },

    logout() {
      this.user = null;
      localStorage.removeItem("userAuthenticated");
    },

    setGuestInfo(data: SearchParamsInterface) {
      this.booking = data;
    },
  },

  getters: {
    getUser: (state) => state.user,
    getGuestInfo: (state) => state.booking,
  },
});
