import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
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
  profileImageForm,
  profileTitleInput,
  profileDescriptionInput
} 
from "../utils/constants";
import Api from "../components/Api.js";


/*
To Do before Review
  P9-5. Creating a popup for deleting a card
  P9-8. Updating profile picture
  P9-9. Improving UX of all forms
*/

/*
// Test API to JSON place holder website - From Video
fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "be5e3227-ee92-459d-a5cd-8875af20cf79",
    "Content-Type": "application/json",
  },
});

/*
// Token generated for P9
{"user":{"name":"Jacques Cousteau","about":"Sailor, researcher"
,"avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg"
,"_id":"9b617158c399c55762dffa84"}
,"token":"be5e3227-ee92-459d-a5cd-8875af20cf79"}

*/

// ********** Profile / User Info 
const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",    // Added Avatar for project 8
});

//Loading user info via API on startup
let userId;

// p9-1. Loading user information from the server **********************
api.getUserInfo()
  .then((userData) => {
    // console.log("api.getUserInfo: userData = ", userData);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    // console.log("api.getUserInfo: userId = ", userId);
  })
  .catch(console.error);

  //Inital Rendering of cards
// First get data through API, then render the cards
let cardSection;

// p9-2. Loading cards from the server  *****************************
api.getInitialCards()
.then((cardDataAPI) => {
  // console.log("api.getInitialCards: cardDataAPI = " + cardDataAPI);
  cardSection = new Section(
    {
      items: cardDataAPI,
      renderer: (data) => {
        const cardElement = createCard(data);
        cardSection.addItem(cardElement);
      },
    },
    cardsWrap
  );
  cardSection.renderItems(cardData);

})
.catch(console.error);


// Store Default value to userInfo object
const handleProfileEditForm = (inputValues) => {
  // profileFormModal.showLoading();

  // P9-3. Editing the profile  ************************************
  api.updateUserInfo(inputValues.name, inputValues.description)
    .then(() => {
      userInfo.setUserInfo(inputValues.name, inputValues.description);
      // profileFormModal.close();
      profileSavePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addNewCardPopUp.DefaultSaveInfoListener();
    });
 

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


function handleAddCardForm(inputValues) {
  // alert("handleCreateButton");
  // alert("inputValues.name = " + inputValues.name + ", link = " + inputValues.link);
  
  // P9-4. Adding a new card  ****************************
  api.createCards(inputValues)
    .then((cardDataAPI) => {
    // console.log("Card: carddata._id = " + cardData._id);
    // console.log("Card: carddata.name = " + cardData.name);
    // console.log("Card: carddata.link = " + cardData.link);
    // console.log("Card: carddata.isLiked = " + cardData.isLiked);
    // console.log("");

        const newCard = createCard(cardDataAPI);
        // const newCard = createCard({ inputValues.name, inputValues.link });
        cardSection.addItem(newCard);
    })
    .then(() => {
      addNewCardPopUp.close();
    })
    .catch((err) => {
      console.error("an error has occurred", err);
    })
    .finally(() => {
      addNewCardPopUp.DefaultSaveInfoListener();
    });
}

// P9-5. Creating a popup for deleting a card *************************
// 1. Delcare new popup in index.html, index.js
// 2. Create new PopUpWithConfirmation.js
// 3. Handled when the delete button is clicked.  (See P9-6, handleDeleteClick)
//  Already have this. Just need to call the new popup.

const popupConfirm = new PopupWithConfirmation({
  popupSelector: "#confirm-delete-modal",
});
popupConfirm.setEventListeners();


// ************** Add / Render Cards 
//create a card instance
function createCard(card) {
  const cardElement = new Card(
    {
      cardData: card,
      handleCardClick: (cardImage) => {
        previewImagePopup.open(cardImage);
      },

      // P9-6. Deleting a card  ******************************
      handleDeleteClick: () => {
        // alert("handleDeleteClick. Card Id = " + card._id);
        popupConfirm.setSubmitAction(() => {
          // alert("popupConfirm action clicked");
          api.deleteCard(card._id)
          .then((res) => {
            cardElement.handleDeleteButton();
          })
          .catch(console.error)
          .finally(() => {
            popupConfirm.close();
          });
        });
        popupConfirm.open();
      },

      // P9-7. Adding and removing likes  *****************************
      handleLikeClick: () => {
          // alert("handleLikeClick. isLiked = " + card.isLiked);
        api.updateLikes(card._id, card.isLiked)
        .then((res) => {
          card.isLiked = res.isLiked;
          cardElement.handleLikeButton();
        })
        .catch(console.error);
      },
    },
    cardSelector
  );
  return cardElement.generateCard();
}


const addNewCardPopUp = new PopupWithForm("#add-card-modal", handleAddCardForm);

addNewCardButton.addEventListener("click", () => {
  // alert("addNewCardButton clicked.");
    addCardValidator.toggleButtonState();
    addNewCardPopUp.open();
  }
);

//handle submit
addNewCardPopUp.setEventListeners();


// ************** Preview Card
// Preview Card
const previewImagePopup = new PopupWithImage("#preview-image-modal");


// P9-8. Updating profile picture *********************************
// A new popup form needs a few things
// 1. It needs to handle when the avatar imgage is clicked
//    1.1.  Declare profileImageContainer
//    1.2.  Add Listener for mousedown event to open the PopUpForm

// 2. It needs to handle validation and close button when the form is open.
//    2.1. Code need to be added to index.html defining the form
//    2.2. Declare handleProfileImageForm in index.js and set listener

// 3. Handle the events in the form
//  3.1.  Get inputvalue - link.  Index.js gets this by the name attribute in index.html
//  3.2. When save is clicked
//    3.2.1. Update the link via API
//    3.2.2. Update the value locally
//  3.3.  Need to enable validation
//  3.4.  Close form.  Event is handled by Pop Up form

// 4. Define and enable validation

// See #3 for P9-8
const handleProfileImageForm = (inputValues) => {
  // alert("handleProfileImageForm: " + inputValues.link);

  api.updateUserAvatar(inputValues.link)
    .then((res) => {
      userInfo.setUserAvatar(inputValues.link);
    })
  .then(() => {
    editProfileImage.close();
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    editProfileImage.DefaultSaveInfoListener();
  });

};

// See #2 for P9-8
const editProfileImage = new PopupWithForm("#profile-image-modal", handleProfileImageForm);
editProfileImage.setEventListeners();

const profileImageContainer = document.querySelector("#profile-avatar-edit");
  profileImageContainer.addEventListener("mousedown", () => {
  editProfileImage.open();
});


// See #1 for P9-8
profileImageContainer.addEventListener("mousedown", () => {
  editProfileImageValidator.resetValidation();
  editProfileImage.open();
});


// ************** Validation

//initialize form validation Edit Profile and Add Card
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();

// See #4 for P9-8
const editProfileImageValidator = new FormValidator(config, profileImageForm);
editProfileImageValidator.enableValidation();

const addCardValidator = new FormValidator(config, cardForm);
addCardValidator.enableValidation();





