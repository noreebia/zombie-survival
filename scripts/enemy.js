function Enemy(){
	this.radius = 20;
	this.speed = 2;
	this.angle;
	this.armLength=30;
	this.armWidth=4;
	this.distanceToDestination;
	this.spawnOffset = 120;
	
	this.spawnRandomly();
}

Enemy.prototype.hasReachedDestination = function(){
	this.distanceToDestination = Math.sqrt( Math.pow( (this.destinationY - this.y) ,2) +  Math.pow( (this.destinationX - this.x) ,2));

	if(this.distanceToDestination < 10){
		return true;
	}
	else{
		return false;
	}
}

Enemy.prototype.setDestination = function(){
	this.destinationX = player.x;
	this.destinationY = player.y;
}

Enemy.prototype.setVelocity = function(){
	this.dx = this.destinationX - this.x;
	this.dy = this.destinationY - this.y;

	
	this.mag      = Math.sqrt( this.dx * this.dx + this.dy * this.dy);
	this.velocityX     = (this.dx/this.mag) * this.speed;
	this.velocityY   = (this.dy/this.mag) * this.speed;
}

Enemy.prototype.move = function(){
	this.x += this.velocityX;
	this.y += this.velocityY;
}

Enemy.prototype.display = function(){
	ctx.save();
	ctx.translate( this.x, this.y );
	ctx.rotate(this.angle);
	
	ctx.arc(0, 0, this.radius, 0, Math.PI*2, true)
	ctx.fill();

	ctx.fillRect(0,-(this.radius*(2/3)), this.armLength, this.armWidth);
	ctx.fillRect(0,+(this.radius*(2/3)-(this.armWidth/2)), this.armLength, this.armWidth);
	ctx.closePath();
	ctx.restore();
}

Enemy.prototype.setAngle = function(){
	this.angle = Math.atan2(this.dy,this.dx);
}

Enemy.prototype.spawnAtPoint = function(x,y){
	this.x = x;
	this.y = y;
	this.set();
}

Enemy.prototype.spawnRandomly = function(){
	var spawnLocation = getRandomNumber(1, 4);
	switch(spawnLocation){
	case 1:
		this.spawnAtPoint(getRandomNumber(0, WIDTH), -this.spawnOffset);
		break;
	case 2:
		this.spawnAtPoint( WIDTH + this.spawnOffset,getRandomNumber(0, HEIGHT));
		break;
	case 3:
		this.spawnAtPoint(getRandomNumber(0, WIDTH), HEIGHT + this.spawnOffset);
		break;
	case 4:
		this.spawnAtPoint(- this.spawnOffset, getRandomNumber(0, HEIGHT));
		break;
	}
}

Enemy.prototype.set = function(){
	this.setDestination();
	this.setVelocity();
	this.setAngle();
}

Enemy.prototype.respawn = function(x, y){
	this.spawnAtPoint(x,y);
}

Enemy.prototype.run = function(){
	if(this.hasReachedDestination()){
		this.set();
	}
	this.move();
	this.display();
}

Enemy.prototype.deactivate = function(){
	this.speed = 0;
}