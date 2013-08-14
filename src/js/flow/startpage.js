function startpage(){
	var self = this;
	this.click = false;
	this.navi;
	this.startpageInit = function(navigation){
		self.navi = navigation;
		$("#road").hide();
		self.startbuttonLightOff();
		self.replaybuttonLightOff();
		self.startbuttonClick();
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
			$("#sp-startbutton").css({
				"background": "url('./image/navigation/startpage_start.png')",
				"background-repeat": "no-repeat",
				"background-position": "-900px -1px"
			});
			$("#sp-startbutton-light").css({
				"background": "url('./image/navigation/startpage_start.png')",
				"background-repeat": "no-repeat",
				"background-position": "-900px -1px"
			});
			$("#startpage").fadeOut(500,function(){
				$("#road").fadeIn(500);
				self.navi.navigationInit();
			});
		});
	}
	this.replaybuttonLightOn = function(){
		$("#sp-replaybutton").fadeIn(800,function(){
			if(!self.click){
				self.replaybuttonLightOff();
			}
		});
	}
	this.replaybuttonLightOff = function(){
		$("#sp-replaybutton").fadeOut(800,function(){
			if(!self.click){
				self.replaybuttonLightOn();
			}
		});
	}
	return this;
}
