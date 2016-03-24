$(document).ready(function(){
    
    player = new Player();
    player.initBullets();
    
    function init(){
        return setInterval(draw, 1000/60);
    }
    
    function draw(){
        clear();
        
        printData();
		
		setAngle();
        player.run();
    }
    
    function clear(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    
    
    function printData(){
        //ctx.fillText("mouseX:" + mouseX, 10, 10);
		//ctx.fillText("mouseY:" + mouseY, 10, 30);
		
		ctx.font = "30px Arial";
		ctx.fillText("Ammo",10,30);
		ctx.fillText(player.countAmmo(),10,70);
    }
	
	function setAngle(){
		var dx = mouseX - player.x;
		var dy = mouseY - player.y;
		angle = Math.atan2(dy,dx);
	}
    
	
    $(document).click(function(e) {
		if( canvas.is(":hover")){
			player.shoot();
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
    
    init();
});