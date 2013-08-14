function navigation(){
	var self = this;
	this.slide = 125;
	this.navigationInit = function(){
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
				self.slide--;
				self.clickSlideUp();            
			}else{
				$("#bnc-1").fadeIn(900);
				$("#bnc-2").fadeIn(900);
				$("#bnc-3").fadeIn(900);
				$("#bnc-4").fadeIn(900);
				$("#bnc-5").fadeIn(900);
				$("#bnc-6").fadeIn(900);
				$("#bnc-7").fadeIn(900);
				$("#bnc-8").fadeIn(900);
			}                      
		}, 0.5)
	}
	this.paring = function(){
		$("#bnc-2").click(function(){
			$(this).css({"background-position" : "8px 30px"})
		})
	}
	this.navigationBottomSlideDown = function(){
		$("#bnc-1").fadeOut(100);
		$("#bnc-2").fadeOut(100);
		$("#bnc-3").fadeOut(100);
		$("#bnc-4").fadeOut(100);
		$("#bnc-5").fadeOut(100);
		$("#bnc-6").fadeOut(100);
		$("#bnc-7").fadeOut(100);
		$("#bnc-8").fadeOut(100);
		self.clickSlideDown();
	}
	this.navigationBottomButtonClickUp = function(){
		$("#bnc1-button").click(function(){
			self.navigationBottomSlideDown();
		});	
	}

	this.clickSlideDown = function(){
		setTimeout(function () {    
			if ( self.slide < 126 ) { 
				$("#bottom-navigation-clicked").css({
					"background-position" : "0 "+self.slide+"px"
				});
				self.slide++;
				self.clickSlideDown();            
			}else{
				$("#bottom-navigation").show();
			}                      
		}, 0.5)
	}
	return this;
}
