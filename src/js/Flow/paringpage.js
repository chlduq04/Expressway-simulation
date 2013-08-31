function paring(){
	var self = this;
	this.count;
	this.click;
	this.simulation_setting;
	this.init = function(traffic){ 
		self.click = false;
		self.simulation_setting = traffic
		$("#paringpage").hide();
	}
	this.paringStart = function(){
		$("#paringpage").fadeIn(500);
		
	}
	this.paringLightOff = function(){
		$("#pm-first").fadeOut(800,function(){
			if(!self.click){
				self.paringLightOn();
			}
		});
	}
	this.paringLightOn = function(){
		$("#pm-first").fadeIn(800,function(){
			if(!self.click){
				self.paringLightOff();
				if( self.simulation_setting.paring_button ){
					self.paringButton();
				}
			}
		});
	}
	this.paringButton = function(){
		$("#paringinfo-middle").click(function(){
			setTimeout(function(){
				
			});
			self.paringSuccess();
		})
		self.click = true;
	}
	this.paringSuccess = function(){
		self.click = true;
		$("#pm-first").hide();
		$("#paringinfo-middle").css({
			"background":"url('./image/navigation/navigation-paring-alert-unparing.png')",
			"background-position":"-278px 32px",
			"background-repeat": "no-repeat"
		});
		$("#paringinfo-middle").click(function(){
			$("#paringinfo-middle").css({
				"background-position":"22px 32px"
			});
			$("#paringpage").hide();
			self.simulation_setting.desearchMotion();
			self.reset();
			$("#car0-over").css({"display":"none"});
		});
		$("#pr-second").hide();
		$("#pl-second").hide();
		$("#pr-first").css({
			"background":"url('./image/navigation/navigation-paring-alert-success.png')",
			"background-repeat": "no-repeat",
			"background-position": "70px 35px"
		});
	}
	this.reset = function(){
		var a = $("#paringpage");
		while( a.length > 0 ){
			a.removeAttr("style");
			a = a.children();
		}
		self.init();
	}
}