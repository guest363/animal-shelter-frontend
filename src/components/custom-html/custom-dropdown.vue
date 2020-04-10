
<template>
  <div class="dropdown" v-on:click="editClass('toggle')">
    <div class="dropdown--header">
      {{header}}
      <v-icon class="fa fa-angle-down" name="angle-down" label="Стрелка вниз" aria-hidden="true"/>
      <v-icon class="fa fa-angle-up" name="angle-up" label="Стрелка вверх" aria-hidden="true"/>
      <picture class="dropdown--header--avatar" v-if="avatar">
        <img :src="imgSrc" :alt="`Аватарка пользователя`">
      </picture>
    </div>

    <div class="dropdown--content" v-on:mouseleave="editClass('remove')">
      <div v-for="item in listItems" :key="item.text">
        <router-link
          v-on:click.native="emitEvent(item)"
          :class="`dropdown--content--item`"
          :role="item.role"
          :to="item.href || ''"
          v-if="item.role !== 'separator'"
        >{{item.text}}</router-link>
        <a :class="`${item.class}`" v-if="item.role === 'separator'"></a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Отображает кастомный dropdown
 */
export default {
  data() {
    return {
      headerDiv: ""
    };
  },
  /**
   * @param {Array} listItems
   * @param {String} listItem.role ['menuitem', 'separator']
   * @param {String} listItem.href ссылка для router-link
   * @param {String} listItem.text текст для пункта
   * @param {String} listItem.storeAction при клике на таком пункте меню
   * происходит отправка события с заданным именем родителю. Такой маячек клика
   * и уже родитель совершает нужные действия. Так как действия в рамках этого компонента
   * занимающегося только отображением не имеет смысла.
   * v-on:click.native="$emit(`${item.storeAction}`)
   * @param {String} header
   * @param {String} imgSrc путь до аватарки пользователя, имеется дефолтная
   * @param {Boolean} avatar  отображать ли аватар
   */
  props: {
    listItems: {
      type: Array,
      default: () => [
        {
          role: "menuitem",
          href: "#",
          text: "Настройки аккаунта"
        },
        {
          role: "menuitem",
          href: "#",
          text: "Пункт меню"
        },
        {
          class: "dropdown--content--item__separator",
          role: "separator"
        },
        {
          role: "menuitem",
          storeAction: "logout",
          text: "Выход"
        }
      ]
    },
    header: {
      type: String,
      default: "Меню"
    },
    imgSrc: {
      type: String,
      default: require("../../static/avatar-placeholder.svg")
    },
    avatar: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    editClass(action) {
      this.headerDiv.classList[action]("is-active");
    },
    emitEvent(item) {
      return item.storeAction !== void 0 ? this.$emit(item.storeAction) : "";
    }
  },
  mounted() {
    this.headerDiv = document.querySelector(".dropdown--header");
  }
};
</script>

<style lang="less">
.dropdown {
  position: relative;
  max-width: 200px;
  width: auto;

  &--header {
    cursor: pointer;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    color: var(--grey);
    justify-content: flex-end;
    &--avatar {
      width: 40px;
      height: 40px;
    }
    svg.fa {
      padding-left: 10px;
      font-weight: 100;
      font-size: 0.7rem;
      vertical-align: center;
      &.fa-angle-up {
        display: none;
      }
    }
    &.is-active {
      svg.fa {
        &.fa-angle-up {
          display: block;
        }
        &.fa-angle-down {
          display: none;
        }
      }
      + .dropdown--content {
        height: auto;
        display: block;
      }
    }
  }
  &--content {
    overflow: hidden;
    transition: opacity 0.15s;
    display: none;
    z-index: 8;
    background-color: var(--white);
    position: absolute;
    /*     transform: translate3d(-97px, 42px, 0px);
    top: 0px;
    left: 0px;
    will-change: transform; */
    font-size: 0.8rem;
    border-radius: 0.1rem;
    border: 1px solid var(--grey-light);
    margin-top: 1rem;
    width: 100%;
    &--item {
      margin: 0;
      display: block;
      cursor: pointer;
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      clear: both;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
      transition: background-color 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      transition: color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
      &:hover {
        background-color: var(--button--hover--bg);
        color: var(--button--text--action);
        border: none;
      }
      &__separator {
        height: 1px;
        padding: 0;
        margin: 0.5rem 0;
        overflow: hidden;
        border-top: 1px solid #e9ecef;
        cursor: default;
        display: block;
      }
    }
  }
}
</style>