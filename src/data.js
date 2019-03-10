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
    'Mo': getRandomFromInterval(0, 2),
    'Tu': getRandomFromInterval(0, 2),
    'We': getRandomFromInterval(0, 2),
    'Th': getRandomFromInterval(0, 2),
    'Fr': getRandomFromInterval(0, 2),
    'Sa': getRandomFromInterval(0, 2),
    'Su': getRandomFromInterval(0, 2),
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
