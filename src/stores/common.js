import { defineStore } from "pinia";
export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    isMenuOpen: false,
    userLoggedIn:false,
    loading:false,
  }),
  persist: true,
  actions: {
    showMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    hdieMenu() {
      this.isMenuOpen = false;
    }
  }
});
