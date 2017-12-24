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

objects.push(new GravObject("test", 50, 50, new Vector2(-500,-200), new Vector2(150,300)));
objects.push(new GravObject("test", 100, 100, new Vector2(200,-200), new Vector2(),true));
objects.push(new GravObject("test", 10, 10, new Vector2(-600,-600), new Vector2(0,0)));
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