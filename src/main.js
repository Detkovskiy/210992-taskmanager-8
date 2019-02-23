import renderFilter, {filtersSection} from '../src/make-filter.js';
import renderCard from '../src/make-task.js';

const filtersName = [
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

renderFilter(filtersName);
renderCard(7);

/* Обработчик выбора фильтра */
const getRandomFromInterval = (min, max) => Math.random() * (max - min) + min;
filtersSection.addEventListener(`change`, () => renderCard(getRandomFromInterval(3, 10)));
