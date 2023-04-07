import { renderSelect, createSelect, serializeForm } from './utils.js';
import { validate } from './validate.js';
import { updateData, deleteData, createData } from './api.js';

const addContactBtn = document.querySelector('.add-contact__btn');
const saveBtn = document.querySelector('.modal__save-btn');
const secondBtn = document.querySelector('.modal__second-btn');
const formInputs = document.querySelectorAll('.modal__input');

function modalInputHandler() {
  document.querySelector('.modal__error-msg').classList.add('hidden');
}

function addSelect(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll('.add-contact-select__item');
  let selectContainer = document.querySelector('.add-contact-select');
  if (inputs.length >= 10) {
    addContactBtn.classList.add('hidden');
    return;
  }
  createSelect('Телефон', '', 10, selectContainer);
}

function formInputHandler() {
  document.querySelector('.modal__error-msg').textContent = '';
}

function openModal(item, title, type = '', id = '') {
  const backdrop = document.querySelector('#modal-backdrop');
  const modalElement = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal__close-btn');
  const modalInputs = document.querySelectorAll('.modal__input');
  const modalForm = document.querySelector('.modal__form');
  const modalFormDelete = document.querySelector('.modal__delete-form');

  showModal();

  backdrop.addEventListener('click', (evt) => {
    if (evt.target === backdrop && evt.target !== saveBtn) {
      hideModal();
    }
  });

  if (type === 'change') {
    secondBtn.textContent = 'Удалить клиента';
    secondBtn.addEventListener('click', () => {
      deleteData(id);
    });
  } else if (type === 'delete') {
    modalForm.classList.add('hidden');
    modalFormDelete.classList.remove('hidden');
    let deleteBtn = document.getElementById('modalDeleteBtn');
    document.getElementById('modalSecondBtn').addEventListener('click', hideModal);
    deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      deleteData(id);
    });
  } else if (type === 'new') {
    document.querySelector('.modal__save-text').textContent = 'Сохранить';
    secondBtn.textContent = 'Отмена ';
    secondBtn.addEventListener('click', hideModal);
  }

  function modalSubmitHandler(e) {
    e.preventDefault();
    let newObj = {};
    const loaderElement = document.querySelector('.modal__save-icon');
    let newItem = serializeForm(modalForm);
    let contacts = document.querySelectorAll('.add-contact-select__item');
    if (validate(newItem) === false) {
      return false;
    }
    newItem.contacts = [];
    let typeObj;
    let value;
    if (contacts) {
      contacts.forEach((item) => {
        typeObj = item.querySelector('.choices__item').textContent;
        value = item.querySelector('.add-contact-select__input').value;
        newObj.type = type;
        newObj.value = value;
        newItem.contacts.push({ type: typeObj, value: value });
      });
    }
    loaderElement.classList.remove('hidden');
    saveBtn.setAttribute('disabled', '');
    if (type === 'change') {
      updateData(item.id, newItem);
    } else if (type === 'new') {
      createData(newItem);
    }
    loaderElement.classList.add('hidden');
    saveBtn.removeAttribute('disabled');
  }

  function showModal() {
    modalForm.addEventListener('submit', modalSubmitHandler);
    modalElement.classList.add('show');
    modalForm.classList.remove('hidden');
    modalFormDelete.classList.add('hidden');
    backdrop.classList.remove('hidden');
    closeBtn.addEventListener('click', hideModal);
    document.querySelector('.modal__title').textContent = title;
    addContactBtn.addEventListener('click', addSelect);

    formInputs.forEach((item) => {
      item.addEventListener('input', formInputHandler);
    });
    if (item.length !== 0) {
      if (item.contacts.length >= 9) {
        addContactBtn.classList.add('hidden');
      }
      renderSelect(item.contacts);
      document.querySelector('.modal__save-text').textContent = 'Сохранить';
      document.querySelector('#surname').value = item.surname;
      document.querySelector('#name').value = item.name;
      document.querySelector('#lastname').value = item.lastName;
      let idText = `<span class="modal__title--secondary">ID: <span class="modal__id">${item.id}</span></span>`;
      document.querySelector('.modal__title').innerHTML += idText;
      modalInputs.forEach((item) => {
        item.addEventListener('input', modalInputHandler);
      });
      secondBtn.addEventListener('click', hideModal);
    }
  }

  function hideModal() {
    modalElement.classList.remove('show');
    backdrop.classList.add('hidden');
    closeBtn.removeEventListener('click', hideModal);
    addContactBtn.removeEventListener('click', addSelect);
    secondBtn.removeEventListener('click', hideModal);
    modalForm.reset();
    document.querySelector('.modal__error-msg').textContent = '';
    modalForm.removeEventListener('submit', modalSubmitHandler);
    let selectContainer = document.querySelector('.add-contact-select');
    selectContainer.innerHTML = '';
    formInputs.forEach((item) => {
      item.removeEventListener('input', formInputHandler);
    });
  }
}

export { openModal };
