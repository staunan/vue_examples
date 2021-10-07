import { createStore } from 'vuex';

// Import Store Modules --
import general from "./modules/general";

// Create a new store instance.
const store = createStore({
  modules: {general: general}
});

export default store;
