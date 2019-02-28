export const renderFilter = (filters) => {
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

  return content;
};
