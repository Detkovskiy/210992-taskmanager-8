import {getRandomFromInterval, getRandomDate, getRandomTags} from '../src/utils';

export const getCard = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomFromInterval(0, 3)],
  dueDate: getRandomDate(),
  tags: new Set(getRandomTags(getRandomFromInterval(0, 4), [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ])),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': getRandomFromInterval(0, 2),
    'tu': getRandomFromInterval(0, 2),
    'we': getRandomFromInterval(0, 2),
    'th': getRandomFromInterval(0, 2),
    'fr': getRandomFromInterval(0, 2),
    'sa': getRandomFromInterval(0, 2),
    'su': getRandomFromInterval(0, 2),
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
