<template>
  <nav class="mb-5">
    <div class="brand">
      <router-link to="/">영어단어장</router-link>
    </div>
    <menu>
      <router-link to="/books/add" class="button is-light">
        📚 새로 만들기
      </router-link>
    </menu>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .brand {
    font-weight: 700;
    a {
      color: #000;
      font-size: 1.5rem;
    }
  }
  menu {
    a {
      font-weight: 700;
    }
  }
}
</style>
