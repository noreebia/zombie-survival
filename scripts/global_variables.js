	var canvas = $('#canvas');
	var	ctx = canvas[0].getContext("2d");
    
    var WIDTH = canvas.width();
	var HEIGHT = canvas.height();
    
    var canvasLeft = canvas.offset().left;
	var canvasTop = canvas.offset().top;
    
    var mouseX;
    var mouseY;
	var angle;
	var player;
	var shouldPlayerMove = [];
	
    