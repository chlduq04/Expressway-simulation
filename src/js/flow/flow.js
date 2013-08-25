
window.onload = function() {
	var max_speed = 0.5;
	var max_car = 200;
	var simulation_speed = 30;
	var simulation_start = true;
	var simulation_setting;
	var toggle_navigation = false;
	var toggle_sound = false;

	
	var paringzone = new 
	
	var gl = $(".view_3d").WebGL();
	gl.init();

	var simul = new Traffic({
		drawCar3D : gl.drawCar3D,
		drawCarBack3D : gl.drawCarBack3D,
		deleteCar3D : gl.deleteCar,
		camera3D : gl.controlCamera,
		initCamera3D : gl.initCamera,
		render3D : gl.rendering,
		drawPlayer : gl.drawCarPlayer3D,
		road3D : gl.startRoad,
		cameraEnding : gl.cameraView
	})

	var navi = new navigation();
	var start = new startpage();

	navi.init(simul);
	navi.simulationKeySet();
	start.init(simul);
	initialize();
};