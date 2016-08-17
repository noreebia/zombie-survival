$(document).ready(function(){
    
    player = new Player();
    player.initBullets();
	
	enemies.push(new Enemy(WIDTH,HEIGHT));
	
	init();
	
    function init(){
		showAmmo = player.countAmmo();
        return setInterval(draw, 1000/60);
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
	}
	
	function detectCollisions(){
		var i,k;
		var dx, dy,distance;
		for(i=0;i<player.bullets.length;i++){
            if( player.bullets[i].active)  {
				for(k=0;k<enemies.length;k++){
					dx = enemies[k].x - player.bullets[i].currentX;
					dy = enemies[k].y - player.bullets[i].currentY;
					
					distance = Math.sqrt(dx*dx + dy*dy);
					if(distance <= enemies[k].radius){
						player.bullets[i].deactivate();
						updateAmmoText();
						enemies[k].respawn(WIDTH, HEIGHT);
						break;
					}
				}
				if(player.bullets[i].currentX > WIDTH || player.bullets[i]. currentX < 0 || player.bullets[i].currentY > HEIGHT || player.bullets[i].currentY < 0){
					player.bullets[i].deactivate();
					updateAmmoText();
					continue;
				}	
            }    
        }
	}
    
    function clear(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    
	function spawnEnemy(spawnPoint){
		switch(spawnPoint){
			
		}
	}
    
    function printData(){
		ctx.font = "30px Arial";
		ctx.fillText("Ammo",10,30);
		ctx.fillText(showAmmo,10,70);
		
		ctx.fillText("Enemies", WIDTH/2-100, 30)
		ctx.fillText(enemies.length,WIDTH/2-100, 70);
    }

    $(document).click(function(e) {
		if( canvas.is(":hover")){
			player.shoot();
			updateAmmoText();
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