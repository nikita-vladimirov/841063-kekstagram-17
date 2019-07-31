'use strict';
(function () {
  var inputHashtag = document.querySelector('.text__hashtags');
  inputHashtag.addEventListener('change', function () {
    var hashtags = inputHashtag.value;
    if (hashtags === '') {
      hashtags = [];
    } else {
      hashtags = hashtags.split(' '); // Преобразовывает строку в массив
    }

    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
    }

    var checkHashStart = hashtags.some(function (item) {
      return item[0] !== '#';
    });

    var checkMinValue = hashtags.some(function (item) {
      return !item[1] && item[0] === '#';
    });

    var checkLength = hashtags.some(function (item) {
      return item.length > 20;
    });

    if (checkHashStart) {
      inputHashtag.setCustomValidity('Хеш-теги должны начинаться с #');
    } else if (checkMinValue) {
      inputHashtag.setCustomValidity('Хеш-тег не может состоять только из #');
    } else if (checkLength) {
      inputHashtag.setCustomValidity('Длина хеш-тега не может превышать 20 символов');
    } else {
      inputHashtag.setCustomValidity('');
    }

    hashtags.forEach(function (item, index) {
      var checkUniq = function (it, itIndex) {
        if (index !== itIndex && item === it) {
          inputHashtag.setCustomValidity('Хеш-теги не должны повторяться');
        }
      };

      if (hashtags.length > 1) {
        hashtags.forEach(function (it, itIndex) {
          checkUniq(it, itIndex);
        });
      }

      if (item.match(/#/g) && item.match(/#/g).length > 1) {
        inputHashtag.setCustomValidity('В имени хеш-тега нельзя использовать #');
      }
    });

    if (hashtags.length > 5) {
      inputHashtag.setCustomValidity('Можно указать только 5 хеш-тегов');
    }
  });
})();
