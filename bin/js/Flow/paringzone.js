function paringzone(){
	var self = this;
	this.paringSuccess = false;
	this.redArrowLeft = 5;
	this.redArrowLeftToken = false;
	this.redArrowLeftSpeed = 0;
	this.redArrowRight = 5;
	this.redArrowRightToken = false;
	this.redArrowRightSpeed = 0;
	this.init = function(){ 

	}
	this.startParing = function(){
		$(".ui-center").fadeIn(1000,function(){
			self.paringRedArrowRight();
			self.paringRedArrowLeft();
		})
	}
	this.paringRedArrowRightSpeed = function(value){
		self.redArrowRightSpeed += value;
	}
	this.paringRedArrowLeftSpeed  = function(value){
		self.redArrowLeftSpeed += value;
	}
	this.paringRedArrowRight = function(){
		setTimeout(function(){
			if( !self.paringSuccess ){
				self.redArrowRight += self.redArrowRightSpeed;
				$(".ucr-2").css({"margin-right":self.redArrowRight+"px"});
				self.paringRedArrowRight();
			}
		},100);
	}
	this.paringRedArrowLeft = function(){
		setTimeout(function(){
			if( !self.paringSuccess ){
				self.redArrowLeft += self.redArrowLeftSpeed;
				$(".ucr-1").css({"margin-left":self.redArrowRight+"px"});
				self.paringRedArrowLeft();
			}
		},100);
	}
}