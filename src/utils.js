const moment = require(`moment`);

const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomDate = () => Date.now() + Math.floor(((Math.random() > 0.5) ? 1 : -1) * (Math.floor(Math.random() * 7))) * 24 * 60 * 60 * 1000;

const getRandomTags = (count, arr) => {
  const arrTags = [];
  const sizeArr = arr.length < count ? arr.length : count;

  for (let i = 0; i < sizeArr; i++) {
    arrTags.push(arr[i]);
  }

  return arrTags;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/* Обработка timestamp */
const getTimeDeadline = (timestamp) => {
  const date = new Date(timestamp);
  const noon = (date.getHours() >= 12) ? `AM` : `PM`;
  return date.getHours() + `:` + date.getMinutes() + ` ` + noon;
};

const getDateDeadline = (timestamp) => {
  const date = new Date(timestamp);
  const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

  return date.getDate() + ` ` + months[date.getMonth()];
};

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {getRandomFromInterval, getRandomDate, getRandomTags, createElement, getTimeDeadline, getDateDeadline, render, moment};
