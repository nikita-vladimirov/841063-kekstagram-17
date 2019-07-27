'use strict';

(function () {
  window.formSuccess = function () {
    var form = document.querySelector('.img-upload__form');
    form.reset();
    window.clearEffect();
    if (!document.querySelector('.success')) {
      var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      document.querySelector('main').appendChild(successTemplate);
    }
    var success = document.querySelector('.success');
    success.classList.remove('visually-hidden');

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
})();
