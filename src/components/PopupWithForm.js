import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    // alert("PopupWithForm constructor.");

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupInputs = this._popupElement.querySelectorAll(".modal__input");

    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object
    //create an empty object to store the input data
    const inputData = {};

    //grab all the inputs and iterate thru to store the data to the object
    this._popupInputs.forEach((input) => {
      inputData[input.name] = input.value;

      // alert("PopupWithForm_popupInputs. name = " + input.name +  ", value = " + input.value)
    });

    return inputData;
  }

  // P9-9. Improving UX of all forms
  saveInfoListener() {
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButton.textContent = "Saving...";
  }
  // P9-9. Improving UX of all forms
  DefaultSaveInfoListener() {
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButton.textContent = "Save";
  }

  setEventListeners() {
    super.setEventListeners();

    //when form is submitted, make getInputValues to fire
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveInfoListener();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
