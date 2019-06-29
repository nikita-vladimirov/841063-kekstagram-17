'use strict';

var effectsList = Array.from(document.querySelectorAll('.effects__radio'));

var addClickListener = function (effectsItem) {
  effectsItem.addEventListener('click', function () {
    var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
    imagePreview.removeAttribute('class');
    imagePreview.removeAttribute('style'); // удаляет стили, добавляемые при изменении положении пина
    imagePreview.classList.add('effects__preview--' + effectsItem.value);

    if (effectsItem.value === 'none') {
      // Скрывает ползунок для изображения без стилей
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    }
  });
};

effectsList.forEach(function (element) {
  addClickListener(element);
});

var pin = document.querySelector('.effect-level__pin');
pin.addEventListener('mouseup', function () {
  pin.style.left = '200px'; // указано для примера, так как пока нет обработчика 'mousedown'
  var pinStartPosition = 450; // указано для примера, так как пока нет обработчика 'mousedown'

  var effectValue = document.querySelector('.effect-level__value').value;
  var pinEndPosition = Number(pin.style.left.slice(0, -2)); // удаляет 'px' и записывает число
  var proportion = pinEndPosition / pinStartPosition;
  effectValue = effectValue * proportion;

  var imageClassList = [
    {name: 'effects__preview--chrome', filter: 'grayscale(' + effectValue / 100 + ')'},
    {name: 'effects__preview--sepia', filter: 'sepia(' + effectValue / 100 + ')'},
    {name: 'effects__preview--marvin', filter: 'invert(' + effectValue + '%' + ')'},
    {name: 'effects__preview--phobos', filter: 'blur(' + effectValue / 100 * 5 + 'px)'},
    {name: 'effects__preview--heat', filter: 'brightness(' + effectValue / 100 * 3 + ')'}
  ];

  var img = document.querySelector('.img-upload__preview').querySelector('img');
  (function () {
    imageClassList.forEach(function (element) {
      if (img.className === element.name) {
        img.style.filter = element.filter;
      }
    });
  })();
});
