import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import VModal from 'vue-js-modal';
/* Для интернализации проекта */
import polyglot from 'node-polyglot';
/* --------------------------  */

/* api для взаиможействия с приютом */
import shelter from './plugins/backend/shelter.js';
Vue.use(shelter);
/* Для отображения tooltip, при этом 
внутри может быть и другой компонент */
import VTooltip from 'v-tooltip'

/* Импортируем используемые в проекте иконки */
import './iconSetImports';

import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);
/* ----------------------------------------- */

/* Свои компоненты с глобальной регистрацией */
import customInput from './components/custom-html/custom-input';
import customLogo from './components/custom-html/custom-logo.vue';
import customDropdown from './components/custom-html/custom-dropdown.vue';
import customAlert from './components/custom-html/custom-alert.vue';
import customWizard from './components/custom-html/custom-wizard.vue';
import svgLoader from './components/svg-loaders.vue';
import customIconSelect from './components/custom-html/custom-icon-select.vue';

Vue.component('custom-input', customInput);
Vue.component('custom-logo', customLogo);
Vue.component('custom-dropdown', customDropdown);
Vue.component('custom-alert', customAlert);
Vue.component('custom-wizard', customWizard);
Vue.component('loader', svgLoader);
Vue.component('custom-icon-select', customIconSelect);
/* ----------------------------------------- */

Vue.config.productionTip = false;
Vue.use(VModal, {
  dialog: true
});
Vue.use(VTooltip);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');