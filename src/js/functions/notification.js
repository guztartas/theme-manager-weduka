function showNotification(text = '#28a745', color) {
  const notification = document.querySelector('.notification');
  notification.style.backgroundColor = color;
  notification.textContent = text;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
}

export { showNotification }