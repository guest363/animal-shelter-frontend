import axios from 'axios';
import qs from 'qs';
import store from '../../store/index.js';

let Shelter = {};
/**
 * @description Добавляет глобальный метод shelter экземпляру Vue.
 * В этой метоже заключены все функции по работе с бекендом
 * @returns {object} функции по работе с бекендом :
 * --- Работа с питомцами ----
 * 1 addPet(pet) - добавить питомца в базу
 * 2 getPet(id) - получить конкретного питомца
 * 3 deletePet(id) - удалить питомца
 * 4 getPets(params) - получить несколько питомцев
 * ---- Работа с приютами ---
 * 1 addShelterRequest(newShelter)
 */
Shelter.install = function(Vue, options) {
  // 1. добавление глобального метода или свойства
  Vue.prototype.$shelter = () => {
    return {
      token: store.getters.getToken,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.getters.getToken,
      },
      headersNoAuth: {
        'Content-Type': 'application/json',
      },
      tryCatchFunctionAxios: config => {
        try {
          return axios(config);
        } catch (error) {
          throw new Error(error.response.data.error_description || error);
        }
      },
      /**
       * @description Добавить животное в базу
       * @param {object} pet
       * @param {Date} pet.birthday
       * @param {string} pet.attitudeToChildren
       * @param {Date} pet.entryDate
       * @param {string} pet.houseTrained
       * @param {Array} pet.photos
       * @param {Array} pet.thumbnails
       * @param {string} pet.name
       * @param {string} pet.sex
       * @param {string} pet.species
       * @param {string} pet.sterilized
       * @param {Array} pet.history
       * @param {string} pet.story
       * @param {string} pet.temperament
       * @param {Boolean} pet.vaccinated
       * @param {number} pet.weight
       * @param {string} pet.state
       * @returns {object} ответ от сервера
       *
       */
      async addPet(pet) {
        const config = {
          method: 'POST',
            data: pet,
            url: `${store.getters.getURLDB}/pet`,
            headers: this.headers
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Получить конкретного зверька.
       * @param {number} id - id животного.
       * @returns {object} питомец с заданным id
       */
      async getPet(id) {
        const config = {
          method: 'GET',
          url: `${store.getters.getURLDB}/pet/${id}`,
          headers: this.headers,
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Удаляет животное из базы.
       * @param {number} id - id животного.
       */
      async deletePet(id) {
        const config = {
          method: 'DELETE',
          url: `${store.getters.getURLDB}/pet/${id}`,
          headers: this.headers,
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Получаем животных массимвом.
       * @param {object} params - обьект для запроса, подставляется в params axios.
       * @param {number} params.page - номер страницы.
       * @param {number} params.size - сколько животных в ответе.
       * @param {string} params.sort - поле для сортировки, например name.
       * @param {string} params.filter - Filter это фильтр по параметрам. Для отображения всех результатов он не нужен.
       */
      async getPets(params) {
        const config = {
          method: 'GET',
          url: `${store.getters.getURLDB}/pets`,
          params: params,
          headers: this.headers,
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Добавить заявку на создание приюта. 
       * Эту функцию нет смысла выносить в Vuex, можно обращаться на прямую.
       * @param {object} newShelter - обьект для запроса, подставляется в params axios.
       * @param {string} newShelter.address - адрес приюта.
       * @param {object} newShelter.coordinates
       * @param {number} newShelter.coordinates.latitude - широта.
       * @param {number} newShelter.coordinates.longitude - долгота.
       * @param {string} newShelter.description Описание приюта
       * @param {string} newShelter.ownerFIO - фио.
       * @param {number} newShelter.phone - номер владельца или официальный приюта.
       * @param {string} newShelter.email
       * @param {url} newShelter.fb -
       * @param {url} newShelter.vk - профиль приюта вк.
       * @param {url} newShelter.ok - профиль приюта однокласники.
       * @param {url} newShelter.instagram - профиль приюта в любой социальной сети.
       * @param {number} newShelter.inn - 9 цифр ИНН.
       * @param {number} newShelter.kpp
       * @param {number} newShelter.ogrn
       * @param {string} newShelter.fullAddress - официальный адрес полученный из Дадаты.
       * @param {string} newShelter.fullName - официальное имя полученное из Дадаты.
       * @param {Array} newShelter.images - Картинки в таком виде хранятся  
                                            {
                                              "content": "string",
                                              "type": "OWNER, SHELTER, PASSPORT"
                                            }
       * @param {string} newShelter.username - имя пользователя.
       * @param {string} newShelter.password - пароль.
       */
      async addShelterRequest(newShelter) {
        const config = {
          method: 'POST',
          data: newShelter,
          url: `${store.getters.getURLDB}/shelter-request`,
          headers: this.headersNoAuth,
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Одобрить заявку
       */
      async accepSheltertRequest(newShelter) {
        let req = newShelter;
        req.status = 'ACCEPTED';
        const config = {
          method: 'POST',
          data: req,
          url: `${store.getters.getURLDB}/shelter-request`,
          headers: this.headersNoAuth, // Косяк так как нужна авторизация !!!!
        }
        await this.tryCatchFunctionAxios(config);
      },
      /**
       * Получаем животных массимвом.
       * @param {object} params - обьект для запроса, подставляется в params axios.
       * @param {number} params.page
       * @param {number} params.size
       * @param {string} params.sort
       * @param {string} params.filter
       */
      async getAllRequests(params) {
        const config = {
          method: 'GET',
          url: `${store.getters.getURLDB}/shelter-requests`,
          params: params,
          headers: this.headers,
        }
        await this.tryCatchFunctionAxios(config);
      },
    };
  };
};
export default Shelter;
