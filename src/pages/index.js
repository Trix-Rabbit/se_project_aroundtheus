import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { 
  addNewCardButton,
  cardForm,
  cardsWrap, 
  cardSelector, 
  cardData,
  config,
  profileEditButton,
  profileForm,
  profileTitleInput,
  profileDescriptionInput
} 
from "../utils/constants";

// ********** Profile / User Info 
const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});
// const userInfo = new UserInfo(profileTitle, profileDescription);

// Store Default value to userInfo object
const handleProfileEditForm = (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.description);
  profileSavePopup.close();
};

// Edit Button Clicked - Handled by listener
profileEditButton.addEventListener("click", () => {
  const newUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = newUserInfo.name;
  profileDescriptionInput.value = newUserInfo.description;
  profileSavePopup.open();
});

// Save button clicked
const profileSavePopup = new PopupWithForm("#profile-edit-modal", handleProfileEditForm);

// Save Button Set Event Listener
profileSavePopup.setEventListeners();
// ********** Profile / User Info ************* END

// ************** Preview Card
// Preview Card
const previewImagePopup = new PopupWithImage("#preview-image-modal");
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

function handleAddCardForm(inputValues) {
  // alert("handleCreateButton");
  // alert("inputValues.name = " + inputValues.name + ", link = " + inputValues.link);
  const { name, link } = inputValues;
  const newCard = createCard({ name, link });
  cardSection.addItem(newCard);
  addNewCardPopUp.close();
}
const addNewCardPopUp = new PopupWithForm("#add-card-modal", handleAddCardForm);

addNewCardButton.addEventListener("click", () => {
  // alert("addNewCardButton clicked.");
    addCardValidator._toggleButtonState();
    addNewCardPopUp.open();
  }
);

//handle submit
addNewCardPopUp.setEventListeners();

// ************** Add / Render Cards *************** END


// ************** Validation *********************

//initialize form validation Edit Profile and Add Card
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(config, cardForm);
addCardValidator.enableValidation();



