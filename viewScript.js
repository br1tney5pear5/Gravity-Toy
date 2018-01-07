function redraw(){	

	plotter.clear(1);
	plotter.setStyle("#000FFF", 0.5, 0,0);
	plotter.drawReferenceSystem(); 
//grid
	
	var rectCount = Math.floor((camera.position.magnitude()/camera.zoom + canvas.width/camera.zoom)/gridSize);
	for(let i = 0; i < (rectCount > 100 ? 100 : rectCount); i += 1){
		ctx.setLineDash([1, 9]);
		var tempGridSize = gridSize*camera.zoom;
		ctx.strokeRect(plotter.relativeMid.x-i*tempGridSize, plotter.relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	}
//==================
	
	
	for(let i = 0; i < objects.length; i += 1){
		if( objects[i] != undefined & objects[i].active == true){
			plotter.setStyle("#000000", 1, 0,0);
			if(flags.altPressed == true){
				plotter.drawGravObjectInfo(objects[i]);
			}
			plotter.drawArc(objects[i].position, objects[i].radius,0, 2*Math.PI);
			plotter.setStyle(objects[i].color, 0.3, 0,0);
			plotter.drawArc(objects[i].position, objects[i].radius,0, 2*Math.PI,true);
			
			plotter.setStyle("#FFF000", 0.5, 0,0);
			plotter.drawLineFromTo(objects[i].position, Vector2.multiplyVectorByScalar(objects[i].velocity, 0.2));
			//drawing orbit evaluation //not implemented yet

			for(let j = 0; j < objects.length; j += 1){
				if(j != i & objects[j] != undefined & objects[i] != undefined &objects[j].active == true){
					var distance = new Vector2(objects[i].position.x -objects[j].position.x,objects[i].position.y -objects[j].position.y);
					var distanceMagnitude = distance.magnitude();
					
					if(objects[i].static == false){
						if(distanceMagnitude != 0){
							gravityForceScalar = (objects[i].mass * objects[j].mass * G)/distanceMagnitude;
							objects[i].acceleration.y = gravityForceScalar * -distance.sin() * time.deltaTime() / objects[i].mass;
							objects[i].acceleration.x =  gravityForceScalar * -distance.cos() * time.deltaTime() / objects[i].mass;
							objects[i].velocity.x += objects[i].acceleration.x;
							objects[i].velocity.y += objects[i].acceleration.y;
						}
										
					}
					if((objects[i].radius + objects[j].radius) > distanceMagnitude){
						var index1 = objects.indexOf(objects[i].radius > objects[j].radius ? objects[i] : objects[j]);
						var index2 = objects.indexOf(objects[i].radius <= objects[j].radius ? objects[i] : objects[j]);
						objects[index1].radius = Math.sqrt(Math.pow(objects[index1].radius,2) + Math.pow(objects[index2].radius,2));
						var massRatio = new Vector2(objects[index1].mass, objects[index2].mass).cos();
						objects[index1].velocity.x = objects[index1].velocity.x*massRatio + objects[index2].velocity.x*(1-massRatio);
						objects[index1].velocity.y =  objects[index1].velocity.y*massRatio + objects[index2].velocity.y*(1-massRatio);
						// console.log(objects[index1].radius);
						objects[index1].mass += objects[index2].mass;
						objects.splice(index2,1);
						//no operations on objects[i or j] can be made after this
					}
				}
			}
		}else{
			plotter.setStyle("#000000", 1, 3,3);
			if(flags.altPressed == true){
				plotter.drawGravObjectInfo(objects[i]);
			}
			plotter.drawArc(objects[i].position, objects[i].radius,0, 2*Math.PI);
			plotter.setStyle("#FFF000", 1, 3,3);
			plotter.drawLineFromTo(objects[i].position, objects[i].velocity);

		}		
	}

//applying velocity
	for(let i = 0; i < objects.length; i += 1){
		if(objects[i].static != true & objects[i].active == true){
			objects[i].position.x += objects[i].velocity.x * time.deltaTimeInSeconds();
			objects[i].position.y += objects[i].velocity.y * time.deltaTimeInSeconds();
		}
	}
//============/======

	plotter.onScreenLog(time.deltaTimeInSeconds());
	time.setLastTime()
	requestAnimationFrame(redraw);

}
