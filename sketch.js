var policeImg, police;
var burglarImg, burglar;
var gameOverImg, gameOver;
var restartImg, restart;
var backgroundImg, background;

var coinImg, rockImg;
var coin, rock;
var coinG, rockG

var score=0;

//Game States
var PLAY=1;
var End = 0;
var gameState = 1;

function preload(){
  policeImg = loadImage("police.png");
  burglarImg = loadImage("burglar.png");
  coinImg = loadImage("coin.png");
  backgroundImg = loadImage("background.png");
  rockImg = loadImage("rock.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}

function setup() {

  createCanvas(600,600);
  //moving background
  ground = createSprite(300,580,600,20);
  background = createSprite(width/2,300);
  background.addImage(backgroundImg);
  background.scale = 2;

  //creating burglar running
  burglar = createSprite(275,430);
  burglar.addImage(burglarImg);
  burglar.scale = 0.20;

  //create police running
  police = createSprite(80,425);
  police.addImage(policeImg);
  police.scale = 0.5;

  rockG = new Group();
  coinG = new Group();

  gameOver = createSprite(250,200);
  gameOver.addImage(gameOverImg);
  restart = createSprite(250,280);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {

  if(gameState===PLAY) {
     if(keyDown("space")&&burglar.y>=250) {
       burglar.y = burglar.y-10; 
     }
     burglar.y = burglar.y+0.8;
     
     burglar.collide(ground);
       
     background.velocityX = -6;
    //code to reset the background
    if(background.x < 0) {
      background.x = width/2;
    }
     
    createRocks();
    var rock = createSprite(Math.round(random(50, 350),40, 10, 10));
    createCoins();
    var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
     
    if (coinG.isTouching(burglar)) {
       coinG.destroyEach();
       score=score+100;
    }
    else if (rockG.isTouching(burglar)) {
     gameState = End;
     }
 }
  if (gameState===End) {
    background.velocityX = 0;
    rockG.destroyEach();
    coinG.destroyEach();
    
    rockG.setVelocityEach(0);
    coinG.setVelocityEach(0);

    gameOver.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }
  }

 drawSprites();
  textSize(20);
  fill(255);
  text("score: "+ score,150,30);

}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  rockG.destroyEach();
  coinG.destroyEach();
  score = 0;
}

function createRocks() {
    if (World.frameCount % 150 == 0) {
    var rock = createSprite(600,500);
    rock.addImage(rockImg);
    rock.scale = 0.12;
    rock.velocityX = -3;
    rock.lifetime = 190;
    rockG.add(rock);
    }
  }

function createCoins() {
  if (World.frameCount % 100 == 0) {
  var coin = createSprite(600,500)
  coin.addImage(coinImg);
  coin.scale = 0.10;
  coin.velocityX = -3;
  coin.lifetime = 190;
  coinG.add(coin);
  }
}