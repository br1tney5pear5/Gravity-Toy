var canvas = document.getElementById("canvas");
canvas.width = 500; canvas.height = 500;
canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");
var gridSize = 500;


window.onload = function(){
	requestAnimationFrame(redraw);
	
	hookListeners();
}

function redraw(){	

//drawing refrence system
	ctx.clearRect(0,0, canvas.width,canvas.height);
	var relativeMid = new Vector2(canvas.width/2-camPos.x, canvas.height/2-camPos.y)
//center
	ctx.beginPath();
	ctx.globalAlpha = 0.5;
	ctx.strokeStyle = "#000FFF";
	ctx.setLineDash([]);
	ctx.moveTo(0, relativeMid.y);
	ctx.lineTo(canvas.width,relativeMid.y);
	ctx.moveTo(relativeMid.x, 0);
	ctx.lineTo(relativeMid.x, canvas.height);
	ctx.stroke();
//grid
	var rectCount = Math.floor((camPos.magnitude()/camZoom+canvas.width/camZoom)/gridSize);
	for(let i = 0; i < (rectCount > 100 ? 100 : rectCount); i += 1){
		ctx.setLineDash([1, 9]);
		var tempGridSize = gridSize*camZoom;
		ctx.strokeRect(relativeMid.x-i*tempGridSize, relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	}
//==================

	
	for(let i = 0; i < objects.length; i += 1){
	//calculations
		var objectPos = new Vector2(relativeMid.x + objects[i].position.x * camZoom, relativeMid.y + objects[i].position.y * camZoom);
	//drawing base
		ctx.beginPath(); ctx.globalAlpha = 1; ctx.strokeStyle = "#000000"; ctx.setLineDash([]);
		ctx.arc(objectPos.x,objectPos.y,objects[i].radius*camZoom,0,2*Math.PI);
		ctx.stroke();
	//drawing velocity vector
		ctx.beginPath(); ctx.strokeStyle = "#FFF000"; ctx.setLineDash([5, 5]);
		ctx.moveTo(objectPos.x, objectPos.y);
		ctx.lineTo(objectPos.x + objects[i].velocity.x*camZoom, objectPos.y + objects[i].velocity.y*camZoom);
	//drawing acceleration vector
		ctx.stroke();
		ctx.beginPath(); ctx.strokeStyle = "#000FFF"; ctx.setLineDash([]);
		ctx.moveTo(objectPos.x, objectPos.y);
		//ctx.lineTo(objectPos.x + objects[i].acceleration.x*objects[i].mass*camZoom, objectPos.y + objects[i].acceleration.y*objects[i].mass*camZoom);
		ctx.stroke();
	//drawing orbit evaluation
		ctx.beginPath(); ctx.strokeStyle = "#000FF0"; ctx.setLineDash([]);
		//nothing here yet
		ctx.stroke();
	//=================
		time.deltaTime = Math.abs(time.lastTime - getTime());

		for(let j = 0; j < objects.length; j += 1){
			
			if(j != i){
				var distance = new Vector2(objects[i].position.x -objects[j].position.x,objects[i].position.y -objects[j].position.y);
				var distanceMagnitude = distance.magnitude();
				
				if(objects[i].static == false){
					if(distanceMagnitude != 0){
						gravityForceScalar = (objects[i].mass * objects[j].mass * G)/distanceMagnitude;
						objects[i].acceleration.y = gravityForceScalar * -distance.sin() * time.deltaTime / objects[i].mass;
						objects[i].acceleration.x =  gravityForceScalar * -distance.cos() * time.deltaTime / objects[i].mass;
						objects[i].velocity.x += objects[i].acceleration.x;
						objects[i].velocity.y += objects[i].acceleration.y;
					}
									
				}
				if((objects[i].radius + objects[j].radius) > distanceMagnitude){
					var index1 = objects.indexOf(objects[i].radius > objects[j].radius ? objects[i] : objects[j]);
					var index2 = objects.indexOf(objects[i].radius <= objects[j].radius ? objects[i] : objects[j]);
					objects[index1].radius = Math.sqrt(Math.pow(objects[index1].radius,2) + Math.pow(objects[index2].radius,2));
					var massRatio = new Vector2(objects[index1].mass, objects[index2].mass).cos();
					console.log(massRatio + (1-massRatio));
					objects[index1].velocity.x = objects[index1].velocity.x*massRatio + objects[index2].velocity.x*(1-massRatio);
					objects[index1].velocity.y =  objects[index1].velocity.y*massRatio + objects[index2].velocity.y*(1-massRatio);
					// console.log(objects[index1].radius);
					objects[index1].mass += objects[index2].mass;
					objects.splice(index2,1);
					//no operations on objects[i or j] can be made after this
				}
			}
		}		
	}

//applying velocity
	for(let i = 0; i < objects.length; i += 1){
		objects[i].position.x += objects[i].velocity.x * time.deltaTime/1000;
		objects[i].position.y += objects[i].velocity.y * time.deltaTime/1000;
	}
//==================
	time.lastTime = getTime();
	requestAnimationFrame(redraw);

}
