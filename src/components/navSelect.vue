<template>
  <ul
    class="navSelect l-style-none"
    :class="{ 'navSelect__disable': !active }"
    v-on:mouseenter="showList = true && active"
    v-on:mouseleave="showList = false"
  >
    <router-link :to="headerLink">{{header}}</router-link>
    <li
      class="navSelect-li"
      v-show="computedShow"
      v-for="(value, key, index) in items"
      :key="key"
      v-bind:style="{ top: (index === 0) ? 23 + 'px': 35 * index + 23+ 'px'}"
    >
      <router-link :to="value">{{key}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      showList: false
    };
  },
  props: {
    header: String,
    headerLink: String,
    items: Object,
    active: Boolean
  },
  computed: {
    computedShow() {
      /*           This is due to the server-side rendering. If you need to specify that 
          you want to import a resource only on the client-side, you need to use the process.browser variable. */

      if (process.browser) {
        return this.showList ||
          (this.active && document.documentElement.clientWidth < 400)
          ? true
          : false;
      } else {
        return this.showList;
      }
    }
  }
};
</script>
<style lang='less'>
@import "../assets/css/vue-elements/navSelect";
@import "../assets/css/components/list";
</style>
