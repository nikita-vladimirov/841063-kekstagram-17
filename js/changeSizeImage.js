'use strict';

// Удаляет знак процента и приводит к числовому значению
function getNumberValue(scaleControlValue) {
  return Number(scaleControlValue.value.slice(0, -1));
}

// Добавляет CSS правило для изменения маштаба картинки
function transformScale(image, scaleControlValue, numberValue) {
  image.style.transform = 'scale(' + (numberValue / 100) + ')';
  scaleControlValue.value = numberValue + '%';
}

// Уменьшает маштаб картинки
function reduceSize() {
  var image = document.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var numberValue = getNumberValue(scaleControlValue);

  numberValue = numberValue - 25;
  if (numberValue >= 25) {
    transformScale(image, scaleControlValue, numberValue);
  }
}

// Увеличивает маштаб картинки
function increaseSize() {
  var image = document.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var numberValue = getNumberValue(scaleControlValue);

  numberValue = numberValue + 25;
  if (numberValue <= 100) {
    transformScale(image, scaleControlValue, numberValue);
  }
}

window.scaleControlSmaller = document.querySelector('.scale__control--smaller');
window.scaleControlBigger = document.querySelector('.scale__control--bigger');

// Добавляет обработчики на кнопки плюс и минус
window.scaleControlSmaller.addEventListener('click', reduceSize);
window.scaleControlBigger.addEventListener('click', increaseSize);
