// Для инициализации нужна только ссылка на экземпляр Vue
// инициализируется в div id="map"

// нужно сделать более универсальной, а то сейчас все пишет в newShelter
export default VM => {
  const init = () => {
    let myPlacemark;
    const geolocation = ymaps.geolocation;
    const initCoordinates = {
      x: '',
      y: ''
    };
    geolocation
      .get({
        provider: "yandex",
        mapStateAutoApply: true
      })
      .then(function (result) {
        const firstGeoObject = result.geoObjects.get(0);
        initCoordinates.x = firstGeoObject.properties.getAll().boundedBy[0][0];
        initCoordinates.y = firstGeoObject.properties.getAll().boundedBy[0][1];

        const myMap = new ymaps.Map("map", {
          center: [initCoordinates.x, initCoordinates.y],
          zoom: 9,
          behaviors: ['drag', 'multiTouch', 'dblClickZoom', 'scrollZoom'],
          controls: []
        });
        let searchControl = new ymaps.control.SearchControl({
          options: {
            provider: "yandex#search",
            fitMaxWidth: true,
            float: "left",
            suppressYandexSearch: true
          }
        });
        
    
        myMap.controls.add(searchControl);
        // Слушаем клик на карте.
        myMap.events.add("click", function (e) {
          let coords = e.get("coords");
    
          // Если метка уже создана – просто передвигаем ее.
          if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
          }
          // Если нет – создаем.
          else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add("dragend", function () {
              getAddress(myPlacemark.geometry.getCoordinates());
            });
          }
          getAddress(coords);
        });
    
        // Создание метки.
        const createPlacemark = coords => {
          return new ymaps.Placemark(
            coords, {
              iconCaption: "поиск..."
            }, {
              preset: "islands#blueDogIcon",
              draggable: true
            }
          );
        };
    
        // Определяем адрес по координатам (обратное геокодирование).
        const getAddress = coords => {
          myPlacemark.properties.set("iconCaption", "поиск...");
          ymaps.geocode(coords).then(function (res) {
            const firstGeoObject = res.geoObjects.get(0);
    
            myPlacemark.properties.set({
              // Формируем строку с данными об объекте.
              iconCaption: [
                  // Название населенного пункта или вышестоящее административно-территориальное образование.
                  firstGeoObject.getLocalities().length ?
                  firstGeoObject.getLocalities() :
                  firstGeoObject.getAdministrativeAreas(),
                  // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                  firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                ]
                .filter(Boolean)
                .join(", "),
              // В качестве контента балуна задаем строку с адресом объекта.
              balloonContent: firstGeoObject.getAddressLine()
            });
    
            // Записать данные по локации в Vue
            VM.newShelter.address = firstGeoObject.getAddressLine();
            VM.newShelter.coordinates.latitude = firstGeoObject.properties.getAll().boundedBy[0][0];
            VM.newShelter.coordinates.longitude = firstGeoObject.properties.getAll().boundedBy[0][1];
          });
        };
      });


  };
  const yampsInitThenLoad = init => {
    global.ymaps === void 0 ?
      setTimeout(() => {
        yampsInitThenLoad(init);
      }, 500) :
      global.ymaps.ready(init);
  };
  yampsInitThenLoad(init);
};


// ---------========== Определение геолокации ===========---------------
       /*  geolocation
          .get({
            provider: "yandex",
            mapStateAutoApply: true
          })
          .then(function (result) {
            const firstGeoObject = result.geoObjects.get(0);
            // Красным цветом пометим положение, вычисленное через ip.
            result.geoObjects.options.set("preset", "islands#blueDogIcon");
            firstGeoObject.properties.set({
              balloonContentBody: "Мое местоположение (примерно)"
            });
            myMap.geoObjects.add(result.geoObjects);
          }); */
    
        /* geolocation
          .get({
            provider: "browser",
          })
          .then(function(result) {
            // Синим цветом пометим положение, полученное через браузер.
            // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
            result.geoObjects.options.set("preset", "islands#geolocationIcon");
            myMap.geoObjects.add(result.geoObjects);
          }); */
    
        //------------------------------------------------------------------------