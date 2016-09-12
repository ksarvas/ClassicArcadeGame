// This Game Object stores the Win/Lose conditions for the game
var Game = function() {
	this.lose = false;
	this.win = false;
};

// This creates the Enemy Class which is used to spawn the enemies that our player must avoid
var Enemy = function(x, y) {

	// Assigns the sprite image to be used for the Enemies
	this.sprite = 'images/enemy-bug.png';

	// Stores the Enemy location based on what is entered for each new Enemy object
	this.x = x;
	this.y = y;

	// Sets the Enemy speed using a random number between 1 & 5
	this.speed = Math.floor((Math.random() * 5) + 1);

};

// Updates the enemy's position and checks for player collisions
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	// Sets the position of the enemy based on dt and the speed multiplier
	this.x = this.x + 101 * dt * this.speed;

	// Checks for enemy collisions with the player and ends the game if a collision is detected
	if (this.y == player.y && (this.x > player.x - 40 && this.x < player.x + 40)) {

		// When game.lose = true, the renderLose function is called in engine.js
		game.lose = true;

	}

	// If the enemy goes off of the board, reset it
	if (this.x > 750) {
		this.reset();
	}
};

// Resets the enemy to the left of the board with a new y position and speed multiplier
Enemy.prototype.reset = function() {

	this.x = -200;
	var yVals = [220, 140, 60];
	this.y = yVals[Math.floor((Math.random() * 3))];
	this.speed = Math.floor((Math.random() * 5) + 1);

};

// Renders the Enemy on the canvas based on the sprite chosen and the current x, y location
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// Assigns the sprite image to be used for the Player
	this.sprite = 'images/char-horn-girl.png';

	// Stores the Player location
	this.x = x;
	this.y = y;

};

Player.prototype.handleInput = function(dir) {

	// These if statements change the player object location based on the user keyboard input
	if (dir == 'up') {
		this.y = this.y - 80;
	} else if (dir == 'down') {
		this.y = this.y + 80;
	} else if (dir == 'left') {
		this.x = this.x - 101;
	} else if (dir == 'right') {
		this.x = this.x + 101;
	}

	// These if statements make sure the player doesn't go off the map
	// The last else if statement initiates renderWin if Player reaches top row
	if (this.x < 0) {
		// This if statement prevents the Player from going off the left side of the map
		this.x = 0;

	} else if (this.x > 404) {
		// This if statement prevents the Player from going off the right side of the map
		this.x = 404;

	} else if (this.y > 380) {
		// This if statement prevents the Player from going off the bottom of the map
		this.y = 380;

	} else if (this.y < 0) {
		// The Player wins the game if they reach the top row of the map
		game.win = true;

	}
};

// Reset the player to her original position & image
Player.prototype.reset = function() {
	// Reset the player to the original position
	this.x = 202;
	this.y = 380;

};

Player.prototype.update = function(dt) {

	this.x = this.x;
	this.y = this.y;

};

// Renders the Player on the canvas based on the sprite chosen and the current x, y location
Player.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var yVals = [220, 140, 60];

// Creates enemy object instances of the Enemy Class
for (var i = 0; i < 5; i++) {

	// Randomly assigns a starting x-position
	var x = Math.floor((Math.random() * -1000) + 1);

	// Randomly assigns a starting y-position within the 3 available rows
	var y = yVals[Math.floor(Math.random() * 3)];

	// Creates the new enemy object
	var enemy = new Enemy(x, y);

	// Pushes the enemy into the allEnemies array
	allEnemies.push(enemy);
}

// Creates the player object instance of the Player Class and sets the player object to a starting position
var player = new Player(202, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Creates an instance of the game based on the Game Class which has the stored Win/Lose properties
var game = new Game();