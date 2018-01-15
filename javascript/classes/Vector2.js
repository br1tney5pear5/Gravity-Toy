class Vector2{
	constructor(_x=0,_y=0){this.x = _x; this.y = _y;}

	sin(){return this.y/this.magnitude();} //obsolete, use rather normalize().y
	cos(){return this.x/this.magnitude();} //obsolete, use rather normalize().x

	magnitude() {return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));}
	normalize(){
		var mag = this.magnitude();
		this.x /= mag; this.y /= mag; return this;
	}

	not(){this.x = -this.x; this.y = -this.y; return this;}
	add(vector){this.x +=vector.x; this.y += vector.y; return this;}
	subtract(vector){this.x -=vector.x; this.y -= vector.y; return this;}
	scale(vector){this.x *= vector.x; this.y *= vector.y; return this;}
	multiply(scalar){this.x *= scalar; this.y *= scalar; return this;}
	divide(scalar){this.x /= scalar; this.y /= scalar; return this;}
	abs(){this.x =Math.abs(this.x); this.y = Math.abs(this.y);  return this;}

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
	static abs(vector){return new Vector2(Math.abs(vector.x), Math.abs(vector.y));}
	
	static random(min = -1, max = 1){return new Vector2(random(min, max), random(min, max));}
	static one(){return new Vector2(1,1);}
	static distance(vector1,vector2){return Vector2.subtract(vector1,vector2).magnitude();}
	static flip(vector){return new Vector2(vector.y, vector.x);}

	static isVectorInRectSpace(vector, space){}
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