"use strict";
import { context } from "./contextService.js";
export class Boundary {
    constructor(config) {
        this.width = 40;
        this.height = 40;
        this.position = config.position;
        this.image = config.image;
    }
    draw() {
        if (context)
            context.fillStyle = "blue";
        context === null || context === void 0 ? void 0 : context.drawImage(this.image, this.position.x, this.position.y);
    }
}
Boundary.width = 40;
Boundary.height = 40;
export class Player {
    constructor(config) {
        this.reduce = 15;
        this.radians = 0.7;
        this.openRate = 0.12;
        this.rotation = 0;
        this.position = config.position;
        this.velocity = config.velocity;
        this.reduce = config.reduce || this.reduce;
    }
    draw() {
        // tell context to begin the draw path
        context === null || context === void 0 ? void 0 : context.save();
        context === null || context === void 0 ? void 0 : context.translate(this.position.x, this.position.y);
        context === null || context === void 0 ? void 0 : context.rotate(this.rotation);
        context === null || context === void 0 ? void 0 : context.translate(-this.position.x, -this.position.y);
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.arc(this.position.x, this.position.y, this.reduce, this.radians, Math.PI * 2 - this.radians);
        if (context)
            context.fillStyle = "yellow";
        context === null || context === void 0 ? void 0 : context.lineTo(this.position.x, this.position.y);
        context === null || context === void 0 ? void 0 : context.fill();
        context === null || context === void 0 ? void 0 : context.closePath();
        context === null || context === void 0 ? void 0 : context.restore();
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
    constructor(config) {
        this.reduce = 15;
        this.color = "";
        this.prevCollision = [];
        this.speed = Ghost.speed;
        this.scared = false;
        this.position = config.position;
        this.velocity = config.velocity;
        this.reduce = config.reduce || this.reduce;
        this.color = config.color;
    }
    draw() {
        // tell context to begin the draw path
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
        if (context)
            context.fillStyle = this.scared ? "lightblue" : this.color;
        context === null || context === void 0 ? void 0 : context.fill();
        context === null || context === void 0 ? void 0 : context.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
Ghost.speed = 2;
export class Pellet {
    constructor(config) {
        this.reduce = 3;
        this.position = config.position;
        this.reduce = config.reduce || this.reduce;
    }
    draw() {
        // tell context to begin the draw path
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
        if (context)
            context.fillStyle = "white";
        context === null || context === void 0 ? void 0 : context.fill();
        context === null || context === void 0 ? void 0 : context.closePath();
    }
}
export class PowerUp {
    constructor(config) {
        this.reduce = 8;
        this.position = config.position;
        this.reduce = config.reduce || this.reduce;
    }
    draw() {
        // tell context to begin the draw path
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
        if (context)
            context.fillStyle = "lightgreen";
        context === null || context === void 0 ? void 0 : context.fill();
        context === null || context === void 0 ? void 0 : context.closePath();
    }
}
