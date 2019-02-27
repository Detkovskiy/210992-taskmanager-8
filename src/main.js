import renderFilter from '../src/make-filter.js';
import renderCard from '../src/make-task.js';
import getRandomFromInterval, {render} from '../src/utils.js';
import card from '../src/data.js';

const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const FILTER_NAME = [
  {
    label: `all`,
    count: 5,
    checked: true,
  },
  {
    label: `overdue`,
    count: 2
  },
  {
    label: `today`,
    count: 2
  },
  {
    label: `favorites`,
    count: 2
  },
  {
    label: `repeating`,
    count: 2,
    disabled: true
  },
  {
    label: `tags`,
    count: 2
  },
  {
    label: `archive`,
    count: 2,
    disabled: true
  }
];

/* Вывод фильтров на станицу */
render(filtersSection, renderFilter(FILTER_NAME));
render(boardTasks, renderCard(7, card));

/* Обработчик выбора фильтра */
filtersSection.addEventListener(`change`, () => render(boardTasks, renderCard(getRandomFromInterval(3, 10), card)));
