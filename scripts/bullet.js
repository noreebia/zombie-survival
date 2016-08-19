
function Bullet(){
	this.currentX = WIDTH/2;
	this.currentY = HEIGHT/2;
	this.destinationX;
	this.destinationY;
	
	this.dx;
	this.dy;
	
	this.velocityX=0;
	this.velocityY=0;
	this.speed = 4;
	this.mag;
	this.active=false;
}

Bullet.prototype.run = function(){
	if(this.active){
		this.move();
		this.display();
	}
}

Bullet.prototype.shoot = function(mouse1, mouse2){
	this.currentX = player.x + Math.cos(player.angle)*player.barrelLength;
	this.currentY = player.y + Math.sin(player.angle)*player.barrelLength;
	this.active = true;
	this.destinationX = mouse1;
	this.destinationY = mouse2;
	this.setVelocity();
}

Bullet.prototype.setVelocity = function(){
	this.dx = this.destinationX - player.x;
	this.dy = this.destinationY - player.y;
	
	this.mag      = Math.sqrt( this.dx * this.dx + this.dy * this.dy);
	this.velocityX     = (this.dx/this.mag) * this.speed;
	this.velocityY   = (this.dy/this.mag) * this.speed;
}

Bullet.prototype.move = function(){
	this.currentX += this.velocityX;
	this.currentY += this.velocityY;
}

Bullet.prototype.deactivate = function(){
	this.active = false;
}

Bullet.prototype.display = function(){
	ctx.beginPath();
	ctx.arc(this.currentX, this.currentY, 5, 0, Math.PI*2, true);
	ctx.fill();
}

