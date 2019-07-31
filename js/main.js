'use strict';

(function () {
  // Загрузка фото с сервера
  window.loadPhoto();

  // Функция удаления элементов
  window.deleteElements = function (elementsList, element) {
    var list = document.querySelector(elementsList);
    while (list.querySelector(element)) {
      list.removeChild(list.querySelector(element));
    }
  };

  // Находим все кнопки фильтра на главной странице
  var filterButtons = Array.from(document.querySelectorAll('.img-filters__button'));

  filterButtons.forEach(function (it) {
    var lastTimeout;
    it.addEventListener('click', function () {
    // Удаляем все посты, перед отрисовкой новых
      window.deleteElements('.pictures', '.picture');

      // Меняем стиль активной кнопки
      filterButtons.forEach(function (element) {
        element.classList.remove('img-filters__button--active');
      });
      it.classList.add('img-filters__button--active');

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        window.checkFilter(it);
      }, 500);
    });
  });

  var toggleEditForm = function (selector, classItem) {
    document.querySelector(selector).classList.toggle(classItem);
  };

  // Отправка формы
  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    if (form.checkValidity()) {
      evt.preventDefault();
      document.querySelector('.img-upload__overlay').classList.add('hidden');
      window.upload(new FormData(form), window.formSuccess, window.formError);
    }
  });

  // Кнопка закрытия формы редактирования
  var closeButton = document.querySelector('#upload-cancel');
  closeButton.addEventListener('click', function () {
    toggleEditForm('.img-upload__overlay', 'hidden');
  });

  // Закрытие окон по escape
  var ESC = 27;
  document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === ESC && document.activeElement.className !== 'text__description' && document.activeElement.className !== 'text__hashtags') {
      document.querySelector('.img-upload__overlay').classList.add('hidden');
    }

    if (evt.keyCode === ESC && document.querySelector('.success')) {
      document.querySelector('.success').classList.add('visually-hidden');
    }

    if (evt.keyCode === ESC && document.querySelector('.error')) {
      document.querySelector('.error').classList.add('visually-hidden');
    }
  });

  // Получение рандомного значения от min до max
  window.getRandomValue = function (min, max) {
    var randomValue = min + Math.random() * (max + 1 - min);
    randomValue = Math.floor(randomValue);
    return randomValue;
  };
})();
