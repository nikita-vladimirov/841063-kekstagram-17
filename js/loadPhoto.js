'use strict';

(function () {
  var url = 'https://js.dump.academy/kekstagram/data';

  window.loadPhoto = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      window.photos = xhr.response;
      window.photos.forEach(function (item) {
        window.createPost(item);
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      });
      window.openBigPicture(window.photos);
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

