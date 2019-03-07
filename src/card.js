import {createElement, getDateDeadline, getTimeDeadline} from '../src/utils';

export class Card {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._element = null;
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === 1);
  }

  _checkDeadline() {
    const now = new Date();
    return this._dueDate < now;
  }

  get template() {
    return `<article class="card card--${this._color} ${this._checkDeadline() ? `card--deadline` : ``} ${this._isRepeated() ? `card--repeat` : ``}" style="">
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
                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="4 MARCH" name="date" value="${getDateDeadline(this._dueDate)}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${getTimeDeadline(this._dueDate)}">
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

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unRender() {
    this.unbind();
    this._element = null;
  }
}

