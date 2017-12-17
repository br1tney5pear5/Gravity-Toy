var objectSelect = document.getElementById("objectSelect");
var NameTextBox = document.getElementById("NameTextBox");
var MassTextBox = document.getElementById("MassTextBox");
var RadiusTextBox = document.getElementById("RadiusTextBox");
var PositionXTextBox = document.getElementById("PositionXTextBox");
var PositionYTextBox = document.getElementById("PositionYTextBox");
var VelocityXTextBox = document.getElementById("VelocityXTextBox");
var VelocityYTextBox = document.getElementById("VelocityYTextBox");
var unnamedCount = -1;
var objects = [];
class GravObject{
	constructor(_Name,_Mass, _Radius, _InitialPosition, _InitialVelocity){
		this.Name = _Name;
		this.Mass = _Mass;
		this.Radius = _Radius;
		this.Position = new Vector2(_InitialPosition.x, _InitialPosition.y );
		this.Velocity = new Vector2(_InitialVelocity.x, _InitialVelocity.y );
	}	
} 
function addObject_Button(){
	var option = document.createElement("option");
	if(NameTextBox.value != ""){
		option.text = NameTextBox.value;
	}else{
		unnamedCount += 1;
		option.text = "unnamed_"+unnamedCount;
		
	}
	objectSelect.add(option);
	objects.unshift(new GravObject(NameTextBox.value == "" ? ("unnamed_"+unnamedCount) : NameTextBox.value,
								MassTextBox.value, RadiusTextBox.value,
								new Vector2(PositionXTextBox,PositionYTextBox),
								new Vector2(VelocityXTextBox,VelocityYTextBox)
								));
	objectSelect.selectedIndex = objectSelect.options.length-1;
	console.log(objectSelect.selectedIndex);
	console.log(objects)
}

function removeObject_Button(){
	objects.splice(objectSelect.selectedIndex,1);
	objectSelect.remove(objectSelect.selectedIndex);
	
	console.log(objects)

}

objectSelect.onchange = function(){
	console.log(objectSelect.selectedIndex);
	
}