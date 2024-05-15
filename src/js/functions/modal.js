import { resetModalForm } from "./themes.js"

const modal = document.getElementById('modal');

function openModal(edit, themeId) {
  const addThemeButton = document.getElementById('addThemeButton');
  const updateThemeButton = document.getElementById('updateTheme');
  if (edit && themeId) {
    addThemeButton.disabled = true;
    updateThemeButton.disabled = false;
    updateThemeButton.setAttribute('data-theme-id', themeId);
  } else {
    addThemeButton.disabled = false;
    updateThemeButton.disabled = true;
    updateThemeButton.removeAttribute('data-theme-id');
  }
  modal.classList.add('modal-open');
}

function closeModal() {
  resetModalForm();
  modal.classList.remove('modal-open');
}

export { openModal, closeModal }