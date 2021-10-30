import photoCard from '../templates/photo-card.hbs';
import NewApiService from './search-service';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="Load-more"]')
}

const newsApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
  e.preventDefault()
  clearPhotoCard()
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendPhotoMarkup)
}

function onLoadMore() {
  newsApiService.fetchArticles().then(appendPhotoMarkup)
}

refs.loadMoreBtn.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
})

function appendPhotoMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCard(hits))
}
 
function clearPhotoCard() {
  refs.gallery.innerHTML = '';
 }



