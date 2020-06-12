// Declare global variables
var s;
var scl = 30;
var grid = [20, 20];
var food;
var rate = 15;


function setup() {
  
  //Make the canvas, snake, and food
  createCanvas(grid[0] * scl, grid[1] * scl);
  s = new Snake();
  frameRate(rate);
  placeFood();
}

// Creates the food vector
function placeFood() {
  food = createVector(floor(random(grid[0])), floor(random(grid[1])));
  food.mult(scl);
  checkforvalidity();
}

// Checks to make sure the food isn't placed in an occupied cell
function checkforvalidity() {
  if(s.invalidFood(food)) {
     placeFood()
  }
}

function draw() {
  
  //Start with the background and the snake
  background(0);
  s.update();
  s.show();
  
  //Check to see if the snake ran into the food or itself
  s.eatFood(food);
  s.eatyoself();
  
  //Draw the food
  fill(255, 0, 100);
  arc(food.x + scl/2, food.y + scl/2, 0.8 * scl, 0.8 * scl, 0, 2 * Math.PI);
  
}

//Function to handle user input
function keyPressed() {
  
  //Make sure that the snake is going horizontal before going vertical
  if (keyCode === UP_ARROW) {
    if(s.yspeed === 0) {
      s.dir(0, -1);
    }
  } else if (keyCode === DOWN_ARROW) {
    if(s.yspeed === 0) {
      s.dir(0, 1); 
    }
  } else if (keyCode === LEFT_ARROW) {
    
    // Vice versa from above
    if(s.xspeed === 0) {
      s.dir(-1, 0); 
    }
  } else if (keyCode === RIGHT_ARROW) {
    if(s.xspeed === 0) {
      s.dir(1, 0); 
    }
  } else if (key === 'p') {
    s.pause();
  }

}

  
