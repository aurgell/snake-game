"use strict";

class Snake {
  level;
  speed;
  snake;
  board;
  direction;
  x;
  y;
  #score;

  constructor(snake, board) {
    this.snake = snake;
    this.board = board;
    this.#score = 0;
    this.x = 50;
    this.y = 50;
    this.direction = null;
    this.speed = 10;
  }

  getScore() {
    return this.#score;
  }

  setScore(value) {
    this.#score = value;
  }

  render() {
    document.addEventListener("keydown", (event) => this.handleKeyPress(event));

    this.level = setInterval(() => this.move(), 100);
  }

  handleKeyPress(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.direction = "left";
        break;
      case "ArrowRight":
        this.direction = "right";
        break;
      case "ArrowUp":
        this.direction = "up";
        break;
      case "ArrowDown":
        this.direction = "down";
        break;
    }
  }

  move() {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case "left":
        newX = this.x - this.speed;
        break;
      case "right":
        newX = this.x + this.speed;
        break;
      case "up":
        newY = this.y - this.speed;
        break;
      case "down":
        newY = this.y + this.speed;
        break;
    }

    this.checkCollision(newX, newY);
    this.checkCollisionApple();

    this.x = newX;
    this.y = newY;

    this.snake.style.left = `${this.x}px`;
    this.snake.style.top = `${this.y}px`;
  }

  checkCollision(newX, newY) {
    const containerRect = this.board.getBoundingClientRect();
    const elementRect = this.snake.getBoundingClientRect();

    if (newX + 10 < containerRect.left) {
      newX = containerRect.left;
      return this.gameOver();
    }
    if (newX + elementRect.width > containerRect.right) {
      newX = containerRect.right - elementRect.width;
      return this.gameOver();
    }
    if (newY + 30 < containerRect.top) {
      newY = containerRect.top;
      return this.gameOver();
    }
    if (newY + elementRect.height + 20 > containerRect.bottom) {
      newY = containerRect.bottom - elementRect.height;
      return this.gameOver();
    }
  }

  gameOver() {
    const apple = document.getElementById("apple");

    this.snake.remove();
    apple.remove();
    this.board.remove();

    alert("Game Over!");

    let score = document.getElementById("score");
    score.innerText = `Final Score: ${this.#score}`;
  }

  checkCollisionApple() {
    const apple = document.getElementById("apple");

    const applePosition = apple.getBoundingClientRect();
    const elemRect = this.snake.getBoundingClientRect();

    if (
      !(
        applePosition.right < elemRect.left ||
        applePosition.left > elemRect.right ||
        applePosition.bottom < elemRect.top ||
        applePosition.top > elemRect.bottom
      )
    ) {
      this.#score = this.#score + 1;
      let score = document.getElementById("score");
      score.innerText = `Current Score: ${this.getScore()}`;
      new Apple(this.board);
      apple.remove();
    }
  }
}
