"use strict";
import drawMap from "./src/map.js";
import { context, canvas } from "./src/contextService.js";
import { Player, Boundary, Ghost } from "./src/gameObjects.js";
const score = document.getElementById("score");
const pauseElement = document.getElementById("pause");
const winElement = document.getElementById("win");
const loseElement = document.getElementById("lose");
let myReq = 0;
let pause = false;
let lost = false;
let win = false;
const didVarChange = (lastArg) => (newArg) => {
    if (lastArg !== newArg) {
        lastArg = newArg;
        return true;
    }
    return false;
};
let lastKey = [];
let ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: { x: Ghost.speed, y: 0 },
        color: "red",
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 3 + Boundary.height / 2,
        },
        velocity: { x: Ghost.speed, y: 0 },
        color: "pink",
    }),
];
let player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});
const reCreatePlayerAndGhost = () => {
    ghosts = [
        new Ghost({
            position: {
                x: Boundary.width * 6 + Boundary.width / 2,
                y: Boundary.height + Boundary.height / 2,
            },
            velocity: { x: Ghost.speed, y: 0 },
            color: "red",
        }),
        new Ghost({
            position: {
                x: Boundary.width * 6 + Boundary.width / 2,
                y: Boundary.height * 3 + Boundary.height / 2,
            },
            velocity: { x: Ghost.speed, y: 0 },
            color: "pink",
        }),
    ];
    player = new Player({
        position: {
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: 0,
            y: 0,
        },
    });
};
const map = [
    ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
    ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
    ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
    ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
    ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
    ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
    ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];
const boundaries = [];
let pellets = [];
const powerUps = [];
drawMap(map, boundaries, pellets, powerUps);
const maxScoreCanGet = pellets.length;
const saveScore = didVarChange(1);
function circleCollidesWithRec(circle, rectangle) {
    const padding = Boundary.width / 2 - circle.reduce - 1;
    return (circle.position.y - circle.reduce + circle.velocity.y <=
        rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.reduce + circle.velocity.x >=
            rectangle.position.x - padding &&
        circle.position.y + circle.reduce + circle.velocity.y >=
            rectangle.position.y - padding &&
        circle.position.x - circle.reduce + circle.velocity.x <=
            rectangle.position.x + rectangle.width + padding);
}
function animation() {
    if (saveScore(maxScoreCanGet - pellets.length)) {
        score.innerText = (maxScoreCanGet - pellets.length).toFixed();
    }
    myReq = window.requestAnimationFrame(animation);
    context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvas.width, canvas.height);
    if (lastKey.includes("w")) {
        for (const boundary of boundaries) {
            if (circleCollidesWithRec(Object.assign(Object.assign({}, player), { velocity: { x: 0, y: -5 } }), boundary)) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = -5;
            }
        }
    }
    if (lastKey.includes("s")) {
        for (const boundary of boundaries) {
            if (circleCollidesWithRec(Object.assign(Object.assign({}, player), { velocity: { x: 0, y: 5 } }), boundary)) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = 5;
            }
        }
    }
    if (lastKey.includes("a")) {
        for (const boundary of boundaries) {
            if (circleCollidesWithRec(Object.assign(Object.assign({}, player), { velocity: { y: 0, x: -5 } }), boundary)) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = -5;
            }
        }
    }
    if (lastKey.includes("d")) {
        for (const boundary of boundaries) {
            if (circleCollidesWithRec(Object.assign(Object.assign({}, player), { velocity: { y: 0, x: 5 } }), boundary)) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = 5;
            }
        }
    }
    for (let i = 0; i < powerUps.length; i++) {
        const powerUp = powerUps[i];
        powerUp === null || powerUp === void 0 ? void 0 : powerUp.draw();
        if (Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y) <
            powerUp.reduce + player.reduce) {
            powerUps.splice(i, 1);
            ghosts.forEach((ghost) => {
                ghost.scared = true;
                setTimeout(() => {
                    ghost.scared = false;
                }, 5000);
            });
        }
    }
    for (let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i];
        if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) <
            ghost.reduce + player.reduce) {
            if (ghost.scared) {
                ghosts.splice(i, 1);
            }
            else {
                lost = true;
                window.cancelAnimationFrame(myReq);
                loseElement.classList.remove("hidden");
            }
        }
    }
    for (let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i];
        pellet.draw();
        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) <
            pellet.reduce + player.reduce) {
            pellets.splice(i, 1);
        }
    }
    boundaries.forEach((boundary) => {
        boundary.draw();
        if (circleCollidesWithRec(player, boundary)) {
            player.velocity.y = 0;
            player.velocity.x = 0;
        }
    });
    player.update();
    ghosts.forEach((ghost) => {
        ghost.update();
        const collisions = [];
        for (const boundary of boundaries) {
            if (!collisions.includes("right") &&
                circleCollidesWithRec(Object.assign(Object.assign({}, ghost), { velocity: { y: 0, x: ghost.speed } }), boundary)) {
                collisions.push("right");
            }
            if (!collisions.includes("left") &&
                circleCollidesWithRec(Object.assign(Object.assign({}, ghost), { velocity: { y: 0, x: -ghost.speed } }), boundary)) {
                collisions.push("left");
            }
            if (!collisions.includes("up") &&
                circleCollidesWithRec(Object.assign(Object.assign({}, ghost), { velocity: { x: 0, y: -ghost.speed } }), boundary)) {
                collisions.push("up");
            }
            if (!collisions.includes("down") &&
                circleCollidesWithRec(Object.assign(Object.assign({}, ghost), { velocity: { x: 0, y: ghost.speed } }), boundary)) {
                collisions.push("down");
            }
        }
        if (collisions.length > ghost.prevCollision.length) {
            ghost.prevCollision = collisions;
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollision)) {
            if (ghost.velocity.x > 0 && !ghost.prevCollision.includes("right"))
                ghost.prevCollision.push("right");
            else if (ghost.velocity.x < 0 && !ghost.prevCollision.includes("left"))
                ghost.prevCollision.push("left");
            else if (ghost.velocity.y < 0 && !ghost.prevCollision.includes("up"))
                ghost.prevCollision.push("up");
            else if (ghost.velocity.y > 0 && !ghost.prevCollision.includes("down"))
                ghost.prevCollision.push("down");
            const pathWay = ghost.prevCollision.filter((collision) => {
                return !collisions.includes(collision);
            });
            const direction = pathWay[Math.floor(Math.random() * pathWay.length)];
            switch (direction) {
                case "down":
                    ghost.velocity.x = 0;
                    ghost.velocity.y = ghost.speed;
                    break;
                case "up":
                    ghost.velocity.x = 0;
                    ghost.velocity.y = -ghost.speed;
                    break;
                case "right":
                    ghost.velocity.x = ghost.speed;
                    ghost.velocity.y = 0;
                    break;
                case "left":
                    ghost.velocity.x = -ghost.speed;
                    ghost.velocity.y = 0;
                    break;
            }
            ghost.prevCollision = [];
        }
    });
    if (pellets.length === 0) {
        win = true;
        window.cancelAnimationFrame(myReq);
        winElement.classList.remove("hidden");
    }
    if (player.velocity.x > 0) {
        player.rotation = 0;
    }
    else if (player.velocity.x < 0) {
        player.rotation = Math.PI;
    }
    else if (player.velocity.y > 0) {
        player.rotation = Math.PI / 2;
    }
    else if (player.velocity.y < 0) {
        player.rotation = Math.PI * 1.5;
    }
}
animation();
window.addEventListener("keydown", ({ key }) => {
    switch (key.toLowerCase()) {
        // in the web dev every thing start from the top
        // so if its reversed
        case "w":
            !lastKey.includes("w") && lastKey.push("w");
            break;
        case "s":
            !lastKey.includes("s") && lastKey.push("s");
            break;
        case "a":
            !lastKey.includes("a") && lastKey.push("a");
            break;
        case "d":
            !lastKey.includes("d") && lastKey.push("d");
            break;
        case " ":
            if (!lost && !win)
                if (!pause) {
                    window.cancelAnimationFrame(myReq);
                    pause = true;
                    pauseElement.classList.remove("hidden");
                }
                else {
                    pause = false;
                    pauseElement.classList.add("hidden");
                    animation();
                }
            break;
        case "r":
            window.cancelAnimationFrame(myReq);
            winElement.classList.add("hidden");
            loseElement.classList.add("hidden");
            pellets = [];
            drawMap(map, boundaries, pellets, powerUps);
            reCreatePlayerAndGhost();
            saveScore(1);
            animation();
            win = false;
            lost = false;
            break;
    }
});
window.addEventListener("keyup", ({ key }) => {
    switch (key.toLowerCase()) {
        case "w":
            lastKey = lastKey.filter((keys) => keys !== "w");
            break;
        case "s":
            lastKey = lastKey.filter((keys) => keys !== "s");
            break;
        case "a":
            lastKey = lastKey.filter((keys) => keys !== "a");
            break;
        case "d":
            lastKey = lastKey.filter((keys) => keys !== "d");
            break;
    }
});
document.addEventListener("contextmenu", (event) => event.preventDefault());
