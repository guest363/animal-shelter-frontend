import Vue from 'vue';
import Vuex from 'vuex';

/* Ипортируем подули. 
Код разделили по модулям ради нормальной поддержки */
import animal from './modules/animal.js';
import auth from './modules/auth.js';
/* ------------------------------------------------- */

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    constants: {
      serverIP: 'xn-----olckiykrd.xn--p1ai',
      authPort: '12345',
      dbPort: '10000',
      urlAuthToken: '/oauth/token',
      urlCheckAuthTocken: '/oauth/check_token',
      yaMapApi: '6ca2f732-031f-4459-bf0a-d0c1a9ca6d2e',
    },
    shelterCommon: {
      inn: '',
      ogrn: '',
      address: '',
      about: '',
      owner: '',
      tel: '',
      instagramm: '',
      vk: '',
      email: '',
    },
  }),
  mutations: {
    setterSiteInfo(state, param) {
      state[param.path] = param.result;
    },

  },
  actions: {

  },
  getters: {
    getYaMapUrl(state) {
      return `https://api-maps.yandex.ru/2.1/?apikey=${
        state.constants.yaMapApi
      }&lang=ru_RU`;
    },
    getURLDB(state) {
      const st = state.constants;
      return `https://${st.serverIP}:${st.dbPort}`;
    },

    /* getterShelterInfo(state) {
      let shelter =  (state.shelterCommon === void 0) ? {about: ''}: state.shelterCommon;
      shelter.about.split(' ').slice(0, 30).join(' ');
			return state.shelterCommon;
		} */
  },
  modules: {
    animal,
    auth,
  },
});