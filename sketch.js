var player, playerimg,obstacle,obstacleimg;
var backimage, back,ground,groundimg, player_running, player_image;
var wall,wallimg, wallGroup;
var ball,ballimg, crab,crabimg,umb, umbimg,bucket,bucketimg, obstacleGroup;
var survival_time = 0;
var edges;
var over, overimg, reset,resetimg;
var gameState = "play";

function preload(){
  playerimg = loadImage("donald duck transformed.png");
  backimage = loadImage("back.jpg");
  wallimg = loadImage("wallimage.png");
  ballimg = loadImage("ball.png");
  crabimg = loadImage("crab.png");
  umbimg = loadImage("umbrella.png");
  bucketimg = loadImage("bucket.png");
  overimg = loadImage("gameover.png");
  resetimg = loadImage("reset game.png");
}

function setup() {
  createCanvas(900,600);  
  
  back = createSprite(450,300);
  back.addImage(backimage);
  back.scale = 1.3;
  back.velocityX = -4;
    
  edges = createEdgeSprites();
  
  over = createSprite(450,300,20,20);
  over.addImage(overimg);
  over.visible = false;
  
  reset = createSprite(450,500,20,20);
  reset.addImage(resetimg);
  reset.scale = 0.2;
  reset.visible = false;
  
  player = createSprite(150,520,20,20);
  player.addImage(playerimg);
  player.scale = 0.1;
  
  wallGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(490,590,1000,20);
}

function draw() {
  background("white");
      if(gameState == "play"){
      if(back.x<350){
        back.x = 460;
      }
    player.collide(edges[0]);

    walls();
    obstacles();

    over.visible = false;
    reset.visible = false;
    
  //movement of the player
    if(keyDown("space")&&player.y>400){
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY+0.8;

    if(keyDown("right_arrow")){
      player.x = player.x+5;
    }
    if(keyDown("left_arrow")){
      player.x = player.x-5;
    }
  
    player.collide(ground);
    player.collide(wallGroup);
    ground.visible = false;
    
    if(player.isTouching(obstacleGroup)){
      gameState = "end";
    }
}
    drawSprites();
    survival_time = Math.ceil(frameCount/frameRate());
    fill("black");
    textSize(25);
    textFont("Bangers")
    text("Survival Time: "+survival_time,50,50);
  
    if(gameState == "end"){
      player.velocityX = 0
      player.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      wallGroup.setVelocityXEach(0);
      back.velocityX = 0;
      text("WANNA PLAY AGAIN?",370,420);
      over.visible = true;
      reset.visible = true;
      wallGroup.depth = over.depth+1;
      obstacleGroup.depth = reset.depth+1;
   
      obstacleGroup.setLifetimeEach(-1);
      wallGroup.setLifetimeEach(-1);
            
      if(mousePressedOver(reset)){
        restart();
          reset.visible = false;
          over.visible = false;
          survival_time = 0;
      }
    }
}
function restart(){
  gameState = "play";
  obstacleGroup.destroyEach();
  wallGroup.destroyEach();  
  player.x = 150;
  player.y = 520; 
  back.velocityX = -4;
}

function walls(){
  if(frameCount%200==0){
    wall = createSprite(900,200,20,20);
    wall.addImage(wallimg);
    wall.scale = 0.2;
    wall.y = Math.round(random(300,350));
    wall.velocityX = -4;
    wall.lifetime = 500;
    wallGroup.add(wall);    
    player.depth = wallGroup.depth+1;
  }
}
function obstacles(){
  if(frameCount%180==0){
    var r = Math.round(random(1,4));
    if(r==1){
    ball = createSprite(900,520,20,20);
    ball.addImage(ballimg);
    ball.velocityX = -4;   
      ball.scale = 0.15;
      ball.lifetime = 500;
      player.depth = ball.depth+1;
      obstacleGroup.add(ball)
  }
    if(r==2){
    crab = createSprite(900,520,20,20);
    crab.addImage(crabimg);
    crab.velocityX = -4;
      crab.scale = 0.15;
      crab.lifetime = 500;
      player.depth = crab.depth+1;
      obstacleGroup.add(crab)
  }
    if(r==3){
    umb = createSprite(900,520,20,20);
    umb.addImage(umbimg);
    umb.velocityX = -4;
    umb.scale = 0.15;
      umb.lifetime = 500;
      player.depth = umb.depth+1;
    obstacleGroup.add(umb);
  }  
    if(r==4){
    bucket = createSprite(900,520,20,20);
    bucket.addImage(bucketimg);
    bucket.velocityX = -4;
      bucket.scale = 0.15;
      bucket.lifetime = 500;
      player.depth = bucket.depth+1;
      obstacleGroup.add(bucket);
  }
}
}