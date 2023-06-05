const initialCards = [
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

/* ELEMENTS */

// profile
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

// Edit profile when clicked
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseModalButton = document.querySelector("#profile-modal-close-button");

// Add more cards when clicked
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardFormElement.querySelector("#add-card-title-input");
const addCardImageInput = addCardFormElement.querySelector("#add-card-image-url");
const addCardModalButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = document.querySelector("#add-card-modal-close-button");

// Preview Images when clicked
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewCaption = previewImageModal.querySelector(".modal__preview-caption");
const previewImageCloseButton = previewImageModal.querySelector("#preview-image-modal-close-button");

// Card
const cardListElement = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/* FUNCTIONS */

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-icon");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.addEventListener("click", () => {
    openPopup(previewImageModal);
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.setAttribute("alt", data.name);
  cardImageElement.setAttribute("src", data.link);
  return cardElement;
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(data, wrapper) {
  const cardElement = getCardElement(data);
  wrapper.prepend(cardElement);
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardImageInput.value;
  renderCard({ name, link }, cardListElement);
  e.target.reset();
  closePopup(addCardModal);
}

/* EVENT LISTENERS */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

profileCloseModalButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
previewImageCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
addCardModalButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

// Task 1/7. Rendering cards
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListElement.append(cardElement);
});
