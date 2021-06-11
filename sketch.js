//Create variables here
var database;
var saddog, sad_img;
var happydog, happy_img;
var foodS, foodStock;

function preload(){
	//load images here
  sad_img = loadImage("../images/dogImg.png");
  happy_img = loadImage("../images/dogImg1.png");

}

function setup() {
	createCanvas(400, 400);
  database = firebase.database();

 // game = new Game();
  saddog = createSprite(200,235,20,20);
  saddog.addImage(sad_img);
  saddog.scale = 0.2;

}


function draw() {  
  background("green");

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    saddog.addImage(happy_img);
  }

  textSize(18);
  text("Press UP ARROW key to feed the dog ",45,20);

  textSize(24);
  text("Food remaining :"+foodS,90,100);

  drawSprites();
  //add styles here
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })

}



