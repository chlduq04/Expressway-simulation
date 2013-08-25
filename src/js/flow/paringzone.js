function paringzone(){
	var self = this;
	var paringSuccess = false;
	var redArrowLeft = 5;
	var redArrowLeftToken = false;
	var redArrowRight = 5;
	var redArrowRightToken = false;
	this.init = function(){ 

	}
	this.startParing = function(){
		$(".ui-center").fadeIn(800,function(){
		})
	}
	this.paringRedArrowRight = function(value){
		setTimeout(function(){
			if( !self.paringSuccess ){
				if( !redArrowRightToken ){
					redArrowLeft = value;
					redArrowRightToken = true;
				}else{
					
				}
			}
		},2000);
	}
	this.paringRedArrowLeft = function(value){
		setTimeout(function(){
			if( !self.paringSuccess ){
				self.paringRedArrowRight();
			}
		},2000);
	}
}