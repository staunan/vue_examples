<template>
  <div id="app">
    
    <div class="router-content">
      <router-view />
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  async created() {
  },
};
</script>

<style scoped>
#app {
  height: 100%;
}
</style>