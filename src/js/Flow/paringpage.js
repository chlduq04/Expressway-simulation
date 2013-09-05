function paringpage(){
	var self = this;
	this.count;
	this.click;
	this.paringbuttonSwitch;
	this.simulationSetting;
	this.init = function( traffic ){ 
		self.click = false;
		self.paringbuttonSwitch = false;
		self.simulationSetting = traffic
		$("#paringpage").hide();
	}
	this.paringClickSwitch = function(){
		self.paringbuttonSwitch = true;
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
				if( self.paringbuttonSwitch ){
					self.paringButton();
				}
			}
		});
	}
	this.paringButton = function(){
		$("#paringinfo-middle").click(function(){
			self.simulationSetting.defaults.paringSuccess();
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
			self.simulationSetting.desearchMotion();
			self.simulationSetting.defaults.unparing();
			self.reset();
			$("#car0").mousedown();
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