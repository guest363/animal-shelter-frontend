/* pushNewAnimal: (dbRef, data) => {
  return new Promise((resolve, reject) => {
    let countPhoto = 0;
    let countThumbnail = 0;
    // Если у данных нет значения в поле [_id] то сгенерировать им новый id
    // Или же мы используемый переданный и тогда данные в firestore заменяются
    // а не создаются новые
    data['_id'] = data['_id'] ? data['_id'] : db.collection(dbRef).doc().id;
    //----=== Как будут называться оригинальные изображения и куда их загружать ====----
    const mountainImagesRef = (count) => {
      return storageRef.child('/animal/photo/' + data['_id'] + '/' + count);
    };
    const mountainImagesThumbnailRef = (count) => {
      return storageRef.child(
        '/animal/photo/' + data['_id'] + '/thumbnail-' + count,
      );
    };
    //---==== Начать загрузку всех переданных изображений при этом вернув промисы ====----
    const photo = data.photo.map((item) => {
      const promis = new Promise((res, _reject) => {
        let uploadTask = mountainImagesRef(countPhoto).putString(
          item,
          'data_url',
        );
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          function(error) {
            // Handle unsuccessful uploads
          },
          function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log('File available at', downloadURL);
                res(downloadURL);
              });
          },
        );
        countPhoto++;
      });
      return promis;
    });
    const thumbnail = data.thumbnail.map((item) => {
      const promis = new Promise((res, _reject) => {
        let uploadTask = mountainImagesThumbnailRef(countThumbnail).putString(
          item,
          'data_url',
        );
        uploadTask.on(
          'state_changed',
          function(snapshot) {},
          function(error) {
            // Handle unsuccessful uploads
          },
          function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log('File available at', downloadURL);
                res(downloadURL);
              });
          },
        );
        countThumbnail++;
      });
      return promis;
    });
    // ---===== Добавляет ссылку на файл из хранилища а не хранит в базе картинку ====---
    Promise.all(photo).then((result) => {
      Promise.all(thumbnail).then((resultThumbnail) => {
        /* 				 ---==== Ссылки на оригинальный размер записанны в data.photo 
														а превью в data.thumbnail ===---
        data.photo = result;
        data.thumbnail = resultThumbnail;
        dateBase.writeAnimalToDB(dbRef, data).then((result) => {
          result ? resolve() : reject();
        });
      });
    });
  });
};
 */