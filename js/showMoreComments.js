'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsButton = document.querySelector('.comments-loader');

  var commentsButtonClickHeandler = function () {
    var commentsShown = document.querySelector('.comments-shown').textContent;
    if (Number(commentsShown) + 5 > bigPicture.querySelectorAll('.social__comment').length) {
      document.querySelector('.comments-shown').textContent = bigPicture.querySelectorAll('.social__comment').length;
    } else {
      commentsShown = Number(commentsShown) + 5;
      document.querySelector('.comments-shown').textContent = commentsShown;
    }

    window.showComments();
  };

  commentsButton.addEventListener('click', commentsButtonClickHeandler);
})();

