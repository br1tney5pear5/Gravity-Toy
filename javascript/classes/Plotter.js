class Plotter{
	//its yet to be corrected!~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	constructor(_canvas, _camera){
		this.canv = _canvas;
		this.context = _canvas.getContext("2d"); 
		this.cam = _camera;
		this.lastPos = new Vector2();
		this.unitIndicatorLength = 10;
		this.fontSize = 18;
		this.textMargin = new Vector2(5,5);
		this.infoTableMargin = 30;
		this.gridSize = 100000;
		this.SLFontSize = 28;
		this.SLMessage = "";
		this.SLTime = 0;
		this.isVeloRelative = false;
		this.recalMid();
	}
	recalMid() {
		this.canvasSize = new Vector2(this.canv.width,this.canv.height);
		this.canvasMid = Vector2.divide(this.canvasSize, 2);
		this.center = Vector2.subtract(this.canvasMid, this.cam.position);
	}
	toggleVeloRelativity(){
		this.isVeloRelative = !this.isVeloRelative;
		log(this.isVeloRelative);
		if(this.isVeloRelative){
			//this.setSL()
		}else{
			//this.setSL()
		}
	}
	randomColor(){return "rgb(" +Math.round( Math.random()*255) + ", " + Math.round( Math.random()*255)+ ", "+Math.round( Math.random()*255) + " )"};
	worldToScreenPos(pos){
		return Vector2.add(this.center, Vector2.multiply(pos, this.cam.zoom));
	}
	screenToWorldPos(pos){
		return Vector2.add(pos, this.cam.worldPosition());
	}
	convertPostion(pos){
		return (pos != undefined ? this.worldToScreenPos(pos) : new Vector2(this.lastPos.x, this.lastPos.y));
	}
	isOnScreen(pos, offset = 0){
		var tempPos = this.worldToScreenPos(pos);

		if(this.worldToScreenPos(pos).y > this.canvasSize.y/2*this.cam.zoom){
			return true;
		}else{
			return false;
		}
	}
	

	setStyle(color,alpha=1,dashFill=1,dashHole=1){
		this.context.fillStyle = color;
		this.context.strokeStyle = color;
		if(isFinite(alpha) & !isNaN(alpha)){this.context.globalAlpha = alpha;}
		else{this.context.globalAlpha = 0;}
		this.context.setLineDash([dashFill,dashHole]);
	}
	setSL(message,_time= 1){
		this.SLMessage = message.toString(); this.SLTime = _time*time.speed;
	}
	onScreenLog(deltaTime){
		if(this.SLTime-deltaTime > 0.1){this.SLTime -= deltaTime/time.speed ;}
		else{this.SLTime = 0;}		

		this.setStyle("#000000", Math.log10(Math.abs(this.SLTime))+1,0,0);//logarythmic alpha channel = nice fade out
		if(this.SLMessage != undefined){
			this.context.font = this.SLFontSize.toString() + "px monospace";
			var offset = this.SLMessage.length/4 * this.SLFontSize;
			this.context.fillText(this.SLMessage,this.canvasMid.x - offset,this.SLFontSize );
		}
	}
	moveCursorTo(pos){//unused
		var tPos = worldToScreenPos(pos);
		this.context.moveTo(tPos.x, tPos.y);
		this.lastPos = tPos;
	 }
	clear(alpha=1){
		this.setStyle("rgb(152,152,152)", alpha,0,0);
		this.context.fillRect(0,0, this.canv.width, this.canv.height);
	}
	drawLineWorld(startPos, endPos, relative = true){
		this.recalMid();
		var screenStartPos = this.convertPostion(startPos);
		var screenEndPos = this.convertPostion(endPos);
		if(relative){
			screenEndPos = Vector2.multiply(endPos,this.cam.zoom).add(screenStartPos);
		}
		this.context.beginPath();
		this.context.moveTo(screenStartPos.x,screenStartPos.y);
		this.context.lineTo(screenEndPos.x, screenEndPos.y);
		this.context.stroke();
	}

	drawLineScreen(startPos, endPos, relative = true){
		this.recalMid();
		var screenStartPos = startPos;
		var screenEndPos = endPos;
		if(relative){
			screenEndPos = Vector2.add(screenStartPos,screenEndPos);	
		}
		this.context.beginPath();
		this.context.moveTo(screenStartPos.x,screenStartPos.y);
		this.context.lineTo(screenEndPos.x, screenEndPos.y);
		this.context.stroke();
	}
	
	drawRect(startPos, endPos, _fill= false){
		this.recalMid();
		var screenStartPos = this.convertPostion(startPos);
		this.context.rect(screenStartPos.x, screenStartPos.y, endPos.x * this.cam.zoom, endPos.y * this.cam.zoom);
		this.lastPos = new Vector2(screenStartPos.x + endPos.x * this.cam.zoom, screenStartPos.y+ endPos.y * this.cam.zoom );
		if(_fill){this.context.fill()}else{this.context.stroke();}
	}
	drawArc(startPos, radius, startAngle= 0, endAngle = Math.PI*2, _fill =false){
		this.recalMid();
		var screenStartPos = this.convertPostion(startPos);
		this.context.beginPath();
		this.context.arc(screenStartPos.x,screenStartPos.y, radius *  this.cam.zoom, startAngle, endAngle);
		if(_fill){
			this.context.fill();
		}else{
			this.context.stroke();
		}

	}
	drawReferenceSystem(){
		this.recalMid();
		//this.isOnScreen(new Vector2());
		this.drawLineScreen(new Vector2(0,this.center.y), new Vector2(this.canvasSize.x, 0)); 	
		this.drawLineScreen(new Vector2(this.center.x,0), new Vector2(0, this.canvasSize.y));
		//this.drawLineScreen(new Vector2(this.cam.worldPosition().x,this.center.y), new Vector2(100,100));
		var howmany = parseInt(bigger(this.canvasSize.x,this.canvasSize.y)/this.cam.zoom/this.gridSize/2);
		this.setSL(howmany);
		for(let i = -howmany; i < 2*howmany; i++){
			var tempCenter = Vector2.subtract(this.cam.worldPosition(), new Vector2(this.cam.worldPosition().x % this.gridSize, this.cam.worldPosition().y % this.gridSize));
			tempCenter.add(new Vector2(i*this.gridSize));
			this.drawLineScreen(new Vector2(this.worldToScreenPos(tempCenter).x, 0), new Vector2(0,this.canvasSize.y));
			this.drawLineScreen(new Vector2(0,this.worldToScreenPos(tempCenter).y), new Vector2(this.canvasSize.x,0));
			// this.drawLineWorld(tempCenter, new Vector2(0,1000));
			//this.drawLineScreen(new Vector2(0,this.center.y + i*this.gridSize), new Vector2(this.canvasSize.x, 0)); 	
			//this.drawLineWorld(this.screenToWorldPos(new Vector2(this.center.x + i*this.gridSize,0)), this.screenToWorldPos(new Vector2(0, this.canvasSize.y+10)), false);
		}
	
		// this.context.moveTo(this.canv.width/4, this.center.y-this.unitIndicatorLength);
		// this.context.lineTo(this.canv.width/4,this.center.y+this.unitIndicatorLength);
	}
	drawPlanet(planet){	
		var active  = planet.active ? 0 : 1;

		this.setStyle("#000000", 1, 3*active,3*active);
		
		if(flags.altPressed == true){
			//this.drawPlanetInfo(planet);
		}
		this.drawArc(planet.position, planet.radius,0, 2*Math.PI);
		this.setStyle(planet.color, 0.3, 0,0);
		this.drawArc(planet.position, planet.radius,0, 2*Math.PI,true);
		
		//velocity
		if(this.isVeloRelative & this.cam.followPlanet != undefined){
			this.setStyle("#FFF000", 1, 3*active,3*active);
			this.drawLineWorld(planet.position, Vector2.multiply(Vector2.subtract(planet.velocity, this.cam.followPlanet.velocity), 0.2), true);
		}else{
			this.setStyle("#FFF000", 1, 3*active,3*active);
			this.drawLineWorld(planet.position, Vector2.multiply( planet.velocity,0.2), true);
		}
		//drawing orbit evaluation //not implemented yet	
	}
	drawPlanetInfo(object){ //its complicated!
		this.recalMid();
		var flip = new Vector2(false,false);
		var screenStartPos = this.convertPostion(Vector2.addVectors(object.position, new Vector2(object.radius,0)));
		var info = object.getInfo();
		this.context.font = this.fontSize.toString() + "px monospace";
		for(let i = 0; i < info.length; i += 1){
			this.context.fillText(info[i],screenStartPos.x + this.infoTableMargin + this.textMargin.x,
			screenStartPos.y + (i+1 - flip.y*info.length)*(this.textMargin.y+this.fontSize) - this.fontSize*flip.y);	
		}
		var longestWord = info.sort(function(a,b){return a.length < b.length})[0];
		this.drawLineWorld(Vector2.addVectors(object.position, new Vector2(object.radius,0)), new Vector2(this.infoTableMargin/this.cam.zoom,0), "#000000");
		var monospaceFontRatio = 0.55;
		this.drawRect(undefined,new Vector2((longestWord.length * this.fontSize*monospaceFontRatio+ this.textMargin.x*2)/this.cam.zoom,
											 (-(flip.y+flip.y-1)*(info.length*(this.fontSize+this.textMargin.y) + this.fontSize))/this.cam.zoom));
	}

}