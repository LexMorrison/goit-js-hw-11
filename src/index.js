import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { renderGallery } from './js/render.js';
import { gettingImg } from './js/pixabay.js';
import './styles/style.css';

const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onClick);
let query = '';
let page = 1;
const perPage = 40;
let lightbox;

async function onSearch(evt) {
  evt.preventDefault();
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  galleryList.innerHTML = '';
  if (query === '') {
    emptySearch();
    return;
  }
  try {
    const { data } = await gettingImg(query, page, perPage);
    if (data.totalHits === 0) {
      loadMore.classList.add('hidden');
      wrongSearch();
    } else {
      renderGallery(data.hits);
      lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 300,
      }).refresh();
      firstSuccess(data);
      if (data.totalHits > perPage) {
        loadMore.classList.remove('hidden');
      }
    }
  } catch (error) {
    somethingWrong();
  } finally {
    form.reset();
  }
}

async function onClick(event) {
  page += 1;
  try {
    const { data } = await gettingImg(query, page, perPage);
    renderGallery(data.hits);
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 300,
    }).refresh();
    const totalPage = Math.ceil(data.totalHits / perPage);
    if (page >= totalPage) {
      endSearch();
      loadMore.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function wrongSearch() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function endSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

function firstSuccess(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function emptySearch() {
  Notiflix.Notify.failure('Please, type something');
}

function somethingWrong() {
  Notiflix.Notify.failure('Ooops, something went wrong try to reload the page');
}
