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
    // Удаляем все посты, перед отрисовкой новых
    window.deleteElements('.pictures', '.picture');

    // Меняем стиль активной кнопки
    filterButtons.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    it.classList.add('img-filters__button--active');

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      checkFilter(it);
    }, 500);
  });
});

var toggleEditForm = function (selector, classItem) {
  document.querySelector(selector).classList.toggle(classItem);
};

// var form = document.querySelector('.img-upload__form');
// form.addEventListener('submit', function (evt) {
//   document.querySelector('.img-upload__overlay').classList.add('hidden');
//   window.upload(new FormData(form), function (response) {
//     form.reset();
//     window.clearEffect();
//     formSuccess();
//   });
//   evt.preventDefault();
// });

var form = document.querySelector('.img-upload__form');
form.addEventListener('submit', function (evt) {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  window.upload(new FormData(form), formSuccess, formError);
  evt.preventDefault();
});

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
  if (evt.keyCode === 27 && document.activeElement.className !== 'text__description' && document.activeElement.className !== 'text__hashtags') {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  }

  if (evt.keyCode === 27 && document.querySelector('.success')) {
    document.querySelector('.success').classList.add('visually-hidden');
  }

  if (evt.keyCode === 27 && document.querySelector('.error')) {
    document.querySelector('.error').classList.add('visually-hidden');
  }
});

window.getRandomValue = function (min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  randomValue = Math.floor(randomValue);
  return randomValue;
};

var checkFilter = function (it) {
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
      break;
  }
};

var formSuccess = function () {
  form.reset();
  window.clearEffect();
  var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.querySelector('main').appendChild(successTemplate);
  var success = document.querySelector('.success');

  var successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', function () {
    success.classList.add('visually-hidden');
  });

  var whereClick = function (evt) {
    var target = evt.target;
    if (target.className === success.className) {
      success.classList.add('visually-hidden');
    }
  };

  success.addEventListener('click', whereClick);
};

var formError = function () {
  if (!document.querySelector('.error')) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    document.querySelector('main').appendChild(errorTemplate);
    var error = document.querySelector('.error');

    var errorButtons = document.querySelectorAll('.error__button');
    errorButtons.forEach(function (it) {
      it.addEventListener('click', function () {
        error.classList.add('visually-hidden');
      });
    });

    var whereClick = function (evt) {
      var target = evt.target;
      if (target.className === error.className) {
        error.classList.add('visually-hidden');
      }
    };

    error.addEventListener('click', whereClick);
  } else {
    document.querySelector('.error').classList.remove('visually-hidden');
  }

};
