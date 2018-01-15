function Update(){	
	resizeCanvas();
	plotter.clear();

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
	

	host.recal();	
	for(let i = 0; i < host.planets.length; i += 1){
		if( host.planets[i] != undefined){
			plotter.drawPlanet(host.planets[i]);
		}		
	}
	
	
	plotter.onScreenLog(time.deltaTimeInSeconds());
	time.setLastTime()
	requestAnimationFrame(Update);
}
