function hexToRgb(hex) {
  // Remove a "#" se presente
  hex = hex.replace(/^#/, '');

  // Converta cada par de caracteres hexadecimais em um número decimal
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Retorne a representação RGB
  return `${r}, ${g}, ${b}`;
}

export { hexToRgb }