var objectSelect = document.getElementById("objectSelect");
var NameTextBox = document.getElementById("NameTextBox");
var MassTextBox = document.getElementById("MassTextBox");
var RadiusTextBox = document.getElementById("RadiusTextBox");
var PositionXTextBox = document.getElementById("PositionXTextBox");
var PositionYTextBox = document.getElementById("PositionYTextBox");
var VelocityXTextBox = document.getElementById("VelocityXTextBox");
var VelocityYTextBox = document.getElementById("VelocityYTextBox");
var unnamedCount = -1;

var objects = [];

objects.push(new GravObject("test", 50, 50, new Vector2(-200,-200), new Vector2(150,150)));
objects.push(new GravObject("test", 100, 100, new Vector2(200,-200), new Vector2(0,0)));
objects.push(new GravObject("test", 10, 10, new Vector2(-600,-600), new Vector2(0,0)));
// objects.push(new GravObject("test", 1000, 1000, new Vector2(9000,0), new Vector2()));
objects.push(new GravObject("test", 200, 200, new Vector2(-100,-3000), new Vector2(400,0)));
objects.push(new GravObject("test", 70, 70, new Vector2(0,1400), new Vector2(400,0)));

var mouseData = {
	mousedown: false, 
    lastPos: undefined, delta: undefined};
var camPos = new Vector2();
var camZoom = 1/4;
var zoomFactor = 2;
var shiftFactor = 100;

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
		camPos.x -=mouseData.delta.x; camPos.y -= mouseData.delta.y;
	}
}
function keyManagment(event){
	switch(event.keyCode){
		case 33: camZoom *= zoomFactor; camPos.x *=2; camPos.y *=2; break; 
		case 34: camZoom /= zoomFactor; camPos.x /=2; camPos.y /=2; break; 
		case 37: camPos.x -= shiftFactor; break;
		case 38: camPos.y -= shiftFactor; break;
		case 39: camPos.x += shiftFactor; break;
		case 40: camPos.y += shiftFactor; break;
		default: return; break;
	}
	event.preventDefault();
}
function addObject_Button(){
	var option = document.createElement("option");
	if(NameTextBox.value != ""){
		option.text = NameTextBox.value;
	}else{
		unnamedCount += 1;
		option.text = "unnamed_"+unnamedCount;
		
	}
	objectSelect.add(option);
	objects.unshift(new GravObject(NameTextBox.value == "" ? ("unnamed_"+unnamedCount) : NameTextBox.value,
								MassTextBox.value, RadiusTextBox.value,
								new Vector2(parseFloat(PositionXTextBox.value),parseFloat(PositionYTextBox.value)),
								new Vector2(parseFloat(VelocityXTextBox.value),parseFloat(VelocityYTextBox.value))
								));
	objectSelect.selectedIndex = objectSelect.options.length-1;
	console.log(objectSelect.selectedIndex);
	console.log(objects)
}
function removeObject_Button(){
	objects.splice(objectSelect.selectedIndex,1);
	objectSelect.remove(objectSelect.selectedIndex);
}

objectSelect.onchange = function(){
	console.log(objectSelect.selectedIndex);	
}