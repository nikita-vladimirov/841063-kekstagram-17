'use strict';

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  window.photos = xhr.response;
  window.photos.forEach(function (item) {
    createPost(item);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  });
  window.openBigPicture(window.photos);
});

xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
xhr.send();

var createPost = function (item) {

  var postTemlate = document.querySelector('#picture').content.querySelector('.picture');
  var post = postTemlate.cloneNode(true);
  post.querySelector('img').src = item.url;
  post.querySelector('.picture__likes').textContent = item.likes;
  post.querySelector('.picture__comments').textContent = item.comments.length;
  var fragment = document.createDocumentFragment();
  fragment.appendChild(post);
  document.querySelector('.pictures').appendChild(fragment);

};

window.deleteElements = function (elementsList, element) {
  var list = document.querySelector(elementsList);
  while (list.querySelector(element)) {
    list.removeChild(list.querySelector(element));
  }
};

//  Находим все кнопки фильтра на главной странице
var filterButtons = Array.from(document.querySelectorAll('.img-filters__button'));

filterButtons.forEach(function (it) {
  var lastTimeout;
  it.addEventListener('click', function () {
    window.deleteElements('.pictures', '.picture'); // Удаляем все посты

    filterButtons.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    it.classList.add('img-filters__button--active');

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      switch (it.id) {

        case 'filter-popular':
          window.photos.forEach(function (item) {
            createPost(item);
          });
          window.openBigPicture(window.photos);// это тоже не работает
          break;

        case 'filter-new':
          var arrayPhotos = window.photos.slice();
          for (var i = 0; i < 15; i++) {
            var rand = Math.floor(Math.random() * (arrayPhotos.length - 1));
            arrayPhotos.splice(rand, 1);
          }

          arrayPhotos.forEach(function (item) {
            createPost(item);
          });


          window.openBigPicture(arrayPhotos);
          break;

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
            createPost(item);
          });
          window.openBigPicture(discussedPhotos);
          // надо разобраться как передать в функцию актуальный массив, для того чтобы текст комметариев брался корректный
          break;
      }
      window.openBigPicture();
    }, 500);
  });
});

var toggleEditForm = function (selector, classItem) {
  document.querySelector(selector).classList.toggle(classItem);
};

// Если произошла загрузка картинки, то отобразится форма редактирования
window.imgUpload = document.querySelector('#upload-file');
window.imgUpload.addEventListener('change', function () {
  toggleEditForm('.img-upload__overlay', 'hidden');
});

// Кнопка закрытия формы редактирования
var closeButton = document.querySelector('#upload-cancel');
closeButton.addEventListener('click', function () {
  toggleEditForm('.img-upload__overlay', 'hidden');
});

document.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 27 && document.activeElement.className !== 'text__description') {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  }
});

window.getRandomValue = function (min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  randomValue = Math.floor(randomValue);
  return randomValue;
};
