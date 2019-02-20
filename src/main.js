'use strict';

const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const filtersName = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

/* формирование фильтра */
const filterTemplate = (name, amount = Math.floor(Math.random() * 10), isChecked = false) =>
  `<input
    type="radio"
    id="filter__${name.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
  />
  <label for="filter__${name.toLowerCase()}" class="filter__label">
    ${name} <span class="filter__${name.toLowerCase()}-count">${amount}</span></label
  >`
;

/* Отрисовка фильтров на странице */
(function () {
  filtersName.forEach(function(filter) {
    filtersSection.innerHTML += filterTemplate(filter);
  });
})();

