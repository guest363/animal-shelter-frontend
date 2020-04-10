
/* Как пример работы с хранилищем в ассинхронном режиме
import axios from 'axios';
export const state = () => ({
	list: []
});

export const mutations = {
	set(state, cars) {
		state.list = cars;
	},
  add (state, text) {
    state.list = text;
  },
};
export const actions = {
	async getAllItems() {
    let { data } = await axios.get('https://nuxt-ssr.firebaseio.com/facts.json');
		this.commit('todos/add', data);
	}
};


В компоненте

  async fetch({store}) {
    await store.dispatch("todos/getAllItems");
  }
 */