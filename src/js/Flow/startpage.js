function startpage(){
	var self = this;
	this.video = $("#opening")[0];
	this.click = false;
	this.replay = false;
	this.simulation_setting;
	this.sound;

	this.init = function(simul,sound){
		$("#road").hide();
		self.sound = sound;
		self.startbuttonLightOff();
		self.startbuttonClick();
		self.replaybuttonClick();
		self.simulation_setting = simul;
	}
	this.startbuttonLightOff = function(){
		$("#sp-startbutton").fadeOut(800,function(){
			if(!self.click){
				self.startbuttonLightOn();
			}
		});
	}
	this.startbuttonLightOn = function(){
		$("#sp-startbutton").fadeIn(800,function(){
			if(!self.click){
				self.startbuttonLightOff();
			}
		});
	}
	this.startbuttonClick = function(){
		$("#sp-startbutton").click(function(){
			self.click = true;
			self.video.pause();
			$("#sp-startbutton").removeClass("sp-startbutton").addClass("sp-startbutton-down");
			$("#sp-startbutton-light").removeClass("sp-startbutton-light").addClass("sp-startbutton-light-down");
			$("#opening").css({"display":"none"});
			$("#startpage").fadeOut(500,function(){
				$("#road").fadeIn(500,function(){
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
						simulation_speed = 30;
					}
					self.simulation_reset();					
				});
			});
		});
	}
	this.simulation_reset  = function(){
		simulation_start = false;
		setTimeout(function () {
			self.simulation();
		},50);
	}
	this.simulation = function(){
		simulation_start = true;
//		self.simulation_setting = new Traffic({
//		drawCar3D : gl.drawCar3D,
//		drawCarBack3D : gl.drawCarBack3D,
//		deleteCar3D : gl.deleteCar,
//		camera3D : gl.controlCamera,
//		initCamera3D : gl.initCamera,
//		render3D : gl.rendering,
//		drawPlayer : gl.drawCarPlayer3D
//		});
		self.sound();
		self.simulation_setting.drawLoad();
		self.simulation_setting.init();
		self.myLoop();
	}
	this.myLoop = function(){           
		setTimeout(function () {    
			if ( self.simulation_setting.moveCars()) { 

				if( self.simulation_setting.cars.length != 0 && simulation_start ){
					self.myLoop();            
				}
			}                      
		}, simulation_speed)
	}

	this.replaybuttonClick = function(){
		$("#sp-replaybutton-light").click(function(){
			$(this).removeClass("sp-replaybutton-light").addClass("sp-replaybutton");
			setTimeout(function(){
				$("#sp-replaybutton-light").removeClass("sp-replaybutton").addClass("sp-replaybutton-light");
				self.replay = true;
				$("#sp-replaybutton").fadeOut();
				self.video.play();
			},200);
		});
		$("#opening").bind('ended', function(){
			self.replay = false;
		});
	}
	return this;
}
