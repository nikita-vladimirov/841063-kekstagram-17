'use strict';

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  xhr.response.forEach(function (item) {
    var postTemlate = document.querySelector('#picture').content.querySelector('.picture');
    var post = postTemlate.cloneNode(true);

    post.querySelector('img').src = item.url;
    post.querySelector('.picture__likes').textContent = item.likes;
    post.querySelector('.picture__comments').textContent = item.comments.length;

    var fragment = document.createDocumentFragment();
    fragment.appendChild(post);
    document.querySelector('.pictures').appendChild(fragment);
  });
});


xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
xhr.send();

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
