const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");
// innerWidth is coming form window element innerWidth
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Boundary {
  static width = 40;
  static height = 40;

  constructor(
    public position: { x: number; y: number },
    public width: number = 40,
    public height: number = 40
  ) {}
  draw() {
    if (context) context.fillStyle = "blue";
    context?.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Player {
  position!: { x: number; y: number };
  velocity!: { x: number; y: number };
  reduce = 15;
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
    context?.beginPath();
    context?.arc(this.position.x, this.position.y, this.reduce, 0, Math.PI * 2);
    if (context) context.fillStyle = "yellow";
    context?.fill();
    context?.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
// - mean its square
// " " mean its empty space
const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
let lastKey = "";
const boundaries: Boundary[] = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({ x: Boundary.width * j, y: Boundary.height * i })
        );
        break;
    }
  });
});
function circleCollidesWithRec(circle: Player, rectangle: Boundary) {
  return (
    circle.position.y - circle.reduce + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.reduce + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.reduce + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.reduce + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}
function animation() {
  window.requestAnimationFrame(animation);
  context?.clearRect(0, 0, canvas.width, canvas.height);
  if (keys.w.pressed && lastKey === "w") {
    for (const boundary of boundaries) {
      if (
        circleCollidesWithRec(
          { ...player, velocity: { ...player.velocity, y: -5 } } as Player,
          boundary
        )
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (const boundary of boundaries) {
      if (
        circleCollidesWithRec(
          { ...player, velocity: { ...player.velocity, y: 5 } } as Player,
          boundary
        )
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (const boundary of boundaries) {
      if (
        circleCollidesWithRec(
          { ...player, velocity: { ...player.velocity, x: -5 } } as Player,
          boundary
        )
      ) {
        player.velocity.x = -0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (const boundary of boundaries) {
      if (
        circleCollidesWithRec(
          { ...player, velocity: { ...player.velocity, x: 5 } } as Player,
          boundary
        )
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
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
  // player.velocity.y = 0;
  // player.velocity.x = 0;
}
animation();

window.addEventListener("keydown", ({ key }) => {
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
window.addEventListener("keyup", ({ key }) => {
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
