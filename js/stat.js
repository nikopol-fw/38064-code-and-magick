'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 30;

var GRAPH_HEIGHT = 150;
var GRAPH_WIDTH = 40;
var GRAPH_GAP = 50;
var GRAPH_COLOR_PLAYER = 'rgba(255, 0, 0, 1)';
var GRAPH_COLOR_OTHERS = 'hsl(240, ';
var GRAPH_COLOR_OTHERS_LIGHTNESS = '50%';

var FONT_SIZE = 16;
var TEXT_COLOR = '#000000';
var TEXT_MAIN = [
  'Ура вы победили!',
  'Список результатов:'
];
var fontMainStyle = FONT_SIZE.toString() + 'px PT Mono';

var renderCloud = function (ctx, x, y, cWidth, cHeight, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cWidth, cHeight);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function (ctx, text, coordinate, fontStyle, color) {
  ctx.fillStyle = color;
  ctx.font = fontStyle;

  for (var i = 0; i < text.length; i++) {
    ctx.fillText(text[i], coordinate[i][0], coordinate[i][1]);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');

  var coordinates = [
    [CLOUD_X + GAP, CLOUD_Y + GAP],
    [CLOUD_X + GAP, CLOUD_Y + GAP + FONT_SIZE]
  ];

  renderText(ctx, TEXT_MAIN, coordinates, fontMainStyle, TEXT_COLOR);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    // Пропорция с округлением результата
    // @время-текущего-игрока * @максимальная-высота-графа / @максимальное-время-из-всех-игроков
    var curGraphHeight = Math.round(times[i] * GRAPH_HEIGHT / maxTime);

    // @Координата-X-до-облака + @отступ +
    // + @порядок-элемента * отступ-между-графами + @порядок-элемента * ширину-графа
    var curGraphX = CLOUD_X + GAP + i * GRAPH_GAP + i * GRAPH_WIDTH;

    // @Координата-до-облака + @двойной-отступ +
    // + @два-размера-шрифта + @разница-между-максимальной-высотой-графа-и-текущей
    var curGraphY = CLOUD_Y + 2 * GAP + 2 * FONT_SIZE + (GRAPH_HEIGHT - curGraphHeight);

    // @координата-текущего-графа - @размер-шрифта
    var curGraphTextY = curGraphY - FONT_SIZE;

    // @координата-текущего-графа - @два-отступа + @три-строчки-текста + @максимальная-высота-графа
    var curGraphNameY = CLOUD_Y + 2 * GAP + 3 * FONT_SIZE + GRAPH_HEIGHT;

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], curGraphX, curGraphNameY);
    ctx.fillText(Math.round(times[i]), curGraphX, curGraphTextY);

    if (names[i] === 'Вы') {
      ctx.fillStyle = GRAPH_COLOR_PLAYER;
    } else {
      ctx.fillStyle = GRAPH_COLOR_OTHERS + (Math.random() * 100).toString() + '%, ' + GRAPH_COLOR_OTHERS_LIGHTNESS + ')';
    }
    ctx.fillRect(curGraphX, curGraphY, GRAPH_WIDTH, curGraphHeight);
  }
};
