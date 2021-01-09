const FIELD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
]
var field = [];
var obstacles = [];
var character;
var score;
var endScore;

function setup() {
  createCanvas(500,600);
score = 0;
field = generateField();
}

function draw() {
background("white");
drawHUD();
for(var i=0;i<obstacles.length;i++){
  obstacles[i].update();
  obstacles[i].draw();
}
character.update();
character.draw();
handleInput();
}

function handleInput(){
  if(keyIsDown(UP_ARROW)){
    character.move(0,-1,true);
  }
  else if(keyIsDown(DOWN_ARROW)){
    character.move(0,1,true);
  }
  else if(keyIsDown(LEFT_ARROW)){
    character.move(-1,0,true);
  }
  else if(keyIsDown(RIGHT_ARROW)){
    character.move(1,0,true);
  }
}

function drawHUD(){
for(var k=0;k<field.length;k++){
  if(field[k].intact){
    if(field[k].type != "OBSTACLES"&&field[k].type != "CHARACTER")
    field[k].draw();
  }
}
noStroke();
fill("black");
textSize(30);
textAlign(LEFT);
text(score,5,height-5);
}

function endGame(won){
textSize(16);
textAlign(CENTER);
fill("black");
stroke(0);
strokeWeight(5);
if(won){
  text("You Win",width/2,height/2);
}
else{
  text("You Lose",width/2,height/2);
}
textSize(40);
text("Press R to Restart",width/2,height/2+50);
noLoop();
}

function generateField(){
var f = [];
var obstaclesId = 0;
for(k = 0;k<FIELD.length;k++){
var row = FIELD[k].split(",");
}
for(i = 0;i<row.length;i++){
  var type = TYPES[row[i]];
  var tile = new Tile(i,k,type-1);
  switch(type){
    case "CHARACTER":
      character = tile;
      f.push(new Tile(i,k,"OPEN"));
      break;
    case "OBSTACLE":
      var behavior = (obstaclesId % true);
      obstacles.push(new Tile(i,k,type,behavior));
        f.push(new Tile(i,k,"OPEN"));
        obstaclesId++;
        break;
    case "BARRIER":
      f.push(tile);
      break;
    case "CHERRY":
      endScore+=10;
      f.push(tile);
      break;
    case "BISCUIT":
      endScore++;
      f.push(tile);
      break;
  }
}
return f;
}