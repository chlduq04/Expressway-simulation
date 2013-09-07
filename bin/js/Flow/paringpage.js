onmessage = function(event){
  var receiveData = event.data;
  postMessage(sendData)
}

function paringpage(){
	var self = this;
	var initPersent = 570;
	var marginPersent = 0;
	var switchPersent = true;
	var paring = true;
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
	this.paringReady = function( persent ){
		if( switchPersent ){
			if( persent > 97 ){
				$("#prepare1").css({ "margin-left" : "285px" });
				$("#prepare2").css({ "width" : "0px" });
				switchPersent = false;
				self.paringSuccess();
			}else{
				initPersent = Math.floor( 570 - persent * 5.7 );
				marginPersent = Math.floor( persent * 2.83 );
				$("#prepare1").css({ "margin-left" : marginPersent });
				$("#prepare2").css({ "width" : initPersent });
			}
		}
	}
	this.paringSuccess = function(){
		$("#paringmoney").css({ "display" : "block" })
		$("#paringinfo").css({ "display" : "block" })
		$("#paringnumber").css({ "display" : "block" })
		self.paringbutton();
	}
	this.paringbutton = function(){
		$("#paringpreparebutton").fadeOut(1000,function(){
			$("#paringstartbutton").fadeIn(1000,function(){
				$(this).click(function(){
					if(paring){
						$("#prepare1").fadeOut(500);
						$("#prepare2").fadeOut(500);
						$("#prepare3").fadeOut(500);
						$(this).fadeOut(500,function(){
							$(this).removeClass("paringstartbutton").addClass("paringsuccessbutton");
							$(this).fadeIn(500);
						});
						self.simulationSetting.defaults.paringSuccess();
						paring  = false;
					}else{
						$("#paringpage").fadeOut(500);
						self.simulationSetting.desearchMotion();
						self.simulationSetting.defaults.unparing();
						self.reset();
						$("#car0").mousedown();
						paring = true;
					}
				});
			});
		});
	}
	/*
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
	 */
}