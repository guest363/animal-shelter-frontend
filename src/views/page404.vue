<template>
  <div class="page404 flex-center">
    <h1 class="page404--header">Такой странице нет, зато 
      <router-link to="/pets">здесь</router-link> можно найти себе настоящего друга</h1>
    <img class="page404--image" src="../assets/404.svg" alt="кот">
  </div>

</template>

<script>
export default {
  name: "page404"
};
</script>

<style lang='less'>
.page404 {
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: var(--green-light);
  position: relative;
  a {
    text-decoration: none;
  }
  &--header {
    margin: 20px 0 60px 0;
    text-align: center;
    color: var(--white);
  }
  &--image {
    width: 100%;
    height: 100%;
  }
}
</style>
