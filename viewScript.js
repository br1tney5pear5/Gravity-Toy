function redraw(){	
	resizeCanvas();
	plotter.clear(1);
	plotter.setStyle("#000FFF", 0.5, 0,0);
	plotter.drawReferenceSystem(); 
	camera.routine(); 		

//grid
	
	// var rectCount = Math.floor((camera.position.magnitude()/camera.zoom + canvas.width/camera.zoom)/gridSize);
	// for(let i = 0; i < (rectCount > 100 ? 100 : rectCount); i += 1){
	// 	ctx.setLineDash([1, 9]);
	// 	var tempGridSize = gridSize*camera.zoom;
	// 	ctx.strokeRect(plotter.relativeMid.x-i*tempGridSize, plotter.relativeMid.y-i*tempGridSize, i*tempGridSize*2, i*tempGridSize*2);
	// }
//==================
	//log(host.planets[0].position);
	

	host.recal();	
	for(let i = 0; i < host.planets.length; i += 1){
		if( host.planets[i] != undefined & host.planets[i].active == true){
			plotter.setStyle("#000000", 1, 0,0);
			if(flags.altPressed == true){
				plotter.drawPlanetInfo(host.planets[i]);
			}
			plotter.drawArc(host.planets[i].position, host.planets[i].radius,0, 2*Math.PI);
			plotter.setStyle(host.planets[i].color, 0.3, 0,0);
			plotter.drawArc(host.planets[i].position, host.planets[i].radius,0, 2*Math.PI,true);
			
			plotter.setStyle("#FFF000", 0.2, 0,0);
			plotter.drawLineFromTo(host.planets[i].position, Vector2.multiply( host.planets[i].velocity,0.2));
			
			//drawing orbit evaluation //not implemented yet
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
	
	
	plotter.onScreenLog(time.deltaTimeInSeconds());
	time.setLastTime()
	requestAnimationFrame(redraw);

}
