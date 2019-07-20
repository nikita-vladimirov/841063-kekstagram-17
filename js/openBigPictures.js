'use strict';

window.openBigPicture = function (picturesArray) {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var pictures = Array.from(document.querySelectorAll('.picture'));
  pictures.forEach(function (it, index) {
    it.addEventListener('click', function () {
      document.querySelector('.big-picture').classList.remove('hidden');
      createBigPictureContent(index);
    });
  });

  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', function () {
    document.querySelector('.big-picture').classList.add('hidden');
  });

  document.addEventListener('keypress', function (evt) {
    if (evt.keyCode === 27) {
      document.querySelector('.big-picture').classList.add('hidden');
    }
  });
  var bigPicture = document.querySelector('.big-picture');

  var createBigPictureContent = function (index) {
    window.deleteElements('.social__comments', '.social__comment');
    bigPicture.querySelector('.big-picture__img img').src = picturesArray[index].url;
    bigPicture.querySelector('.likes-count').textContent = picturesArray[index].likes;
    bigPicture.querySelector('.comments-count').textContent = picturesArray[index].comments.length;

    picturesArray[index].comments.forEach(function (it) {
      var socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');
      socialComment.innerHTML = '<img class="social__picture" src="img/avatar-' + window.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + it.message + '</p>';
      bigPicture.querySelector('.social__comments').appendChild(socialComment);
    });

    var bigPictireaption = document.querySelector('.social__caption');
    bigPictireaption.textContent = picturesArray[index].description;
  };
};
