"use strict";

const element = document.getElementById("snake");
const container = document.getElementById("board");
const snake = new Snake(element, container);

const apple = new Apple(container);

snake.render();
