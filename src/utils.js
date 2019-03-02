const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomDate = () => Date.now() + Math.floor(((Math.random() > 0.5) ? 1 : -1) * (Math.floor(Math.random() * 7))) * 24 * 60 * 60 * 1000;

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {getRandomFromInterval, getRandomDate, render};
