function Traffic(opt){
	this.time= -2000;
	this.paring = false;
	this.id = 0;
	this.link_id = 0;
	this.cars = [];
	this.sortCars;
	this.sortLinks;
	this.car_road;
	this.object_div; 
	this.car_image_right;
	this.leader_image_right;
	this.follower_image_right;
	this.car_image_left;
	this.leader_image_left;
	this.follower_image_left;
	this.testroad = [
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, -1,8,8,8,-1,8,2,8,1,8, 8,8,1,8,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0]
	                 ];
	this.go = true;
	this.click_car = null;
	this.pick_car = false;
	this.mode = "road";
	this.mode_change = false;
	this.cartaxi;
	this.player;
	this.outx = false;
	this.out = false;
	this.limit_distance = false;
	this.paring_button = false;
	this.defaults = {
			simulationSpeed : 30,
			simulationMaxCar : 200,
			simulationMaxSpeed : 0.02,
			drawCar3D : function(){},
			drawCarBack3D : function(){},
			deleteCar3D : function(){},
			camera3D : function(){},
			initCamera3D : function(){},
			render3D : function(){},
			drawPlayer : function(){},
			road3D : function(){},
			cameraEnding : function(){},
			paringButtonSwitch : function(){},
			paring : function(){},
			paringZoneRedArrowStart : function(){},
			paringZonePrepare : function(){},
			paringZonePrepareBar : function(){},
			paringSuccess : function(){},
			unparing : function(){},
			pixelLarge : 16,
			pixelSmall : 4,
			carSize : 48,
			lineSize : 604
	};
	$.extend(this.defaults, opt);
}

Traffic.prototype = {
		drawLoad : function(){
			$("#road")[0].className = "road-animation";
			this.car_road = $("#cars");
			var width = this.testroad.length;
			var height = this.testroad[0].length;
		},
		init : function(){
			this.resetCars();
			var speed = Math.random() * 1 + this.defaults.simulationMaxSpeed;
			var result = 38;
			this.newCars( result*this.defaults.pixelLarge, 560, 4, result*this.defaults.pixelLarge, 600, 0, 0, this.defaults.pixelLarge, false );
			this.cars[0].player = true;
			this.player = this.cars[0];

		},
		drawCars : function( object ){
			var car = $("#car"+object.id);
			if(car.length>0){
				var detail = car.children();
				if(this.paring){
					if( object.x > this.defaults.lineSize ){
						if(object.leader){/*85px 0px */
							car[0].className = "taxi-car-minus-paring";
								car.css({ 
									"left":object.realx, 
									"top":object.realy, 
									"transform":"rotate("+object.rotate+"deg)" });
						}else if(object.player){
							car.css({ "left":object.realx, "top":object.realy-500, "transform":"rotate("+object.rotate+"deg)"});
						}else{
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
							if(car.css("display") != "none"){
								car.css({"opacity": car.css("opacity") - 0.05})
								if(car.css("opacity") < 0.1){
									car.css({"display":"none"});
								}
							}
						}
					}else{
						if(object.leader){
							car[0].className = "taxi-car-plus-paring";
							car.css({ 
								"left":object.realx, 
								"top":object.realy,
								"transform":"rotate("+object.rotate+"deg)" });
						}else if(object.player){
							car.css({ "left":object.realx, "top":object.realy-500, "transform":"rotate("+object.rotate+"deg)" });
						}else{
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
							if(car.css("display") != "none"){
								car.css({"opacity": car.css("opacity") - 0.05})
								if(car.css("opacity") < 0.1){
									car.css({"display":"none"});
								}
							}
						}
					}
					object.reality_car += object.reality_error;
					if( object.reality_car > 4 || object.reality_car < -4 ){
						object.reality_error = -object.reality_error;
					}
					this.defaults.paringZonePrepare( object.reality_error );
					if( this.defaults.paringZonePrepareBar(0.4) == 100 ){
						this.defaults.paringButtonSwitch();
					}
				}else{
					if( object.x > this.defaults.lineSize ){
						if(object.leader){
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
						}else if(object.player){
							car.css({ "left":object.realx, "top":object.realy-500, "transform":"rotate("+object.rotate+"deg)"});
						}else{
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
						}
					}else{
						if(object.leader){
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
						}else if(object.player){
							car.css({ "left":object.realx, "top":object.realy-500, "transform":"rotate("+object.rotate+"deg)" });
						}else{
							car.css({ "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
						}
					}
				}

				if(object.leader){
					var length = Math.floor(this.player.realy - object.realy);
					var text = "";	
					if(object.id<10){
						text += "<div class='car-id'>0"+object.id+"</div>"
					}else{
						var id = object.id%100;
						text += "<div class='car-id'>"+id+"</div>"
					}
					text += "<div class='car-front'>"+length+"m</div>";
					detail.css({
						"z-index" : "15"
					});
					detail.html(text);
					car.append(detail);
					if(this.cartaxi!=null && object.id == this.cartaxi.id){
						detail.css({"display":"block"})
					}
				}
			}else{
				car = $("<div id='car"+object.id+"'></div>")
				var detail =  $("<div id='car"+object.id+"-over'></div>");
				if( object.x > this.defaults.lineSize ){
					if(object.player){
						car[0].className = "player-car-minus";
						car.css({ 
							"height":580, 
							"left":object.realx,
							"top":object.realy-500,
							"transform":"rotate("+object.rotate+"deg)"});
					}else{
						car[0].className = "normal-car-minus";
						car.css({ 
							"height":"78px",
							"left":object.realx, 
							"top":object.realy, 
							"transform":"rotate("+object.rotate+"deg)"
						});
					}
				}
				else{
					if(object.player){
						car[0].className = "normal-car-minus";
						car.css({ 
							"left":object.realx, 
							"top":object.realy, 
							"transform":"rotate("+object.rotate+"deg)" });
					}else{
						car[0].className = "normal-car-plus";
						car.css({ 
							"left":object.realx, 
							"top":object.realy, 
							"transform":"rotate("+object.rotate+"deg)" });
					}
				}
				if(object.leader){
					detail[0].className = "car-detail-info";
					var length = Math.floor(this.player.realy - object.realy);
					var text = "";	
					if(object.id<10){
						text += "<div class='car-id'>0"+object.id+"</div>"
					}else{
						var id = object.id%100;
						text += "<div class='car-id'>"+id+"</div>"
					}
					text += "<div class='car-front'>"+length+"m</div>";
					detail.html(text);
					car.append(detail);
					car.mousedown(function(){
						var target = this.children[0];
						if($(target).css("display") == "none"){
							$(target).fadeIn(900);
						}else{
							$(target).fadeOut(400);
						}
						$(".ds-target").val(object.id);	
						$(".ds-unlink-target").val(object.id);	
						$(".ds-speed-value").val( Math.abs(Math.round(object.speedx*10))+"km" );
					});
					car.mouseout(function(){
						var target = this.children[0];
						$(target).fadeOut(400);
					});
				}
				if(object.player){
					detail[0].className = "player-search-round-end";
					car.append(detail);
					car.mousedown(function(){
						var target = this.children[0];
						var nowWH = 60;
						var nowL = 9;
						var nowT = 11;
						var limit = 140;
						if(target.className == "player-search-round-end" || target.className == "player-search-round" ){
							target.className = "player-search-round-start";
						}else{
							target.className = "player-search-round-end";
						}
						$(".ds-target").val(object.id);	
						$(".ds-unlink-target").val(object.id);	
						$(".ds-speed-value").val( Math.abs(Math.round(object.speedx*10))+"km" );
					});
				}
				this.car_road.append(car);
			}

			if(object.player){
				this.defaults.drawPlayer( { x : object.x - 650, y : 0, z : ( object.y - 320 ) * 3 }, object.id, "follower", object.rotate, object.reality_error );
			}else{
				if( object.x < this.defaults.lineSize ){
					if(object.leader){
						this.defaults.drawCar3D( { x : object.x - 632 + object.reality_car, y : 0, z : (object.y - 320) * 8 }, object.id, "leader", object.rotate );
					}else if( object.front != null ){
						this.defaults.drawCar3D( { x : object.x - 632 + object.reality_car, y : 0, z : ( object.y - 320 ) * 8 }, object.id, "follower", object.rotate );
					}else{
						this.defaults.drawCar3D( { x : object.x - 632 + object.reality_car, y : 0, z : ( object.y - 320 ) * 8 }, object.id, "normal", object.rotate );
					}
				}else{
					if(object.leader){
						this.defaults.drawCarBack3D( { x : object.x - 650 + object.reality_car, y : 0, z : ( object.y - 320 ) * 3 }, object.id, "leader", object.rotate );
					}else if( object.front != null ){
						this.defaults.drawCarBack3D( { x : object.x - 650 + object.reality_car, y : 0, z : ( object.y - 320 ) * 3 }, object.id, "follower", object.rotate );
					}else{
						this.defaults.drawCarBack3D( { x : object.x - 650 + object.reality_car, y : 0, z : ( object.y - 320 ) * 3 }, object.id, "normal", object.rotate );
					}
				}

			}
		},

		resetCars : function(){
			this.car_road.children().remove();
		},
		newCars : function( x,y,limit_speed,goalx,goaly,speedx,speedy,radius,leader ){
			var car = new Car( this.id++, x, y, limit_speed, goalx, goaly, speedx, speedy, radius, null, null, leader )
			this.cars.push( car );
			return car;
		},
		addLink : function( id, object ){
			var car = this.cars;
			var length = car.length;
			for(var i=0;i<length;i++){
				if(car[i].id = id){
					car[i].addMember(object,0);
					break;
				}
			}
		},
		addLinkById : function( id, nextid ){
			var car = this.cars;
			var length = car.length;
			var leader = null;
			var follower = null;
			for(var i=0;i<length;i++){
				if(leader == null && car[i].id == id){
					leader = car[i];
				}
				if(follower == null && car[i].id == nextid){
					follower = car[i];
				}
				if( leader != null && follower != null){
					break;
				}
			}
			leader.addMember(follower);
		},
		searchLink : function( id ){
			var car;
			var checki;
			for( var i=0 ; i < this.cars.length ; i++ ){
				if( this.cars[i].id == id ){
					car = this.cars[i];
					checki = i;
					break;
				}
			}

			if( car.speedy > 0 ){
				var limit = checki + max_car/5;
				if( limit >= this.cars.length ){
					limit = this.cars.length;
				}
				for( var i = checki ; i < limit ; i++ ){
					if( this.cars[i].leader && this.cars[i].speedy > 0 ){
						this.cars[i].addMember(car);
						break;
					}
				}
			}else{
				var limit = checki - max_car/5;
				if( limit < 0 ){
					limit = 0;
				}
				for( var i = checki ; i > limit ; i-- ){
					if( this.cars[i].leader && this.cars[i].speedy < 0 ){
						this.cars[i].addMember(car);
						break;
					}
				}
			}

		},
		searchMotion : function(){
			this.paring = true;
		},
		desearchMotion : function(){
			this.paring = false;
			this.player.unsignedMember();
			this.cartaxi.speedy = this.cartaxi.speed_origin_y;
			this.cartaxi.back = null;
			this.out = true;
		},
		moveBackground : function(){
			this.time+=4;
			if(this.outx){
				this.player.realx += 3;
				this.player.x += 3;
			}
			if(this.time >= -134){
				if(this.outx){
					$("#road")[0].className = "road-animation";
					this.outx = false;
				}
				if(this.out){
					this.time = -900;
					$("#road")[0].className = "road-out-animation";
					this.defaults.road3D(true);
					this.outx = true;
				}else{
					this.time = -2000;
				}
				this.out = false;
			}
		},
		unlink : function( id ){
			var car;
			for( var i=0 ; i < this.cars.length ; i++ ){
				if( this.cars[i].id == id ){
					car = this.cars[i];
					break;
				}
			}
			this.click_car = null;
			car.unsignedMember();
		},
		deleteCars : function( id ){
			if( this.click_car != null && this.click_car.id == this.cars[id].id){
				this.click_car = null;
			}
			if( this.cars[id].x < this.defaults.lineSize ){
				this.defaults.deleteCar3D( this.cars[id].id, true );
			}else{
				this.defaults.deleteCar3D( this.cars[id].id, false );
			}
			$("#car"+this.cars[id].id).remove();
			this.cars[id].unsignedMember();
			delete this.cars[id];
		},
		initCars : function(){
			for( var i=0 ; i < this.cars.length ; i++ ){
				if(this.cars[i] == undefined){
					this.cars.splice( i, 1 );
					i--;
				}
			}
		},
		popCars : function(){
			this.cars.pop();
			return this.cars.length;
		},
		moveCars : function(time){
			this.moveBackground();
			
			this.go = false;
			var length = this.cars.length;
			var goal = [];
			var linkGoal = [];
			var goalNum;
			var	goalLinkNum;
			var plus_speed = [];
			var minus_speed = [];
			this.cars.sort(function(a,b){return a.y-b.y});
			if( this.mode == "road" ){
				for( var i = 0 ; i < length ; i++ ){
					if( this.cars[i].speedy > 0 ){
						plus_speed.push( this.cars[i] );
					}else if( this.cars[i].speedy < 0 ){
						minus_speed.push( this.cars[i] );
					}else{
						plus_speed.push( this.cars[i] );
						minus_speed.push( this.cars[i] );
					}
				}
				for( var i = 0 ; i < length ; i++ ){
					var car = this.cars[i];
					var x = Math.floor( car.x / car.radius );
					var y = Math.floor( car.y / car.radius );
					if(!car.finish()){
						this.go = true;
						if( car.speedy > 0 ){
							var limit = plus_speed.length;
							var me = plus_speed.indexOf(car);
							var right = me + 10;
							var left = me - 10;
							if(right >= limit){
								right = limit;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationPlusSpeedx( plus_speed.slice( me+1, right ), plus_speed.slice( left, me ), this.testroad[y][x-4], this.testroad[y][x+4] );
						}
						else if( car.speedy < 0 ){
							var limit = minus_speed.length;
							var me = minus_speed.indexOf(car);
							var right = me + 10;
							var left = me - 10;
							if(right >= limit){
								right = length;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationMinusSpeedx( minus_speed.slice( left, me ), minus_speed.slice( me+1, right ), this.testroad[y][x-4], this.testroad[y][x+4] );
						}else{
							if(!car.player){
								var limit = minus_speed.length;
								var me = minus_speed.indexOf(car);
								var right = me + 10;
								var left = me - 10;
								if(right >= limit){
									right = length;
								}
								if(left < 0){
									left = 0;
								}
								car.navigationMinusSpeedx( minus_speed.slice( left, me ), minus_speed.slice( me+1, right ), this.testroad[y][x-4], this.testroad[y][x+4] );
							}
						}
					}else{
						goal.push(i);
					}
					this.drawCars( car );
				}
				if(this.pick_car){
					this.pickCars();
				}
			}

			this.simulation();
			goalNum = goal.length;
			if( this.limit_distance &&  this.cartaxi.y < 490 ){
				this.searchLink(0);

				tutorials.tutorialNext();
				this.defaults.paring();
				this.defaults.paringZoneRedArrowStart();
				this.limit_distance = false;
			}
			if(goalNum > 0){
				for( var i = 0 ; i < goalNum ; i++ ){
					this.deleteCars( goal[i] );
				}
				goal = [];
				this.initCars();
				length = this.cars.length;
			}
			this.defaults.render3D();
			return this.go;
		},
		driveCars : function( move, speed ){
			switch(move){
			case "":
				break;
			}
		},
		pickCars : function(){
			if( this.click_car != null && this.click_car != undefined ){
				var x;
				var y;
				var z;
				if( this.click_car.x < this.defaults.lineSize ){
					x = this.click_car.x - 620 ;
					y = 14 ;
					z = this.click_car.y - 320;
				}else{
					x = this.click_car.x - 640 ;
					y = 14;
					z = this.click_car.y - 320;
				}
				var look = z + this.click_car.speedy;
				var lookat = { x : x, y : y, z : look };
			}else{
				this.defaults.initCamera3D();
				this.pick_car = false;
				this.pick_car_speed = 0;
			}
		},
		startCar : function( startposition, result, leader ){
			if(this.cars.length < max_car){
				var speed = Math.random() * 1 + this.defaults.simulationMaxSpeed;
				if( startposition == "top" ){
					if(leader){
						this.newCars( result*this.defaults.pixelLarge, 1, this.defaults.simulationMaxSpeed*3, result*this.defaults.pixelLarge, 720, 0, this.defaults.simulationMaxSpeed+3, this.defaults.pixelLarge, true );
					}else{
						this.newCars( result*this.defaults.pixelLarge, 1, this.defaults.simulationMaxSpeed*3, result*this.defaults.pixelLarge, 720, 0, this.defaults.simulationMaxSpeed, this.defaults.pixelLarge, false );
					}
				}else{
					if(leader){
						this.newCars( result*this.defaults.pixelLarge, 720, this.defaults.simulationMaxSpeed*3, result*this.defaults.pixelLarge, 1, 0, -this.defaults.simulationMaxSpeed, this.defaults.pixelLarge, true );
					}else{
						this.newCars( result*this.defaults.pixelLarge, 720, this.defaults.simulationMaxSpeed*3, result*this.defaults.pixelLarge, 1, 0, -this.defaults.simulationMaxSpeed, this.defaults.pixelLarge, false );
					}
				}
			}
		},
		startparing : function( result ){
			var speed = this.defaults.simulationMaxSpeed + 1;
			var result = 42;
			this.cartaxi = this.newCars( result*this.defaults.pixelLarge, 720, this.defaults.simulationMaxSpeed*30, result*this.defaults.pixelLarge, 1, 0, -speed, this.defaults.pixelLarge, true );
			this.limit_distance = true;
		},
		simulation : function(){
			if( this.mode == "road" ){
				if( this.id > 5000 ){
					if(this.cars.length < 10){
						for( var i=1 ; i < 9 ; i++ ){
							this.deleteCars(i);
						}
						this.initCars();
						this.id = 1;
						var speed = Math.random() * 1 + this.defaults.simulationMaxSpeed;
						var result = Math.floor(Math.random() * 3) + 22;
						this.newCars( result*this.defaults.pixelLarge, 0, 4, result*10, 720, 0, speed, this.defaults.pixelLarge, false );
					}
				}else{
					if(this.cars.length < max_car){
						var check = Math.floor(Math.random()*300);
						if(check > 290){
							var checkstart = false;
							var cars_length = this.cars.length;
							for(var i=0;i<cars_length;i++){
								if( this.cars[i].y - 1 < this.defaults.pixelLarge * 2 ){
									checkstart = true;
									break;
								}
							}
							if(!checkstart){
								if(check > 298.5){
									var result;
									if(Math.random() > 0.5){
										result = 30;
									}else{
										result = 34;
									}
									this.newCars( result*this.defaults.pixelLarge, 1, this.defaults.simulationMaxSpeed*2, result*this.defaults.pixelLarge, 720, 0, this.defaults.simulationMaxSpeed+4, this.defaults.pixelLarge, true );
								}else{
									var speed = Math.random() * 1 + this.defaults.simulationMaxSpeed + 5;
									if(Math.random() > 0.5){
										result = 30;
									}else{
										result = 34;
									}
									this.newCars( result*this.defaults.pixelLarge, 1, this.defaults.simulationMaxSpeed*4, result*this.defaults.pixelLarge, 720, 0, speed, this.defaults.pixelLarge, false );
								}								
							}
						}else if(check < 3){
							var checkstart = false;
							var cars_length = this.cars.length;
							for(var i=0;i<cars_length;i++){
								if( 720 - this.cars[i].y < this.defaults.pixelLarge * 2 ){
									checkstart = true;
									break;
								}
							}
							if(!checkstart){
								var speed = Math.random() + this.defaults.simulationMaxSpeed + 1;
								var result;
								if(Math.random() > 0.5){
									result = 38;
								}else{
									result = 42;
								}							
								this.newCars( result*this.defaults.pixelLarge, 720, this.defaults.simulationMaxSpeed*30, result*this.defaults.pixelLarge, 1, 0, -speed, this.defaults.pixelLarge, false );
							}
						}
					}
				}
			}

		}
}

