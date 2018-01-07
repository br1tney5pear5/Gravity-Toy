  class Time{
	constructor(){
		this.startTime = new Date().getTime(),	
		this.lastTime = 0;
		this.stop = false;
		this.speed = 1;
	}	
	toggle(){this.stop = !this.stop;}
	getTime(){return this.speed*Math.abs(this.startTime - new Date().getTime());}
	getTimeInSeconds(){return Math.abs(this.startTime - new Date().getTime())/1000;}
	deltaTime(){
		if(this.stop == false){
			return this.speed * Math.abs(this.lastTime - this.getTime());
		}else{
			return 0;
		}
	}
	deltaTimeInSeconds(){return this.deltaTime()/1000;}
	setLastTime(){this.lastTime = this.getTime();}
}

class Vector2{
	constructor(_x=0,_y=0){this.x = _x; this.y = _y;}
	magnitude() {return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));}
	sin(){return this.y/this.magnitude();}
	cos(){return this.x/this.magnitude();}
	multiplyByScalar(scalar){this.x *= scalar; this.y *= scalar; return new Vector2(this.x,this.y);}
	static addVectors(){
		var temp = new Vector2();
		for(let i = 0; i < arguments.length; i += 1){
			temp.x += arguments[i].x; temp.y += arguments[i].y
		}return temp;
	}
	static multiplyVectors(){
		var temp = new Vector2(1,1);
		for(let i = 0; i < arguments.length; i += 1){
			temp.x *= arguments[i].x; temp.y *= arguments[i].y
		}return temp;
	}
	static multiplyVectorByScalar(vector,scalar){
		return new Vector2(vector.x * scalar, vector.y * scalar);
	}

}
class GravObject{
	constructor(_Name,_Mass, _Radius, _InitialPosition, _InitialVelocity, _isStatic = false, _isActive = true){
		this.name = _Name;
		this.mass = _Mass;
		this.radius = _Radius;
		this.color = plotter.randomColor();
		this.position = new Vector2(_InitialPosition.x, _InitialPosition.y );
		this.velocity = new Vector2(_InitialVelocity.x, _InitialVelocity.y );
		this.acceleration = new Vector2();
		this.static = _isStatic;
		this.active = _isActive;
	}
	toggle(){this.active = !this.active;}
	getInfo(){
		return new Array("Name:------ " + this.name.toString(),
						 "Radius----- " + Math.round(this.radius).toString(),
						 "Mass------- " + this.mass.toString(),
		 				 "Position--- " + Math.round(this.position.x).toString() + " : " + Math.round(this.position.y).toString(),
		 				 "Velocity--- " + Math.round(this.velocity.x).toString()  + " : " +  Math.round(this.velocity.y).toString(),
		  				 "isStatic?-- " + this.static.toString(),
		  				 "isActive?-- " + this.active.toString());
	}
} 

class Plotter{
	//its yet to be corrected
	constructor(_canvas, _camera){
		this.canv = _canvas;
		this.context = _canvas.getContext("2d"); 
		this.cam = _camera;
		this.lastPos = new Vector2();
		this.relativeMid = new Vector2(_canvas.width/2- _camera.position.x, _canvas.height/2 - _camera.position.y)
		this.unitIndicatorLength = 10;
		this.fontSize = 18;
		
		this.textMargin = new Vector2(5,5);
		this.infoTableMargin = 30;
		this.SLFontSize = 28;
		this.SLMessage = "";
		this.SLTime = 0;
	}
	randomColor(){return "rgb(" +Math.round( Math.random()*255) + ", " + Math.round( Math.random()*255)+ ", "+Math.round( Math.random()*255) + " )"};
	recalMid() {this.relativeMid = new Vector2(this.canv.width/2-this.cam.position.x, this.canv.height/2-this.cam.position.y);}
	transformPositon(pos){
		if(pos != undefined){
			return new Vector2(this.relativeMid.x + pos.x * this.cam.zoom,this.relativeMid.y + pos.y * this.cam.zoom);
		}else{
			return new Vector2(this.lastPos.x, this.lastPos.y);
		}
	}
	setStyle(color,alpha,dashFill,dashHole){
		this.context.fillStyle = color;
		this.context.strokeStyle = color;
		if(isFinite(alpha) & !isNaN(alpha)){this.context.globalAlpha = alpha;}
		else{this.context.globalAlpha = 0;}
		this.context.setLineDash([dashFill,dashHole]);
	}
	setSL(message,time){
		this.SLMessage = message.toString(); this.SLTime = time;
	}
	onScreenLog(deltaTime){
		if(this.SLTime-deltaTime > 0.1){
			this.SLTime -= deltaTime ;
		}else{
			this.SLTime = 0;
		}		
		this.setStyle("#000000", Math.log10(Math.abs(this.SLTime))+1,0,0);
		if(this.SLMessage != undefined){
			this.context.font = this.SLFontSize.toString() + "px monospace";
			var offset = this.SLMessage.length / 4 * this.SLFontSize;
			this.context.fillText(this.SLMessage,canvas.width/2-offset,this.SLFontSize );
		}
	}
	moveCursorTo(pos){
		this.context.moveTo(this.relativeMid.x + pos.x * this.cam.zoom, this.relativeMid.y + pos.y * this.cam.zoom);
		this.lastPos = new Vector2(this.relativeMid.x + pos.x * this.cam.zoom, this.relativeMid.y + pos.y * this.cam.zoom);
	 }
	clear(alpha){
		this.setStyle("rgb(152,152,152)", alpha,0,0);
		this.context.fillRect(0,0, this.canv.width, this.canv.height);
	}
	drawLineFromTo(startPos, endPos){
		this.recalMid();
		var transformedStartPos = this.transformPositon(startPos);
		this.context.beginPath();
		this.context.moveTo(transformedStartPos.x,transformedStartPos.y);
		this.context.lineTo(transformedStartPos.x + endPos.x * this.cam.zoom, transformedStartPos.y+ endPos.y * this.cam.zoom );
		this.lastPos = new Vector2(transformedStartPos.x + endPos.x * this.cam.zoom, transformedStartPos.y+ endPos.y * this.cam.zoom );
		this.context.stroke();
	}
	drawRect(startPos, endPos, _fill= false){
		this.recalMid();
		var transformedStartPos = this.transformPositon(startPos);
		this.context.rect(transformedStartPos.x, transformedStartPos.y, endPos.x * this.cam.zoom, endPos.y * this.cam.zoom);
		this.lastPos = new Vector2(transformedStartPos.x + endPos.x * this.cam.zoom, transformedStartPos.y+ endPos.y * this.cam.zoom );
		if(_fill){this.context.fill()}else{this.context.stroke();}
	}
	drawArc(startPos, radius, startAngle= 0, endAngle = Math.PI*2, _fill =false){
		this.recalMid();
		var transformedStartPos = this.transformPositon(startPos);
		this.context.beginPath();
		this.context.arc(transformedStartPos.x,transformedStartPos.y, radius *  this.cam.zoom, startAngle, endAngle);
		if(_fill){
			this.context.fill();
		}else{
			this.context.stroke();
		}

	}
	
	drawReferenceSystem(){
		this.recalMid();
		this.context.beginPath();
		this.context.moveTo(0, this.relativeMid.y);
		this.context.lineTo(this.canv.width,this.relativeMid.y);
		this.context.moveTo(this.relativeMid.x, 0);
		this.context.lineTo(this.relativeMid.x, this.canv.height);
		this.context.moveTo(this.canv.width/4, this.relativeMid.y-this.unitIndicatorLength);
		this.context.lineTo(this.canv.width/4,this.relativeMid.y+this.unitIndicatorLength);
		this.context.stroke();
	}
	drawGravObjectInfo(object){ //its complicated!
		this.recalMid();
		var flip = new Vector2(false,false);
		var transformedStartPos = this.transformPositon(Vector2.addVectors(object.position, new Vector2(object.radius,0)));
		var info = object.getInfo();
		this.context.font = this.fontSize.toString() + "px monospace";
		for(let i = 0; i < info.length; i += 1){
			this.context.fillText(info[i],transformedStartPos.x + this.infoTableMargin + this.textMargin.x,
			transformedStartPos.y + (i+1 - flip.y*info.length)*(this.textMargin.y+this.fontSize) - this.fontSize*flip.y);	
		}
		var longestWord = info.sort(function(a,b){return a.length < b.length})[0];
		this.drawLineFromTo(Vector2.addVectors(object.position, new Vector2(object.radius,0)), new Vector2(this.infoTableMargin/this.cam.zoom,0), "#000000");
		var monospaceFontRatio = 0.55;
		this.drawRect(undefined,new Vector2((longestWord.length * this.fontSize*monospaceFontRatio+ this.textMargin.x*2)/this.cam.zoom,
											 (-(flip.y+flip.y-1)*(info.length*(this.fontSize+this.textMargin.y) + this.fontSize))/this.cam.zoom));
		
	}
}
var canvas = document.getElementById("canvas"); canvas.width = 855; canvas.height = 800; canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");
var gridSize = 2000;
var mouseData = {mousedown: false, lastPos: undefined, delta: undefined};
var camera = {position: new Vector2(), zoom: 1/128, zoomFactor: 2, shiftFactor: 100};
var time = new Time();
var objects = [];
var objectsLimit = 500;
plotter = new Plotter(canvas, camera);
flags = {alt: false};
var G = 20;

window.onload = function(){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {alert("This app may not work correctly on your device!")
	requestAnimationFrame(redraw);
	hookListeners();
}
//