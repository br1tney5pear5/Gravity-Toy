//modal
var modal = document.getElementById("modal");
var btn = document.getElementById("button");
var close = document.getElementsByClassName("close")[0];
//modal==
var unnamedCount = -1;

function clear(){
	objects.length = 0;
}
function randomSpawn(howMany = 100, minSize = 10, maxSize = 1000, distanceSpan = 70000, velocitySpan = 50000){
	log("Spawned " + howMany + " random objects.")
	for(let i = 0; i < howMany; i+=1){
		if(objects.length >= objectsLimit){
			plotter.setSL("Reached objects limit - " + objectsLimit,1);
			return;
		}
		//mass and radius are propotional for clarity
		//all those unnessesary variables for code readability 

		var translatedDistanceSpan = distanceSpan ;
		if(1/camera.zoom >= 1024){
			translatedDistanceSpan =  distanceSpan * (1/(1/1024)/100);
		}else if(1/camera.zoom <= 8){
			translatedDistanceSpan =  distanceSpan * (1/(1/8)/100);
		}else{
			translatedDistanceSpan =  distanceSpan * (1/camera.zoom/100);
		}

		var size = Math.random()*maxSize+minSize;
		var position = new Vector2((Math.random()-0.5)*translatedDistanceSpan , (Math.random()-0.5)*translatedDistanceSpan);
		position = Vector2.addVectors(position, Vector2.multiplyVectorByScalar(camera.position, 1/camera.zoom)); //acding camera position
		var velocity = new Vector2((Math.random()-0.5)*velocitySpan, (Math.random()-0.5)*velocitySpan);
		objects.push(new GravObject("obj_"+i,size, size, position, velocity ));
	}
	plotter.setSL("Spawned " + howMany + " random objects.",1);
}

function hookListeners(){
	randomSpawn();
	canvas.addEventListener("mousedown", function(event){mouseData.mousedown = true},false);
	canvas.addEventListener("mouseup", function(event){mouseData.mousedown = false},false);
	canvas.addEventListener("mousemove", mouseCameraShift, false);
	window.addEventListener("keydown", keyManagment);
}


function mouseCameraShift(event){
	if(mouseData.lastPos != undefined){
		mouseData.delta = new Vector2(event.clientX - mouseData.lastPos.x, event.clientY - mouseData.lastPos.y);
	}
	mouseData.lastPos = new Vector2(event.clientX,event.clientY);
	if(mouseData.mousedown == true){
		camera.position.x -=mouseData.delta.x; camera.position.y -= mouseData.delta.y;
		plotter.setSL("Camera position - x: "+ camera.position.x + ", y: "+ camera.position.y ,1);
	}

	
}
function quantizedCameraShift(shift){
	camera.position = Vector2.addVectors( camera.position,Vector2.multiplyVectorByScalar(shift, camera.shiftFactor));
	plotter.setSL("Camera position - x: "+ camera.position.x + ", y: "+ camera.position.y ,1);
}
function cameraZoom(sideFactor){
	if(sideFactor){camera.zoom *= camera.zoomFactor; camera.position.x *=2; camera.position.y *=2;}
	else{camera.zoom /= camera.zoomFactor; camera.position.x /=2; camera.position.y /=2;	}
	plotter.setSL("zoom - 1/" + 1/camera.zoom, 1);

}
function log(message){
	console.log(message);
}
function keyManagment(event){
	switch(event.keyCode){
		case 18: flags.altPressed = !flags.altPressed; break;
		case 32: time.stop = !time.stop; break; //space
		case 33: cameraZoom(true);  break; 
		case 34: cameraZoom(false); break; 
		case 37: quantizedCameraShift(new Vector2(-1,0)); break; //left
		case 38: quantizedCameraShift(new Vector2(0,-1)); break; //up
		case 39: quantizedCameraShift(new Vector2(1,0));  break; //right
		case 40: quantizedCameraShift(new Vector2(0,1));  break; //down
		case 86: break; //v
		case 66: randomSpawn(10); break; //b
		case 78: randomSpawn(100); break; //n
		case 77: randomSpawn(100); break; //m
		case 67: clear(); break; //c
		case 113: toggleHelp(); break; //f2
		case 78: break; //n
		case 78: break; //n
		case 78: break; //n
		case 78: break; //n
		case 78: break; //n
		case 78: break; //n
		default: return; break;	
	}
	event.preventDefault();
}
btn.onclick = function(){
	modal.style.display = "block";
	// time.stop = true;
}
close.onclick = function(){
	modal.style.display = "none";
	// time.stop = false;
}
window.onclick = function(event){
	if(event.target == modal){
		// time.stop = false;
		modal.style.display ="none";
	}
}
function toggleHelp(){
	if(modal.style.display == "block"){
		modal.style.display ="none";
	}else{
		modal.style.display = "block";
	}
}
