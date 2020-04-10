import Quill from 'quill';
require('../common/quillSnow.css');



<div class="edit">
<div class="edit--button--wrapper">
  <button v-on:click="preparePost('Текст новости')" class="edit--button-add-New" v-show="!quillShow" title="Добавить новую запись"> <i class="fa fa-plus" aria-hidden="true">  Новою запись</i></button>
  <button  class="edit--button-post" title="Опубликовать" v-show="quillShow" v-on:click="addPost">Опубликовать</i></i></button>
</div>
<div  v-show="quillShow">
  <div> <input type="text" placeholder="Заголовок новости" class="edit--input-header" v-model="newPost.header"> </div>
  <div id='editor-container' class= "card" v-show="quillShow"></div>
  <div class="edit--tags">
      <select v-model="newPost.tag">
        <option v-for="option in this.$store.state.tags">
          {{ option }}
        </option>
      </select>
  </div>
</div>
</div>


 preparePost: function (state) {
          this.quillShow = true;
          const makeEdit = (elem) => {
            const container = document.getElementById(elem);
            const toolbarOptions = {
               container: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'color', 'underline'],
                  ['blockquote', 'align', 'formula'],
                  ['image','video', 'code-block', ],
                  [{ 'header': 1 }, { 'header': 2 }], 
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['clean'],     
                  ],
            };
            const editor = new Quill(container, {
              modules:{ 
                  toolbar: toolbarOptions,
              },
              placeholder: state,
              theme: 'snow'
              });
              return editor;
            };
         // ql-toolbar
          if (this.isEditCreate === false){
            this.newPostContent = makeEdit('editor-container');  // Передаем обьект editor
            // из которого в дальнейшем будем извлекать текс поста
            // через замыкания он доступен глобально  
            //this.newPostContent2 = makeEdit('editor-container-2'); // ????
            this.isEditCreate = true;
          }
    },
    addPost: function () {
      this.quillShow = false;
      let allData = false;
      this.newPost.content = this.newPostContent.root.innerHTML;
      this.newPost.date = new Date().toLocaleString("ru", this.dateOpt);
      this.newPost.author = this.$store.state.user; // this.$store.getters.getName; геттеры вызываются так  
      if(this.newPostContent.root.innerHTML === "<p><br></p>" ||
        this.newPost.header === undefined ||
        this.newPost.tag === undefined) {
          alert("Заполните все данные для публикации новости");
        } else {
        this.$socket.emit("addPost", [this.newPost,"news"]);
        alert('Новость добавлена');
      }
      this.showEdit = false;
    },


    