import { render, renderTable, tbody } from './render-table.js';
import { searchData } from './api.js';
import { openModal } from './modal.js';
import './sort.js';
render();
const searchElement = document.getElementById('search-form');
const addClientBtn = document.querySelector('.main__add-btn');
new SimpleBar(document.getElementById('scroll-bar'));
new SimpleBar(document.getElementById('modal-scrollbar'));

searchElement.addEventListener('input', (evt) => {
  evt.preventDefault();
  setTimeout(async function searhTable() {
    const data = await searchData(evt.target.value);
    renderTable(data, tbody);
  }, 300);
});

addClientBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  openModal([], 'Новый клиент', 'new');
});
