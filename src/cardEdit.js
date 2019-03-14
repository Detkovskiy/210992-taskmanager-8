import {getDateDeadline, getTimeDeadline} from '../src/utils';
import {Component} from '../src/component';

export class CardEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._colors = [`black`, `yellow`, `blue`, `green`, `pink`];
    this._color = `black`;
    this._cardNumber = data.cardNumber;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get template() {
    return `<article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}" style="">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="4 MARCH" name="date" value="${getDateDeadline(this._dueDate)}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${getTimeDeadline(this._dueDate)}">
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                        <div class="card__repeat-days-inner">
                          ${Object.entries(this._repeatingDays).map(([day, isChecked]) => ` 
                            <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-${this._cardNumber}" name="repeat" value="${day}" ${isChecked ? `checked` : ``}>
                            <label class="card__repeat-day" for="repeat-${day}-${this._cardNumber}">${day}</label>`).join(``)}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                      ${[...this._tags].map((it) => `
                        <span class="card__hashtag-inner">
                          <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                          <button type="button" class="card__hashtag-name">
                            #${it}
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`).join(``)}
                      </div>

                      <label>
                        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input type="file" class="card__img-input visually-hidden" name="img">
                    <img src="${this._picture}" alt="task picture" class="card__img">
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${this._colors.map((color) => `
                      <input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === this._color ? `checked` : ``}> 
                      <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>
                    `).join(``)}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => {
        target.tags.add(value);
      },
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => target.dueDate[value]
    };
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: this._state.isDate === false ? null : new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = CardEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
  }

  unbind() {
    this._element.removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }
}
