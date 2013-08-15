function navigation(){
	var self = this;
	this.slide = 200;
	this.pare = new paring();
	this.simulation_setting;
	this.init = function(simul){
		self.simulation_setting = simul;
		$("#top-navigation").hide();
		$("#bottom-navigation-clicked").hide();
		$("#bnc-1").hide();
		$("#bnc-8").hide();
		$("#bnc-2").hide();
		$("#bnc-3").hide();
		$("#bnc-4").hide();
		$("#bnc-5").hide();
		$("#bnc-6").hide();
		$("#bnc-7").hide();
		self.navigationBottomButtonClick();
		self.navigationBottomButtonClickUp();
		self.paring();
		self.pare.init(simul);
		
	}
	this.navigationBottomButtonClick = function(){
		$("#bn-button").click(function(){
			$("#bn-button").css({
				"background" : "url('./image/navigation/navigation-bottom-button.png')",
				"background-position" : "0 0",
				"background-repeat" : "no-repeat"
			});
			$("#bottom-navigation").hide();
			self.navigationBottomSlideUp();
		});
	}
	this.navigationBottomSlideUp = function(){
		$("#bottom-navigation-clicked").show();
		self.clickSlideUp();
		$("#bn-button").css({
			"background-position" : "-50px 0",
		});
	}
	this.clickSlideUp = function(){
		setTimeout(function () {    
			if ( self.slide > 0 ) { 
				$("#bottom-navigation-clicked").css({
					"background-position" : "0 "+self.slide+"px"
				});
				self.slide-=4;
				self.clickSlideUp();            
			}else{
				$("#bnc-1").fadeIn(600);
				$("#bnc-2").fadeIn(600);
				$("#bnc-3").fadeIn(600);
				$("#bnc-4").fadeIn(600);
				$("#bnc-5").fadeIn(600);
				$("#bnc-6").fadeIn(600);
				$("#bnc-7").fadeIn(600);
				$("#bnc-8").fadeIn(600);
			}                      
		}, 0.5)
	}
	this.paring = function(){
		$("#bnc-2").click(function(){
			$(this).fadeOut(500,function(){
				$(this).css({"background-position" : "8px 30px"})
				$(this).fadeIn(800,function(){
					self.navigationBottomSlideDown();
					self.simulation_setting.searchMotion();
					self.simulation_setting.startparing(43);
					setTimeout( function(){
						self.pare.paringStart();
						self.pare.paringLightOff();
					},5000);
				});
			});
		})
	}
	this.navigationBottomSlideDown = function(){
		$("#bnc-1").fadeOut(50);
		$("#bnc-2").fadeOut(50);
		$("#bnc-3").fadeOut(50);
		$("#bnc-4").fadeOut(50);
		$("#bnc-5").fadeOut(50);
		$("#bnc-6").fadeOut(50);
		$("#bnc-7").fadeOut(50);
		$("#bnc-8").fadeOut(50);
		self.clickSlideDown();
	}
	this.navigationBottomButtonClickUp = function(){
		$("#bnc1-button").click(function(){
			self.navigationBottomSlideDown();
		});	
	}

	this.clickSlideDown = function(){
		setTimeout(function () {    
			if ( self.slide-4 <= 200 ) { 
				$("#bottom-navigation-clicked").css({
					"background-position" : "0 "+self.slide+"px"
				});
				self.slide+=4;
				self.clickSlideDown();            
			}else{
				$("#bottom-navigation").show();
			}                      
		}, 0.5)
	}
//	this.simulationStart = function(){
//		var max = $(".ds-maxcar").val();
//		var speed_car = $(".ds-limitspeed").val();
//		var speed_simulation = $(".ds-simulationspeed").val();
//		if(max.length>0){
//			max_car = parseInt(max);
//		}else{
//			max_car = 2;
//		}
//		if(speed_car.length>0){
//			max_speed = parseInt(speed_car);
//		}else{
//			max_speed = 500;
//		}
//		if(speed_simulation.length>0){
//			simulation_speed = parseInt(speed_simulation);
//		}else{
//			simulation_speed = 40;
//		}
//		self.simulation_reset();
//	}
//	this.simulation_reset  = function(){
//		simulation_start = false;
//		setTimeout(function () {
//			self.simulation();
//		},50);
//	}
//	this.simulation = function(){
//		simulation_start = true;
//		self.simulation_setting = new Traffic({
////			drawCar3D : gl.drawCar3D,
////			drawCarBack3D : gl.drawCarBack3D,
////			deleteCar3D : gl.deleteCar,
////			camera3D : gl.controlCamera,
////			initCamera3D : gl.initCamera,
////			render3D : gl.rendering,
////			drawPlayer : gl.drawCarPlayer3D
//		});
//		self.simulation_setting.drawLoad();
//		self.simulation_setting.init();
//		self.myLoop();
//	}
//	this.myLoop = function(){           
//		setTimeout(function () {    
//			if ( self.simulation_setting.moveCars()) { 
//				if( self.simulation_setting.cars.length != 0 && simulation_start ){
//					self.myLoop();            
//				}
//			}                      
//		}, simulation_speed)
//	}
	this.simulationKeySet = function(){
		/** Mouse click **/
		$(".dr-reflesh").click(function(){
			self.simulationStart();
		});


		$(".ds-searching").click(function(){
			self.simulation_setting.searchLink($(".ds-target").val());
		});
		$('.make-car1-blue').click(function(){
			self.simulation_setting.startCar( "top", 30, false );
		});
		$('.make-car1-red').click(function(){
			self.simulation_setting.startCar( "top", 30, true );
		});
		$('.make-car2-blue').click(function(){
			self.simulation_setting.startCar( "top", 34, false );
		});
		$('.make-car2-red').click(function(){
			self.simulation_setting.startCar( "top", 34, true );
		});
		$('.make-car3-blue').click(function(){
			self.simulation_setting.startCar( "bottom", 39, false );
		});
		$('.make-car3-red').click(function(){
			self.simulation_setting.startCar( "bottom", 39, true );
		});
		$('.make-car4-blue').click(function(){
			self.simulation_setting.startCar( "bottom", 43, false );
		});
		$('.make-car4-red').click(function(){
			self.simulation_setting.startCar( "top", 43, true );
		});
	}

	return this;
}
