var tutorials;

window.onload = function() {
	var max_speed = 0.5;
	var max_car = 200;
	var simulation_speed = 30;
	var simulation_start = true;
	var simulation_setting;
	var toggle_navigation = false;
	var toggle_sound = false;

	tutorials = new tutorial();
	tutorials.init();

	var start = new startpage();
	var front = new $(".view_3d").WebGL();
	var navi = new navigation();
	var simul = new Traffic({
		drawCar3D : front.drawCar3D,
		drawCarBack3D : front.drawCarBack3D,
		deleteCar3D : front.deleteCar,
		camera3D : front.controlCamera,
		initCamera3D : front.initCamera,
		render3D : front.rendering, 
		drawPlayer : front.drawCarPlayer3D,
		road3D : front.startRoad,
		cameraEnding : front.cameraView,
		paringZoneRedArrowStart : front.CParingStart,
		paringZoneRedArrowRightSpeed : front.CParingArrowRight,
		paringZoneRedArrowLeftSpeed : front.CParingArrowLeft,
		paringButtonSwitch : navi.CParingClickSwitch,
		paring : function(){ 
			setTimeout(function(){
				navi.CParingStartMsg()
				setTimeout(function(){
					tutorials.tutorialNext();
				},2000);
			},6000);
		}
	})
	
	front.init();
	navi.init(simul);
	start.init(simul,front.settingSound);
};