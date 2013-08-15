function view3d(){
	var self = this;
	this.gl;
	this.init = function(sound){
		self.gl = $(".view_3d").WebGL();
		self.gl.init();
	}
	this.getGl = function(){
		return self.gl;
	}
}