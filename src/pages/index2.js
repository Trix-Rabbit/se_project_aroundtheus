import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage.js";
// import { openModal, closeModal, closeModalOnRemoteClick} from "../utils/utils.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

// ********** Profile / User Info 
// Form, Modal & Button
const profileForm = document.forms["profile-form"];
  // form
const profileEditModal = document.querySelector("#profile-edit-modal");
  // Default Data Value 
const profileTitle = document.querySelector(".profile__title");               // Jacques Cousteau
const profileDescription = document.querySelector(".profile__description");   // Explorer
  // Input Data Value
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");


// Create userInfo object
// Store Default value to userInfo object
const userInfo = new UserInfo(profileTitle, profileDescription);

// Edit Profile Button
const profileEditButton = document.querySelector("#profile-edit-button");

// Edit Button Clicked - Handled by listener
profileEditButton.addEventListener("click", () => {
  // alert("profileEditButton clicked.");
  
  //fill profile Form
  const profileData = userInfo.getUserInfo();

  profileTitleInput.value = profileData.profileTitle;
  profileDescriptionInput.value = profileData.profileDescription;

  profileSavePopup.open();
});

// Save button clicked
const profileSavePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  // alert("profileSavePopup clicked.");
  userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileSavePopup.close();
});

// Save Button Set Event Listener
profileSavePopup.setEventListeners();
// ********** Profile / User Info ************* END



// ************** Preview Card
// Preview Card
// Modal Only (No Forms or Button or Data)

const previewImageModal = new PopupWithImage("#preview-image-modal");
// const previewImageModal = document.querySelector("#preview-image-modal");
previewImageModal.close();

// ************** Preview Card ********** END


// ************** Card Template
// Declarations
const cardsWrap = document.querySelector(".cards__list");
const cardSelector = "#card-template";

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
// ************** Card Template END


// ************** Add Card *******************
// data fields
const cardTitleInput = document.querySelector("#add-card-title-input");
const cardUrlInput = document.querySelector("#add-card-image-url");

const addCardModal = new PopupWithForm("#add-card-modal", (cardData) => {
  alert("addCardModal clicked 1. " + cardData.name + ", " + cardData.link);

  //create a new card
  const newCard = createCard(cardData);
  addCardModal.close();
  // BUG HERE
  alert("addCardModal clicked 2. " + newCard.name + ", " + newCard.link);
  cardSection.addItem(newCard);
});

const addNewCardButton = document.querySelector("#profile__add-button");
// const addNewCardButton = document.querySelector("#profile__add-button");

//create a card instance
function createCard(data) {
  alert("createCard 1 " + data.name + ", " + data.link);
  const newCard = [
    {
      name: cardTitleInput,
      link: cardUrlInput,
    },
  ];

  alert("createCard 2 " + cardTitleInput.textContent + ", " + cardUrlInput.textContent);

  const card = 
    new Card({cardData: data, handleCardClick: (cardImage) => {previewImagePopup.open(cardImage);},}, cardSelector);

  alert("createCard 3 " + card.name + ", " + card.link);
  return card.getView();
}

addNewCardButton.addEventListener("click", () => {
  // alert("addNewCardButton clicked.");
  addCardModal.open();
});
//handle submit
addCardModal.setEventListeners();

// ************** Add Card ******************* END

// ************** Render Cards
//create a section of cards
const cardSection = new Section(
  {
    items: cardData,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  cardsWrap
);

// renderCard loads when the form loads in the beginning
const renderCard = (data, cardsWrap) => {
  // alert("renderCard: " + data.name + ", "  + data.link);
  const card = 
    new Card({cardData: data, handleCardClick: (cardImage) => {previewImagePopup.open(cardImage);},}, cardSelector);    
  cardsWrap.prepend(card.getView());
};

// cardData.forEach((cardData) => alert(cardData.name + cardData.link));
cardData.forEach((cardData) => renderCard(cardData, cardsWrap));
// ************** Render Cards *************** END


// ************** Validation *********************
const config = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "modal__input-error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  errorClass: "modal__error",
};

//initialize form validation Edit Profile and Add Card
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();

// Form, Modal & Button
const cardForm = document.forms["add-card-form"];

const addCardValidator = new FormValidator(config, cardForm);
addCardValidator.enableValidation();



