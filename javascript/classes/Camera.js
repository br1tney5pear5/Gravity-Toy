
class Camera{
	constructor(_position = new Vector2(), _zoom = 1/1024){
		this.position = _position;
		this.zoom = _zoom;
		this.zoomFactor = 2;
		this.shiftFactor = 100;
		this.followPosition = undefined;
	}
	setWorldPosition(pos){
		this.position = Vector2.multiply(pos, this.zoom);
		return this.worldPosition();
	}
	worldPosition(){
		return Vector2.divide(this.position, this.zoom);
	}
	move(shift, factor = 1, directionMod = Vector2.one()){
		this.followPosition = undefined;
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
	routine(){
		if(this.followPosition != undefined){
			this.setWorldPosition(this.followPosition);
		}
	}
}