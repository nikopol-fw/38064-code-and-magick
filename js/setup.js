'use strict';


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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var CHARACTERS_NUMBER = 4;


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


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
// @character - объект-персонаж, созданный функцией createCharacter
var createCharacterDom = function (template, character) {
  var newCharacter = template.cloneNode(true);

  newCharacter.querySelector('.setup-similar-label').textContent = character.name;
  newCharacter.querySelector('.wizard-coat').style.fill = character.coatColor;
  newCharacter.querySelector('.wizard-eyes').style.fill = character.eyesColor;

  return newCharacter;
};


var characters = [];
for (var i = 0; i < CHARACTERS_NUMBER; i++) {
  characters.push(genericCharacter());
}


var characterPool = document.querySelector('.setup-similar-list');
var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var characterFragment = document.createDocumentFragment();
for (i = 0; i < characters.length; i++) {
  characterFragment.appendChild(createCharacterDom(characterTemplate, characters[i]));
}

characterPool.appendChild(characterFragment);

document.querySelector('.setup-similar').classList.remove('hidden');


// Обработка открытия/закрытия окна setup
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupInputName = setup.querySelector('.setup-user-name');

var openSetup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', setupEscPressHandler);
};

var closeSetup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', setupEscPressHandler);
};

var setupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupInputName) {
    closeSetup();
  }
};


setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});


// Обрабтка настройки мага
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name=coat-color]');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
var fireBall = document.querySelector('.setup-fireball-wrap');
var fireBallInput = fireBall.querySelector('input[name=fireball-color]');

var changeCoatColor = function () {
  var curColor = wizardCoat.style.fill;
  var newColor = getRandomArrayItem(COAT_COLORS);
  while (newColor === curColor) {
    newColor = getRandomArrayItem(COAT_COLORS);
  }
  wizardCoat.style.fill = newColor;
  wizardCoatInput.value = newColor;
};

var changeEyesColor = function () {
  var newColor = getRandomArrayItem(EYE_COLORS);
  wizardEyes.style.fill = newColor;
  wizardEyesInput.value = newColor;
};

var changeFireBallColor = function () {
  var newColor = getRandomArrayItem(FIREBALL_COLORS);
  fireBall.style.backgroundColor = newColor;
  fireBallInput.value = newColor;
};

wizardCoat.addEventListener('click', changeCoatColor);

wizardEyes.addEventListener('click', changeEyesColor);

fireBall.addEventListener('click', changeFireBallColor);
