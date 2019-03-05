import {render} from '../src/utils';

import {renderFilter} from '../src/make-filter.js';
import {getCard} from '../src/data.js';
import {Card} from "./card";
import {CardEdit} from "./cardEdit";

const filtersSection = document.querySelector(`.main__filter`);
const boarCardTasks = document.querySelector(`.board__tasks`);
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

const cardTask = new Card(getCard());
const editCardTask = new CardEdit(getCard());

boarCardTasks.appendChild(cardTask.render());

cardTask.onEdit = () => {
  editCardTask.render();
  boarCardTasks.replaceChild(editCardTask.element, cardTask.element);
  cardTask.unRender();
};

editCardTask.onSubmit = () => {
  cardTask.render();
  boarCardTasks.replaceChild(cardTask.element, editCardTask.element);
  editCardTask.unRender();
};

