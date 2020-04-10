// Для инициализации нужна только ссылка на экземпляр Vue
// инициализируется в div id="map"

// нужно сделать более универсальной, а то сейчас все пишет в newShelter
export default (Location = '') => {
    return new Promise((resolve, reject) => {
        const init = () => {
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
                    let zoom = 9;
                    if(Location === "Russia") {
                        initCoordinates.x = "62.506";
                        initCoordinates.y = "82.459";
                        zoom = 3;
                    }
                    resolve(new ymaps.Map("map", {
                        center: [initCoordinates.x, initCoordinates.y],
                        zoom: zoom,
                        behaviors: ['drag', 'multiTouch', 'dblClickZoom', 'scrollZoom'],
                        controls: []
                    }));
                });
        };
        const yampsInitThenLoad = init => {
            if (global.ymaps === void 0)
                setTimeout(() => {
                    yampsInitThenLoad(init);
                }, 500)
            else {
                global.ymaps.ready(init);
                
            }
        };
        yampsInitThenLoad(init);
    });
}