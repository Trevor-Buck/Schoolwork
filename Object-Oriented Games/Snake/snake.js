function Snake() {
  
  //define position, body, and direction
  this.x = 0;
  this.y = 0;
  this.total = 0;
  this.tail = [];
  
  this.xspeed = 0;
  this.yspeed = 0;
  
  this.pausex = 0;
  this.pausey = 0;
  
  //If paused, store speed variable
  this.pause = function() {
    
    if (this.pausex === this.pausey === 0) {
      this.pausex = this.xspeed;
      this.pausey = this.yspeed;
    
      this.xspeed = 0;
      this.yspeed = 0;
      
    } else {
      this.xspeed = this.pausex;
      this.yspeed = this.pausey;
      
      this.pausex = 0;
      this.pausey = 0;
    }
    
  }
  
  //Make sure the food is placed in an empty square
  this.invalidFood = function(pos) {
    invalidity = false;
    
    //check the head
    if (dist(this.x, this.y, pos.x, pos.y) < 2) {
       invalidity = true; 
    }
    
    //check the body
    for (var i = 0; i < this.tail.length; i++) {
      if (dist(this.tail[i].x, this.tail[i].y, pos.x, pos.y) < 2) {
        invalidity = true;
      }
    }
    return invalidity;
  }
  
  //Did we eat the food?
  this.eatFood = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 2) {
      this.total++;
      placeFood();
    }
  }
  
  //Did we eat ourselves?
  this.eatyoself = function() {
    for (var i = 0; i < this.tail.length; i ++) {
      if(dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 2) {
        console.log("You ate yourself!");
        this.death();
        break;
      }
    }
  }
  
  
  this.update = function() {
    
    //If we didn't eat food, we need to shift our tail
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.total -1; i++) {
        this.tail[i] = this.tail[i + 1]; 
      }
    }
    // We always need to create a new vector for the new space
    this.tail[this.total - 1] = createVector(this.x, this.y)    
    
    //Move head
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;
    
    // Check to see if we are still in the boundaries
    if ((this.x >= (scl * grid[0])) || (this.y >= (scl * grid[1]))) {
       this.death(); 
    }
    if ((this.x < 0) || (this.y < 0)) {
       this.death(); 
    }   
    
  }
  
  //Helper function to change direction
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  
  this.show = function() {
    
    //draw head
    fill(255)
    rect(this.x, this.y, scl, scl);
    
    //draw body
    for (var i = 0; i < this.total ; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  
  }
  
  //When we die, this function is called
  this.death = function() {
    
    //Display relevant information
    console.log("Score = " + this.total);
    console.log("Press Arrow Key to start again.");
    
    //Reset all of the variables
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    
  }
}
  
