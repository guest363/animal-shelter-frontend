<template>
  <div class="admin-panel--menu--sublist--wrapper"
  v-on:mouseleave="$emit('close')">
    <div class="admin-panel--menu--sublist" v-for="element in listElements" :key="element.text">
      <router-link
        :to="element.link"
        v-on:click="$emit('close')"
        :class="($route.path === element.link) ? activeClass : ''"
      >
        <v-icon class="admin-icon" :name="element.icon" :label="element.iconLabel"/>
        <span>{{element.text}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
const adminSublist = {
  name: "adminSublist",
  data: () => {
    return {};
  },
  props: {
    activeClass: String,
    listElements: {
      type: Array,
      default: function() {
        return {
          link: "/",
          text: "Default",
          icon: "regular/edit",
          iconLabel: "Default"
        };
      }
    }
  }
};
export default adminSublist;
</script>
