
function Traffic(opt){

	this.id = 0;
	this.link_id = 0;
	this.cars = [];
	this.sortCars;
	this.links = [];
	this.member = [];
	this.sortLinks;
	this.road;
	this.car_road;
	this.object_div; 
	this.car_image = new Image();
	this.leader_image = new Image();
	this.follower_image = new Image();
	this.testroad = [
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4,4,4,4,4,3,0,0,0,0,0,0,0,0,0,0],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	             	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0]
	                 ];
	this.go = true;
	this.defaults = {
		drawCar3D : function(){},
		drawCarBack3D : function(){},
		deleteCar3D : function(){},
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
					}
				}
			}
		},
		init : function(){
			this.car_image.src = "./image/navigation/car.png";
			this.leader_image.src = "./image/navigation/leader.png";
			this.follower_image.src = "./image/navigation/follower.png";
			this.resetCars();
			this.drawLoad();
			this.newCars(0,180,3,500,180,2,0,15);
			/*
			var result = Math.floor(Math.random() * 4) + 16;
			this.newCars(100,170,3,500,170,1,0,10);

			this.addLinkById(1,0);
*/
		},
		drawCars : function( object ){
			var car = $("#car"+object.id);
			if(car.length>0){
				var detail = car.children();
				var text = "<div class='car-id'>id : "+object.id+"</div>"
				if(object.leader){
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/leader.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else if(object.front!=null){
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else{
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/car.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
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
				if(object.leader){
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/leader.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else if(object.front!=null){
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/follower.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else{
					car.css({ "background-position":"center","background-size":"cover", "border-radius": "50px", "position":"absolute", "z-index":"1000", "background-image":"url('./image/navigation/car.png')", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
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
/*				car.mouseover(function(){
					var target = this.children[0];
					if($(target).css("display") == "none"){
						$(target).fadeIn(900);
					}else{
						$(target).fadeOut(400);
					}
				});
				*/
				car.mousedown(function(){
					var target = this.children[0];
					if($(target).css("display") == "none"){
						$(target).fadeIn(900);
					}else{
						$(target).fadeOut(400);
					}
					$(".cd-id").val(object.id);
					$(".cd-goal").val(object.goalx+","+object.goaly);
					$(".ds-target").val(object.id);	
					$(".ds-unlink-target").val(object.id);	
				});
				car.mouseout(function(){
					var target = this.children[0];
					$(target).fadeOut(400);
				});
				car.dblclick(function(){
					var self = this;
					if(!object.leader && self.front==null){
						simulation_setting.searchLink(object.id);
					}
				});
				this.car_road.append(car);
			}
			if(object.y > 150){
				this.defaults.drawCarBack3D( { x : object.y - 150, y : 0.2, z : object.x - 250 }, object.id );
			}else{
				this.defaults.drawCar3D( { x : object.y - 150, y : 0.2, z : object.x - 250 }, object.id );
			}
		},

		resetCars : function(){
			this.car_road.children().remove();
		},
		newCars : function( x,y,limit_speed,goalx,goaly,speedx,speedy,radius,leader ){
			this.cars.push( new Car( this.id++,x,y,limit_speed,goalx,goaly,speedx,speedy,radius,null,null,leader ) );
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

		},
		unlink : function(id){
			var car;
			for( var i=0 ; i < this.cars.length ; i++ ){
				if( this.cars[i].id == id ){
					car = this.cars[i];
					break;
				}
			}
			car.unsignedMember();
		},
		deleteCars : function( id ){
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
			var linkLength = this.links.length;
			var goal = [];
			var linkGoal = [];
			var goalNum;
			var	goalLinkNum;

			this.cars.sort(function(a,b){return a.x-b.x});
			for( var i = 0 ; i < length ; i++ ){
				var car = this.cars[i];
				if(!car.finish()){
					this.go = true;
					var crash = false;
					if(car.front == null){
						if(car.speedx >= 0){
							var right = i + 8;
							if(right >= length){
								right = length;
							}
							for(var j = i+1 ; j < right ; j++ ){
								var checkx = car.x + car.speed_origin_x;
								var checky = car.y + car.speed_origin_y;
								var checkr = car.radius;
								if( Math.abs(checkx-this.cars[j].x)<checkr*1.2 && Math.abs(checky-this.cars[j].y)<0.5 ){
									crash = true;
									var x = Math.floor(car.x/10);
									var y = Math.floor(car.y/10);
									var result = Math.round(Math.random() * 2);
									if(result > 1){
										if( Math.abs(car.y - this.cars[j].y - checkr/2) < checkr*1.2 && this.testroad[y-1][x] == 1 ){
											car.y -= car.radius;
											car.speedx = car.speed_origin_x;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}else{
										if( Math.abs(car.y - this.cars[j].y + checkr/2) < checkr*1.2 && this.testroad[y+1][x] == 1 ){
											car.y += car.radius;
											car.speedx = car.speed_origin_x;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}
								}
							}
						}else{
							var left = i - 8;
							if(left < 0){
								left = -1;
							}
							for(var j = i-1 ; j > left ; j-- ){
								var checkx = car.x + car.speed_origin_x;
								var checky = car.y + car.speed_origin_y;
								var checkr = car.radius;
								if( Math.abs(checkx-this.cars[j].x)< checkr*1.2 && Math.abs(checky-this.cars[j].y)<0.5 ){
									crash = true;
									var x = Math.floor(car.x/10);
									var y = Math.floor(car.y/10);
									var result = Math.round(Math.random() * 2);
									if(result > 1){
										if( Math.abs(car.y - this.cars[j].y - checkr/2) < checkr*1.2 && this.testroad[y-1][x] == 1 ){
											car.y -= car.radius;
											car.speedx = car.speed_origin_x;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}else{
										if( Math.abs(car.y - this.cars[j].y + checkr/2) < checkr*1.2 && this.testroad[y+1][x] == 1 ){
											car.y += car.radius;
											car.speedx = car.speed_origin_x;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}
								}
							}
						}
						if(!crash){
							car.move(0,0);
						}
					}
				}else{
					goal.push(i);
				}
				this.drawCars( car );
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
		test : function(){
		},
		popLinks : function(){
			this.links.pop();
			return this.links.length;
		},
		simulation : function(){
			if( this.id > 5000 ){
				if(this.cars.length < 10){
					for( var i=0 ; i < 9 ; i++ ){
						this.deleteCars(i);
					}
					this.initCars();
					this.id = 0;
					var result = Math.floor(Math.random() * 9) + 16;
					this.newCars(0,result*15,200,500,result*15,2,0,15);
					this.newCars(50,result*15,200,500,result*15,1,0,15);
				}
			}else{
				if(this.cars.length < max_car){
					var check = Math.floor(Math.random()*100);
					if(check > 90){
						if(check > 97){
							var speed = Math.floor(Math.random() * max_speed)+1;
							var result = Math.floor(Math.random() * 4) + 11;
							this.newCars(0,result*15,200,700,result*15,speed,0,15,true);
						}else{
							var speed = Math.floor(Math.random() * max_speed)+1;
							var result = Math.floor(Math.random() * 4) + 11;
							this.newCars(0,result*15,200,700,result*15,speed,0,15,false);
						}
					}else if(check < 10){
						if(check < 2){
							var speed = Math.floor(Math.random() * max_speed)+1;
							var result = Math.floor(Math.random() * 4) + 6;
							this.newCars(700,result*15,200,0,result*15,-speed,0,15,true);
						}else{
							var speed = Math.floor(Math.random() * max_speed)+1;
							var result = Math.floor(Math.random() * 4) + 6;
							this.newCars(700,result*15,200,0,result*15,-speed,0,15,false);
						}
					}
				}
			}
		}
}

