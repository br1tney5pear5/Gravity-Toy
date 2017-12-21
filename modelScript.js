var time = {startTime: new Date().getTime(),
			deltaTime: 0,
			lastTime: 0};

const G = 0.667;


function getTime(){return Math.abs(time.startTime - new Date().getTime());}
function getTimeInSeconds(){return Math.abs(time.startTime - new Date().getTime())/1000;}