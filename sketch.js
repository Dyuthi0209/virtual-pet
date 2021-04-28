var database;
var dog, dogImg, happyDog;
var foodS = 20;
var lastFed = 0;
var foodObj = null;
var feedButton, addButton;
var feedTime;
var lastfed;
var fedtime;
//load images
function preload()
{

  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");

}


function setup() {

  //canvas
  createCanvas(800, 500);

  
  
  //button to feed the dog
  feedButton = createButton("Feed your dog");
  feedButton.position(700, 95);
  feedButton.mousePressed(feedDog);

  
  addButton = createButton("Add milk bottles");
  addButton.position(820, 95);
  addButton.mousePressed(addFood);

  //create foodObj
  foodObj = new Food();

  //create dog
  dog = createSprite(650, 280);
  dog.scale = 0.3;
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDog);

  
}


function draw() {  

  //background
  background(43,72,84);

  //display last fed
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed (approx) : "+ lastFed % 12 + " PM", 300,30);
   }else if(lastFed==0){
     text("Last Feed (approx) : 12 AM",300,30);
   }else{
     text("Last Feed (approx) : "+ lastFed + " AM", 300,30);
   }

   //draw all sprites
  drawSprites();

  //display food stock
  strokeWeight(3);
  fill("white");
  textSize(30);
  text("Milk bottles left in stock : " + foodS, 30, 475);

  //display foodObj
  foodObj.display();

}


//increment foodS, updateFoodStock using foodS
function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}


//change dog image, deduct foodS, updateFoodStock using foodS, set lastFed
function feedDog(){
  if(foodS > 0){
    dog.changeAnimation("dog2", happyDog);
    foodS--;
    foodObj.updateFoodStock(foodS);
    database.ref('/').update({
    feedTime: hour()
   // foodObj.updateLastFed(lastFed);
  })

   
  }
}


