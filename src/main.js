import {render} from '../src/utils.js';
import {renderFilter} from '../src/make-filter';
import {getCard} from '../src/data';
import {Card} from "../src/card";
import {CardEdit} from "../src/cardEdit";

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

render(filtersSection, renderFilter(FILTER_NAME));

const getDataForCard = getCard(1);
const cardTask = new Card(getDataForCard);
const editCardTask = new CardEdit(getDataForCard);

cardTask.onEdit = () => {
  editCardTask.render();
  boarCardTasks.replaceChild(editCardTask.element, cardTask.element);
  cardTask.unRender();
};

editCardTask.onSubmit = (newObject) => {
  getDataForCard.title = newObject.title;
  getDataForCard.tags = newObject.tags;
  getDataForCard.color = newObject.color;
  getDataForCard.repeatingDays = newObject.repeatingDays;
  getDataForCard.dueDate = newObject.dueDate;

  cardTask.update(getDataForCard);
  cardTask.render();
  boarCardTasks.replaceChild(cardTask.element, editCardTask.element);
  editCardTask.unRender();
};

boarCardTasks.appendChild(cardTask.render());

