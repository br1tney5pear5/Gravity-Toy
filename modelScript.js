var time = {startTime: new Date().getTime(),
			deltaTime: 0,
			lastTime: 0};

const G = 6.67 * Math.pow(10,-1);

function getTime(){return Math.abs(time.startTime - new Date().getTime());}
function getTimeInSeconds(){return Math.abs(time.startTime - new Date().getTime())/1000;}