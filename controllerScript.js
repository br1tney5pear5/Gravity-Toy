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
objects.push(new GravObject("test", 1000, 50, new Vector2(), new Vector2(), false));
objects.push(new GravObject("test", 10, 50, new Vector2(0,1000), new Vector2(400,0)));

var mouseData = {
	mousedown: false, 
    lastPos: undefined, delta: undefined};
var camPos = new Vector2();
var camZoom = 0.125;
var zoomFactor = 2;
var animationSpeed =1;

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
		case 33: camZoom *= zoomFactor; break; 
		case 34: camZoom /= zoomFactor; break; 
	}
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