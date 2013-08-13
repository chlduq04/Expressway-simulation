var max_speed = 0.5;
var max_car = 200;
var simulation_speed = 40;
var simulation_start = true;
var simulation_setting;
var gl;
var toggle_navigation = false;
var toggle_sound = false;
window.onload = function() {
	/** Navigation **/

	gl = $(".view_3d").WebGL({
		sound : toggle_sound
	});
	gl.init();

	simulation_setting = new Traffic({

	});
//	simulation_setting.drawLoad();

	function simulation_reset(){
		simulation_start = false;
		setTimeout(function () {
			simulation();
		},50);
	}
	function simulation(){
		simulation_start = true;
		simulation_setting = new Traffic({
			drawCar3D : gl.drawCar3D,
			drawCarBack3D : gl.drawCarBack3D,
			deleteCar3D : gl.deleteCar,
			camera3D : gl.controlCamera,
			initCamera3D : gl.initCamera,
			render3D : gl.rendering,
			drawPlayer : gl.drawCarPlayer3D
		});
		simulation_setting.drawLoad();
		simulation_setting.init();
		function myLoop () {           
			setTimeout(function () {    
				if ( simulation_setting.moveCars()) { 
					if( simulation_setting.cars.length != 0 && simulation_start ){
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
		simulation_setting.startCar( "top", 43, true );
	});

	$(".ds-unlinking").click(function(){
	});
	$(".road").dblclick(function(){ 
		if(toggle_navigation){
			$("#top-navigation").fadeIn(800);
			$("#bottom-navigation").fadeIn(800);
			toggle_navigation = false;
		}else{
			$("#top-navigation").fadeOut(400);
			$("#bottom-navigation").fadeOut(400);
			toggle_navigation = true;
		}
	})
	$('.make-car1-blue').click(function(){
		simulation_setting.startCar( "top", 30, false );
	});
	$('.make-car1-red').click(function(){
		simulation_setting.startCar( "top", 30, true );
	});
	$('.make-car2-blue').click(function(){
		simulation_setting.startCar( "top", 34, false );
	});
	$('.make-car2-red').click(function(){
		simulation_setting.startCar( "top", 34, true );
	});
	$('.make-car3-blue').click(function(){
		simulation_setting.startCar( "bottom", 39, false );
	});
	$('.make-car3-red').click(function(){
		simulation_setting.startCar( "bottom", 39, true );
	});
	$('.make-car4-blue').click(function(){
		simulation_setting.startCar( "bottom", 43, false );
	});
	$('.make-car4-red').click(function(){
		simulation_setting.startCar( "top", 43, true );
	});
};