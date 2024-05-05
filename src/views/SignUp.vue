<template>
  <div class="sign-up-wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-sign-up">
        <h2 class="mb-3">Create Account</h2>
        <div class="input-wrapper">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Name"
              autocomplete="off"
            />
          </div>

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model.trim="email"
              autocomplete="off"
            />
            <span class="error-message">
              {{ isEmailValid ? "" : "You enter a invalid email" }}</span
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              autocomplete="new-password"
              placeholder="Password"
              v-model.trim="password"
            />
            <span class="error-message">{{
              isCheckPassword
                ? "Strong password"
                : "Password must contain uppercase, Lowercase and number"
            }}</span>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model.trim="cpassword"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="d-flex justify-content-between my-3">
          <p class="account-text">
            Already have an account?
            <router-link to="/login" class="text-success bg-transparent"
              >Login</router-link
            >
          </p>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="commonStore.loading"
          >
            Join now
            <span
              class="spinner-border text-success"
              v-if="commonStore.loading"
              role="status"
            ></span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useCommonStore } from "@/stores/common";
import { useToast } from "vue-toastification";
import { auth } from "@/fireBase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
const toast = useToast();
export default {
  name: "SignupForm",
  components: {},
  data() {
    return {
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      commonStore: useCommonStore(),
      email: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.commonStore.loading = true;
      if (this.email === "" || this.password === "") {
        this.showToastError("Please fill all fields");
      } else if (this.password.length < 6) {
        this.showToastError("Password should be at least 6 characters long");
      } else if (!this.isEmailValid) {
        this.showToastError("Please enter a valid email address");
      } else if (this.cpassword !== this.password) {
        this.showToastError("Confirm password does not match");
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          // Clear form fields
          this.email = "";
          this.password = "";
          this.cpassword = "";
          this.commonStore.loading = false;
          this.showToastSuccess("User registered successfully!");
          this.$router.push("/login");
        } catch (error) {
          this.showToastError(error.message);
        }
      }
    },
    showToastError(message) {
      const toast = useToast();
      toast.error(message, {
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
  computed: {
    isEmailValid() {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        this.email
      );
    },
    isCheckPassword() {
      return /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{6,50}$/gmu.test(
        this.password
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-up-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    padding: 30px 20px;
    border-radius: 5px;
    max-width: 600px;
    border: 1px solid hsla(160, 100%, 37%, 0.9);
    margin: auto;
    width: 100%;
    .form-sign-up {
      .form-group {
        &:not(:last-of-type) {
          padding-bottom: 10px;
        }
        position: relative;
        .error-message {
          display: none;
          color: red;
          // position: absolute;
          bottom: 8px;
        }
        &:has(input:invalid) {
          .error-message {
            display: block;
          }
        }
      }
    }
  }
}
</style>
