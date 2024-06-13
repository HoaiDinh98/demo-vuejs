<template>
  <div id="app">
    <componentsHeader />
    <div class="main-content">
      <router-view />
    </div>

    <componentsFooter />
  </div>
</template>

<script>

import componentsHeader from "./components/Header.vue";
import componentsFooter from "./components/Footer.vue";
export default {
  name: 'App',
  components: {
    componentsHeader,
    componentsFooter,
  },
};
</script>

<style>
.main-content {
 margin-left: 250px;
 margin-right: 50px;
 margin-top: 100px;
 height: 500px;
border: 5px;
}

</style>
