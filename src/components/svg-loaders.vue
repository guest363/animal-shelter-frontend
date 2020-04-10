<template>
  <div class="wrapper--loader">
    <h2 class="loader--header">Загрузка</h2>
  </div>
</template>

<script>
/**
 * Создает анимацию загрузки / ожидания
 * На данный момент только в виде точек
 */
const SVGloaders = {
  name: "SVGloaders",
  data: () => {
    return {
      type: {
        dots: vm => {
          const addDomElement = (rootElem, number, color) => {
            const svgNS = "http://www.w3.org/2000/svg";
            const fragment = document.createDocumentFragment();
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", 300);
            svg.setAttribute("height", 150);
            for (let index = 0; index < number; index++) {
              const circle = document.createElementNS(svgNS, "circle");
              circle.setAttributeNS(null, "class", "circle");
              const position = () => {
                if (number % 2 > 0) {
                  return (
                    300 / 2 -
                    number * 30 +
                    (((number - 1) / 2) * 30 + 15) +
                    15 +
                    index * 30
                  );
                } else
                  return (
                    300 / 2 - number * 30 + (number / 2) * 30 + 15 + index * 30
                  );
              };
              circle.setAttributeNS(null, "cx", position());
              circle.setAttributeNS(null, "cy", 75);
              circle.setAttributeNS(null, "r", "10");
              circle.style.fill = color[index];
              fragment.appendChild(circle);
            }
            svg.appendChild(fragment);
            rootElem.appendChild(svg);
          };
          const loaderInit = () => {
            const circle = Array.prototype.slice.call(
              document.getElementsByClassName("circle")
            ); //remember
            let currentAnimationTime = 0;
            const centreY = 75;
            const animate = () => {
              circle.reduce((latency, c) => {
                c.setAttribute(
                  "cy",
                  centreY + 20 * Math.sin(currentAnimationTime + latency)
                );
                return latency + 1;
              }, 0);
              currentAnimationTime += 0.15; //speed
              requestAnimationFrame(animate);
            };
            animate();
          };
          addDomElement(vm.$el, vm.prop.number, vm.prop.color);
          loaderInit();
        }
      }
    };
  },
  props: {
    prop: {
      type: Object,
      default: function() {
        return {
          type: "dots",
          number: 5,
          color: ["#6f988b", "#acc9bd", "#fac999", "#e6790d", "#b24201"]
        };
      }
    }
  },
  mounted() {
    /* Для диспечеризации  вида анимашки которая задаятся как функция обьекта type*/
    this.type[this.prop.type](this);
  }
};
export default SVGloaders;
</script>



<style scoped>
.wrapper--loader {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 300;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  background-color: var(--opacity--fill);
}
.loader--header {
  display: block;
  text-align: center;
  font-size: 3em;
  width: 100%;
  color: var(--green-extra-light);
}
</style>
