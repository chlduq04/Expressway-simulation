var maxspeed = 2;
var maxcar = 500;
function Traffic(){
	this.id = 0;
	this.link_id = 0;
	this.cars = [];
	this.sortCars;
	this.links = [];
	this.member = [];
	this.sortLinks;
	this.road;
	this.object_div; 
	this.testroad = [
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4,4,4,4,4,3,0,0,0,0,0,0,0,0,0],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	                 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,3,0,0,3,4,4,4,4,4,4,4,4,4,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,3,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,3,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0],
	                 ];
	this.go = true;
}

Traffic.prototype = {
		init : function(){
			this.road = $("#road")
			this.resetCars();
			/**/

			var width = this.testroad.length;
			var height = this.testroad[0].length;
			for( var i = 0 ; i < width ; i++ ){
				for( var j = 0 ; j < height ; j++ ){
					if( this.testroad[i][j] == 1 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"gray", "width":10, "height":10, "left":j*10, "top":i*10 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 2 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"yellow", "width":10, "height":10, "left":j*10, "top":i*10 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 3 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"black", "width":10, "height":10, "left":j*10, "top":i*10 });
						this.road.append(road);
					}else if( this.testroad[i][j] == 4 ){
						var road = $("<div id='"+i+","+j+"'></div>")
						road.css({ "position":"absolute", "background":"gray", "width":10, "height":10, "left":j*10, "top":i*10 });
						this.road.append(road);
					}
				}
			}
			var result = Math.floor(Math.random() * 9) + 16;
			this.newCars(0,230,3,500,230,2,0,10);
//			this.newCars(100,200,3,500,200,1,0,10);
			this.newCars(100,170,3,500,170,1,0,10);
//			this.newCars(0,result*10,3,500,result*10,1,0,10);

			this.addLinkById(1,0);
//			this.addLinkById(2,1);
//			var result = Math.floor(Math.random() * 9) + 16;
//			this.newCars(0,result*10,3,500,result*10,1,0,10);

			/*
			var result = Math.floor(Math.random() * 9) + 6;
			this.newCars(400,result*10,200,0,result*10,-1,0,10,true);
			this.newCars(450,result*10,200,0,result*10,-2,0,10);
			this.newCars(500,result*10,200,0,result*10,-2,0,10);
*/
			
//			this.addLinkById(0,1);
//			this.addLinkById(0,2);
			
//			var result = Math.floor(Math.random() * 9) + 16;
//			this.newCars(0,result*10,200,500,result*10,2,0,10);
//			this.newCars(50,result*10,200,500,result*10,1,0,10);
//			var result = Math.floor(Math.random() * 9) + 16;
//			this.newCars(0,result*10,200,500,result*10,2,0,10);
//			this.newCars(50,result*10,200,500,result*10,1,0,10);
//
//			var result = Math.floor(Math.random() * 9) + 6;
//			this.newCars(450,result*10,200,0,result*10,-1,0,10);
//			this.newCars(500,result*10,200,0,result*10,-2,0,10);
//			var result = Math.floor(Math.random() * 9) + 6;
//			this.newCars(450,result*10,200,0,result*10,-1,0,10);
//			this.newCars(500,result*10,200,0,result*10,-2,0,10);
//			var result = Math.floor(Math.random() * 9) + 6;
//			this.newCars(450,result*10,200,0,result*10,-1,0,10);
//			this.newCars(500,result*10,200,0,result*10,-2,0,10);
//			var result = Math.floor(Math.random() * 9) + 6;
//			this.newCars(450,result*10,200,0,result*10,-1,0,10);
//			this.newCars(500,result*10,200,0,result*10,-2,0,10);
		},
		drawCars : function( object ){
			var car = $("#car"+object.id)
			if(car.length>0){
				if(object.leader){
					car.css({ "position":"absolute", "z-index":"1000", "background":"red", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else if(object.front!=null){
					car.css({ "position":"absolute", "z-index":"1000", "background":"black", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else{
					car.css({ "position":"absolute", "z-index":"1000", "background":"blue", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}
			}else{
				car = $("<div id='car"+object.id+"'></div>")
				if(object.leader){
					car.css({ "position":"absolute", "z-index":"1000", "background":"red", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else if(object.front!=null){
					car.css({ "position":"absolute", "z-index":"1000", "background":"black", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}else{
					car.css({ "position":"absolute", "z-index":"1000", "background":"blue", "width":object.radius, "height":object.radius, "left":object.realx, "top":object.realy });
				}
				this.road.append(car);
			}
		},

		resetCars : function(){
			this.road.children().remove();
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

		searchLink : function( num ){
			var car = this.cars[num];
			if( car.speedx > 0 ){
				var limit = num + maxcar/5;
				if(limit >= this.cars.length){
					limit = this.cars.length;
				}
				for(var i = num ; i < limit ; i++ ){
					if( this.cars[i].leader ){
						this.cars[i].addMember(car);
						break;
					}
				}
			}else{
				var limit = num - 10;
				if(limit < 0){
					limit = 0;
				}
			}
		},
		deleteCars : function( id ){
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
							var right = i + 10;
							if(right >= length){
								right = length;
							}
							for(var j = i+1 ; j < right ; j++ ){
								var checkx = car.x + car.speedx;
								var checky = car.y + car.speedy;
								var checkr = car.radius;
								if( Math.abs(checkx-this.cars[j].x)<checkr*1.2 && Math.abs(checky-this.cars[j].y)<0.5 ){
									crash = true;
									var x = Math.floor(car.x/10);
									var y = Math.floor(car.y/10);
									var result = Math.round(Math.random() * 2);
									if(result > 1){
										if( Math.abs(car.y - this.cars[j].y - checkr/2) < checkr*1.2 && this.testroad[y-1][x] == 1 ){
											car.y -= car.radius;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}else{
										if( Math.abs(car.y - this.cars[j].y + checkr/2) < checkr*1.2 && this.testroad[y+2][x] == 1 && this.testroad[y+1][x] == 1 ){
											car.y += car.radius;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}
								}
							}
						}else{
							var left = i - 10;
							if(left < 0){
								left = -1;
							}
							for(var j = i-1 ; j > left ; j-- ){
								var checkx = car.x + car.speedx;
								var checky = car.y + car.speedy;
								var checkr = car.radius;
								if( Math.abs(checkx-this.cars[j].x)< checkr*1.2 && Math.abs(checky-this.cars[j].y)<0.5 ){
									crash = true;
									var x = Math.floor(car.x/10);
									var y = Math.floor(car.y/10);
									var result = Math.round(Math.random() * 2);
									if(result > 1){
										if( Math.abs(car.y - this.cars[j].y - checkr/2) < checkr*1.2 && this.testroad[y-1][x] == 1 ){
											car.y -= car.radius;
											break;
										}else{
											car.speedx = this.cars[j].speedx;
											break;
										}
									}else{
										if( Math.abs(car.y - this.cars[j].y + checkr/2) < checkr*1.2 && this.testroad[y+1][x] == 1 ){
											car.y += car.radius;
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
					this.newCars(0,result*10,200,500,result*10,2,0,10);
					this.newCars(50,result*10,200,500,result*10,1,0,10);
				}
			}else{
				if(this.cars.length < maxcar){
					var check = Math.floor(Math.random()*100);
					if(check > 80){
						if(check > 97){
							var speed = Math.floor(Math.random() * maxspeed)+1;
							var result = Math.floor(Math.random() * 9) + 16;
							this.newCars(0,result*10,200,500,result*10,speed,0,10,true);
						}else{
							var speed = Math.floor(Math.random() * maxspeed)+1;
							var result = Math.floor(Math.random() * 9) + 16;
							this.newCars(0,result*10,200,500,result*10,speed,0,10,false);
						}
					}else if(check < 20){
						if(check < 2){
							var speed = Math.floor(Math.random() * maxspeed)+1;
							var result = Math.floor(Math.random() * 9) + 6;
							this.newCars(500,result*10,200,0,result*10,-speed,0,10,true);
						}else{
							var speed = Math.floor(Math.random() * maxspeed)+1;
							var result = Math.floor(Math.random() * 9) + 6;
							this.newCars(500,result*10,200,0,result*10,-speed,0,10,false);
						}
					}
				}
			}
		}
}

var a = new Traffic();
function test1(){
	a.init();
	var i = 1;          
	function myLoop () {           
		setTimeout(function () {    
			i++;                     
			if (a.moveCars()) { 
				if(a.cars.length != 0){
					myLoop();            
				}
			}                      
		}, 20)
	}
	myLoop();                     
}