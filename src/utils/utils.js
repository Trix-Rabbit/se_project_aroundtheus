// functions moved from index.js

export function openModal(modal) {
  // console.log("utils.openModal");
  modal.classList.add("modal_opened");
// Project 6 Step 4 - Close modal form when the escape key is pressed
  document.addEventListener("keydown", closeModalWithEsc);
}

export function closeModal(modal) {
// console.log("utils.closeModal");
  modal.classList.remove("modal_opened");
  // Project 6 Step 4 - Close modal form when the escape key is pressed
  document.removeEventListener("keydown", closeModalWithEsc);
}

// Project 6 Step 4 - Close when escape button is pressed
function closeModalWithEsc(e) {
  // console.log("utils.closeModalWithEsc: " + e.key + " pressed.");
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

export function closeModalOnRemoteClick(evt) {
  // DEBUG
  // console.log("closeModalOnRemoteClick.");
  // if (evt.target === evt.currentTarget)
  //   console.log("evt.target = evt.currentTarget");
  // else
  //   console.log("evt.target != evt.currentTarget");

  // if (evt.target.classList.contains("modal__close")) 
  //   console.log("modal__close: True");
  // else
  //   console.log("modal__close: False");
  // DEBUG END
  
    // target is the element on which the event happened
  // currentTarget is the modal
  // if they are the same then we should close the modal
  if (evt.target === evt.currentTarget || evt.target.classList.contains("modal__close")) { 
    // console.log("TRUE");
    closeModal(evt.currentTarget);
  }
}