var Obstacles = [];
var speed = 12;
var objIndex = 0;
var playerX = 200;
var easing = 0.1;
var x = 200;
var gameState = "title";
var timer = 1;
var isDead = false;
var playerY = 365;
var spawnAmount = 100;
var otherPlayer

const socket = io("localhost:8080")

function setup() {
  otherPlayer  = new OtherPlayer()
  createCanvas(400, 400);
  preMain();
  redoVar();
}

function draw() {
  background(50);
  //otherPlayer.player(50)
  switch (gameState) {
    case "title":
      title();
      break;
    case "inGame":
      main();
      player();
      socket.emit("message", {
        x: playerX,
        y: playerY
      })
      break;
  }


}

socket.on("message", function(data){
  //console.log(data.x)
  otherPlayer.player(data.x)
})

function title() {
  fill(255);
  textSize(70);
  textAlign(LEFT);
  fill(225);
  text("AP CSP \nDigital \nPortfolio", 25, 80);
  textAlign(CENTER);
  textSize(25);
  stroke(150);
  line(0, 295, 400, 295);
  fill(224, 240, 255);
  text("click to start", 200, 345);
  if (mouseButton === LEFT) {
    gameState = "inGame";
  }
}

function redoVar() {
  speed = 13;
  objIndex = 0;
  playerX = 200;
  easing = 0.1;
  x = 200;
  //gameState = "title";
  timer = 1;
  isDead = false;
  playerY = 365;
}

function main() {
  if (Obstacles[objIndex].y > 425) {
    objIndex++;
  }
  if (objIndex == spawnAmount) {
    Obstacles = [];
    objIndex = 0;
    preMain();
  }
  for (var i = 0; i < spawnAmount; i++) {
    Obstacles[i].rectdraw();
  }
  Obstacles[objIndex].move();
  if (isDead == false) {
    textAlign(CENTER);
    fill(200);
    textSize(45);
    text(objIndex, 200, 50);
    textSize(25);
    text("score", 200, 75);
  }
}

function preMain() {
  for (var i = 0; i < 100; i++) {
    Obstacles.push(new Obstacle());
    Obstacles[i].set();
  }
}

function player() {
  fill(215);
  if (isDead) {
    fill(255, 79, 108);
    playerY += speed + 10;
  }
  rectMode(CENTER);
  square(x, playerY, 18, 1);

  // start of cited code
  // https://p5js.org/examples/input-easing.html
  let easingX = playerX - x;
  x += easingX * easing;
  // end of cited code

  if (
    (Obstacles[objIndex].y > 350 &&
      Obstacles[objIndex].y < 385 &&
      Obstacles[objIndex].pos == playerX) ||
    isDead == true
  ) {
    //gameOver();
  }
}

function gameOver() {
  fill(255, 79, 108);
  speed = 1;
  timer++;
  speed = 0.2;
  isDead = true;
  textSize(85);
  textAlign(LEFT);
  text("Game \nover", 25, 100);
  textAlign(CENTER);
  textSize(25);
  fill(235);
  text("click to restart", 200, 325);
}

function mouseClicked() {
  if (isDead == true) {
    isDead = false;
    clear();
    setup();
    main();
    player();
  }
}

function keyPressed() {
  if (isDead == false) {
    //console.log(keyCode)
    switch (keyCode) {
      case LEFT_ARROW:
        if (playerX > 50) {
          playerX -= 150;
        }
        break;
      case RIGHT_ARROW:
        if (playerX < 350) {
          playerX += 150;
        }

        break;
    }
    // if (keyCode === LEFT_ARROW) {

    // } else if (keyCode === RIGHT_ARROW) {

    // }
  }

  return false;
}

class OtherPlayer{

  constructor(){
    this.playerY = 365;
    this.playerX = 200;
    this.x = 200
    this.isDead == false
  }


  player(otherX) {
    //this.x = otherX
    
    
    fill(215);
    if (this.isDead) {
      fill(255, 79, 108);
      this.playerY += speed + 10;
    }
    rectMode(CENTER);
    square(this.x, this.playerY, 18, 1);
  
    // start of cited code
    // https://p5js.org/examples/input-easing.html
    let easingX = playerX - x;
    x += easingX * easing;
    console.log(this.x, otherX)
    //this.x = otherX
    // end of cited code
  
    if (
      (Obstacles[objIndex].y > 350 &&
        Obstacles[objIndex].y < 385 &&
        Obstacles[objIndex].pos == otherX) ||
      this.isDead == true
    ) {
      //gameOver();
    }
  }
  

}

class Obstacle {
  constructor() {
    this.count = 0;
    let num = int(random(0, 3)); //DECIMAL
    if (num == 1) {
      this.pos = 50;
    } else if (num == 2) {
      this.pos = 200;
    } else {
      this.pos = 350;
    }
  }

  set() {
    this.y = -10;
  }

  move() {
    this.y += speed;
  }

  rectdraw() {
    noStroke();
    rectMode(CENTER);
    switch (this.pos) {
      case 50:
        fill(245);
        rect(75, this.y, 135, 20);
        break;
      case 200:
        fill(245);
        rect(200, this.y, 140, 20);
        break;
      case 350:
        fill(245);
        rect(325, this.y, 135, 20);
        break;
    }
  }
}
