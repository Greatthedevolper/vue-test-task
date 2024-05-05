<template>
  <header id="header">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 col-5 align-self-center">
          <RouterLink to="/" class="d-inline-flex align-items-center">
            <img
              alt="Vue logo"
              src="@/assets/logo.svg"
              width="30"
              height="30"
            />
          </RouterLink>
        </div>
        <div class="col-md-10 col-7 align-self-center text-end">
          <div class="menu-wrapper">
            <span role="button" @click="show()" class="toogle-menu-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 448 512"
              >
                <path
                  d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </span>
            <ul class="menu" :class="{ active: commonStore.isMenuOpen }">
              <li @click="hide()">
                <router-link to="/">Home</router-link>
              </li>
              <!-- <li @click="hide()">
                <router-link to="/about">About</router-link>
              </li> -->
              <li
                v-if="commonStore.userLoggedIn"
                @click="
                  logoutUser();
                  hide();
                "
              >
                <a href="#">Logout</a>
              </li>
              <li @click="hide()" v-else>
                <router-link to="/login">Login</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import { useUserStore } from "@/stores/user";
import { useCommonStore } from "@/stores/common";
import { auth } from "@/fireBase.config";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "vue-toastification";
// const commonStore = commonStore()

export default {
  name: "HeaderComponent",
  props: ["courseMenu", "mode"],
  components: {},
  data() {
    const commonStore = useCommonStore();

    return {
      commonStore,
      isMenuOpen: false
    };
  },
  created() {
    window.addEventListener("resize", this.myEvent);
  },
  unmounted() {
    window.removeEventListener("resize", this.myEvent);
  },
  methods: {
    show() {
      this.commonStore.showMenu();
    },
    hide() {
      this.commonStore.hdieMenu();
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.commonStore.userLoggedIn = false;
        this.showToastSuccess("Logout successfully!");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    showToastSuccess(message) {
      const toast = useToast();
      toast.success(message, {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.5,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    }
  },
  mounted() {},
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 9px;

  .menu-wrapper {
    .menu {
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: end;
      @media (max-width: 768px) {
        display: none;
        &.active {
          display: flex;
          justify-content: start;
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          z-index: 4;
          background: #fff;
          flex-direction: column;
          gap: 26px;
          padding: 50px 0 0 0;
        }
      }
      li {
        a {
          text-decoration: none;
          border: 1px solid hsla(160, 100%, 37%, 0.2);
          border-radius: 5px;
          padding: 5px 10px;
          color: hsla(160, 100%, 37%, 0.9);
          &.router-link-active,
          &:hover {
            background-color: hsla(160, 100%, 37%, 0.2);
          }
        }
      }
    }
    .toogle-menu-btn {
      display: none;
      align-items: center;
      justify-content: center;
      color: hsla(160, 100%, 37%, 0.9);
      @media (max-width: 768px) {
        display: inline-flex;
        position: relative;
        z-index: 5;
      }
      svg {
        fill: currentColor;
      }
    }
  }
}
</style>
