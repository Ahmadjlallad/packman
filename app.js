var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// innerWidth is coming form window element innerWidth
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Boundary = /** @class */ (function () {
    function Boundary(position, width, height) {
        if (width === void 0) { width = 40; }
        if (height === void 0) { height = 40; }
        this.position = position;
        this.width = width;
        this.height = height;
    }
    Boundary.prototype.draw = function () {
        if (context)
            context.fillStyle = "blue";
        context === null || context === void 0 ? void 0 : context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    Boundary.width = 40;
    Boundary.height = 40;
    return Boundary;
}());
var Player = /** @class */ (function () {
    function Player(config) {
        this.reduce = 15;
        this.position = config.position;
        this.velocity = config.velocity;
        this.reduce = config.reduce || this.reduce;
    }
    Player.prototype.draw = function () {
        // tell context to begin the draw path
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
        if (context)
            context.fillStyle = "yellow";
        context === null || context === void 0 ? void 0 : context.fill();
        context === null || context === void 0 ? void 0 : context.closePath();
    };
    Player.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Player;
}());
// - mean its square
// " " mean its empty space
var map = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", " ", "-", " ", "-", " ", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", " ", "-", " ", "-", " ", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
];
var keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};
var lastKey = "";
var boundaries = [];
var player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});
map.forEach(function (row, i) {
    row.forEach(function (symbol, j) {
        switch (symbol) {
            case "-":
                boundaries.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }));
                break;
        }
    });
});
function circleCollidesWithRec(circle, rectangle) {
    return (circle.position.y - circle.reduce + circle.velocity.y <=
        rectangle.position.y + rectangle.height &&
        circle.position.x + circle.reduce + circle.velocity.x >=
            rectangle.position.x &&
        circle.position.y + circle.reduce + circle.velocity.y >=
            rectangle.position.y &&
        circle.position.x - circle.reduce + circle.velocity.x <=
            rectangle.position.x + rectangle.width);
}
function animation() {
    window.requestAnimationFrame(animation);
    context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.w.pressed && lastKey === "w") {
        for (var _i = 0, boundaries_1 = boundaries; _i < boundaries_1.length; _i++) {
            var boundary = boundaries_1[_i];
            if (circleCollidesWithRec(__assign(__assign({}, player), { velocity: __assign(__assign({}, player.velocity), { y: -5 }) }), boundary)) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = -5;
            }
        }
    }
    else if (keys.s.pressed && lastKey === "s") {
        for (var _a = 0, boundaries_2 = boundaries; _a < boundaries_2.length; _a++) {
            var boundary = boundaries_2[_a];
            if (circleCollidesWithRec(__assign(__assign({}, player), { velocity: __assign(__assign({}, player.velocity), { y: 5 }) }), boundary)) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = 5;
            }
        }
    }
    else if (keys.a.pressed && lastKey === "a") {
        for (var _b = 0, boundaries_3 = boundaries; _b < boundaries_3.length; _b++) {
            var boundary = boundaries_3[_b];
            if (circleCollidesWithRec(__assign(__assign({}, player), { velocity: __assign(__assign({}, player.velocity), { x: -5 }) }), boundary)) {
                player.velocity.x = -0;
                break;
            }
            else {
                player.velocity.x = -5;
            }
        }
    }
    else if (keys.d.pressed && lastKey === "d") {
        for (var _c = 0, boundaries_4 = boundaries; _c < boundaries_4.length; _c++) {
            var boundary = boundaries_4[_c];
            if (circleCollidesWithRec(__assign(__assign({}, player), { velocity: __assign(__assign({}, player.velocity), { x: 5 }) }), boundary)) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = 5;
            }
        }
    }
    boundaries.forEach(function (boundary) {
        boundary.draw();
        if (circleCollidesWithRec(player, boundary)) {
            player.velocity.y = 0;
            player.velocity.x = 0;
        }
    });
    player.update();
    // player.velocity.y = 0;
    // player.velocity.x = 0;
}
animation();
window.addEventListener("keydown", function (_a) {
    var key = _a.key;
    switch (key.toLowerCase()) {
        // in the web dev every thing start from the top
        // so if its reversed
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
});
window.addEventListener("keyup", function (_a) {
    var key = _a.key;
    switch (key.toLowerCase()) {
        case "w":
            keys.w.pressed = false;
        case "s":
            keys.s.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});
