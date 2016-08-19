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
var showAmmo;

var startDate;
var time1, time2;
var time3;

var intervalId;

var isGameOver;

var totalShots;
var connectedShots;

var accuracy


function getRandomNumber(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function updateAmmoText(){
	showAmmo = player.countAmmo();
}

function getNewMillis(){
	var d = new Date();
	var millis = d.getTime();
	return millis;
}

function roundToTwo(num) {    
	return +(Math.round(num + "e+2")  + "e-2");
}