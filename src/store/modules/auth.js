import axios from 'axios';
import qs from 'qs';

const state = {
    auth: {
        user_name: '',
        client_id: '',
        role: [],
    },
};
const getters = {
    getUserName(state) {
        return state.auth.user_name;
    },
    getURLAuthToken(state, getters, rootState, rootGetters) {
        const st = rootState.constants;
        return `https://${st.serverIP}:${st.authPort}${st.urlAuthToken}`;
    },
    getURLAuthCheckToken(state, getters, rootState, rootGetters) {
        const st = rootState.constants;
        return `https://${st.serverIP}:${st.authPort}${st.urlCheckAuthTocken}`;
    },
    getToken() {
        return localStorage.getItem('jwt');
    },
    getRoles(state) {
        return state.auth.role;
    }

};
const mutations = {
    setAuth(state, data) {
        state.auth = {
            ...data,
        };
    },
    setToken(state, token) {
        localStorage.setItem('jwt', token);
    },
    storeLogout(state) {
        localStorage.removeItem('jwt');
        state.auth = {
            user_name: '',
            client_id: '',
            role: ''
        };
    },
};
const actions = {
    /**
     * @description Ассинхронная (async) аутентификация на сервере
     * @param {object} authData
     * @param {string} authData.password
     * @param {string} authData.username
     * @param {string} authData.grant_type default "password"
     * @param {string} authData.client_id default "Local"
     * @returns {function} возвращает результат проверки токена функцией checkTocken (async), 
     * при этом сам токен записывается мутацией setTocken в localStorage
     * @todo Стоит ли ограничивать размер строк password и username ?
     */
    async auth({
        commit,
        state,
        dispatch,
        getters
    }, authData) {
        try {
            const response = await axios({
                method: 'POST',
                baseURL: getters.getURLAuthToken,
                data: qs.stringify(authData),
                responseType: 'json',
                headers: {
                    Authorization: 'Basic TG9jYWw6c2VjcmV0',
                    'content-type': 'application/x-www-form-urlencoded',
                },
            });
            commit('setToken', response.data['access_token']);
            const resultCheck = await dispatch('checkTocken');
            return resultCheck;
        } catch (error) {
            if (error + '' === 'Error: Network Error') {
                throw new Error('Проверте ваше соединение с интернетом');
            }
            throw new Error(
                (error.response.data.error_description || error) === 'Bad credentials' ?
                'Вы ввели неверный данные или такого пользователя не существует' :
                `Передайте данное сообщение админситратору <br> <b>"${
                error.response.data.error_description
              }"</b>`,
            );
        }
    },
    /**
     * @description Ассинхронная (async) проверка токена на сервере
     * @requires getters.getToken
     * @returns {string} возвращает путь для нужной админки
     */
    async checkTocken({
        commit,
        state,
        dispatch,
        getters
    }) {
        const authData = {
            token: getters.getToken,
        };
        try {
            const resultOfCheck = await axios({
                method: 'POST',
                data: qs.stringify(authData),
                url: getters.getURLAuthCheckToken,
                headers: {
                    Authorization: 'Basic U0hFTFRFUjpTSEVMVEVS',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const authResult = {
                user_name: resultOfCheck.data.user_name,
                client_id: resultOfCheck.data.client_id,
                role: resultOfCheck.data.authorities.slice(),
            };
            commit('setAuth', authResult);
            const isProjectAdmin = authResult.role.indexOf('ADMIN');
            const isShelterAdmin = authResult.role.indexOf('SHELTERS_EDIT');
            /* Маршрутизация в зависимости от нужной админки */
            return isProjectAdmin !== -1 ?
                'project-admin' :
                isShelterAdmin !== -1 ?
                'admin' :
                '/';
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};