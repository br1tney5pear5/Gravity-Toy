function redraw(){	
	resizeCanvas();
	plotter.clear(1);
	plotter.setStyle("#000FFF", 0.5, 0,0);
	plotter.drawReferenceSystem(); 

//grid
	
	
	// var rectCount = Math.floor((camera.position.magnitude()/camera.zoom + canvas.width/camera.zoom)/gridSize);
	// for(let i = 0; i < (rectCount > 100 ? 100 : rectCount); i += 1){
	// 	ctx.setLineDash([1, 9]);
	// 	var tempGridSize = gridSize*camera.zoom;
	// 	ctx.strokeRect(plotter.relativeMid.x-i*tempGridSize, plotter.relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	// }
//==================
	//log(host.planets[0].position);
	


	for(let i = 0; i < host.planets.length; i += 1){
		if( host.planets[i] != undefined & host.planets[i].active == true){
			plotter.setStyle("#000000", 1, 0,0);
			if(flags.altPressed == true){
				plotter.drawPlanetInfo(host.planets[i]);
			}
			plotter.drawArc(host.planets[i].position, host.planets[i].radius,0, 2*Math.PI);
			plotter.setStyle(host.planets[i].color, 0.3, 0,0);
			plotter.drawArc(host.planets[i].position, host.planets[i].radius,0, 2*Math.PI,true);
			
			plotter.setStyle("#FFF000", 0.5, 0,0);
			plotter.drawLineFromTo(host.planets[i].position, Vector2.multiply( host.planets[i].velocity,0.2));
			
			//drawing orbit evaluation //not implemented yet

			// for(let j = 0; j < host.planets.length; j += 1){
			// 	if(j != i & host.planets[j] != undefined & host.planets[i] != undefined &host.planets[j].active == true){
			// 		var distance = new Vector2(host.planets[i].position.x -host.planets[j].position.x,host.planets[i].position.y -host.planets[j].position.y);
			// 		var distanceMagnitude = distance.magnitude();
					
			// 		if(host.planets[i].static == false){
			// 			if(distanceMagnitude != 0){
			// 				gravityForceScalar = (host.planets[i].mass * host.planets[j].mass * G)/distanceMagnitude;
			// 				host.planets[i].acceleration.y = gravityForceScalar * -distance.sin() * time.deltaTime() / host.planets[i].mass;
			// 				host.planets[i].acceleration.x =  gravityForceScalar * -distance.cos() * time.deltaTime() / host.planets[i].mass;
			// 				host.planets[i].velocity.x += host.planets[i].acceleration.x;
			// 				host.planets[i].velocity.y += host.planets[i].acceleration.y;
			// 			}
										
			// 		}
			// 		if((host.planets[i].radius + host.planets[j].radius) > distanceMagnitude){
			// 			var index1 = host.planets.indexOf(host.planets[i].radius > host.planets[j].radius ? host.planets[i] : host.planets[j]);
			// 			var index2 = host.planets.indexOf(host.planets[i].radius <= host.planets[j].radius ? host.planets[i] : host.planets[j]);
			// 			host.planets[index1].radius = Math.sqrt(Math.pow(host.planets[index1].radius,2) + Math.pow(host.planets[index2].radius,2));
			// 			var massRatio = new Vector2(host.planets[index1].mass, host.planets[index2].mass).cos();
			// 			host.planets[index1].velocity.x = host.planets[index1].velocity.x*massRatio + host.planets[index2].velocity.x*(1-massRatio);
			// 			host.planets[index1].velocity.y =  host.planets[index1].velocity.y*massRatio + host.planets[index2].velocity.y*(1-massRatio);
			// 			// console.log(host.planets[index1].radius);
			// 			host.planets[index1].mass += host.planets[index2].mass;
			// 			host.planets.splice(index2,1);
			// 			//no operations on host.planets[i or j] can be made after this
			// 		}
			// 	}
			// }
		}else{
			plotter.setStyle("#000000", 1, 3,3);
			if(flags.altPressed == true){
				plotter.drawPlanetInfo(host.planets[i]);
			}
			plotter.drawArc(host.planets[i].position, host.planets[i].radius,0, 2*Math.PI);
			plotter.setStyle("#FFF000", 1, 3,3);
			plotter.drawLineFromTo(host.planets[i].position, host.planets[i].velocity);
		}		
	}

//applying velocity
	// for(let i = 0; i < host.planets.length; i += 1){
	// 	if(host.planets[i].static != true & host.planets[i].active == true){
	// 		host.planets[i].position.x += host.planets[i].velocity.x * time.deltaTimeInSeconds();
	// 		host.planets[i].position.y += host.planets[i].velocity.y * time.deltaTimeInSeconds();
	// 	}
	// }
//============/======

	host.recal();	
	plotter.onScreenLog(time.deltaTimeInSeconds());
	time.setLastTime()
	requestAnimationFrame(redraw);

}
