
function Traffic(opt){
	this.time= -800;
	this.id = 0;
	this.link_id = 0;
	this.cars = [];
	this.sortCars;
	this.sortLinks;
	this.road;
	this.car_road;
	this.object_div; 
	this.car_image_right = new Image();
	this.leader_image_right = new Image();
	this.follower_image_right = new Image();

	this.car_image_left = new Image();
	this.leader_image_left = new Image();
	this.follower_image_left = new Image();
	this.testroad = [
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],

	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,9,3,8,8, 1,8,8,8,1,8,2,8,8,1, 8,8,8,1,8,3,9,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0]
	                 ];
	this.go = true;
	this.click_car = null;
	this.pick_car = false;
	this.pick_car_speed = 1.5;
	this.mode = "road";
	this.mode_change = false;
	this.defaults = {
			drawCar3D : function(){},
			drawCarBack3D : function(){},
			deleteCar3D : function(){},
			camera3D : function(){},
			initCamera3D : function(){},
			render3D : function(){},
			drawPlayer : function(){},
			pixelLarge : 16,
			pixelSmall : 4,
			carSize : 48,
			lineSize : 608
	};
	$.extend(this.defaults, opt);
}

Traffic.prototype = {
		drawLoad : function(){
			this.road = $("#road");
			this.car_road = $("#cars");
			var width = this.testroad.length;
			var height = this.testroad[0].length;
//			for( var i = 0 ; i < width ; i++ ){
//			for( var j = 0 ; j < height ; j++ ){
//			if( this.testroad[i][j] == 1 || this.testroad[i][j] == 8 ){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"gray", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}else if( this.testroad[i][j] == 2 ){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"yellow", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}else if( this.testroad[i][j] == 3 ){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"black", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}else if( this.testroad[i][j] == 4 ){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"gray", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}else if( this.testroad[i][j] == 0 ){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"green", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}else if( this.testroad[i][j] == 9){
//			var road = $("<div id='"+i+","+j+"'></div>")
//			road.css({ "position":"absolute", "background":"brown", "width":this.defaults.pixelLarge, "height":this.defaults.pixelLarge, "left":j*this.defaults.pixelLarge, "top":i*this.defaults.pixelLarge });
//			this.road.append(road);
//			}
//			}
//			}
		},
		init : function(){
			this.car_image_right.src = "./image/navigation/top-right-normal.png";
			this.leader_image_right.src = "./image/navigation/top-right-leader.png";
			this.follower_image_right.src = "./image/navigation/top-right-follower.png";
			this.car_image_left.src = "./image/navigation/top-left-normal.png";
			this.leader_image_left.src = "./image/navigation/top-left-leader.png";
			this.follower_image_left.src = "./image/navigation/top-left-follower.png";

			this.resetCars();
			var speed = Math.random() * 1 + max_speed;
			var result = 43;
			this.newCars( result*this.defaults.pixelLarge, 500, 4, result*this.defaults.pixelLarge, 550, 0, 0, this.defaults.pixelLarge, false );
			this.cars[0].player = true;
		},
		drawCars : function( object ){
			var car = $("#car"+object.id);
			if(car.length>0){
				var detail = car.children();
				var text = "<div class='car-id'>id : "+object.id+"</div>"
				if( object.x > this.defaults.lineSize ){
					if(object.leader){
						car.css({ "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else if(object.front!=null){
						car.css({ "background-image":"url('./image/navigation/top-top-follower.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)"});
					}else{
						car.css({ "background-image":"url('./image/navigation/top-top-normal.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}
				}else{
					if(object.leader){
						car.css({ "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else if(object.front!=null){
						car.css({ "background-image":"url('./image/navigation/top-bottom-follower.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else{
						car.css({ "background-image":"url('./image/navigation/top-bottom-normal.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}
				}
				var text;
				if(object.front == null){
					text += "<div class='car-front'>Link : N</div>";	
				}else{
					text += "<div class='car-front'>Link : Y</div>";
				}
				text += "<div class='car-speed'>"+Math.round(object.speedy*10)+"km </div>";
				detail.css({
					"z-index" : "15"
				});
				detail.html(text);
				car.append(detail);
			}else{
				car = $("<div id='car"+object.id+"'></div>")
				var detail =  $("<div id='car"+object.id+"-over'></div>");
				if( object.x > this.defaults.lineSize ){
					if(object.leader){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-top-leader.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else if(object.front!=null){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-top-follower.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else{
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-top-normal.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}
				}
				else{
					if(object.leader){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-bottom-leader.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else if(object.front!=null){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-bottom-follower.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}else{
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"10", "background-image":"url('./image/navigation/top-bottom-normal.png')", "width":this.defaults.carSize, "height":this.defaults.carSize, "left":object.realx, "top":object.realy, "transform":"rotate("+object.rotate+"deg)" });
					}
				}
				detail.css({
					"width": "370px",
					"height": "108px",
					"background": "url('./image/navigation/navigation-speed.png')",
					"background-position": "center",
					"background-repeat": "no-repeat",
					"position": "absolute",
					"left": "10px",
					"top": "-50px",
					"display":"none",
					"color": "white",
					"font-size":"12px",
					"z-index" : "15"
				});

				var text;
				if(object.front == null){
					text += "<div class='car-front'>Link : N</div>";	
				}else{
					text += "<div class='car-front'>Link : Y</div>";
				}
				text += "<div class='car-speed'>"+Math.round(object.speedy*10)+"km </div>";
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
				car.dblclick(function(){
//					simulation_setting.mode = "one";
					simulation_setting.pick_car_speed = object.speedy;
				});
				this.car_road.append(car);
			}

			if(object.player){
				this.defaults.drawPlayer( { x : object.x - 630, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "follower", 0 );
			}else{
				if( object.x < this.defaults.lineSize ){
					if(object.leader){
						this.defaults.drawCar3D( { x : object.x - 630, y : 0, z : (object.y - 320) * 1.8 }, object.id, "leader", 0 );
					}else if( object.front != null ){
						this.defaults.drawCar3D( { x : object.x - 630, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "follower", 0 );
					}else{
						this.defaults.drawCar3D( { x : object.x - 630, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "normal", 0 );
					}
				}else{
					if(object.leader){
						this.defaults.drawCarBack3D( { x : object.x - 640, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "leader", 0 );
					}else if( object.front != null ){
						this.defaults.drawCarBack3D( { x : object.x - 640, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "follower", 0 );
					}else{
						this.defaults.drawCarBack3D( { x : object.x - 640, y : 0, z : ( object.y - 320 ) * 1.8 }, object.id, "normal", 0 );
					}
				}

			}
		},

		resetCars : function(){
			this.car_road.children().remove();
		},
		newCars : function( x,y,limit_speed,goalx,goaly,speedx,speedy,radius,leader ){
			this.cars.push( new Car( this.id++, x, y, limit_speed, goalx, goaly, speedx, speedy, radius, null, null, leader ) );
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
//			simulation_setting.click_car = car;
//			simulation_setting.pick_car = true;
//			simulation_setting.pick_car_speed = car.speedy;

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
			this.defaults.deleteCar3D( this.cars[id].id );
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
			if(goalNum > 0){
				for( var i = 0 ; i < goalNum ; i++ ){
					this.deleteCars(goal[i])
				}
				goal = [];
				this.initCars();
				length = this.cars.length;
			}

			$("#road").css({ "background-position" : "center "+this.time });
			this.time+=2;
			if(this.time > -1){
				this.time = -800;
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
				this.defaults.camera3D( x, y, z, lookat );
			}else{
				this.defaults.initCamera3D();
				this.pick_car = false;
				this.pick_car_speed = 0;
			}
		},
		startCar : function( startposition, result, leader ){
			if(this.cars.length < max_car){
				var speed = Math.random() * 1 + max_speed;
				if( startposition == "top" ){
					if(leader){
						this.newCars( result*this.defaults.pixelLarge, 1, 6, result*this.defaults.pixelLarge, 720, 0, max_speed+2, this.defaults.pixelLarge, true );
					}else{
						this.newCars( result*this.defaults.pixelLarge, 1, 6, result*this.defaults.pixelLarge, 720, 0, max_speed+2, this.defaults.pixelLarge, false );
					}
				}else{
					if(leader){
						this.newCars( result*this.defaults.pixelLarge, 720, 6, result*this.defaults.pixelLarge, 1, 0, -max_speed, this.defaults.pixelLarge, true );
					}else{
						this.newCars( result*this.defaults.pixelLarge, 720, 6, result*this.defaults.pixelLarge, 1, 0, -max_speed, this.defaults.pixelLarge, false );
					}
				}
			}
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
						var speed = Math.random() * 1 + max_speed;
						var result = Math.floor(Math.random() * 3) + 22;
						this.newCars( result*this.defaults.pixelLarge, 0, 4, result*10, 720, 0, speed, this.defaults.pixelLarge, false );
					}
				}else{
					if(this.cars.length < max_car){
						var check = Math.floor(Math.random()*300);
						if(check > 294){
							if(check > 298.5){
								var result;
								if(Math.random() > 0.5){
									result = 30;
								}else{
									result = 34;
								}
								this.newCars( result*this.defaults.pixelLarge, 1, 8, result*this.defaults.pixelLarge, 720, 0, max_speed + 2, this.defaults.pixelLarge, true );
							}else{
								var speed = Math.random() * 1 + max_speed + 4;
								if(Math.random() > 0.5){
									result = 30;
								}else{
									result = 34;
								}
								this.newCars( result*this.defaults.pixelLarge, 1, 8, result*this.defaults.pixelLarge, 720, 0, speed, this.defaults.pixelLarge, false );
							}
						}
					}
				}
			}

		}
}

