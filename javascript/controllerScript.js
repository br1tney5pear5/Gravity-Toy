//modal
var modal = document.getElementById("modal");
var btn = document.getElementById("button");
var close = document.getElementsByClassName("close")[0];
//modal==

function hookListeners(){
	canvas.addEventListener("mousedown", function(){mouseData.mousedown = true},false);
	canvas.addEventListener("mouseup", function(){mouseData.mousedown = false},false);
	canvas.addEventListener("mousemove", mouseCameraShift, false);
	window.addEventListener("keydown", keyManagment);
	canvas.addEventListener("mouseleave", function(){mouseData.mousedown = false}, false); //antibug
}
function mouseCameraShift(event){
	log(event);
	if(mouseData.lastPos != undefined){
		mouseData.delta = new Vector2(event.clientX - mouseData.lastPos.x, event.clientY - mouseData.lastPos.y);
	}
	mouseData.lastPos = new Vector2(event.clientX,event.clientY);
	if(mouseData.mousedown == true){
		camera.move(mouseData.delta, 1, Vector2.one().not());
		
	}
}

function changeTimeSpeed(factor){
	time.setLastTime();	time.stop = true;
	if(factor == true){time.speed += 0.1;}
	else{time.speed -= 0.1;}
	time.speed = Math.round(time.speed*100)/100;
	plotter.setSL("Time Speed - " + time.speed);
	time.stop = false;
}
function followToggle(){
	// for correction
	if(camera.followPlanet == undefined & host.planets.length > 0){
		var distance = undefined;
		var followObj = host.planets[0];		

		for(let i = 0; i < host.planets.length; i += 1){
			distance = Vector2.distance(camera.worldPosition(), host.planets[i].position);
			if( distance < Vector2.distance(camera.worldPosition(), followObj.position)){
				followObj = host.planets[i];
			}
		}
		if(followObj != undefined){camera.followPlanet = followObj;}
		plotter.setSL( "Camera following on");
	}else{
		camera.followPlanet = undefined;
		plotter.setSL( "Camera following off");
	}
}
function log(message){
	console.log(message);
}
function keyManagment(event){
	if(flags.helpPageActive & event.keyCode != 113){return;}
	switch(event.keyCode){
		case 18: flags.altPressed = !flags.altPressed; break;
		case 32: time.stop = !time.stop; break; //space
		case 33: camera.zoomOn();  break; 
		case 34: camera.zoomOut(); break; 
		case 37: camera.move(new Vector2(-1,0), camera.shiftFactor); break; //left
		case 38: camera.move(new Vector2(0,-1), camera.shiftFactor); break; //up
		case 39: camera.move(new Vector2(1,0), camera.shiftFactor);  break; //right
		case 40: camera.move(new Vector2(0,1), camera.shiftFactor);  break; //down
		case 86: plotter.toggleVeloRelativity(); break; //v
		case 66: host.spawnRandom(10, 100, 10000); break; //b
		case 70: followToggle(); break; //F
		//case 78: host.planets.push(new Planet("Static_obj", 5000, 5000,Vector2.multiplyVectorByScalar(camera.position, 1/camera.zoom), new Vector2(), true, true )); plotter.setSL("Static object spawned"); break; //n
		case 77: host.spawnRandom(50, 10, 1000 , 70000, 200000 );  break; //m
		case 67: host.clear(); break; //c
		case 113: toggleHelp(); break; //f2
		case 188: changeTimeSpeed(false); break; //</,
		case 190: changeTimeSpeed(true); break; //>/.
		case 219: break; //[
		case 221: break; //]
		case 82: resizeCanvas(); break; //r //acually useless since resizeCanvas() is running every frame
		case 78: break; //n
		default: return; break;	
	}
	event.preventDefault();
}

//it could be shorter ofc but i am honestly too tired to corect this
btn.onclick = function(){
	modal.style.display = "block";
	flags.helpPageActive = true;
	
	// time.stop = true;
}
close.onclick = function(){
	modal.style.display = "none";
	flags.helpPageActive = false;
	// time.stop = false;
}
window.onclick = function(event){
	if(event.target == modal){
		// time.stop = false;
		modal.style.display ="none";
		flags.helpPageActive = false;
	}
}
function toggleHelp(){
	if(modal.style.display == "block"){
		modal.style.display ="none";
		flags.helpPageActive = false;
	}else{
		modal.style.display = "block";
		flags.helpPageActive = true;
		
	}
}
