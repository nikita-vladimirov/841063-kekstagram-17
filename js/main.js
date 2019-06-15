var publishedPosts = [];
var numberPosts = 25; // Количество необходимых постов
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function getRandomValue(min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  randomValue = Math.floor(randomValue);
  return randomValue;
}

function createPosts() {
  for (var i = 0; i < numberPosts; i++) {
    var url = 'photos/' + Number(i + 1) + '.jpg';
    var likes = getRandomValue(15, 200);
    var message = comments[getRandomValue(0, (comments.length - 1))];

    publishedPosts[i] = {avatar: url, likes: likes, message: message};
  }
}

createPosts();

var postTemlate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

for (var i = 0; i < numberPosts; i++) {
  var post = postTemlate.cloneNode(true);

  post.querySelector('img').src = publishedPosts[i].avatar;
  post.querySelector('.picture__likes').textContent = publishedPosts[i].likes;
  post.querySelector('.picture__comments').textContent = publishedPosts[i].message;

  fragment.appendChild(post);
  document.querySelector('.pictures').appendChild(fragment);
}
