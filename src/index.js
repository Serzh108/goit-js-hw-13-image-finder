import './styles.css';
import 'pnotify/dist/PNotifyBrightTheme.css';
import getQuery from './js/apiService';
import Handlebars from 'handlebars';
import itemTemplate from './templates/item.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import { imgClickHandler, scrollDown } from './js/myModules';

let page = 1;
let oldSearchValue;

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', formHandler);
const input = searchForm.query;
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn');
loadMoreBtn.addEventListener('click', btnHandler);
galleryList.addEventListener('click', imgClickHandler); // modal

function formHandler(e) {
  e.preventDefault();
  transformData(input.value, page);
}

function transformData(searchValue, pageNumber) {
  if (oldSearchValue !== searchValue) {
    pageNumber = 1;
    galleryList.innerHTML = '';
  }
  oldSearchValue = searchValue;
  getQuery(oldSearchValue, pageNumber)
    .then(data => {
      data.hits.forEach(element => {
        markup(element);
      });
      return data;
    })
    .then(data => scrollDown())
    .catch(err => console.log('Error: ', err));
}

function markup(el) {
  const resultItem = itemTemplate(el);
  galleryList.insertAdjacentHTML('beforeend', resultItem);
}

function btnHandler() {
  page++;
  transformData(input.value, page);

  let noticeLoaded = PNotify.notice({
    title: 'New page loaded!',
    text: '',
    modules: {
      Buttons: {
        closer: false,
        sticker: false,
      },
    },
  });
  noticeLoaded.on('click', function () {
    noticeLoaded.close();
  });
}
