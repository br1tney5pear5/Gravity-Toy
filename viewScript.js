
var canvas = document.getElementById("canvas");
canvas.width = 500; canvas.height = 500;
canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");

var testvar = 1142;
class Vector2{
	constructor(_x=0,_y=0){this.x = _x; this.y = _y;}
	magnitude() {return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));}
}
var gridSize = 100;
var mouseData = {
	mousedown: false, 
    lastPos: undefined, delta: undefined};

var camPos = new Vector2();
var camZoom = 1;
var zoomFactor = 2;
window.onload = function(){
	//setInterval(redraw,100);
	requestAnimationFrame(redraw);
	canvas.addEventListener("mousedown", function(event){mouseData.mousedown = true},false);
	canvas.addEventListener("mouseup", function(event){mouseData.mousedown = false},false);
	canvas.addEventListener("mousemove", cameraShift, false);
	window.addEventListener("keydown", keyManagment);
}
function cameraShift(event){
	if(mouseData.lastPos != undefined){
		mouseData.delta = new Vector2(event.clientX - mouseData.lastPos.x, event.clientY - mouseData.lastPos.y);
	}
	mouseData.lastPos = new Vector2(event.clientX,event.clientY);
	if(mouseData.mousedown == true){
		camPos.x -=mouseData.delta.x; camPos.y -= mouseData.delta.y;
	}
}
function keyManagment(event){
	
	switch(event.keyCode){
		case 33: camZoom *= zoomFactor; break; 
		case 34: camZoom /= zoomFactor; break; 
	}
	console.log(camZoom);
}

function redraw(){
	ctx.clearRect(0,0, canvas.width,canvas.height);
	var relativeMid = new Vector2(canvas.width/2-camPos.x, canvas.height/2-camPos.y)
	ctx.beginPath();
	ctx.setLineDash([]);
	ctx.moveTo(0, relativeMid.y);
	ctx.lineTo(canvas.width,relativeMid.y);
	ctx.moveTo(relativeMid.x, 0);
	ctx.lineTo(relativeMid.x, canvas.height);
	ctx.stroke();
	for(let i = 0; i < Math.floor(canvas.width/camZoom/gridSize); i += 1){
		ctx.setLineDash([1, 9]);
		var tempGridSize = gridSize*camZoom;
		ctx.strokeRect(relativeMid.x-i*tempGridSize, relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	}
	requestAnimationFrame(redraw);
}
