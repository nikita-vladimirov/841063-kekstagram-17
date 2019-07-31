'use strict';

(function () {
  window.openBigPicture = function (picturesArray) {
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

    var showComments = function () {
      var commentsHidden = bigPicture.querySelectorAll('.social__comments .visually-hidden');

      for (var i = 0; i < 5 && i < commentsHidden.length; i++) {
        if (i < commentsHidden.length) {
          commentsHidden[i].classList.remove('visually-hidden');
        }

        if (!bigPicture.querySelector('.social__comments .visually-hidden')) {
          commentsButton.classList.add('hidden');
        }
      }
    };

    var commentsButton = document.querySelector('.comments-loader');
    commentsButton.addEventListener('click', function () {
      var commentsShown = document.querySelector('.comments-shown').textContent;

      if (Number(commentsShown) + 5 > bigPicture.querySelectorAll('.social__comment').length) {
        document.querySelector('.comments-shown').textContent = bigPicture.querySelectorAll('.social__comment').length;
      } else {
        commentsShown = Number(commentsShown) + 5;
        document.querySelector('.comments-shown').textContent = commentsShown;
      }

      showComments();
    });

    var createBigPictureContent = function (index) {
      window.deleteElements('.social__comments', '.social__comment');
      bigPicture.querySelector('.big-picture__img img').src = picturesArray[index].url;
      bigPicture.querySelector('.likes-count').textContent = picturesArray[index].likes;
      bigPicture.querySelector('.comments-count').textContent = picturesArray[index].comments.length;

      picturesArray[index].comments.forEach(function (it) {
        var socialComment = document.createElement('li');
        socialComment.classList.add('social__comment');
        socialComment.classList.add('visually-hidden');
        socialComment.innerHTML = '<img class="social__picture" src="img/avatar-' + window.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + it.message + '</p>';
        bigPicture.querySelector('.social__comments').appendChild(socialComment);
        commentsButton.classList.remove('hidden');
      });

      showComments();

      var bigPictireaption = document.querySelector('.social__caption');
      bigPictireaption.textContent = picturesArray[index].description;

      document.querySelector('.comments-shown').innerHTML = 5;

      if (bigPicture.querySelectorAll('.social__comment').length < 5) {
        document.querySelector('.social__comment-count').classList.add('visually-hidden');
      } else {
        document.querySelector('.social__comment-count').classList.remove('visually-hidden');
      }
    };
  };
})();
