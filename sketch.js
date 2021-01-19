//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var bg;
function preload()
{
  //load images 
  doggyImg=loadImage("Dog.png")
  happyDoggyImg=loadImage("happydog.png")
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,300,150,150);
  dog.addImage(doggyImg);
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}
function draw() {  
  background("hotpink")
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDoggyImg);
  }

  fill(255,255,254);
  strokeWeight(10)
  stroke("purple");
  textSize(30);
  textFont("Brush Script MT")
  text("Food remaining : "+foodS,170,200);
  textSize(20)
  textFont("Brush Script MT")
  text("Note: Quickly Press UP_ARROW Key To Feed Brownie!",10,30,450,30);

  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}