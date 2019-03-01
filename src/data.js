import {getRandomFromInterval} from '../src/utils.js';

export const card = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomFromInterval(0, 3)],
  dueDate: Date.now() + 1 + Math.floor(((Math.random() > 0.5) ? 1 : -1) * (Math.floor(Math.random() * 7))) * 24 * 60 * 60 * 1000,
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
