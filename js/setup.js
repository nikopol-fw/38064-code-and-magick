'use strict';

document.querySelector('.setup').classList.remove('hidden');

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SUR_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYE_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

// Получить случайный элемент массива
// @array - массив с элементами для выборки
var getRandomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Создать объект для нового персонажа
// @nameAtr - строка, имя персонажа
// @coatColorAtr - строка, цвет плаща
// @eyesColorAtr - строка, цвет глаз
var createCharacter = function (nameAtr, coatColorAtr, eyesColorAtr) {
  var newCharacter = {
    name: nameAtr,
    coatColor: coatColorAtr,
    eyesColor: eyesColorAtr
  };

  return newCharacter;
};

// Сгенерировать нового персонажа
var genericCharacter = function () {
  var characterName = getRandomArrayItem(NAMES) + ' ' + getRandomArrayItem(SUR_NAMES);
  var characterCoat = getRandomArrayItem(COAT_COLORS);
  var characterEye = getRandomArrayItem(EYE_COLORS);
  return createCharacter(characterName, characterCoat, characterEye);
};

// Создать новый nodeDOM на основе template
// @template - DOM-element используемый для создания персонажа
// @characters - массив с объектами-персонаж
var createCharacterDom = function (template, characters) {
  var newCharacter = template.cloneNode(true);

  newCharacter.querySelector('.setup-similar-label').textContent = characters[i].name;
  newCharacter.querySelector('.wizard-coat').style.fill = characters[i].coatColor;
  newCharacter.querySelector('.wizard-eyes').style.fill = characters[i].eyesColor;

  return newCharacter;
};


var characters = [];
for (var i = 0; i < 4; i++) {
  characters[i] = genericCharacter();
}


var characterPool = document.querySelector('.setup-similar-list');
var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var characterFragment = document.createDocumentFragment();
for (i = 0; i < characters.length; i++) {
  characterFragment.appendChild(createCharacterDom(characterTemplate, characters));
}

characterPool.appendChild(characterFragment);


document.querySelector('.setup-similar').classList.remove('hidden');
