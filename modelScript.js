 class Time{
	constructor(){
		this.startTime = new Date().getTime(),	
		this.lastTime = 0;
		this.stop = false;
		this.speed = 1;
	}	
	toggle(){this.stop = !this.stop;}
	getTime(){return this.speed*Math.abs(this.startTime - new Date().getTime());}
	getTimeInSeconds(){return this.getTime()/1000;}
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
class Test{
	foo(){console.log("tu dynamiczna");}
	static foo(vector,scalar){new Vector2(vector.x * scalar, vector.y*scalar);}
}
class Vector2{
	constructor(_x=0,_y=0){this.x = _x; this.y = _y;}

	
	sin(){return this.y/this.magnitude();} //obsolete, rather use normalize().y
	cos(){return this.x/this.magnitude();} //obsolete, rather use normalize().x

	magnitude() {return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));}
	normalize(){
		var mag = this.magnitude();
		this.x / mag; this.y / mag; return this;
	}
	not(){this.x = -this.x; this.y = -this.y; return this;}
	add(vector){this.x +=vector.x; this.y += vector.y; return this;}
	subtract(vector){this.x -=vector.x; this.y -= vector.y; return this;}
	scale(vector){this.x *= vector.x; this.y *= vector.y; return this;}
	multiply(scalar){this.x *= scalar; this.y *= scalar; return this;}
	divide(scalar){this.x /= scalar; this.y /= scalar; return this;}
	
	static flip(vector){return new Vector2(vector.y, vector.x);}
	static magnitude(vector){return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2));}
	static normalize(vector){
		var mag = vector.magnitude();
		return new Vector2(vector.x/mag, vector.y/mag);
	}
	static not(vector){return new Vector2(-vector.x, -vector.y);}
	static add(vector1, vector2){return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);}
	static subtract(vector1, vector2){return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);}
	static scale(vector1, vector2){return new Vector2(vector1.x * vector2.x, vector1.y * vector2.y);}
	static multiply(vector, scalar){return new Vector2(vector.x * scalar, vector.y * scalar);}
	static divide(vector, scalar){return new Vector2(vector.x / scalar, vector.y / scalar);}

	static random(min = -1, max = 1){return new Vector2(random(min, max), random(min, max));}
	static one(){return new Vector2(1,1);}

	static distance(vector1,vector2){return Vector2.subtract(vector1,vector2);}
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
}
class Planet{
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
	setSL(message,_time= 1){
		this.SLMessage = message.toString(); this.SLTime = _time*time.speed;
	}
	onScreenLog(deltaTime){
		if(this.SLTime-deltaTime > 0.1){
			this.SLTime -= deltaTime/time.speed ;
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
	drawPlanetInfo(object){ //its complicated!
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
class Camera{
	constructor(_position = new Vector2(), _zoom = 1/1024){
		this.position = _position;
		this.zoom = _zoom;
		this.zoomFactor = 2;
		this.shiftFactor = 100;
	}
	worldPosition(){
		return Vector2.multiply(this.position, 1/this.zoom);
	}
	move(shift, factor = 1, directionMod = Vector2.one()){
		this.position.add(shift.scale(directionMod).multiply(factor));
		plotter.setSL("Camera position - x: "+ round(this.worldPosition().x, 100) + ", y: "+ round(this.worldPosition().y, 100));
	}
	zoomOn(){
		this.zoom *= this.zoomFactor; this.position.x *=2; this.position.y *=2;
		plotter.setSL("zoom - 1/" + 1/this.zoom, 1);
	}
	zoomOut(){
		this.zoom /= this.zoomFactor; this.position.x /=2; this.position.y /=2;
		plotter.setSL("zoom - 1/" + 1/this.zoom, 1);
	}
}
class Host{
	constructor(){
		this.planets = [];
		this.planetsLimit = 500;
		this.unnamedCount = -1;
		this.G = 0.002;
	}
	ok(){console.log("imokey");}
	clear(){
		this.planets.length = 0;
	}
	

	recal(){
		// for(let i = 0; i < this.planets.length; i += 1){
		// 	if( this.planets[i] != undefined & this.planets[i].active == true){

		// 		for(let j = 0; j < this.planets.length; j += 1){
		// 			if(j != i & this.planets[j] != undefined & this.planets[i] != undefined &this.planets[j].active == true){
		// 				var distance = new Vector2(this.planets[i].position.x -this.planets[j].position.x,this.planets[i].position.y -this.planets[j].position.y);
		// 				var distanceMagnitude = distance.magnitude();
						
		// 				if(this.planets[i].static == false){
		// 					if(distanceMagnitude != 0){
		// 						var gravityForceScalar = (this.planets[i].mass * this.planets[j].mass * G)/distanceMagnitude;
		// 						this.planets[i].acceleration.y = gravityForceScalar * -distance.sin() * time.deltaTime() / this.planets[i].mass;
		// 						this.planets[i].acceleration.x =  gravityForceScalar * -distance.cos() * time.deltaTime() / this.planets[i].mass;
		// 						this.planets[i].velocity.x += this.planets[i].acceleration.x;
		// 						this.planets[i].velocity.y += this.planets[i].acceleration.y;
		// 					}
											
		// 				}
		// 				if((this.planets[i].radius + this.planets[j].radius) > distanceMagnitude){
		// 					var index1 = this.planets.indexOf(this.planets[i].radius > this.planets[j].radius ? this.planets[i] : this.planets[j]);
		// 					var index2 = this.planets.indexOf(this.planets[i].radius <= this.planets[j].radius ? this.planets[i] : this.planets[j]);
		// 					this.planets[index1].radius = Math.sqrt(Math.pow(this.planets[index1].radius,2) + Math.pow(this.planets[index2].radius,2));
		// 					var massRatio = new Vector2(this.planets[index1].mass, this.planets[index2].mass).cos();
		// 					this.planets[index1].velocity.x = this.planets[index1].velocity.x*massRatio + this.planets[index2].velocity.x*(1-massRatio);
		// 					this.planets[index1].velocity.y =  this.planets[index1].velocity.y*massRatio + this.planets[index2].velocity.y*(1-massRatio);
		// 					// console.log(this.planets[index1].radius);
		// 					this.planets[index1].mass += this.planets[index2].mass;
		// 					this.planets.splice(index2,1);
		// 					//no operations on this.planets[i or j] can be made after this
		// 				}
		// 			}
		// 		}
		// 	}	
		// }	
	


		for(let i = 0; i < this.planets.length; i += 1){
			if( this.planets[i] != undefined & this.planets[i].active == true){

				for(let j = 0; j < this.planets.length; j += 1){
					if(j != i & this.planets[j] != undefined & this.planets[i] != undefined & this.planets[j].active == true){
						
						var distance = Vector2.subtract(this.planets[i].position, this.planets[j].position);
						var distanceMagnitude = distance.magnitude();
						
						if(this.planets[i].static == false){
							if(distanceMagnitude != 0){
								var gravityForce = (this.planets[i].mass * this.planets[j].mass * this.G)/distanceMagnitude;
								//this.planets[i].acceleration = Vector2.flip(Vector2.normalize(distance)).multiply(gravityForce* time.deltaTime()).divide(this.planets[i].mass);
							
		 						this.planets[i].acceleration.y = gravityForce * -distance.normalize().y * time.deltaTime() / this.planets[i].mass;
								this.planets[i].acceleration.x =  gravityForce * -distance.normalize().x * time.deltaTime() / this.planets[i].mass;
								this.planets[i].velocity.add(this.planets[i].acceleration);
							}
						}

						if( (this.planets[i].radius + this.planets[j].radius) > distanceMagnitude){
							
							// var index1 = this.planets.indexOf(this.planets[i].radius > this.planets[j].radius ? this.planets[i] : this.planets[j]);
							// var index2 = this.planets.indexOf(this.planets[i].radius <= this.planets[j].radius ? this.planets[i] : this.planets[j]);

							// this.planets[index1].radius = Math.sqrt(Math.pow(this.planets[index1].radius,2) + Math.pow(this.planets[index2].radius,2));
							// var massRatio = Vector2.add(this.planets[index1].mass, this.planets[index2].mass).normalize();
							
							// this.planets[index1].velocity.multiply(massRatio.x).add( Vector2.multiply(this.planets[index2].velocity, massRatio.y) );
							
							// this.planets[index1].mass += this.planets[index2].mass;

							// this.planets.splice(index2,1);
							//no operations on this.planets[i or j] can be made after this
						}
					}	
				}
			}		
		}
		for(let i = 0; i < this.planets.length; i += 1){
			if(this.planets[i].static != true & this.planets[i].active == true){
				this.planets[i].position.add(Vector2.multiply(this.planets[i].velocity, time.deltaTimeInSeconds()));
			}
		}
	}

	spawnRandom(howMany = 100, minSize = 10, maxSize = 1000, positionSpan = 100 ,velocitySpan = 50000){
		for(let i = 0; i < howMany; i+=1){
			if(this.planets.length >= this.planetsLimit){plotter.setSL("Reached planets limit - " + this.planetsLimit);return;}

			var transformedPositionSpan = clamp(positionSpan/camera.zoom, 51200, 409600);
			var size = random(minSize, maxSize);
			var position = Vector2.random().multiply(transformedPositionSpan).add(camera.worldPosition());
			var velocity = Vector2.random().multiply(velocitySpan);
			this.planets.push(new Planet("obj_"+i,size, size, position, velocity ));
		}
		plotter.setSL("Spawned " + howMany + " random planets.",1);
	}
}
var host = new Host();
var canvas = document.getElementById("canvas");
canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");
var gridSize = 2000;
var mouseData = {mousedown: false, lastPos: undefined, delta: undefined};
var camera = new Camera();
// var camera = {position: new Vector2(), zoom: 1/128, zoomFactor: 2, shiftFactor: 100};
var time = new Time();

plotter = new Plotter(canvas, camera);
flags = {alt: false, helpPageActive: false};

function clamp(val, min, max){return (val > max ?  max : (val < min ? min : val));}
function random(min = -1, max = 1){return Math.random()*(max-min) + min;}
function round(val,to = 1){return Math.round(val*to)/to;}

function resizeCanvas(){
	canvas.width = document.body.scrollWidth * 0.9;
	canvas.height = document.body.scrollHeight * 0.9;	
}
window.onresize = function(event){
	plotter.setSL("Canvas resized", 1);
	canvas.width = event.target.outerWidth * 0.9;
	canvas.height = event.target.outerHeight * 0.9; 
	}

window.onload = function(){
	
	//checking for android device
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {alert("This app may not work correctly on your device! Please use PC.");}
	hookListeners();
	requestAnimationFrame(redraw);
}

//