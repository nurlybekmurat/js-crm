import { renderTable, data, tbody } from './render-table.js';

const theadId = document.getElementById('th-id');
const theadName = document.getElementById('th-name');
const theadCreatedTime = document.getElementById('th-create-time');
const theadUpdatedTime = document.getElementById('th-update-time');
const theadList = document.querySelectorAll('.main-table__thead');

function sortNumber(row, list, container, field) {
  let growSortFlag = false;

  function sort(row) {
    row.addEventListener('click', () => {
      theadList.forEach((item) => item.classList.remove('main-table__thead--active'));
      row.classList.toggle('main-table__thead--active');
      let growSortedArr = list.slice().sort(growSortYear(field));
      let decSortedArr = list.slice().sort(decSortYear(field));

      if (growSortFlag === false) {
        growSortFlag = true;
        renderTable(growSortedArr, container);
        return;
      }
      if (growSortFlag === true) {
        growSortFlag = false;
        renderTable(decSortedArr, container);
        return;
      }
    });
  }
  sort(row);
}

function growSortYear(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

function decSortYear(field) {
  return (a, b) => (a[field] > b[field] ? -1 : 1);
}

sortNumber(theadId, data, tbody, data.id);
sortNumber(theadName, data, tbody, data.id);
sortNumber(theadCreatedTime, data, tbody, data.id);
sortNumber(theadUpdatedTime, data, tbody, data.id);

theadId.click();
