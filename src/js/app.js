import { renderThemes, addTheme, applyThemeToPage, editTheme, updateTheme, removeTheme } from './functions/themes.js';
import { closeModal, openModal } from './functions/modal.js';

// control
document.body.addEventListener('click', function (event) {
  if (event.target.id === 'closeModalButton') {
    closeModal();
  }
  if (event.target.id === 'createThemeButton') {
    openModal();
  }
  if (event.target.id === 'addThemeButton') {
    addTheme();
  }
  if (event.target.id === 'applyTheme') {
    const appliedTheme = event.target.dataset.appliedTheme;
    applyThemeToPage(appliedTheme);
  }
  if (event.target.id === 'editTheme') {
    editTheme(event);
  }
  if (event.target.id === 'updateTheme') {
    const themeId = event.target.dataset.themeId;
    updateTheme(themeId);
  }
  if (event.target.id === 'removeThemeButton') {
    const themeId = event.target.dataset.themeId;
    removeTheme(themeId);
  }
  console.log(event.target.id)
});

// default
renderThemes();

