"use strict";
import { context } from "./contextService.js";

export class Boundary {
  static width = 40;
  width = 40;
  static height = 40;
  height = 40;
  position!: { x: number; y: number };
  image!: CanvasImageSource;
  constructor(config: {
    image: HTMLImageElement;
    position: { x: number; y: number };
    color?: string;
  }) {
    this.position = config.position;
    this.image = config.image;
  }

  draw() {
    if (context) context.fillStyle = "blue";
    context?.drawImage(this.image, this.position.x, this.position.y);
  }
}

export class Player {
  position!: { x: number; y: number };
  velocity!: { x: number; y: number };
  reduce = 15;
  radians = 0.7;
  openRate = 0.12;
  rotation = 0;

  constructor(config: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    reduce?: number;
  }) {
    this.position = config.position;
    this.velocity = config.velocity;
    this.reduce = config.reduce || this.reduce;
  }

  draw() {
    // tell context to begin the draw path
    context?.save();
    context?.translate(this.position.x, this.position.y);
    context?.rotate(this.rotation);
    context?.translate(-this.position.x, -this.position.y);
    context?.beginPath();
    context?.arc(
      this.position.x,
      this.position.y,
      this.reduce,
      this.radians,
      Math.PI * 2 - this.radians
    );
    if (context) context.fillStyle = "yellow";
    context?.lineTo(this.position.x, this.position.y);
    context?.fill();
    context?.closePath();
    context?.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }
    this.radians += this.openRate;
  }
}
export class Ghost {
  position!: { x: number; y: number };
  velocity!: { x: number; y: number };
  reduce = 15;
  color = "";
  prevCollision: ("right" | "left" | "up" | "down")[] = [];
  static speed = 2;
  speed = Ghost.speed;
  scared = false;

  constructor(config: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    reduce?: number;
    color: string;
  }) {
    this.position = config.position;
    this.velocity = config.velocity;
    this.reduce = config.reduce || this.reduce;
    this.color = config.color;
  }

  draw() {
    // tell context to begin the draw path
    context?.beginPath();
    context?.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
    if (context) context.fillStyle = this.scared ? "lightblue" : this.color;
    context?.fill();
    context?.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
export class Pellet {
  position!: { x: number; y: number };
  reduce = 3;

  constructor(config: { position: { x: number; y: number }; reduce?: number }) {
    this.position = config.position;
    this.reduce = config.reduce || this.reduce;
  }

  draw() {
    // tell context to begin the draw path
    context?.beginPath();
    context?.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
    if (context) context.fillStyle = "white";
    context?.fill();
    context?.closePath();
  }
}
export class PowerUp {
  position!: { x: number; y: number };
  reduce = 8;

  constructor(config: { position: { x: number; y: number }; reduce?: number }) {
    this.position = config.position;
    this.reduce = config.reduce || this.reduce;
  }

  draw() {
    // tell context to begin the draw path
    context?.beginPath();
    context?.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
    if (context) context.fillStyle = "lightgreen";
    context?.fill();
    context?.closePath();
  }
}
