import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

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


// Profile
const profileForm = document.forms["profile-form"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardsWrap = document.querySelector(".cards__list");

// Edit Card
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");

// Add Card
const addNewCardButton = document.querySelector(".profile__add-button");
const cardForm = document.forms["add-card-form"];
const addCardModal = document.querySelector("#add-card-modal");

// Preview Card
const previewImageModal = document.querySelector("#preview-image-modal");

//Form Data
const nameInput = document.querySelector("#profile-title-input");
const jobInput = document.querySelector("#profile-description-input");
const cardTitleInput = addCardModal.querySelector("#add-card-title-input");
const cardUrlInput = addCardModal.querySelector("#add-card-image-url");


// Listeners (Edit)
profileEditModal.addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closeModal(profileEditModal);
  }
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Listeners (Add)
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
cardForm.addEventListener("submit", handleAddCardFormSubmit);

// Listener (Preview)
previewImageModal.addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closeModal(previewImageModal);
  }
});


//Form Data
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description");

  cardTitleEl.textContent = cardData.title;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.title;
  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
  editProfileValidator.resetValidation();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  cardForm.reset();

  addCardValidator.resetValidation();
}


const cardSelector = "#card-template";
const renderCard = (data, cardsWrap) => {
  const card = new Card(data, cardSelector);
  cardsWrap.prepend(card.getView());
};

cardData.forEach((cardData) => renderCard(cardData, cardsWrap));
const config = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inputErrorClass: "modal__error",
};

//initialize form validation Edit Profile and Add Card
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(config, cardForm);
addCardValidator.enableValidation();
