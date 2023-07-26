import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal, closeModalOnRemoteClick} from "../utils/utils.js";

const cardData = [
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

const cardsWrap = document.querySelector(".cards__list");

// Profile 
// Form, Modal & Button
const profileForm = document.forms["profile-form"];
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
// data fields - Displayed text
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
// data fields - New Text
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// End Profile

// Add Card
// Form, Modal & Button
const cardForm = document.forms["add-card-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector("#profile__add-button");
// data fields
const cardTitleInput = addCardModal.querySelector("#add-card-title-input");
const cardUrlInput = addCardModal.querySelector("#add-card-image-url");
// End Add Card

// Preview Card
// Modal Only (No Forms or Button or Data)
const previewImageModal = document.querySelector("#preview-image-modal");
// End Preview Card


// Listeners *****

// Profile ***
// Open Modal
profileEditButton.addEventListener("click", (e) => {
  // console.log("profileEditButton clicked. Open profileEditModal.");
  // Load Value of text to input
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// Close Modal 
profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick)
// profileEditModal.addEventListener("mousedown", (e) => {
//   console.log("profileEditModal mousedown. Close profileEditModal.");
//   if (e.target.classList.contains("modal") || e.target.classList.contains("modal__close")) 
//     closeModal(profileEditModal);
// });

// Save button + validation
profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(e) {
  e.preventDefault();
  // Update data field to input value
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  editProfileValidator.resetValidation();
}
// Profile End ***

// Add Card ***
// Open Modal
addNewCardButton.addEventListener("click", (e) => 
{
  // console.log("addNewCardButton clicked.  Open addCardModal");
  openModal(addCardModal);
});

// Close Modal
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
// addCardModal.addEventListener("mousedown", (e) => {
//   console.log("addCardModal mousedown. Close addCardModal");
//   if (e.target.classList.contains("modal") || e.target.classList.contains("modal__close"))
//     closeModal(addCardModal);
// });

cardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  cardForm.reset();
  addCardValidator.resetValidation();
}
// Add Card End ***

// Preview ***
previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);
// previewImageModal.addEventListener("mousedown", (e) => {
//   console.log(e.target);
//   if (e.target.classList.contains("modal") || e.target.classList.contains("modal__close")) 
//     closeModal(previewImageModal);
// });
// Preview End ***

// Listeners End *****

// Card Template
const cardSelector = "#card-template";
const renderCard = (data, cardsWrap) => {
  const card = new Card(data, cardSelector);
  cardsWrap.prepend(card.getView());
};

cardData.forEach((cardData) => renderCard(cardData, cardsWrap));
const config = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "modal__input-error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  errorClass: "modal__error",
};

//initialize form validation Edit Profile and Add Card
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(config, cardForm);
addCardValidator.enableValidation();
