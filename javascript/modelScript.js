var canvas = document.getElementById("canvas");
canvas.style = "border: 1px solid";

var time = new Time();
var camera = new Camera();
var plotter = new Plotter(canvas, camera);
var host = new Host();

//to reform
var mouseData = {mousedown: false, lastPos: undefined, delta: undefined};
flags = {alt: false, helpPageActive: false};
var gridSize = 2000;
canvasToPageRatio = new Vector2(0.9,0.9); //keep them both < 1;
//========


function resizeCanvas(){
	canvas.width = document.body.scrollWidth * canvasToPageRatio.x;
	canvas.height = document.body.scrollHeight * canvasToPageRatio.y;	
}
window.onresize = function(event){
	plotter.setSL("Canvas resized", 1);
	canvas.width = event.target.outerWidth * 0.9;
	canvas.height = event.target.outerHeight * 0.9; 
}
window.onload = function(){
	//checking for android device
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {alert("This app may not work correctly on your device! Please use PC.");}
	hookListeners();
	requestAnimationFrame(Update);
}

function clamp(val, min, max){return (val > max ?  max : (val < min ? min : val));}
function random(min = -1, max = 1){return Math.random()*(max-min) + min;}
function round(val,to = 1){return Math.round(val*to)/to;}
