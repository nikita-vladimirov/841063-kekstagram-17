'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  window.imgUpload = document.querySelector('#upload-file');
  window.imgUpload.addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    var file = window.imgUpload.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        document.querySelector('.img-upload__preview img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

