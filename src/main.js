import renderFilter, {filtersSection} from '../src/make-filter.js';
import renderCard from '../src/make-task.js';

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

renderFilter(filtersName);
renderCard(7);

/* Обработчик выбора фильтра */
const getRandomFromInterval = (min, max) => Math.random() * (max - min) + min;
filtersSection.addEventListener(`change`, () => renderCard(getRandomFromInterval(3, 10)));
