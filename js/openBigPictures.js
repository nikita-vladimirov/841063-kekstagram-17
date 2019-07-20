'use strict';

window.openBigPicture = function (picturesArray) {

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var pictures = Array.from(document.querySelectorAll('.picture'));
  pictures.forEach(function (it, index) {
    it.addEventListener('click', function () {
      createBigPictireContent(index);
      document.querySelector('.big-picture').classList.remove('hidden');
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

  var createBigPictireContent = function (index) {
    window.deleteElements('.social__comments', '.social__comment');
    console.log('array ' + picturesArray[index].url);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = picturesArray[index].url;
    bigPicture.querySelector('.likes-count').textContent = picturesArray[index].likes;
    bigPicture.querySelector('.comments-count').textContent = picturesArray[index].comments.length;

    picturesArray[index].comments.forEach(function (it) {
      var socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');
      socialComment.innerHTML = '<img class="social__picture" src="img/avatar-' + window.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + it.message + '</p>';
      bigPicture.querySelector('.social__comments').appendChild(socialComment);
    });

    // var socialCommentImg = document.createElement('img');
    // socialCommentImg.classList.add('social__picture');
    // socialCommentImg.src = 'img/avatar-' + getRandomValue(1, 6) + '.svg';
    // socialCommentImg.alt = 'Аватар комментатора фотографии';
    // socialCommentImg.style.width = '35';
    // socialCommentImg.style.height = '35';

    // var socialCommentText = document.createElement('p');
    // socialCommentText.classList.add('social__text');
    // socialCommentText.textContent = picturesArray[i].comments[i].message;

    // socialComment.appendChild(socialCommentImg);
    // socialComment.appendChild(socialCommentText);

    var bigPictireaption = document.querySelector('.social__caption');
    bigPictireaption.textContent = picturesArray[index].description;
  };
};
