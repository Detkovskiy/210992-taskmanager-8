import {getRandomFromInterval, getRandomDate, getRandomTags} from '../src/utils';

export const getCard = (i) => ({
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
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false
  },
  color: `black`,
  isFavorite: false,
  isDone: true,
  cardNumber: i
});
