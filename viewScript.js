
var canvas = document.getElementById("canvas");
canvas.width = 500; canvas.height = 500;
canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");
var gridSize = 100;


window.onload = function(){
	requestAnimationFrame(redraw);
	hookListeners();
}

function redraw(){
//drawing grid
	ctx.clearRect(0,0, canvas.width,canvas.height);
	var relativeMid = new Vector2(canvas.width/2-camPos.x, canvas.height/2-camPos.y)
	
	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	ctx.moveTo(0, relativeMid.y);
	ctx.lineTo(canvas.width,relativeMid.y);
	ctx.moveTo(relativeMid.x, 0);
	ctx.lineTo(relativeMid.x, canvas.height);
	ctx.stroke();
	var rectCount = Math.floor(canvas.width/camZoom/gridSize);
	for(let i = 0; i < (rectCount > 100 ? 100 : rectCount); i += 1){
		ctx.setLineDash([1, 9]);
		var tempGridSize = gridSize*camZoom;
		ctx.strokeRect(relativeMid.x-i*tempGridSize, relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	}
//drawing grid
	//console.log(objects[0].acceleration.x);
//objects
	for(let i = 0; i < objects.length; i += 1){
	//calculations
		time.deltaTime = Math.abs(time.lastTime - getTime());
		for(let j = 0; j < objects.length; j += 1){
			if(j != i & objects[i].static == false){
				var distance = new Vector2(objects[i].position.x -objects[j].position.x,
										   objects[i].position.y -objects[j].position.y);
				var distanceMagnitude = distance.magnitude();
				if(distanceMagnitude != 0){
					gravityForceScalar = (objects[i].mass * objects[j].mass * G)/distanceMagnitude;
					objects[i].acceleration.y = gravityForceScalar * -distance.sin() * time.deltaTime / objects[i].mass;
					objects[i].acceleration.x =  gravityForceScalar * -distance.cos() * time.deltaTime / objects[i].mass;
					objects[i].velocity.x += objects[i].acceleration.x;
					objects[i].velocity.y += objects[i].acceleration.y;
				}
				console.log(objects[i].acceleration.y);

				if(Math.abs(distance.x) > 0.001  & Math.abs(distance.y) > 0.001){
					//var gravityForce = new Vector2((objects[i].mass * objects[j].mass*G )/Math.pow(distance.x,2),
											   		// (objects[i].mass * objects[j].mass*G )/Math.pow(distance.y,2));
					// objects[i].acceleration.x = Math.sign(distance.x)*gravityForce.x*time.deltaTime / objects[i].mass;
					// objects[i].acceleration.y = Math.sign(distance.x)*gravityForce.y*time.deltaTime / objects[i].mass;
					
					
				}		
			}
		}
		
	//calculatons

	//drawing
		ctx.beginPath();
		ctx.strokeStyle = "#000000";
		ctx.setLineDash([]);
		ctx.arc(relativeMid.x + objects[i].position.x*camZoom,
				relativeMid.y + objects[i].position.y*camZoom,objects[i].radius*camZoom,0,2*Math.PI);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "#FFF000";
		ctx.setLineDash([5, 5]);
		ctx.moveTo(relativeMid.x + objects[i].position.x*camZoom,
				   relativeMid.y + objects[i].position.y*camZoom)
		ctx.lineTo(relativeMid.x + objects[i].position.x*camZoom + objects[i].velocity.x*camZoom,
			 	   relativeMid.y + objects[i].position.y*camZoom + objects[i].velocity.y*camZoom);
		ctx.stroke();
	//drawing
	}
	for(let i = 0; i < objects.length; i += 1){
		for(let j = 0; j < objects.length; j += 1){
			if(j != i){
				objects[i].position.x += objects[i].velocity.x * time.deltaTime/1000*animationSpeed;
				objects[i].position.y += objects[i].velocity.y * time.deltaTime/1000*animationSpeed;
			}
		}
	}
	time.lastTime = getTime();
//drawing objects
	requestAnimationFrame(redraw);
}
