import Animal from '../animalClass/class.js';

const state = {
    allAnimals: '',
    editAnimal: '',
    catCount: 0,
    dogCount: 0,
    isAllAnimalWasGet: false,
};
const getters = {
    getEditAnimal(state) {
        return state.editAnimal;
    },
    getAnimals(state) {
        return state.allAnimals;
    },
    getRandomAnimal(state) {
        const length = state.allAnimals.length;
        const random = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        };
        const number = random(0, length - 1);
        const animal = state.allAnimals ?
            state.allAnimals[number] :
            animalBoilerplate;
        animal.story
            .split(' ')
            .slice(0, 30)
            .join(' ');
        return animal;
    },
    getCatCount(state) {
        return state.catCount;
    },
    getDogCount(state) {
        return state.dogCount;
    },
};
const mutations = {
    bookedAnimal(state, data) {
        /*       console.log(data.action)
              state.newAnimal.booked(data.action); */
    },
    setAllAnimals(state, data) {
        state.allAnimals = data;
    },
    setEditAnimal(state, data) {
        state.editAnimal = data;
    },
    delAnimalFromLocal(state, obj) {
        const index = state.allAnimals.indexOf(obj);
        state.allAnimals.splice(index, 1);
    },
    catCount(state, obj) {
        state.catCount = obj;
    },
    dogCount(state, obj) {
        state.dogCount = obj;
    },
};
const actions = {
    /*  Для Firebase
		setNewAnimal(context, animal) {
		
    setSiteInfo(context, params) {
      return new Promise((resolve, reject) => {
        axios.post('https://mokriy-nos.firebaseapp.com/setSiteInfo', {
          params
        })
        .then(response => {
          console.log(response)
          context[params.db] = response;
          resolve('Данные успешно изменены');
        })
        .catch(error => reject(error));
      });
    },
		getAnimal(context, param) {
			if (!context.isAllAnimalWasGet) {
				axios.get('https://mokriy-nos.firebaseapp.com/getAnimal.json-all').then((response) => {
					const result = response.data;
					const sm = result.map((item) => {
						let a = new Animal(item);
						a.goto(a.progress);
						return a;
					});
					context.isAllAnimalWasGet = true;
					context.commit('setAllAnimals', sm);
					context.commit('dogCount', result.filter((item) => item.kind === 'dog').length);
					context.commit('catCount', result.filter((item) => item.kind === 'cat').length);
        })
        .catch(error => console.log(error));
			}
    },
    getSiteInfo(context, path) {
      if (context[path] === void 0) {
        axios.get(`https://mokriy-nos.firebaseapp.com/getSiteInfo.json-${path}`).then(response => {
          const result = response.data;
          context.commit(`setterSiteInfo`, {path, result});
          return result;
        });
      } else {
        return context[path];
      }
    },
 */
};

const animalBoilerplate = {
    status: 'inSearch',
    name: '',
    date: '',
    photo: [],
    thumbnail: [],
    sex: 'Женский',
    vaccinated: 'Непройдена',
    sterilized: 'Неизвестно',
    wc: 'Неизвестно',
    attitudeToChildren: 'Нейтральное',
    attitudeToAnimal: 'Нейтральное',
    weight: '',
    age: '',
    temperament: 'Спокойны',
    progress: 'entered',
    story: '',
    history: ['inSearch'],
};
export default {
    state,
    getters,
    mutations,
    actions,
};