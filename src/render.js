export { renderGallery };
function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  function markupImg({
    id,
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<a href="${largeImageURL}"><div class="photo-card" id="${id}">
    <img src="${webformatURL}" alt="${tags}" width="300" height="250" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div></a>`;
  }
  const markupRend = images.reduce((acc, image) => acc + markupImg(image), '');
  gallery.insertAdjacentHTML('beforeend', markupRend);
}
