var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running;
var banana ,bananaImg, obstacle, obstacleImg, ground,groundImg;
var monkeyCollide;
var FoodGroup, obstacleGroup;
var score;
var bananaScore=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  
 
 
}



function setup() {
  
  createCanvas(400,400);
  
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1; 
  
ground=createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.shapeColor="green";

console.log(ground.x);
  
FoodGroup=createGroup();
obstacleGroup=createGroup();
  
score=0;
bananaScore=0;  
  
}


function draw() {
  background("lightblue");
  
  fill("black");
  text("Survival Time = "+score,250,50);
  
  fill("orange");
  textSize(20);
  text("Points = "+bananaScore,100,50)
  
  if(gameState===PLAY){
    
   score = score + Math.round(getFrameRate()/60);
   
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      bananaScore=bananaScore+1;
    }
    
     if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
   monkey.velocityY = monkey.velocityY + 0.8
    
bananas();
obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }

monkey.collide(ground);
  

 if(gameState===END){
   
   ground.velocityX=0;
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
   fill("red")
   textSize(30)
   text("GAMEOVER!!!",100,200)
   fill("black")
   textSize(15)
   text("Press P to Play Again",130,230)
   
   if(keyDown("p")){
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     score=0;
     bananaScore=0;
     gameState=PLAY;
   }
   
 }
 

  
 drawSprites(); 
}

function bananas() {
  
  if(frameCount%80===0){
    
    banana = createSprite(620,160,50,50);
    banana.addAnimation("banana",bananaImg);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=220;
    FoodGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount%200===0){
    
    rock=createSprite(620,325,50,50);
    rock.addAnimation("rock",obstacleImg);
    rock.setCollider("circle",0,0,180);
    rock.scale=0.13;
    rock.velocityX=-4;
    rock.lifetime=220;
    obstacleGroup.add(rock);
  }
}


