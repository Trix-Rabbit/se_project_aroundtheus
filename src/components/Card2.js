/* 
Project 8 
Transforming the Card class
Connect the Card class to the popup. Make Card take the handleCardClick() function 
into the constructor. When the user clicks on the card, this function will open 
the popup with an image.

To Do:
1. constructor to include handleCardClick passed in from index.js
2. Remove _handlePreviewPicture
3. Remove this._cardImage.addEventListener
*/ 
export default class Card {
  constructor({ cardData, handleCardClick }, cardSelector) {
    // alert("Card Init: " + cardData.name)
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /*
  _handlePreviewPicture() {
    this._previewImage.src = this._link;
    this._previewImage.alt = this._name;
    this._previewCaption.textContent = this._name;

    openModal(this._previewImageModal);
  }
*/

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", (event) => {
      /*       event.preventDefault();
      event.stopImmediatePropagation(); */
      this._handleLikeIcon();
    });

    this._deleteCardButton.addEventListener("click", (event) => {
      /*       event.preventDefault();
      event.stopImmediatePropagation(); */
      this._handleDeleteCard();
    });

    /*
    this._cardImage.addEventListener("click", () =>
      this._handlePreviewPicture()
    );
    */
  }


  getView() {
    //get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardLikeButton =
    this._cardElement.querySelector(".card__like-button");
    this._previewImageModal = document.querySelector("#preview-image-modal");
    this._previewImage = this._previewImageModal.querySelector(".modal__preview-image");
    this._previewCaption = this._previewImageModal.querySelector(".modal__preview-caption");
    this._deleteCardButton = this._cardElement.querySelector(".card__delete-icon");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
