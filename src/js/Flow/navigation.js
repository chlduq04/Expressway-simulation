function navigation(){
	var self = this;
	this.slide = 120;
	this.pare = new paring();
	this.simulation_setting;
	this.slideSpeed = 0;
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
		setTimeout(function () {    
			if ( self.slide > 0 ) { 
				$("#bottom-navigation-clicked").css({
					"background-position" : "0 "+self.slide+"px"
				});
				self.slide-=self.slideSpeed;
				self.slideSpeed += 0.1;
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
				self.slideSpeed = 0;
			}                      
		}, 0.5)
	}
	this.paring = function(){
		$("#bnc-2").click(function(){
			$(this).fadeOut(100,function(){
				$(this).css({"background-position" : "8px 30px"})
				$(this).fadeIn(800,function(){
					self.navigationBottomSlideDown();
					self.simulation_setting.searchMotion();
					self.simulation_setting.startparing(42);
					$("#car0-over").css({"display":"block"});
					setTimeout( function(){
						self.pare.paringStart();
						self.pare.paringLightOff();
					},5000 );
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
		setTimeout(function () {    
			if ( self.slide-4 <= 120 ) { 
				$("#bottom-navigation-clicked").css({
					"background-position" : "0 "+self.slide+"px"
				});
				self.slide+=self.slideSpeed;
				self.slideSpeed += 0.04;
				self.clickSlideDown();            
			}else{
				setTimeout(function(){
					$("#bottom-navigation").show();
				},200)
				self.slideSpeed = 0;
			}                      
		}, 0.5)
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
	
	return this;
}
