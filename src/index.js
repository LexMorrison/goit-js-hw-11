import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { renderGallery } from './render.js';
import { gettingImg } from './pixabay.js';
import './style.css';

const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onClick);
let query = '';
let page = 1;
const perPage = 40;
let SimpleLightbox;

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
      wrongSearch();
    } else {
      renderGallery(data.hits);
      SimpleLightbox = new SimpleLightbox('.gallery a', {
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
    SimpleLightbox = new SimpleLightbox('.gallery a', {
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
