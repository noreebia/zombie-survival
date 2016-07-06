
function Enemy(x, y){
	this.x = x;
	this.y = y;
	this.radius = 20;
	this.speed = 2;
	this.angle;
	this.armLength=30;
	this.armWidth=4;
	this.distanceToDestination;
	
	this.setDestination();
	this.setVelocity();
	this.setAngle();
	
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
		ctx.restore();
}

Enemy.prototype.setAngle = function(){
		this.angle = Math.atan2(this.dy,this.dx);
}

Enemy.prototype.respawn = function(x, y){
		this.x = x;
		this.y = y;
		this.setDestination();
			this.setVelocity();
			this.setAngle();
}
	
Enemy.prototype.run = function(){
		if(this.hasReachedDestination()){
			this.setDestination();
			this.setVelocity();
			this.setAngle();
		}
		this.move();
		this.display();
}