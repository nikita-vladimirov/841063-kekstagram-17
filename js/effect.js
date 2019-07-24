'use strict';

window.clearEffect = function () {
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  imagePreview.removeAttribute('class');
  imagePreview.removeAttribute('style'); // Удаляет стили, добавляемые при изменении положении пина
  imagePreview.classList.add('effects__preview--none');
  pin.style.left = '100%'; // Устанавливает значение максимальное значение фильтра и ползунка
  document.querySelector('.effect-level__depth').style.width = '100%';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
};

var effectsList = Array.from(document.querySelectorAll('.effects__radio'));
var pin = document.querySelector('.effect-level__pin');
var addClickListener = function (effectsItem) {
  effectsItem.addEventListener('click', function () {
    var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
    imagePreview.removeAttribute('class');
    imagePreview.removeAttribute('style'); // Удаляет стили, добавляемые при изменении положении пина
    imagePreview.classList.add('effects__preview--' + effectsItem.value);
    pin.style.left = '100%'; // Устанавливает значение максимальное значение фильтра и ползунка
    document.querySelector('.effect-level__depth').style.width = '100%';

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

var resetEffect = function () {
  var effectValue = document.querySelector('.effect-level__value').value;
  var img = document.querySelector('.img-upload__preview').querySelector('img');
  var pinEndLeft = Number(pin.style.left.slice(0, -1)); // Удаляет '%' и записывает число
  var proportion = pinEndLeft / 100;
  effectValue = effectValue * proportion;

  var imageClassList = [
    {name: 'effects__preview--chrome', filter: 'grayscale(' + effectValue / 100 + ')'},
    {name: 'effects__preview--sepia', filter: 'sepia(' + effectValue / 100 + ')'},
    {name: 'effects__preview--marvin', filter: 'invert(' + effectValue + '%' + ')'},
    {name: 'effects__preview--phobos', filter: 'blur(' + effectValue / 100 * 5 + 'px)'},
    {name: 'effects__preview--heat', filter: 'brightness(' + effectValue / 100 * 3 + ')'}
  ];

  (function () {
    imageClassList.forEach(function (element) {
      if (img.className === element.name) {
        img.style.filter = element.filter;
      }
    });
  })();
};

pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var effectLevel = document.querySelector('.effect-level__depth').style;

  var startX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    var shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    pin.style.left = (pin.offsetLeft - shift) / 4.52 + '%';
    effectLevel.width = pin.style.left;
    if (pin.offsetLeft < -1) {
      pin.style.left = 0;
    } else if (pin.offsetLeft > 452) {
      pin.style.left = '100%';
    }

    resetEffect();
  };

  var onMouseUp = function () {
    resetEffect();

    pin.removeEventListener('mousemove', onMouseMove);
    pin.removeEventListener('mouseup', onMouseUp);
  };

  pin.addEventListener('mousemove', onMouseMove);
  pin.addEventListener('mouseup', onMouseUp);
});
