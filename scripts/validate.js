function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
// console.log("4. showInputError");
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);

// console.log(errorMessageEl);
// console.log(inputErrorClass);
// console.log(inputEl.validationMessage);
// console.log(errorClass);

}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // console.log("5. hideInputError");
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  // console.log("3. checkInputValidity");
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  // console.log("6. hasInvalidInput");
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

/*
Review Feedback: According to the checklist:
The Submit button is inactive if at least one of the fields doesn't pass validation.
You should disable submit button here, when initializing validation, 
so when a user first opens a form the submit button will be disabled. 
Use toggleButtonState function for that.
*/

function hasErrors(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasErrors(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}


function setEventListeners(formEl, options) {
  // console.log("2. setEventListeners");
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });

  // Calls toggleButtonState during initialization
  toggleButtonState(inputEls, submitButton, options);
}

// validation function
function enableValidation(options) {
// console.log("1. enableValidation");
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });

}

// From Video for project 6 @10:30
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// enabling validation by calling enableValidation()
enableValidation(config);