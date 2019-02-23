import filterTemplate from '../src/make-filter.js';
import cardTemplate from '../src/make-task.js';

const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const filtersName = [
  {
    label: `ALL`,
    count: 5,
    checked: true,
  },
  {
    label: `Overdue`,
    count: 2
  },
  {
    label: `Today`,
    count: 2
  },
  {
    label: `Favorites`,
    count: 2
  },
  {
    label: `Repeating`,
    count: 2,
    disabled: true
  },
  {
    label: `Tags`,
    count: 2
  },
  {
    label: `Archive`,
    count: 2,
    disabled: true
  }
];

const getRandomFromInterval = (min, max) => Math.random() * (max - min) + min;

const renderFilter = (filters) => {
  let content = ``;

  /* Заполнение шаблона */
  filters.forEach((filter) => {
    content += filterTemplate(filter);
  });

  /* Вывод фильтров на станицу */
  render(filtersSection, content);

  /* Обработчик выбора фильтра */
  filtersSection.addEventListener(`change`, () => renderCard(getRandomFromInterval(3, 10)));
};

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

/* Функция отрисовки карточки */
const renderCard = (count) => {
  let content = ``;
  let i = 0;

  while (i < count) {
    content += cardTemplate();
    i++;
  }

  /* Вывод фильтров на станицу */
  render(boardTasks, content);
};

renderFilter(filtersName);
renderCard(7);
