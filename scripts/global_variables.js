	var canvas = $('#canvas');
	var	ctx = canvas[0].getContext("2d");
    
    var WIDTH = canvas.width();
	var HEIGHT = canvas.height();
    
    var canvasLeft = canvas.offset().left;
	var canvasTop = canvas.offset().top;
    
    var mouseX;
    var mouseY;
	var player;
	var shouldPlayerMove = [];
	
	var enemy;
	var enemies = [];
	
	var numberOfEnemies;
	
	function getRandomNumber(min, max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
