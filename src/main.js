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

const getMoreCard = (count) => {
  let i = 0;
  const fragment = document.createDocumentFragment();

  while (count > i) {
    const getDataForCard = getCard();
    const cardTask = new Card(getDataForCard);
    const editCardTask = new CardEdit(getDataForCard);

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

    fragment.appendChild(cardTask.render());
    i++;
  }

  boarCardTasks.appendChild(fragment);

};

getMoreCard(20);
