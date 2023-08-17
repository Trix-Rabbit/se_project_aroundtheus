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

// ************** Preview Card
// Preview Card
const previewImagePopup = new PopupWithImage("#preview-image-modal");
// const previewImageModal = document.querySelector("#preview-image-modal");
previewImagePopup.close();

// ************** Preview Card ********** END

// ************** Add / Render Cards ***************

//create a card instance
function createCard(data) {
  // alert ("createCard. " + data.name + ", " + data.link);
  const cardElement = new Card(
    {
      cardData: data,
      handleCardClick: (cardImage) => {
        previewImagePopup.open(cardImage);
      },
    },
    cardSelector
  );
  return cardElement.generateCard();
}

//Inital Rendering of cards
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

//render initial cards
cardSection.renderItems(cardData);

// Add new card
const addNewCardButton = document.querySelector("#profile__add-button");
// const addCardBtn = document.querySelector(".profile__add-button");

// data fields
const cardTitleInput = document.querySelector("#add-card-title-input");
const cardUrlInput = document.querySelector("#add-card-image-url");


function handleCreateButton(inputValues) {
  // alert("handleCreateButton");
  // alert("inputValues.name = " + inputValues.name + ", link = " + inputValues.link);
  const { name, link } = inputValues;
  const newCard = createCard({ name, link });

  cardSection.addItem(newCard);
  addNewCardPopUp.close();
}
const addNewCardPopUp = new PopupWithForm("#add-card-modal", handleCreateButton);

addNewCardButton.addEventListener("click", () => {
  // alert("addNewCardButton clicked.");
  addNewCardPopUp.open();}
  );

//handle submit
addNewCardPopUp.setEventListeners();

// ************** Add / Render Cards *************** END


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



