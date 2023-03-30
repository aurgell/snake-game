"use strict";

class Apple {
  constructor(container) {
    this.container = container;
    this.apple = document.createElement("div");
    this.apple.id = "apple";
    this.apple.style.width = "12px";
    this.apple.style.height = "12px";
    this.apple.style.borderRadius = "50%";
    this.apple.style.backgroundColor = "red";
    this.apple.style.position = "absolute";
    this.container.appendChild(this.apple);
    this.generate();
  }

  generate() {
    const { clientWidth, clientHeight } = this.container;
    const maxX = clientWidth - parseInt(this.apple.style.width);
    const maxY = clientHeight - parseInt(this.apple.style.height);
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    this.apple.style.left = `${newX}px`;
    this.apple.style.top = `${newY}px`;
  }
}
