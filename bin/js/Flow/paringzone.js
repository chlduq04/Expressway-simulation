function paringzone(){
	var self = this;
	var paringSuccess = false;
	var redArrowLeft = 5;
	var redArrowLeftToken = false;
	var redArrowLeftSpeed = 0.5;
	var redArrowLeftMax = 120;
	var redArrowRight = 5;
	var redArrowRightToken = false;
	var redArrowRightSpeed = 0.5;
	var redArrowRightMax = 90;

	var ArrowMove = 70;
	var paringBar = 70;
	var minimumParingBar = 70;
	var maximumParingBar = 555;
	var textParingBar = 485;

	var paring = false;
	var prepareParing = true;
	var rotate = 0;

	var speedValue = 70;
	var initSpeed = 41;
	var leftSpeed = 0;
	var limitSpeed = 140;
	var nowSpeed = 2;

	var hpaValue = 55;
	var initHpa = 130;
	var limitHpa = 150;
	var nowHpa = 2;
	
	var successParing = false;
	
	this.init = function(){ 

	}

	/*** Prepare Paring Car ***/

	this.startParing = function(){
		$("#ui-center").fadeIn(8000,function(){
			paring = true;
		})
	}
	this.paringRedArrowRightSpeed = function(value){
		redArrowRightSpeed += value;
	}
	this.paringRedArrowLeftSpeed  = function(value){
		redArrowLeftSpeed += value;
	}
	
	this.paringRedArrowRight = function(){
		if(paring){
			if( redArrowRight < redArrowRightMax ){
				redArrowRight += redArrowRightSpeed;
				$("#ucr-2").css({"margin-right":redArrowRight+"px"});
			}
		}
	}
	this.paringRedArrowLeft = function(){
		if(paring){
			if( redArrowLeft < redArrowLeftMax ){
				redArrowLeft += redArrowLeftSpeed;
				$("#ucr-1").css({"margin-left":redArrowLeft+"px"});
			}
		}
	}
	this.prepareParing = function( value ){
		if(paring){
			if(value != null){
				ArrowMove += value;
				rotate = ArrowMove/2 - 23;
			}
			$('#ui-center-red').css({"margin-left":ArrowMove+"px"});
			$("#ui-bar-center-point").css({ "transform":"rotate("+rotate+"deg)" });
		}
	}
	this.prepareParingBar = function( value ){
		if(paring){
			if( paringBar + value > minimumParingBar && paringBar + value < maximumParingBar ){
				paringBar += value;
				$('#ui-center-prepare').css({"width":paringBar+"px"});
			}
		}
	}
	this.prepareParingText = function(){
		if( prepareParing && paring ){
			var text = Math.floor( paringBar / maximumParingBar * 100 );
			if( text > 98 ){
				text = 100;
				prepareParing = false;
			}
			$('#ui-bar-center-persent').html(text+"%");
			return text;
		}
	}
	this.endPreparePage = function(){
		paring = false;
	}
	
	/*** Now Paring ***/

	this.paringUI = function(){
		$("#ui-center").addClass("prepareParingSuccess");
		$("#ui-center-prepare").css({ "display":"none" });
		$("#ui-bar-center-point").css({"display" : "block"});
		$("#ui-bar-center-persent").css({"display":"none"});
		$("#ui-bar-left-range").css({"display":"block"});
		$("#ui-bar-left-persent").css({"display":"block"});
		$("#ui-bar-right-range").css({"display":"block"});
		$("#ui-bar-right-persent").css({"display":"block"});
		self.paringPersentSpd();
		self.paringPersentHpa();
		setTimeout(function(){
			self.unparingAlert();
		},20000);
	}
	this.paringPersentSpd = function(){
		if( nowSpeed + initSpeed < limitSpeed && nowSpeed + initSpeed > 0 ){
			initSpeed += nowSpeed;
			leftSpeed -= nowSpeed;
			if( initSpeed > 80 ){
				nowSpeed = -nowSpeed;
				nowHpa = -nowHpa;
			}
			if( initSpeed < 40 ){
				nowSpeed = -nowSpeed;
				nowHpa = -nowHpa;
			}
			$("#ui-bar-left-persent").css({
				"margin-left" : initSpeed,
				"background-position-x" : leftSpeed
			});
			speedValue -= nowSpeed;
			$("#ui-bar-left-range").html( speedValue );
		}
		setTimeout(function(){
			if(!successParing){
				self.paringPersentSpd();
			}
		},1000);
	}
	this.paringPersentHpa = function(){
		if( nowHpa + initHpa < limitHpa && nowHpa + initHpa > 0 ){
			initHpa += nowHpa;
			$("#ui-bar-right-persent").css({
				"width" : initHpa
			});
			hpaValue += nowHpa;
			$("#ui-bar-right-range").html( hpaValue );
		}
		setTimeout(function(){
			if(!successParing){
				self.paringPersentHpa();
			}
		},1000);
	}

	
	
	/*** Prepare Unparing Car ***/

	this.unparing = function(){
		successParing = true;
		$("#ui-center").css({ "display" : "none" });
	}
	this.unparingAlert = function(){
		$("#ui-center-bar").addClass("successParingSuccess");
	}

}