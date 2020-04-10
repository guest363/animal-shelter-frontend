<template>
  <footer class="footer flex-center">
    <div class="grid-footer-4-1 content-wrapper">
      <custom-logo class="footer--logo"/>
      <div class="footer--menu">
        <router-link to="#">
          <span>Пожертвования</span>
        </router-link>
        <router-link to="#">
          <span>Список необходимого</span>
        </router-link>
        <router-link to="#">
          <span>Финансовая отчетность</span>
        </router-link>
        <router-link to="#">
          <span>Мероприятия</span>
        </router-link>
      </div>
      <div class="footer--social">
        <router-link to="#">
          <span>Куратороство</span>
        </router-link>
        <router-link to="#">
          <span>Волонтерство</span>
        </router-link>
        <div class="footer--social--icons flex-center">
          <a rel="noopener" class="flex-center" href="https://www.instagram.com/mokryi_nos/">
            <v-icon class="social-icon" name="brands/instagram" label="Иконка инстаграмма"/>
          </a>
          <a rel="noopener" class="flex-center"  href="tel:79826432621">
            <v-icon class="social-icon" name="phone" label="Иконка телефона"/>
          </a>
          <a rel="noopener" class="flex-center"  href="https://vk.com/mokryi_nos">
            <v-icon class="social-icon" name="brands/vk" label="Иконка вконтакте"/>
          </a>
          <a rel="noopener" class="flex-center"  href="https://api.whatsapp.com/send?phone=79826432621">
            <v-icon class="social-icon" name="brands/whatsapp" label="Иконка whatsapp"/>
          </a>
        </div>
      </div>
      <div class="footer--menu">
        <router-link to="#">
          <span>Кошки</span>
        </router-link>
        <router-link to="#">
          <span>Собаки</span>
        </router-link>
        <router-link to="#">
          <span>Блог</span>
        </router-link>
        <router-link to="#">
          <span>О приюте</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>



<script>
export default {
  name: "footerVue",
  data: () => {
    return {};
  }
};
</script>