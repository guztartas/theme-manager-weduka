import { themes } from "../../data/themes.js";
import { openModal, closeModal } from "./modal.js";
import { hexToRgb } from "./hex-to-rgb.js"
import { showNotification } from "./notification.js";

const themeList = document.getElementById('themeList');
const searchInput = document.getElementById('searchInput');

function resetModalForm() {
  document.getElementById('name').value = '';
  document.getElementById('primaryColor').value = '';
  document.getElementById('secondaryColor').value = '';
  document.getElementById('successColor').value = '';
  document.getElementById('dangerColor').value = '';
  document.getElementById('warningColor').value = '';
}

function renderThemes() {
  themeList.innerHTML = '';
  const filteredThemes = themes.filter(theme => theme.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  filteredThemes.forEach(theme => {
    const themeItem = document.createElement('div');
    themeItem.id = 'theme-item'
    themeItem.style.backgroundColor = `rgba(${hexToRgb(theme.colors.primary)}, 0.4)`;
    themeItem.style.borderColor = theme.colors.primary;
    themeItem.innerHTML = `
    <h3 class="title">${theme.name}</h3>
    <div class="color-descriptions"">
        <span data-theme-id="${theme.id}" id="removeThemeButton">&times;</span>
        <div class="color-description">
            <span class="color-name">Primária:</span>
            <span class="color-sample" style="background-color: ${theme.colors.primary}"></span>
        </div>
        <div class="color-description">
            <span class="color-name">Secundária:</span>
            <span class="color-sample" style="background-color: ${theme.colors.secondary}"></span>
        </div>
        <div class="color-description">
            <span class="color-name">Sucesso:</span>
            <span class="color-sample" style="background-color: ${theme.colors.success}"></span>
        </div>
        <div class="color-description">
            <span class="color-name">Perigo:</span>
            <span class="color-sample" style="background-color: ${theme.colors.danger}"></span>
        </div>
        <div class="color-description">
            <span class="color-name">Aviso:</span>
            <span class="color-sample" style="background-color: ${theme.colors.warning}"></span>
        </div>
        <button type="button" data-theme-id="${theme.id}" id="editTheme">Editar</button>
        <button type="button" data-applied-theme="${theme.id}" id="applyTheme">Aplicar</button>
    </div>
    `;
    themeList.appendChild(themeItem);
  });
}

function addTheme() {
  const name = document.getElementById('name').value;
  const primaryColor = document.getElementById('primaryColor').value;
  const secondaryColor = document.getElementById('secondaryColor').value;
  const successColor = document.getElementById('successColor').value;
  const dangerColor = document.getElementById('dangerColor').value;
  const warningColor = document.getElementById('warningColor').value;
  const newTheme = {
    id: themes.length + 1,
    name: `Tema ${name !== '' ? name : `Novo ${themes.length + 1}`}`,
    colors: {
      primary: primaryColor,
      secondary: secondaryColor,
      success: successColor,
      danger: dangerColor,
      warning: warningColor
    }
  };
  showNotification('Tema adicionado com sucesso!', successColor)
  themes.push(newTheme);
  renderThemes();
  closeModal();
}

function applyThemeToPage(appliedTheme) {
  const index = themes.findIndex(theme => theme.id === Number(appliedTheme));

  const fullBody = document.body;
  fullBody.style.backgroundColor = `rgba(${hexToRgb(themes[index].colors.primary)}, 0.2)`;;
  fullBody.setAttribute('data-applied-id', appliedTheme);
  showNotification('Tema aplicado no sistema com sucesso!', themes[index].colors.primary)
}

function editTheme(event) {
  const themeId = event.target.dataset.themeId;
  const themeToEdit = themes.find(theme => theme.id === parseInt(themeId));
  if (themeToEdit) {
    document.getElementById('name').value = themeToEdit.name;
    document.getElementById('primaryColor').value = themeToEdit.colors.primary;
    document.getElementById('secondaryColor').value = themeToEdit.colors.secondary;
    document.getElementById('successColor').value = themeToEdit.colors.success;
    document.getElementById('dangerColor').value = themeToEdit.colors.danger;
    document.getElementById('warningColor').value = themeToEdit.colors.warning;
    openModal(true, themeId);
  }
}

function updateTheme(themeId) {
  const index = themes.findIndex(theme => theme.id === Number(themeId));
  if (index !== -1) {
    themes[index].name = document.getElementById('name').value;
    themes[index].colors.primary = document.getElementById('primaryColor').value;
    themes[index].colors.secondary = document.getElementById('secondaryColor').value;
    themes[index].colors.success = document.getElementById('successColor').value;
    themes[index].colors.danger = document.getElementById('dangerColor').value;
    themes[index].colors.warning = document.getElementById('warningColor').value;

    showNotification('Tema atualizado com sucesso!', themes[index].colors.success)
    renderThemes();
    closeModal();
    resetModalForm();
  }
}

function removeTheme(themeId) {
  const index = themes.findIndex(theme => theme.id === Number(themeId));
  const appliedId = document.body.dataset.appliedId;


  if (themeId === appliedId) {
    showNotification('Atenção! Um tema aplicado ao sistema não pode ser apagado.', themes[index].colors.warning)
  } else if (index !== -1) {
    showNotification('Tema apagado com sucesso!', themes[index].colors.sucess)
    themes.splice(index, 1);
    renderThemes();
  }


}

// search
searchInput?.addEventListener('input', renderThemes);

export { renderThemes, addTheme, updateTheme, applyThemeToPage, editTheme, resetModalForm, removeTheme };