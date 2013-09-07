function tutorial(){
	var self = this;
	this.fadein = 1000;
	this.fadeout = 1000;
	this.timeout = 3000;
	this.tutorial_count = 1;
	this.tutorial_start = false;
	this.div_3d = $(".tutorial_3d");
	this.div_navi = $(".startpage");
	this.init = function(){
		self.div_3d.click(function(){
			self.tutorialNext();
		});
		self.tutorialNext();
	}
	this.tutorialNext = function(){
		if(self.tutorial_start){
			switch(self.tutorial_count){
			case 1:
				self.tutorial1();
				break;
			case 2:
				self.tutorial2();
				break;
			case 3:
				self.tutorial3();
				break;
			case 4:
				self.tutorial4();
				break;
			case 5:
				self.tutorial5();
				break;
			case 6:
				self.tutorial6();
				break;
			case 7:
				self.tutorial7();
				break;
			case 8:
				self.tutorial8();
				break;
			case 9:
				self.tutorial9();
				break;
			case 10:
				self.tutorial10();
				break;
			case 11:
				self.tutorial11();
				break;
			case 12:
				self.tutorial12();
				break;
			case 13:
				self.tutorial13();
				break;
			case 14:
				self.tutorial14();
				break;
			case 15:
				self.tutorial15();
				break;
			case 16:
				self.tutorial16();
				break;
			case 17:
				self.tutorial17();
				break;
			}
		}
	}
	this.tutorial1 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/1.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.tutorial_count = 2;
	}

	this.tutorial2 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/2.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_3d.fadeIn( self.fadein, function(){
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.timeout);
		} );
		self.tutorial_count = 3;
	}

	this.tutorial3 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/3.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_3d.fadeIn( self.fadein, function(){
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.timeout);
		} );
		self.tutorial_count = 4;
	}

	this.tutorial4 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/4.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_3d.fadeIn( self.fadein, function(){
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.timeout);
		} );
		self.tutorial_count = 5;
	}

	this.tutorial5 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/5.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_3d.fadeIn( self.fadein, function(){
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.timeout);
		} );
		self.tutorial_count = 6;
	}

	this.tutorial6 = function(){
		self.div_3d.css({
			"background": "url('./image/tutorial/6.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_3d.fadeIn( self.fadein, function(){
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.timeout);
		} );
		self.tutorial_count = 7;
	}

	this.tutorial7 = function(){
		self.div_3d.fadeOut( self.fadeout, function(){
			self.div_navi.children().remove();
			self.div_navi.css({
				"position":"absolute",
				"z-index":"50",
				"background": "url('./image/tutorial/7.png')",
				"background-position": "center",
				"background-repeat": "no-repeat",
				"background-size":"cover"
			});
			self.div_navi.fadeIn( self.fadein, function(){
				self.div_navi.fadeOut( self.fadeout );
			} );
		});
		self.tutorial_count = 8;
	}

	this.tutorial8 = function(){
		self.div_navi.css({
			"position":"absolute",
			"z-index":"50",
			"background": "url('./image/tutorial/8.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_navi.fadeIn( self.fadein, function(){
			self.div_navi.fadeOut( self.fadeout );
		} );
		self.tutorial_count = 9;
	}

	this.tutorial9 = function(){
		self.div_navi.css({
			"position":"absolute",
			"z-index":"50",
			"background": "url('./image/tutorial/9.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_navi.fadeIn( self.fadein, function(){
			self.div_navi.fadeOut( self.fadeout );
		} );
		self.tutorial_count = 10;
	}
	this.tutorial10 = function(){
		self.div_navi.css({
			"position":"absolute",
			"z-index":"50",
			"background": "url('./image/tutorial/10.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_navi.fadeIn( self.fadein, function(){
			self.div_navi.fadeOut( self.fadeout );
		} );
		self.tutorial_count = 11;
	}
	this.tutorial11 = function(){
		self.div_navi.css({
			"position":"absolute",
			"z-index":"50",
			"background": "url('./image/tutorial/11.png')",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size":"cover"
		});
		self.div_navi.fadeIn( self.fadein, function(){
			self.div_navi.fadeOut( self.fadeout );
		} );
		self.tutorial_count = 12;
	}
	this.tutorial12 = function(){

	}
	this.tutorial13 = function(){

	}
	this.tutorial14 = function(){

	}
	this.tutorial15 = function(){

	}
	this.tutorial16 = function(){

	}
	this.tutorial17 = function(){

	}
	this.tutorial18 = function(){

	}
}