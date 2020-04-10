<template>
  <div
    class="dropZone"
    v-on:dragenter="enter($event)"
    v-on:dragleave="leave($event)"
    v-on:dragover="over($event)"
    v-on:drop="drop($event)"
  >
    <form class="flex-center dropZone--form">
      <p class="dropZone--form--text">{{data.text.main}}</p>
      <label v-show="data.show.button" class="common--button dropZone--form--button flex-center">
        {{data.text.button}}
        <input
          v-on:change="selectInput($event)"
          type="file"
          class="dropZone--hide"
          title="Загрузите одну или несколько фотографий"
          required
          multiple
          accept="image/*"
        >
      </label>
      <p v-show="data.show.limits" class="dropZone--form--text--limits">{{data.text.limits}}</p>
    </form>
    <!-- Локальная загрузка довольна быстрая, полоса загрузки не требуется
    <progress id="dropZone--progress-bar" max=100 value=0></progress>-->
    <div class="dropZone--gallery">
      <div class="dropZone--gallery--thumbnail"></div>
      <div class="dropZone--gallery--full"></div>
    </div>
  </div>
</template>

<script>
import Compressor from "compressorjs";

/**
 * Создает область для drag and drop загрузки изображения,
 * стили встроены
 * @emits dropImage имитит событие "dropImage" при
 * каждом добавлении картинки, в этом событии картинка
 * сжимается до большого размера. Пример подписи на
 * событие у родителя
 * v-on:dropImage="imageHendler('SHELTER', $event)"
 * @emits dropThumbnail здесь сильно уменьшенное превью
 * @requires Compressor для сжатия изображений
 */
export default {
  name: "drag-and-drop",
  data: () => {
    return {
      image: [],
      thumbnail: []
    };
  },
  /** Параметры для инициализации компонента
   * @param {object} data входные параметры для инициализации
   * @param {object} data.show показ\скрытие отдельных эллементов
   * @param {Boolean} data.show.button показ\скрытие кнопку выбора файлов, по умолчанию показать
   * @param {Boolean} data.show.limits показ\скрытие строки с ограничениями, по умолчанию скрыть
   * @param {object} data.text
   * @param {object} data.text.main основной текст, поясняющий что можно делать с элементом
   * @param {object} data.text.button текст для кнопки
   * @param {object} data.text.limits текст ограничений
   */
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          show: {
            button: {
              type: Boolean,
              default: true
            },
            limits: {
              type: Boolean,
              default: false
            }
          },
          text: {
            main: {
              type: String,
              default: "Перетащите или выберите изображение"
            },
            button: {
              type: String,
              default: "Выбрать изображения"
            },
            limits: {
              type: String,
              default: "Файлы до 2 мегабайт"
            }
          }
        };
      }
    }
  },
  methods: {
    /**
     * Прерывает дефолтные действия браузера.
     * Если вы этого не сделаете, то браузер в конечном итоге откроет
     * файл, который вы перетаскиваете, вместо того,
     * чтобы отправить его в обработчик события drop.
     */
    defaultAсtion(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    enter(event) {
      this.defaultAсtion(event);
      this.$el.classList.add("highlight");
    },
    drop(event) {
      this.leave(event);
      const files = event.dataTransfer.files; //FileList переданных файлов
      this.handleFiles(files);
    },
    leave(event) {
      this.defaultAсtion(event);
      this.$el.classList.remove("highlight");
    },
    over(event) {
      /* Аналогично событию enter */
      this.enter(event);
    },
    selectInput(event) {
      this.defaultAсtion(event);
      const files = event.target.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      const vm = this;
      /**
       * Шаблон для работы с библиотекой Compressor
       * @param {File} element файл который нужно сжать
       * @param {Object} initParam
       * @param {Number} initParam.quality степерь сжатия изображения, поумолчанию 0.85
       * @param {String} initParam.width ширина изображения на выходе
       * @param {String} initParam.height высота изображения на выходе
       * @param {String} initParam.htmlAppendElem DOM элемент к которому прикрепится изображение
       * @param {String} initParam.htmlAppendClass класс для прикрепленного изображения
       * @param {Array} initParam.base64Result ссылка на массив где хранятся сжатые изображения в
       * формате base64, они в последствии эмитятся родительскому эллементу
       * @param {String} initParam.event имя события ['dropImage', 'dropThumbnail']
       */
      const compessorWorker = (element, initParam) => {
        const imageContainer = this.$el.querySelector(
          `.${initParam.htmlAppendElem}`
        );
        new Compressor(element, {
          quality: initParam.quality,
          maxWidth: initParam.width,
          maxHeight: initParam.height,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = () => {
              const img = document.createElement("img");
              /* reader.result это закодированное изображение  */
              const imgBase64 = reader.result;
              initParam.base64Result.push(imgBase64);
              img.src = imgBase64;
              img.className = initParam.htmlAppendClass;
              imageContainer.appendChild(img);
              /* Отправляем именно base64, т.е. часть с  
              'data:image;base64,' удаляется перед отправкой */
              vm.$emit(initParam.event, imgBase64.split(',')[1]);
            };
          },
          error(error) {
            /* TODO: можно добавить изображение с каким нибудь шаблоном 
            для тех файлов что по какой либо причине не загрузились и 
            выводить их в DOM. Но надо ли? */
            console.log(error.message);
          }
        });
      };
      const encodeImageFileAsURL = element => {
        compessorWorker(element, {
          quality: 0.85,
          width: 1200,
          height: 1200,
          htmlAppendElem: `dropZone--gallery--full`,
          htmlAppendClass: "dropZone--gallery--full--img",
          base64Result: vm.image,
          event: "dropImage"
        });
      };
      const makeThumbnail = element => {
        compessorWorker(element, {
          quality: 0.85,
          width: 400,
          height: 400,
          htmlAppendElem: `dropZone--gallery--thumbnail`,
          htmlAppendClass: "dropZone--gallery--thumbnail--img",
          base64Result: vm.thumbnail,
          event: "dropThumbnail"
        });
      };

      [...files].forEach(element => {
        encodeImageFileAsURL(element);
        makeThumbnail(element);
      });
    }
  }
};
</script>

<style lang='less'>
.dropZone {
  border: 2px dashed var(--grey);
  border-radius: 0px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  text-align: center;
  overflow: hidden;

  &.highlight {
    border-color: var(--button--hover--bg);
  }

  &--hide {
    width: 20px;
    height: 20px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }
}

.dropZone--form {
  margin-bottom: 10px;
  &--text {
    margin-top: 0;
    &--limits {
      font-size: 12px;
    }
  }
  &--button {
    padding: 10px;
    cursor: pointer;
    margin-top: 0;
    border: 1px solid #ccc;
    &:hover {
      background: var(--button--hover--bg);
    }
  }
}

.dropZone--gallery {
  margin-top: 10px;
  &--full {
    display: none;
    &--img {
      width: 250px;
      max-width: 100%;
      margin-bottom: 10px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  &--thumbnail {
    &--img {
      width: 150px;
      margin-bottom: 10px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>