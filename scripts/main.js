$(document).ready(function(){
	
	player = new Player();
	player.initBullets();
	
	init();
	
	function init(){
		totalShots = 0;
		connectedShots = 0;
		updateAccuracy();
		
		isGameOver = false;
		startDate = new Date();
		time1 = startDate.getTime();
		time3 = startDate.getTime();
		showAmmo = player.countAmmo();
		
		player.initPosition();
		player.killCount = 0;
		
		enemies.length = 0;
		enemies.push(new Enemy());
		intervalId =  setInterval(draw, 1000/60);
	}
	
	function draw(){
		clear();
		
		printData();
		player.run();
		runEnemies();
		detectCollisions();
	}
	
	function runEnemies(){
		var i;
		var numberOfEnemies = enemies.length;
		
		for(i=0;i<numberOfEnemies;i++){
			enemies[i].run();
		}
		
		time2 = getNewMillis();
		if(time2 - time1 >= 5000){
			time1 = time2;
			enemies.push(new Enemy());
		}
	}
	
	function detectCollisions(){
		var i,k,p,j;
		var dx, dy,distance;
		for(i=0;i<player.bullets.length;i++){
			if( player.bullets[i].active)  {
				
				if(player.bullets[i].currentX > WIDTH || player.bullets[i].currentX < 0 || player.bullets[i].currentY > HEIGHT || player.bullets[i].currentY < 0){
					updateBulletStatus(i);
					updateAccuracy();
					continue;
				}	
				
				for(k=0;k<enemies.length;k++){
					dx = enemies[k].x - player.bullets[i].currentX;
					dy = enemies[k].y - player.bullets[i].currentY;
					
					distance = Math.sqrt(dx*dx + dy*dy);
					if(distance <= enemies[k].radius){
						updateBulletStatus(i);
						player.killCount++;
						enemies[k].spawnRandomly();
						connectedShots++;
						updateAccuracy();
						break;
					}
				}
				
			}    
		}
		
		for(p=0;p<enemies.length;p++){
			dx = enemies[p].x - player.x;
			dy = enemies[p].y - player.y;
			
			distance = Math.sqrt(dx*dx + dy*dy);
			if(distance <= enemies[p].radius+player.radius){
				clearInterval(intervalId);
				showGameOverScreen();
			}
		}
	}
	
	function showGameOverScreen(){
		isGameOver = true;
		ctx.fillStyle = "red";
		ctx.fillText("YOU HAVE DIED", WIDTH/2-120, HEIGHT/2);
		ctx.fillText("YOUR SCORE IS ", WIDTH/2 - 120, HEIGHT/2 + 30);
		ctx.fillText((time2-time3)/1000+" (TIME) + " + player.killCount + " (KILLS) = "+ roundToTwo(((time2-time3)/1000 + player.killCount )) +"POINTS",WIDTH/2-250,HEIGHT/2+60);
		ctx.fillText("Press Y To Play Again",WIDTH/2-150,HEIGHT/2+90);
		ctx.fillStyle = "black";
	}
	
	function updateBulletStatus(i){
		player.bullets[i].deactivate();
		updateAmmoText();
	}
	
	function clear(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}
	
	function printData(){
		ctx.font = "30px Arial";
		ctx.fillText("Ammo",10,30);
		ctx.fillText(showAmmo,10,70);
		
		ctx.fillText("Enemies", WIDTH/2-300, 30)
		ctx.fillText(enemies.length,WIDTH/2-300, 70);
		
		ctx.fillText("Kill Count", WIDTH/2-150, 30)
		ctx.fillText(player.killCount,WIDTH/2-150, 70);
		
		ctx.fillText("Accuracy", WIDTH/2+50, 30);
		ctx.fillText(accuracy + "%", WIDTH/2+50, 70);
		
		ctx.fillText("Time Survived", WIDTH-250, 30);
		ctx.fillText( (time2-time3)/1000+"s",WIDTH - 250, 70);
	}
	function updateAccuracy(){
		accuracy = Math.round((connectedShots/totalShots)*100);
	}

	$(document).click(function(e) {
		if( canvas.is(":hover")){
			player.shoot();
			updateAmmoText();
			totalShots++;
		}
	});

	$(document).mousemove(function(e){    
		mouseX = e.pageX - canvasLeft;
		mouseY = e.pageY - canvasTop;
		
	});
	
	$(document).keydown(function(e){    
		if(e.which == 87 || e.which == 38){
			shouldPlayerMove[0] = true;
		}
		else if(e.which == 83 || e.which == 40){
			shouldPlayerMove[1] = true;
		}
		if(e.which == 65 || e.which == 37){
			shouldPlayerMove[2] = true;
		}
		else if(e.which == 68 || e.which == 39){
			shouldPlayerMove[3] = true;
		}
		if(isGameOver && e.which == 89){
			init();
		}
	});
	
	$(document).keyup(function(e){    
		if(e.which == 87 || e.which == 38){
			shouldPlayerMove[0] = false;
		}
		else if(e.which == 83 || e.which == 40){
			shouldPlayerMove[1] = false;
		}
		if(e.which == 65 || e.which == 37){
			shouldPlayerMove[2] = false;
		}
		else if(e.which == 68 || e.which == 39){
			shouldPlayerMove[3] = false;
		}
	});
});