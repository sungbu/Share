<template>
  <div id="app">
    <!-- <user /> -->
    <!-- <share /> -->
    <router-view></router-view>
    <!-- <myShare/> -->
  </div>
</template>

<script>
import user from "./components/User";
import share from "./components/Share";
import myShare from "./components/MyShare";
export default {
  name: "App",
  components: {
    user,
    share,
    myShare
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
  background-color: #1b1d1c;
}
body::-webkit-scrollbar {
  width: 0;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 1024px;
}
</style>