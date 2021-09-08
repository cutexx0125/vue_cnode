<template>
  <div id="app">
    <m-header></m-header>
    <div class="main-section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import mHeader from './components/mHeader.vue'

export default {
  components: { mHeader},
  name: 'App',
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.main-section {
  margin: auto;
  margin-top: 40px;
  width: 1200px;
}
</style>
