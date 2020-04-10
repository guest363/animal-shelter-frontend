import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // Для создания представлений
      component: () => import('./views/templates/commonTemplate.vue'),
      children: [
        {
          name: 'Главная',
          path: '/',
          component: () => import('./views/home.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'Панель администратора приюта',
      meta: {
        requiresAuth: true,
      },
      component: () => import('./views/adminPanelOwner/admin.vue'),
      children: [
        {
          path: 'add-animal',
          name: 'Добавление животных в базу',
          component: () =>
            import('./views/adminPanelOwner/sub-elem/addAnimal.vue'),
        },
        {
          path: 'edit-animal',
          name: 'Редактирование базы животных',
          component: () =>
            import('./views/adminPanelOwner/sub-elem/editAnimal.vue'),
        },
        {
          path: 'add-project',
          name: 'Создание проекта по сбору средст',
          component: () =>
            import('./views/adminPanelOwner/sub-elem/addProject.vue'),
        },
        {
          path: 'edit-site',
          name: 'Редактирование наполнения сайта',
          component: () =>
            import('./views/adminPanelOwner/sub-elem/editSite.vue'),
        },
      ],
    },
    {
      path: '/project-admin',
      name: 'Панель администратора проекта',
      meta: {
        requiresAuth: true,
        accessTo: 'ADMIN',
      },
      component: () => import('./views/adminPanel/admin.vue'),
      children: [
        {
          path: '',
          name: 'Управление запросами на создание приютов',
          component: () =>
            import('./views/adminPanel/sub-elem/manageRequests.vue'),
        },
        {
          path: 'manageShelters',
          name: 'Управление приютами проекта',
          component: () =>
            import('./views/adminPanel/sub-elem/menageShelters.vue'),
        },
        {
          path: 'manageFinance',
          name: 'Управление финансами',
          component: () =>
            import('./views/adminPanel/sub-elem/manageFinance.vue'),
        },
      ],
    },
    {
      path: '/login',
      // Для создания представлений
      component: () => import('./views/templates/fullScreenTemplate.vue'),
      children: [
        {
          name: 'Авторизация',
          path: '/',
          component: () => import('./views/login.vue'),
        },
      ],
    },
    {
      path: '/registry',
      // Для создания представлений
      component: () => import('./views/templates/fullScreenTemplate.vue'),
      children: [
        {
          name: 'Регистрация нового приюта',
          path: '/',
          component: () => import('./views/reg-shelter.vue'),
        },
      ],
    },
    {
      path: '/anketa',
      // Для создания представлений
      component: () => import('./views/templates/fullScreenTemplate.vue'),
      children: [
        {
          name: 'Анкета для ищущего друга',
          path: '/',
          component: () => import('./views/anketa.vue'),
        },
      ],
    },
    {
      path: '*',
      name: 'Такой страницы пока нет. 404',
      component: () => import('./views/page404.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  document.title = `${to.name || ''} Портал Кот и Пес`; // Корректный Title для страниц при SPA
  const authenticated = store.getters.getRoles.includes('PET_CREATE');
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let requiresAdmin = to.matched.some(
    (record) => record.meta.accessTo === 'ADMIN',
  );
  const isAdmin = store.getters.getRoles.includes('ADMIN');
  if (requiresAuth) {
    if (requiresAdmin && !isAdmin) {
      next('login');
      return;
    }
    if (authenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
