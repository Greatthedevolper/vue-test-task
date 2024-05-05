import './assets/all.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./assets/main.css";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Toast);
app.mount("#app");
