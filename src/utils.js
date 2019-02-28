export default (min, max) => Math.floor(Math.random() * (max - min) + min);

/* Функция отрисовки контента */
export const render = (root, content) => {
  root.innerHTML = content;
};

