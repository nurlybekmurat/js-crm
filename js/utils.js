function createSelect(type = 'Телефон', value = '', index, container) {
  let selectItemElement = document.createElement('div');
  selectItemElement.classList.add('add-contact-select__item');
  let selectItemWrapper = document.createElement('div');
  selectItemWrapper.classList.add('add-contact-select__wrap');
  selectItemElement.append(selectItemWrapper);
  let select = document.createElement('select');
  select.classList.add('add-contact-select__select');
  select.id = `selectCustom-${index}`;
  selectItemWrapper.append(select);
  let optionVal = document.createElement('option');
  optionVal.value = '';
  optionVal.textContent = `${type}`;
  let optionTel = document.createElement('option');
  optionTel.textContent = 'Телефон';
  let optionTelExtra = document.createElement('option');
  optionTelExtra.textContent = 'Доп. телефон';
  let Email = document.createElement('option');
  Email.textContent = 'Email';
  let Vk = document.createElement('option');
  Vk.textContent = 'Vk';
  let Facebook = document.createElement('option');
  Facebook.textContent = 'Facebook';
  select.append(optionVal);
  select.append(optionTel);
  select.append(optionTelExtra);
  select.append(Email);
  select.append(Vk);
  select.append(Facebook);

  let choices = new Choices(select, {
    searchEnabled: false,
    itemSelectText: '',
    renderSelectedChoices: 'auto',
  });

  let input = document.createElement('input');
  input.value = `${value}`;
  input.classList.add('add-contact-select__input');
  input.setAttribute('type', 'text');
  input.placeholder = 'Введите данные контакта';
  const im = new Inputmask('+7 (999)-999-99-99');
  im.mask(input);

  function selectHandler() {
    switch (select.value) {
      case 'Телефон':
        input.setAttribute('type', 'text');
        im.mask(input);
        break;
      case 'Доп. телефон':
        input.setAttribute('type', 'text');
        im.mask(input);
        break;
      case 'Email':
        if (input.inputmask) input.inputmask.remove();
        input.setAttribute('type', 'email');
        break;
      default:
        if (input.inputmask) input.inputmask.remove();
        input.setAttribute('type', 'text');
        break;
    }
  }

  select.addEventListener('change', selectHandler);

  selectItemElement.append(input);

  let clearBtn = document.createElement('button');
  clearBtn.classList.add('add-contact-select__clear-btn');
  clearBtn.id = `clear-btn-${index}`;
  clearBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_224_6681)">
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
        </g>
        <defs>
        <clipPath id="clip0_224_6681">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    `;

  selectItemElement.append(clearBtn);

  clearBtn.addEventListener('click', () => {
    selectItemElement.remove();
  });

  container.append(selectItemElement);
}

function renderSelect(list) {
  let selectContainer = document.querySelector('.add-contact-select');
  selectContainer.innerHTML = '';
  list.forEach((item, index) => {
    createSelect(item.type, item.value, index, selectContainer);
  });
}

function serializeForm(formNode) {
  const obj = {};
  const { elements } = formNode;
  const data = Array.from(elements).filter((item) => !!item.name);
  for (let item of data) {
    let key = item.name;
    let value = item.value.trim();
    obj[key] = value;
  }
  return obj;
}

export { renderSelect, createSelect, serializeForm };
