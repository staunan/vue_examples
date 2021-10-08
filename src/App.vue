<template>
  <div id="app">
    <my-header v-on:drawer="handleDrawerClick"></my-header>
    <drawer behaviour="dock" v-bind:active="drawerActive" @close="drawerActive = false" position="left">
      <drawer-content></drawer-content>
    </drawer>
    <div class="router-content">
      <router-view />
    </div>

  </div>
</template>

<script>
import MyHeader from "./components/Header/MyHeader.vue";
import Drawer from "./components/Drawer/Drawer.vue";
import DrawerContent from "./components/Drawer/DrawerContent.vue";
export default {
  name: "App",
  components: {MyHeader, Drawer, DrawerContent},
  data: function(){
    return {
      drawerActive: false,
    };
  },
  methods: {
    handleDrawerClick: function(){
      this.drawerActive = !this.drawerActive;
    }
  }
};
</script>
<style type="text/css">
html, body{
  padding: 0;
  margin: 0;
}
</style>
<style scoped>
#app {
  height: 100%;
  position: relative;
}
</style>