<template>
  <div class="admin--edit-site">
    <form action="/pet" method="POST" @submit="add($event)" class="admin--edit--content">
      <div class="admin--edit--content--box">
        <div class="admin--edit--content--box--header--wrapper">
          <h3 class="admin--edit--content--box--header">Описательная часть</h3>
        </div>

        <div class="admin--edit--content--box--content">
          <custom-input
            :textLabel="`Описание приюта`"
            v-model="shelterCommon.about"
            :cols="`30`"
            :rows="`10`"
            :type="`textarea`"
          />

          <custom-input
            :textLabel="`Подпись владельца`"
            v-model="shelterCommon.owner"
            :placeholder="`Используется для блога. Например 'Маша, приют Утканос'`"
            :type="`text`"
          />
        </div>
      </div>

      <div class="admin--edit--content--box">
        <div class="admin--edit--content--box--header--wrapper">
          <h3 class="admin--edit--content--box--header">Контактная информация</h3>
        </div>

        <div class="admin--edit--content--box--content">
          <custom-input
            :textLabel="`Телефон`"
            :placeholder="`8-900-000-00-00`"
            v-model="shelterCommon.tel"
            :type="`tel`"
          />
          <custom-input
            :textLabel="`Адрес эл. почты`"
            v-model="shelterCommon.email"
            :placeholder="`ivanov@mail.ru`"
            :type="`email`"
          />
          <custom-input :textLabel="`Адрес`" v-model="shelterCommon.address" :type="`text`"/>
        </div>
      </div>
      <div class="admin--edit--content--box">
        <div class="admin--edit--content--box--header--wrapper">
          <h3 class="admin--edit--content--box--header">Социальные сети</h3>
        </div>

        <div class="admin--edit--content--box--content">
          <custom-input :textLabel="`Адрес VK`" v-model="shelterCommon.vk" :type="`url`"/>
          <custom-input
            :textLabel="`Адрес instagramm`"
            v-model="shelterCommon.instagramm"
            :type="`url`"
          />
        </div>
      </div>
      <div class="admin--edit--content--box">
        <div class="admin--edit--content--box--header--wrapper">
          <h3 class="admin--edit--content--box--header">Юридическая информация</h3>
        </div>

        <div class="admin--edit--content--box--content">
          <custom-input :textLabel="`ИНН`" v-model="shelterCommon.inn" :type="`number`"/>
          <custom-input :textLabel="`ОГРН`" v-model="shelterCommon.ogrn" :type="`number`"/>
        </div>
      </div>
      <div class="admin--edit--content--separator"></div>
      <button
        class="admin--edit--content--button common--button admin-panel--buttomn"
        type="submit"
      >Изменить данные</button>
    </form>

    <div class="loader" v-show="loader">
      <svg-loaders></svg-loaders>
    </div>
    <custom-alert :text="dataForModal.text"></custom-alert>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import svgLoaders from "../../../components/svg-loaders.vue";

export default {
  name: "editSite",
  data: () => {
    return {
      shelterCommon: {
        inn: "",
        ogrn: "",
        address: "",
        about: "",
        owner: "",
        tel: "",
        instagramm: "",
        vk: "",
        email: ""
      },
      loader: false,
      dataForModal: {
        text: ""
      },
      display: "common"
    };
  },
  components: {
    "svg-loaders": svgLoaders
  },
  methods: {
    ...mapActions(["setSiteInfo", "getSiteInfo"]),
    showModal(data) {
      this.dataForModal.text = data;
      this.$modal.show("custom-alert");
    },
    add(event) {
      event.preventDefault();
      this.shelterCommon.doc = "shelterCommon";
      this.loader = true;
      this.setSiteInfo(this.shelterCommon).then(result => {
        this.showModal(result);
        this.loader = false;
      });
    }
  },
  mounted() {
    this.shelterCommon = this.$store.state.shelterCommon;
  }
};
</script>