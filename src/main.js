import { getImages } from './js/pixabay-api';
import { creatImg } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

iziToast.settings({
  position: 'topRight',
  maxWidth: '432px',
});

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery-list');
const moreBtn = document.querySelector('.more');
const galleryImg = new SimpleLightbox('.gallery-item .gallery-link', {
  captionsData: 'alt',
});
let inputValue = '';
let page = 1;

form.addEventListener('submit', handSub);
moreBtn.addEventListener('click', handMore);

async function handSub(event) {
  event.preventDefault();
  inputValue = event.target.elements.input.value.trim();
  page = 1;

  gallery.innerHTML = '';
  loader.classList.remove('visually-hidden');
  moreBtn.classList.add('visually-hidden');

  if (inputValue === '') {
    loader.classList.add('visually-hidden');
    iziToast.warning({
      message: 'The field is empty!',
    });
    return;
  }

  try {
    const response = await getImages(inputValue, page);
    loader.classList.add('visually-hidden');

    if (response.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    gallery.innerHTML = creatImg(response.hits);
    galleryImg.refresh();

    if (response.totalHits > 15) {
      moreBtn.classList.remove('visually-hidden');
    } else {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    loader.classList.add('visually-hidden');
    iziToast.error({
      message:
        'Sorry, there was an error fetching the images. Please try again!',
    });
  } finally {
    event.target.reset();
  }
}

async function handMore(event) {
  page += 1;
  moreBtn.disabled = true;
  try {
    const nextPage = await getImages(inputValue, page);
    gallery.insertAdjacentHTML('beforeend', creatImg(nextPage.hits));
    galleryImg.refresh();

    if (
      nextPage.hits.length < 15 ||
      page === Math.ceil(nextPage.totalHits / 15)
    ) {
      moreBtn.classList.add('visually-hidden');
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const item = document.querySelector('.gallery-item');
    let itemHeight = Math.ceil(item.getBoundingClientRect().height);
    window.scrollBy({
      left: 0,
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    moreBtn.disabled = false;
  }
}
