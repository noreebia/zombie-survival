$(document).ready(function(){
	var WIDTH;
	var HEIGHT;
	var canvas;
	var ctx;
	var angle

	var player;
	var playerShouldMove;
	var canvasTop;
	var canvasLeft;
	var canvasBottom;
	var canvasRight;
	var mouseX;
	var mouseY;
	var mouseClickedX;
	var mouseClickedY;
	var dx;
	var dy;
	
	function init() {
		canvas = $('#canvas');
		ctx = canvas[0].getContext("2d");

		
		WIDTH = canvas.width()
		HEIGHT = canvas.height()
		
		canvasLeft = canvas.offset().left;
		canvasTop = canvas.offset().top;
		playerShouldMove = [];
		player = new Player();
		player.initializeBullets();
		return setInterval(draw, 1000/60);
	}
	
	function draw() {
		clear();
		
		player.move();
		
		setAngle();
		player.display();
		player.runWeapon();
		
		
		ctx.beginPath();
		ctx.arc(player.center[0] + Math.cos(angle)*player.barrelLength, player.center[1] + Math.sin(angle)*player.barrelLength, 3, 0, Math.PI*2, true);
		ctx.fill();
	}
	
	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}
	
	function setAngle(){
		dx = mouseX - player.center[0];
		dy = mouseY - player.center[1];
		angle = Math.atan2(dy,dx);
	}
	
	
	function Player(){
		this.speed = 3;
		this.center = [WIDTH/2,HEIGHT/2];
		this.radius = 15;
		this.barrelWidth = 3;
		this.barrelLength = 40;	
		this.bulletNum = 300;
		
		this.bullets = [];
		this.bulletDestinationX;
		this.bulletDestinationY;
		
		this.move = function(){
			if(playerShouldMove[0] && this.center[1] - this.radius - this.speed> 0  ){
				this.center[1] = this.center[1] - this.speed;
			}
			else if(playerShouldMove[1] && this.center[1] + this.radius + this.speed < HEIGHT){
				this.center[1] = this.center[1] + this.speed;
			}
			if(playerShouldMove[2] && this.center[0] - this.radius > 0){
				this.center[0] = this.center[0] - this.speed;
			}
			else if(playerShouldMove[3] && this.center[0] + this.radius < WIDTH){
				this.center[0] = this.center[0] + this.speed;
			}
		}
		
		this.display = function(){
			ctx.save();
			ctx.translate( this.center[0], this.center[1] );
			ctx.rotate(angle);
		
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, Math.PI*2, true)
			ctx.fill();

			ctx.fillRect(0,-(this.barrelWidth/2), this.barrelLength, this.barrelWidth);
			ctx.restore();
		}
		
		this.initializeBullets = function(){
			var i;
			for(i = 0; i < this.bulletNum; i++) {
				this.bullets.push(new Bullet());
			}
		}
		
		/*
		this.launchBullet = function(){
			var i;
			for(i=0;i<this.bullets.length;i++){
				if(  !(this.bullets[i].isActive) ){
					this.bullets[i].launch(this.bulletDestinationX, this.bulletDestinationY);
					return;
				}
			}
		}
		*/
		
		this.runWeapon = function(){	
			var i;
			for(i=0;i<this.bulletNum;i++){
				if(  !(this.bullets[i].isActive) ){
					this.bullets[i].run();
				}
			}
		}
	}
	
	function Bullet(){
		this.currentX;
		this.currentY;
		this.destinationX;
		this.destinationY;
		
		this.radius = 2;
		this.speed = 3;
		this.isActive = false;
	}
	
	Bullet.prototype.setVelocity = function(){
		var dx = this.destinationX - this.currentX;
		var dy = this.destinationY - this.currentY;
		var mag = Math.sqrt(dx * dx + dy * dy);
		
		this.velocityX = (dx / mag) * this.speed;
		this.velocityY = (dy / mag) * this.speed;
	}
	
	Bullet.prototype.move = function(){
		this.currentX += this.velocityX;
		this.currentY += this.velocityY;
		
		if(this.currentX > canvasLeft || this.currentX < WIDTH || this.currentY > canvasTop || this.currentY < HEIGHT){
			this.isActive = false;
		}
	}
	
	Bullet.prototype.display = function(){
			ctx.beginPath();
			ctx.arc(this.currentX, this.currentY, this.radius, 0, Math.PI*2, true)
			ctx.fill();
	}
	
	/*
	Bullet.prototype.launch = function(destX, destY){
		this.currentX = player.center[0] + Math.cos(angle)*player.barrelLength;
		this.currentY = player.center[1] + Math.sin(angle)*player.barrelLength;
		this.destinationX = destX;
		this.destinationY = destY;
		
		this.setVelocity();
		this.isActive = true;
	}
	*/
	Bullet.prototype.launch = function(){
		this.currentX = player.center[0] + Math.cos(angle)*player.barrelLength;
		this.currentY = player.center[1] + Math.sin(angle)*player.barrelLength;
		this.destinationX = mouseX;
		this.destinationY = mouseY;
		
		this.setVelocity();
		this.isActive = true;
	}
	
	Bullet.prototype.run = function(){
		if(this.isActive){
			this.move();
			this.display();
		}
	}
	
	init();
	
	$(document).click(function() {
		/*
		player.bulletDestinationX = mouseX;
		player.bulletDestinationY = mouseY;
		player.launchBullet();
		*/
		/*
		var body = $('body');
		body.css('background-color', 'black');
		*/
		var i;
		for(i=0;i<player.bullets.length;i++){
			if(  (player.bullets[i].isActive) = false ){
				player.bullets[i].launch();
				return;
			}
			else{
				continue;
			}
		}	
		
	});
	
	$(document).mousemove(function(e){    
		mouseX = e.pageX - canvasLeft;
		mouseY = e.pageY - canvasTop;
	});
	
	$(document).keydown(function(e){    
		if(e.which == 87 || e.which == 38){
			playerShouldMove[0] = true;
		}
		else if(e.which == 83 || e.which == 40){
			playerShouldMove[1] = true;
		}
		if(e.which == 65 || e.which == 37){
			playerShouldMove[2] = true;
		}
		else if(e.which == 68 || e.which == 39){
			playerShouldMove[3] = true;
		}
	});
	
	$(document).keyup(function(e){    
		if(e.which == 87 || e.which == 38){
			playerShouldMove[0] = false;
		}
		else if(e.which == 83 || e.which == 40){
			playerShouldMove[1] = false;
		}
		if(e.which == 65 || e.which == 37){
			playerShouldMove[2] = false;
		}
		else if(e.which == 68 || e.which == 39){
			playerShouldMove[3] = false;
		}
	});
});