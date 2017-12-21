class Vector2{
	constructor(_x=0,_y=0){this.x = _x; this.y = _y;}
	magnitude() {return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));}
	sin(){return this.y/this.magnitude();}
	cos(){return this.x/this.magnitude();}

}
class GravObject{
	constructor(_Name,_Mass, _Radius, _InitialPosition, _InitialVelocity, _isStatic = false){
		this.name = _Name;
		this.mass = _Mass;
		this.radius = _Radius;
		this.position = new Vector2(_InitialPosition.x, _InitialPosition.y );
		this.velocity = new Vector2(_InitialVelocity.x, _InitialVelocity.y );
		this.acceleration = new Vector2();
		this.static = _isStatic;
	}	
} 