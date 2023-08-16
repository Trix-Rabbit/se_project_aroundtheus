export default class Section {
  constructor({ items, renderer }, cardElements) {
    this._items = items;
    this._renderer = renderer;
    this._cardElements = cardElements;

    // alert("Section Init. ");
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // alert("Section addItem. " + element);
    this._cardElements.prepend(element);
  }
}
