import moment from '../node_modules/moment/moment.js';
import {Component} from '../src/component';

export class Card extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _checkDeadline() {
    return this._dueDate === null ? false : this._dueDate < new Date();
  }

  get template() {
    return `<article class="card card--${this._color} ${this._checkDeadline() ? `card--deadline` : ``} ${this.isRepeated() ? `card--repeat` : ``}" style="">
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
                      <fieldset class="card__date-deadline"  ${!this._dueDate && `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="4 MARCH" name="date" value="${this._dueDate && moment(this._dueDate).format(`DD MMMM`)}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${this._dueDate && moment(this._dueDate).format(`hh:mm a`)}">
                        </label>
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
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input type="file" class="card__img-input visually-hidden" name="img">
                    <img src="${this._picture}" alt="task picture" class="card__img">
                  </label>
                 </div>
              </div>
            </form>
          </article>`;

  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }
  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }
}

