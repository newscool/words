<template>
  <div id="app" class="container">
    <TopNav />
    <router-view />
    <BottomFooter />
  </div>
</template>

<script>
import TopNav from "@/components/common/TopNav.vue";
import BottomFooter from "@/components/common/BottomFooter.vue";

export default {
  components: {
    TopNav,
    BottomFooter,
  },
};
</script>

<style lang="scss">
@import "~bulma";

#app {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

<style>
html,
body {
  height: 100%;
}
.button {
  font-weight: 700;
}
</style>
