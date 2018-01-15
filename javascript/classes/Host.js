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
		return new Array(
			"Name:------ " + this.name.toString(),
			"Radius----- " + Math.round(this.radius).toString(),
			"Mass------- " + this.mass.toString(),
			"Position--- " + Math.round(this.position.x).toString() + " : " + Math.round(this.position.y).toString(),
			"Velocity--- " + Math.round(this.velocity.x).toString()  + " : " +  Math.round(this.velocity.y).toString(),
			"isStatic?-- " + this.static.toString(),
			"isActive?-- " + this.active.toString()
		);
	}
} 

class Host{
	constructor(){
		this.planets = [];
		this.planetsLimit = 500;
		this.unnamedCount = -1;
		this.G = 200;
	}
	clear(){
		this.planets.length = 0;
	}
	
	chooseBiggerRadius(planet1,planet2){
		//i could make sorting here to make this method more versitale, but it really would not be used
		if(planet2.radius > planet1.radius){return new Array(planet2, planet1);}
		else{return new Array(planet1,planet2);}
	}
	recal(){
		for(let i = 0; i < this.planets.length; i += 1){
			if( this.planets[i] != undefined & this.planets[i].active == true){

				for(let j = 0; j < this.planets.length; j += 1){
					if(j != i & this.planets[j] != undefined & this.planets[i] != undefined & this.planets[j].active == true){
						
						var distance = Vector2.subtract(this.planets[i].position, this.planets[j].position).not();
						var distanceMagnitude = distance.magnitude();
						
						if(this.planets[i].static == false){
							if(distanceMagnitude != 0){
								var gravityForce = (this.planets[i].mass * this.planets[j].mass * this.G)/distanceMagnitude;
								this.planets[i].acceleration = distance.normalize().multiply(gravityForce*time.deltaTime()).divide(this.planets[i].mass);
								this.planets[i].velocity.add(this.planets[i].acceleration);
							}
						}

						if( (this.planets[i].radius + this.planets[j].radius) > distanceMagnitude ){

							var index1 = host.planets.indexOf(host.planets[i].radius > host.planets[j].radius ? host.planets[i] : host.planets[j]);
							var index2 = host.planets.indexOf(host.planets[i].radius <= host.planets[j].radius ? host.planets[i] : host.planets[j]);
							this.planets[index1].radius = Math.sqrt(Math.pow(host.planets[index1].radius,2) + Math.pow(host.planets[index2].radius,2));
							var massRatio = new Vector2(this.planets[index1].mass, this.planets[index2].mass).normalize();
							this.planets[index1].velocity.multiply(massRatio.x).add(Vector2.multiply(this.planets[index2].velocity, massRatio.y));
							this.planets[index1].mass += host.planets[index2].mass;
							this.planets.splice(index2,1);
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
			//mass is proportional to radius for clariness
			this.planets.push(new Planet("obj_"+i,size, size, position, velocity ));
		}
		plotter.setSL("Spawned " + howMany + " random planets.",1);
	}
}