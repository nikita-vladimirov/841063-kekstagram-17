'use strict';

(function () {
  window.formError = function () {
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
})();
