// Create Vue App --
import {createApp} from 'vue';

// Assign Root Component and create Vue Instance --
import App from "./App.vue";
let app = createApp(App);

// Assign Route --
import router from "./router";
app.use(router);

// Assign Store --
import store from "./store";
app.use(store);

// Attach Root Component App into the DOM --
app.mount("#app");
