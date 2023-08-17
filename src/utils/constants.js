// Form, Modal & Button

  // form
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
export const cardForm = document.forms["add-card-form"];

  // Input Data Value
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector("#profile-description-input");

// Declarations

// Create userInfo object

// Form
export const profileForm = document.forms["profile-form"];

// Default Data Value 
export const profileTitle = document.querySelector(".profile__title");               // Jacques Cousteau
export const profileDescription = document.querySelector(".profile__description");   // Explorer

// Edit Profile Button
export const profileEditButton = document.querySelector("#profile-edit-button");

// Add new card
export const addNewCardButton = document.querySelector("#profile__add-button");
// const addCardBtn = document.querySelector(".profile__add-button");

// data fields
const cardTitleInput = document.querySelector("#add-card-title-input");
const cardUrlInput = document.querySelector("#add-card-image-url");

// Add Card  
export const cardsWrap = document.querySelector(".cards__list");
export const cardSelector = "#card-template";

export const cardData = [
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

export const config = {
    formElement: ".modal__form",
    inputSelector: ".modal__input",
    inputErrorClass: "modal__input-error",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    errorClass: "modal__error",
  };