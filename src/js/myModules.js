import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function imgClickHandler(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    const bigImageSrc = e.target.dataset.src;
    basicLightbox
      .create(`<img width="1400" height="900" src="${bigImageSrc}">`)
      .show();
  }
}

function scrollDown() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

export { imgClickHandler, scrollDown };
