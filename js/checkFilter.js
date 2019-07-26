'use strict';

(function () {
  window.checkFilter = function (it) {
    switch (it.id) {

      // Полуярные
      case 'filter-popular':
        window.photos.forEach(function (item) {
          window.createPost(item);
        });
        window.openBigPicture(window.photos);// это тоже не работает
        break;

      // Новые
      case 'filter-new':
        var arrayPhotos = window.photos.slice();
        for (var i = 0; i < 15; i++) {
          var rand = Math.floor(Math.random() * (arrayPhotos.length - 1));
          arrayPhotos.splice(rand, 1);
        }
        arrayPhotos.forEach(function (item) {
          window.createPost(item);
        });

        window.openBigPicture(arrayPhotos);
        break;

      // Обсуждаемые
      case 'filter-discussed':
        var discussedPhotos = window.photos.slice();
        discussedPhotos.sort(function (first, second) {
          if (first.name > second.limes) {
            return 1;
          } else if (first.likes < second.likes) {
            return -1;
          } else {
            return 0;
          }
        });

        discussedPhotos.reverse();
        discussedPhotos.forEach(function (item) {
          window.createPost(item);
        });
        window.openBigPicture(discussedPhotos);
        break;
    }
  };
})();
