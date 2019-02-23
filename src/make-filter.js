export default (filter) => (
  `<input
      type="radio"
      id="filter__${filter.label.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${filter.checked ? `checked` : ``}
      ${filter.disabled ? `disabled` : ``}
    />
    <label 
      for="filter__${filter.label.toLowerCase()}" 
      class="filter__label">${filter.label} 
      <span class="filter__${filter.label.toLowerCase()}-count">${filter.count}</span>
    </label>`
);
