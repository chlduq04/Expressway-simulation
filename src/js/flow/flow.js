window.onload = function() {
	var max_speed = 0.5;
	var max_car = 200;
	var simulation_speed = 30;
	var simulation_start = true;
	var simulation_setting;
	var toggle_navigation = false;
	var toggle_sound = false;

	var glview = new view3d();
	glview.init();

	var simul = new Traffic({
		drawCar3D : glview.getGl().drawCar3D,
		drawCarBack3D : glview.getGl().drawCarBack3D,
		deleteCar3D : glview.getGl().deleteCar,
		camera3D : glview.getGl().controlCamera,
		initCamera3D : glview.getGl().initCamera,
		render3D : glview.getGl().rendering,
		drawPlayer : glview.getGl().drawCarPlayer3D,
		road3D : glview.getGl().startRoad,
		cameraEnding : glview.getGl().cameraView
	})

	var navi = new navigation();
	var start = new startpage();

	navi.init(simul);
	navi.simulationKeySet();
	start.init(simul);
	initialize();
};