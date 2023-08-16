import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(".modal__preview-image");
    this._previewName = this._popupElement.querySelector(".modal__preview-caption");
    // alert("PopupWithImage constructor.");
    super.setEventListeners();
  }

  open(previewImage) {
    this._previewImage.src = previewImage.link;
    this._previewImage.alt = previewImage.name;
    this._previewName.textContent = previewImage.name;
    // alert("PopupWithImage.");
    super.open();
  }
}
