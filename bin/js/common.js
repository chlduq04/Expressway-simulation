var max_speed = 1;
var max_car = 200;
var simulation_speed = 30;
var simulation_start = true;
var simulation_setting;
var gl;

window.onload = function() {
	/** Navigation **/

	gl = $("#container").WebGL();
	gl.init();

	simulation_setting = new Traffic({});
	simulation_setting.drawLoad();
	
	function simulation_reset(){
		simulation_start = false;
		setTimeout(function () {
			simulation();
		},50);
	}
	function simulation(){
		simulation_start = true;
		simulation_setting = new Traffic({
			drawCar3D : gl.drawCar,
			drawCarBack3D : gl.drawCarBack,
			drawCarColor : gl.drawCar3D,
			deleteCar3D : gl.deleteCar,
			camera3D : gl.controlCamera,
			initCamera3D : gl.initCamera,
			render3D : gl.rendering
		});
		simulation_setting.drawLoad();
		simulation_setting.init();
		function myLoop () {           
			setTimeout(function () {    
				if (simulation_setting.moveCars()) { 
					if(simulation_setting.cars.length != 0 && simulation_start ){
						myLoop();            
					}
				}                      
			}, simulation_speed)
		}
		myLoop();                   
	}
	

	
	/** Mouse click **/
	
	$(".dr-reflesh").click(function(){
		var max = $(".ds-maxcar").val();
		var speed_car = $(".ds-limitspeed").val();
		var speed_simulation = $(".ds-simulationspeed").val();
		if(max.length>0){
			max_car = parseInt(max);
		}else{
			max_car = 2;
		}
		if(speed_car.length>0){
			max_speed = parseInt(speed_car);
		}else{
			max_speed = 500;
		}
		if(speed_simulation.length>0){
			simulation_speed = parseInt(speed_simulation);
		}else{
			simulation_speed = 40;
		}
		simulation_reset();
	});

	$(".dl-linking").click(function(){
		var leader = $(".dl-leader").val();
		var after = $(".dl-target").val();
		if(leader.length !=0 && after.length != 0){
			simulation_setting.addLinkById(leader,after);
		}
	});

	$(".ds-searching").click(function(){
		var target = $(".ds-target").val();
		if(target.length != 0){
			simulation_setting.searchLink(target);
		}
	});

	$(".ds-unlinking").click(function(){
		var target = $(".ds-unlink-target").val();
		if(target.length != 0){
			simulation_setting.unlink(target);
		}
	});
};