export default (min, max) => Math.random() * (max - min) + min;

/* Функция отрисовки контента */
export const render = (root, content) => {
  root.innerHTML = content;
};

