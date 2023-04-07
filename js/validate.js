function errorToggler(input, text = 'Ошибка') {
  input.classList.remove('hidden');
  input.textContent = text;
}

function isEmpty(str) {
  return str.trim().length !== 0;
}

function isLong(str) {
  return str.length > 24;
}

function validate(items) {
  let valid = true;
  for (const property in items) {
    if (isEmpty(items[property]) === false) {
      errorToggler(document.querySelector('.modal__error-msg'), 'Поле пустое');
      valid = false;
    }
    if (isLong(items[property]) === true) {
      errorToggler(document.querySelector('.modal__error-msg'), 'Поле слишком длинное');
      valid = false;
    }
  }

  return valid;
}

export { validate };
