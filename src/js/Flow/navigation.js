function navigation(){
	var self = this;
	this.slide = 120;
	this.paringPage;
	this.simulation_setting;
	this.slideSpeed = 0;
	this.init = function( simul ){
		self.paringPage = new paringpage();
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
		self.paringPage.init(simul);
	}
	
	this.navigationBottomButtonClick = function(){
		$("#bn-button").click(function(){
			$("#bn-button").css({
				"background" : "url('./image/navigation/navigation-bottom-button.png')",
				"background-position" : "0 0",
				"background-repeat" : "no-repeat"
			});
			setTimeout(function(){
				$("#bottom-navigation").hide();
				self.navigationBottomSlideUp();
			},200)
		});
	}
	
	this.navigationBottomFirstUp = function(){

	}

	this.navigationBottomSlideUp = function(){
		$("#bottom-navigation-clicked").show();
		self.clickSlideUp();
		$("#bn-button").css({
			"background-position" : "-50px 0",
		});
	}
	
	this.clickSlideUp = function(){
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-up";
		$("#bnc-1").fadeIn(1000);
		$("#bnc-2").fadeIn(1000);
		$("#bnc-3").fadeIn(1000);
		$("#bnc-4").fadeIn(1000);
		$("#bnc-5").fadeIn(1000);
		$("#bnc-6").fadeIn(1000);
		$("#bnc-7").fadeIn(1000);
		$("#bnc-8").fadeIn(1000,function(){
			tutorials.tutorialNext();
		});
	}

	this.paring = function(){
		$("#bnc-2").click(function(){
			$(this).fadeOut(100,function(){
				$(this).css({"background-position" : "8px 30px"})
				$(this).fadeIn(800,function(){
					self.navigationBottomSlideDown();
					self.simulation_setting.searchMotion();
					self.simulation_setting.startparing(42);
					$("#car0").mousedown();
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
			$("#bnc1-button").css({
				"background-position" : "-1px -2px",
				"background-repeat" : "no-repeat"
			});
			setTimeout(function(){
				self.navigationBottomSlideDown();
				$("#bnc1-button").css({
					"background-position" : "-51px -2px",
					"background-repeat" : "no-repeat"
				});
			},200);
		});	
	}

	this.clickSlideDown = function(){
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-down";
		setTimeout(function(){
			$("#bottom-navigation").show();
		},500);
	}
	
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




	/*** Paring Page Setting Function ***/

	this.CParingClickSwitch = function(){
		self.paringPage.paringClickSwitch();
	}
	this.CParingStartMsg = function(){
		self.paringPage.paringStart();
		self.paringPage.paringLightOff();
	}

	return this;
}
