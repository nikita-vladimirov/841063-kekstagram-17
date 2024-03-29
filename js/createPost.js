'use strict';

(function () {
  window.createPost = function (item) {
    var postTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var post = postTemplate.cloneNode(true);

    post.querySelector('img').src = item.url;
    post.querySelector('.picture__likes').textContent = item.likes;
    post.querySelector('.picture__comments').textContent = item.comments.length;

    var fragment = document.createDocumentFragment();

    fragment.appendChild(post);
    document.querySelector('.pictures').appendChild(fragment);
  };
})();
