// functions moved from index.js

export function openModal(modal) {
    modal.classList.add("modal_opened");
  // Project 6 Step 4 - Close modal form when the escape key is pressed
    document.addEventListener("keydown", closeModalWithEsc);
  }
  
export function closeModal(modal) {
modal.classList.remove("modal_opened");
// Project 6 Step 4 - Close modal form when the escape key is pressed
document.removeEventListener("keydown", closeModalWithEsc);
}

// Project 6 Step 4 - Close when escape button is pressed
function closeModalWithEsc(e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal_opened");
      closeModal(activeModal);
    }
  }
