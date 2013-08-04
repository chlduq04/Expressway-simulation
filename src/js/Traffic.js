
function Traffic(opt){
	
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
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	                 ];
	this.go = true;
	this.click_car = null;
	this.pick_car = false;
	this.pick_car_speed = 2.5;
	this.mode = "road";
	this.mode_change = false;
	this.defaults = {
			drawCar3D : function(){},
			drawCarBack3D : function(){},
			deleteCar3D : function(){},
			camera3D : function(){},
			initCamera3D : function(){},
			render3D : function(){}
	};
	$.extend(this.defaults, opt);
}

Traffic.prototype = {
		drawLoad : function(){
			this.road = $("#road");
			this.car_road = $("#cars");
			var width = this.testroad.length;
			var height = this.testroad[0].length;
			for( var i = 0 ; i < width ; i++ ){
				for( var j = 0 ; j < height ; j++ ){
					if( this.testroad[i][j] == 1 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"gray", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 2 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"yellow", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 3 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"black", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 4 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"gray", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 0 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"green", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 9){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"brown", "width":15, "height":15, "left":j*15, "top":i*15 });
						this.road.append(road);
					}
				}
			}
		},
		init : function(){
			this.car_image_right.src = "./image/navigation/top-right-normal.png";
			this.leader_image_right.src = "./image/navigation/top-right-leader.png";
			this.follower_image_right.src = "./image/navigation/top-right-follower.png";
			this.car_image_left.src = "./image/navigation/top-left-normal.png";
			this.leader_image_left.src = "./image/navigation/top-left-leader.png";
			this.follower_image_left.src = "./image/navigation/top-left-follower.png";
			
			this.resetCars();
			this.drawLoad();
			var speed = Math.random() * 1 + max_speed - this.pick_car_speed;
			var result = Math.floor(Math.random() * 3) + 10;
			if(speed < 0){
				this.newCars(700,result*15,4,0,result*15,speed,0,15,false);
			}else if(speed > 0){
				this.newCars(0,result*15,4,700,result*15,speed,0,15,false);
			}
			
		},
		drawCars : function( object ){
			var car = $("#car"+object.id);
			if(car.length>0){
				var detail = car.children();
				var text = "<div class='car-id'>id : "+object.id+"</div>"
				if( object.y > 140 ){
					if(object.leader){
						car.css({ "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else if(object.front!=null){
						car.css({ "background-image":"url('./image/navigation/top-right-follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else{
						car.css({ "background-image":"url('./image/navigation/top-right-normal.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}
				}else{
					if(object.leader){
						car.css({ "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else if(object.front!=null){
						car.css({ "background-image":"url('./image/navigation/top-left-follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else{
						car.css({ "background-image":"url('./image/navigation/top-left-normal.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}
				}

				if(object.front == null){
					text += "<div class='car-front'>front : None</div>";	
				}else{
					text += "<div class='car-front'>front : "+object.front.id+"</div>";
				}
				if(object.back == null){
					text += "<div class='car-back'>back : None</div>"
				}else{
					text += "<div class='car-back'>back : "+object.back.id+"</div>";
				}
				text += "<div class='car-goal'>goal : ("+object.goalx +","+object.goaly+")</div>";
				detail.html(text);
				car.append(detail);
			}else{
				car = $("<div id='car"+object.id+"'></div>")
				var detail =  $("<div id='car"+object.id+"-over'></div>");
				if( object.y > 140 ){
					if(object.leader){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-right-leader.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else if(object.front!=null){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-right-follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else{
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-right-normal.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}
				}
				else{
					if(object.leader){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-left-leader.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else if(object.front!=null){
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-left-follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}else{
						car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/top-left-normal.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
					}
				}
				detail.css({
					"width": "100px",
					"height": "50px",
					"background": "black",
					"opacity": "0.7",
					"position": "absolute",
					"left": "10px",
					"top": "-50px",
					"display":"none",
					"color": "white",
					"font-size":"12px",
					"z-index" : "1200"
				});

				var text = "<div class='car-id'>id : "+object.id+"</div>"
				if(object.front == null){
					text += "<div class='car-front'>front : None</div>";	
				}else{
					text += "<div class='car-front'>front : "+object.front.id+"</div>";
				}
				if(object.back == null){
					text += "<div class='car-back'>back : None</div>"
				}else{
					text += "<div class='car-back'>back : "+object.back.id+"</div>";
				}
				text += "<div class='car-goal'>goal : ("+object.goalx +","+object.goaly+")</div>";
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
					$(".ds-speed-value").val( Math.abs(Math.floor(object.speedx*10)) );
					
				});
				car.mouseout(function(){
					var target = this.children[0];
					$(target).fadeOut(400);
				});
				car.dblclick(function(){
					var self = this;
					simulation_setting.click_car = object;
					simulation_setting.pick_car = true;
					simulation_setting.pick_car_speed = object.speedx;
				});
				this.car_road.append(car);
			}
			
			/*
			if(object.y > 150){
				this.defaults.drawCarBack3D( { x : object.y - 150, y : 0.2, z : object.x - 250 }, object.id, "leader" );
			}else{
				this.defaults.drawCar3D( { x : object.y - 150, y : 0.2, z : object.x - 250 }, object.id, "leader" );
			}
			*/
			if( object.y > 140 ){
				if(object.leader){
					this.defaults.drawCar3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "leader" );
				}else if( object.front != null ){
					this.defaults.drawCar3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "follower" );
				}else{
					this.defaults.drawCar3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "normal" );
				}
			}else{
				if(object.leader){
					this.defaults.drawCarBack3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "leader" );
				}else if( object.front != null ){
					this.defaults.drawCarBack3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "follower" );
				}else{
					this.defaults.drawCarBack3D( { x : object.y - 150, y : 0.2, z : object.x - 320 }, object.id, "normal" );
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

			if( car.speedx > 0 ){
				var limit = checki + max_car/5;
				if( limit >= this.cars.length ){
					limit = this.cars.length;
				}
				for( var i = checki ; i < limit ; i++ ){
					if( this.cars[i].leader && this.cars[i].speedx > 0 ){
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
					if( this.cars[i].leader && this.cars[i].speedx < 0 ){
						this.cars[i].addMember(car);
						break;
					}
				}
			}
			simulation_setting.click_car = car;
			simulation_setting.pick_car = true;
			simulation_setting.pick_car_speed = car.speedx;

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
			this.cars.sort(function(a,b){return a.x-b.x});
			
			if( this.mode == "road" ){
				if( this.mode_change == false ){
					for( var i = 0 ; i < length ; i++ ){
						this.cars[i].speedx += this.pick_car_speed;
					}
					this.mode_change = true;
				}
				for( var i = 0 ; i < length ; i++ ){
					if( this.cars[i].speedx > 0 ){
						plus_speed.push( this.cars[i] );
					}else{
						minus_speed.push( this.cars[i] );
					}
				}
				for( var i = 0 ; i < length ; i++ ){
					var car = this.cars[i];
					var x = Math.floor( car.x / car.radius );
					var y = Math.floor( car.y / car.radius );
					if(!car.finish()){
						this.go = true;
						if(car.speedx >= 0){
							var limit = plus_speed.length;
							var me = plus_speed.indexOf(car);
							var right = me + 10;
							var left = me - 5;
							if(right >= limit){
								right = limit;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationPlusSpeedx( plus_speed.slice( me+1, right ), plus_speed.slice( left, me ), this.testroad[y-1][x], this.testroad[y+1][x] );
						}
						else{
							var limit = minus_speed.length;
							var me = minus_speed.indexOf(car);
							var right = me + 5;
							var left = me - 10;
							if(right >= limit){
								right = length;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationMinusSpeedx( minus_speed.slice( left, me ), minus_speed.slice( me+1, right ), this.testroad[y-1][x], this.testroad[y+1][x], this.pick_car_speed );
						}
					}else{
						goal.push(i);
					}
					this.drawCars( car );
				}
				if(this.pick_car){
					this.pickCars();
				}
			}else if( this.mode == "one" ){
				/*
				if(  this.mode_change == false  ){
					for( var i = 0 ; i < length ; i++ ){
						this.cars[i].speedx -= this.pick_car_speed;
						this.cars[i].speed_origin_x -= this.pick_car_speed;
					}
					this.mode_change = true;
				}
				*/
				for( var i = 0 ; i < length ; i++ ){
					if( this.cars[i].y < 140 ){
						minus_speed.push( this.cars[i] );
					}else{
						plus_speed.push( this.cars[i] );
					}
				}
				for( var i = 0 ; i < length ; i++ ){
					var car = this.cars[i];
					var x = Math.floor( car.x / car.radius );
					var y = Math.floor( car.y / car.radius );
					if(!car.finish()){
						this.go = true;
						if( car.y < 140 ){
							var limit = minus_speed.length;
							var me = minus_speed.indexOf(car);
							var right = me + 5;
							var left = me - 10;
							if(right >= limit){
								right = length;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationMinusSpeedxOne( minus_speed.slice( left, me ), minus_speed.slice( me+1, right ), this.testroad[y-1][x], this.testroad[y+1][x], this.pick_car_speed  );
						}
						else{
							var limit = plus_speed.length;
							var me = plus_speed.indexOf(car);
							var right = +10;
							var left = -10;
							if(right >= limit){
								right = limit;
							}
							if(left < 0){
								left = 0;
							}
							car.navigationPlusSpeedxOne( plus_speed.slice( me+1, right ), plus_speed.slice( left, me ), this.testroad[y-1][x], this.testroad[y+1][x], this.pick_car_speed );
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
			this.defaults.render3D();
			return this.go;
		},
		pickCars : function(){
			if( this.click_car != null && this.click_car != undefined ){
				var x = this.click_car.y - 150 ;
				var y = 2 ;
				var z = this.click_car.x - 320;
				var look = z + this.click_car.speedx;
				var lookat = { x : x, y : y, z : look };
				this.defaults.camera3D( x, y, z, lookat );
			}else{
				this.defaults.initCamera3D();
				this.pick_car = false;
				this.pick_car_speed = 0;
			}
		},
		simulation : function(){
			if( this.mode == "road" ){
				if( this.id > 5000 ){
					if(this.cars.length < 10){
						for( var i=0 ; i < 9 ; i++ ){
							this.deleteCars(i);
						}
						this.initCars();
						this.id = 0;
						var result = Math.floor(Math.random() * 3) + 10;
						this.newCars( 0, result*15, 4, 700, result*15, 2, 0, 15 );
						this.newCars( 50, result*15, 4, 700, result*15, 1, 0, 15 );
					}
				}else{
					if(this.cars.length < max_car){
						var check = Math.floor(Math.random()*100);
						if(check > 90){
							if(check > 97){
								var speed = Math.random() * 1 + max_speed;
								var result = Math.floor(Math.random() * 3) + 10;
								this.newCars( 0, result*15, 4, 700, result*15, max_speed, 0, 15, true );
							}else{
								var speed = Math.random() * 1 + max_speed;
								var result = Math.floor(Math.random() * 3) + 10;
								this.newCars( 0, result*15, 4, 700, result*15, speed, 0, 15, false );
							}
						}else if(check < 10){
							if(check < 2){
								var speed = Math.random() * 1 + max_speed;
								var result = Math.floor(Math.random() * 3) + 6;
								this.newCars( 700, result*15, 4, 0, result*15, -max_speed, 0, 15, true );
							}else{
								var speed = Math.random() * 1 + max_speed;
								var result = Math.floor(Math.random() * 3) + 6;
								this.newCars( 700, result*15, 4, 0, result*15, -speed, 0, 15, false );
							}
						}
					}
				}
			}else if( this.mode == "one" ){
				if( this.id > 5000 ){
					if(this.cars.length < 10){
						for( var i=0 ; i < 9 ; i++ ){
							this.deleteCars(i);
						}
						this.initCars();
						this.id = 0;
						var result = Math.floor(Math.random() * 3) + 10;
						var speed = Math.random() * 1 + max_speed - this.pick_car_speed;
						this.newCars(0,result*15,4,700,result*15,speed,0,15);
					}
				}else{
					if(this.cars.length < max_car){
						var check = Math.floor(Math.random()*200);
						if( check > 197 ){
							if( check > 199 ){
								var result = Math.floor(Math.random() * 3) + 10;
								this.newCars( 0, result*15, 4 - this.pick_car_speed, 700, result*15, max_speed - this.pick_car_speed, 0, 15, true );
							}else{
								var speed = Math.random() * 1 + max_speed - this.pick_car_speed;
								var result = Math.floor(Math.random() * 3) + 10;
								if(speed < 0){
									this.newCars( 700, result*15, 4 - this.pick_car_speed, 0, result*15, speed, 0, 15, false );
								}else if(speed > 0){
									this.newCars( 0, result*15, 4 - this.pick_car_speed, 700, result*15, speed, 0, 15, false );
								}
							}
						}
						else if(check < 10){
							if(check < 2){
								var result = Math.floor(Math.random() * 3) + 6;
								this.newCars( 700, result*15, 4 - this.pick_car_speed, 0, result*15, -max_speed - this.pick_car_speed, 0, 15, true );
							}else{
								var speed = Math.random() * 1 + max_speed + this.pick_car_speed ;
								var result = Math.floor(Math.random() * 3) + 6;
								this.newCars( 700, result*15, 4 - this.pick_car_speed, 0, result*15, -speed, 0, 15, false );
							}
						}
					}
				}
			}
			
		}
}

