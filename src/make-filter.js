const filtersSection = document.querySelector(`.main__filter`);

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {filtersSection};
export default (filters) => {
  let content = ``;

  /* Шаблон фильтра */
  const getfilter = (filter) => (
    `<input
      type="radio"
      id="filter__${filter.label}"
      class="filter__input visually-hidden"
      name="filter"
      ${filter.checked ? `checked` : ``}
      ${filter.disabled ? `disabled` : ``}
    />
    <label 
      for="filter__${filter.label}" 
      class="filter__label">${filter.label} 
      <span class="filter__${filter.label}-count">${filter.count}</span>
    </label>`
  );

  /* Заполнение шаблона */
  filters.forEach((filter) => {
    content += getfilter(filter);
  });

  /* Вывод фильтров на станицу */
  render(filtersSection, content);
};
