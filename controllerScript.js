//modal
var modal = document.getElementById("modal");
var btn = document.getElementById("button");
var close = document.getElementsByClassName("close")[0];
//modal
var unnamedCount = -1;
//stabileSave
objects.push(new GravObject("SUN", 333, 1392, new Vector2(), new Vector2()));
objects.push(new GravObject("MERCURY", 0.06, 4.879, new Vector2(0,10000), new Vector2(500,0)));
objects.push(new GravObject("EARTH", 1, 12.76, new Vector2(0,-16000), new Vector2(-500,0)));
objects.push(new GravObject("EARTH_MOON", 0.01, 0.03, new Vector2(0,-16100), new Vector2(-450,2)));
objects.push(new GravObject("MARS", 0.11, 6.794, new Vector2(0,20000), new Vector2(600,0)));
objects.push(new GravObject("JUPITER", 31.783, 142.984, new Vector2(0,30000), new Vector2(300,0)));
// objects.push(new GravObject("SATURN", 95.16, 120636, new Vector2(), new Vector2()));
// objects.push(new GravObject("URANUS", 14.54, 51118, new Vector2(), new Vector2()));
// objects.push(new GravObject("NEPTUNE", 17.15, 48528, new Vector2(), new Vector2()));

// objects.push(new GravObject("test", 50, 50, new Vector2(-500,-200), new Vector2(150,30 0)));

// objects.push(new GravObject("test", 1000, 1000, new Vector2(9000,0), new Vector2()));
// objects.push(new GravObject("test", 70, 70, new Vector2(0,400), new Vector2(-200,0)));

function hookListeners(){
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
		camera.position.x -=mouseData.delta.x; camera.position.y -= mouseData.delta.y;
	}
	plotter.recalMid();
}
function keyManagment(event){
	switch(event.keyCode){
		case 18: flags.altPressed = !flags.altPressed; break;
		case 32: time.stop = !time.stop; break; //space
		case 33: camera.zoom *= camera.zoomFactor; camera.position.x *=2; camera.position.y *=2; plotter.recalMid(); break; 
		case 34: camera.zoom /= camera.zoomFactor; camera.position.x /=2; camera.position.y /=2; plotter.recalMid(); break; 
		case 37: camera.position.x -= camera.shiftFactor; plotter.recalMid(); break;
		case 38: camera.position.y -= camera.shiftFactor; plotter.recalMid(); break;
		case 39: camera.position.x += camera.shiftFactor; plotter.recalMid(); break;
		case 40: camera.position.y += camera.shiftFactor; plotter.recalMid(); break;
		default: return; break;	
	}
	event.preventDefault();
}
btn.onclick = function(){
	modal.style.display = "block";
	time.stop = true;
}
close.onclick = function(){
	modal.style.display = "none";
	time.stop = false;
}
window.onclick = function(event){
	if(event.target == modal){
		time.stop = false;
		modal.style.display ="none";
	}
}
