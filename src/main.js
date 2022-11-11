import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./global.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

global.jQuery = require("jquery");
const $ = global.jQuery;
window.$ = $;

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUserCircle,
  faDesktop,
  faLaptop,
  faMobileAlt,
  faTabletAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUserCircle, faDesktop, faLaptop, faMobileAlt, faTabletAlt,
  );

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
