import {createElement} from '../src/utils';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._repeatingDays = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unRender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}

  isRepeated() {
    return Object.values(this._repeatingDays).filter((it) => it).length;
  }
}
