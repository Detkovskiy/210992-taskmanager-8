import {getRandomFromInterval, getRandomDate} from '../src/utils.js';

export const card = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomFromInterval(0, 3)],
  dueDate: getRandomDate(),
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': getRandomFromInterval(0, 2)
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][getRandomFromInterval(0, 5)],
  isFavorite: false,
  isDone: true
});
