'use strict';

(function () {
  var URL_KEKSAGRAM = 'https://js.dump.academy/kekstagram';
  var URL_KEKSAGRAM_DATA = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;

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

    xhr.open('GET', URL_KEKSAGRAM_DATA);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', URL_KEKSAGRAM);
    xhr.send(data);
  };
})();

