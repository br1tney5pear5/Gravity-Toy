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