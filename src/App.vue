<template>
  <div id="app">
    <!-- <user /> -->
    <!-- <share /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import user from "./components/User";
import share from "./components/Share";

export default {
  name: "App",
  components: {
    user,
    share
  }
};

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  background-color: #3c3c3c;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 920px;
}
</style>
