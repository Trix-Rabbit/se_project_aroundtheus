import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  setSubmitAction(action) {
    // alert("setSubmitAction. set action = " + action);
    this._submitButton = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton = this._popupElement.querySelector(".modal__button");
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      // console.log(evt);
      // console.log("this button is listening");
      this._submitButton();
    });
  }
}

