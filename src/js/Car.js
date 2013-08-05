function Car(id,x,y,limit_speed,goalx,goaly,speedx,speedy,radius,front,back,leader){
	this.id = id;
	this.limit_speed = limit_speed;
	this.x = x;
	this.y = y;
	this.realx = x;
	this.realy = y;
	this.goal = 1;
	this.goalx = goalx;
	this.goaly = goaly;
	this.next_x;
	this.next_y;
	this.front = front;
	this.back = back;
	this.speedx = speedx;
	this.speedy = speedy;
	this.speed_origin_x = speedx;
	this.speed_origin_y = speedy;
	this.radius = radius;
	this.leader = leader;
	this.linking = false;
	this.member = false;
	this.num_member = 0;
	this.line_change = false;
	this.back_crash = 0;
	this.clicked = false;
}

Car.prototype = {
		move : function(x,y){
			if( x == 0 || this.linking ){
				this.realx = this.x + this.speedx; 
				this.realy = this.y + this.speedy; 
				this.x = Math.floor(this.realx*10000)*0.0001;
				this.y = Math.floor(this.realy*10000)*0.0001;
				
				if( this.linking && x - this.x > this.radius * 1.1 ){
					this.speedx += 0.02;
				}else if( this.linking && x - this.x < this.radius * 1.1 ){
					this.speedx -= 0.02;
				}
				
				if( this.linking && x - this.x < this.radius * 1.1 ){
					this.speedx -= 0.02;
				}else if( this.linking && x - this.x > this.radius * 1.1 ){
					this.speedx += 0.02;
				}
			}else{
				if( this.speedx >= 0 ){
					var lengthx = ( (x - this.realx) / this.radius ) / 10; 
					var lengthy = ( (y - this.realy) / this.radius );

					if( lengthx > this.limit_speed ){ lengthx = this.limit_speed; }
					if( lengthy > this.limit_speed ){ lengthy = this.limit_speed; }
					if( lengthx < -this.limit_speed){ lengthx = -this.limit_speed; }
					if( lengthy < -this.limit_speed){ lengthy = -this.limit_speed; }
					
					var checkx = Math.abs(lengthx);
					var checky = Math.abs(lengthy);

					if( checkx < 0.1 && checky < 0.1 ){
						this.linking = true;
						this.speedx = this.front.speedx;
						this.speedy = this.front.speedy;
						this.realx = x - this.radius; 
						this.realy = y; 
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( checkx < 0.1 && checky >= 0.1 ){
						this.realy = this.realy + lengthy + this.speedy;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( checky < 0.1 && checkx >= 0.1){
						this.realx = this.realx + lengthx + this.speedx;
						this.x = Math.floor(this.realx*10000)*0.0001;
					}else{
						this.realx = this.realx + lengthx + this.speedx;
						this.realy = this.realy + lengthy + this.speedy;
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}
				}else{
					var lengthx = ( (x - this.realx) / this.radius ) / 10; 
					var lengthy = ( (y - this.realy) / this.radius );
					if( lengthx > this.limit_speed ){ lengthx = this.limit_speed; }
					if( lengthy > this.limit_speed ){ lengthy = this.limit_speed; }
					if( lengthx < -this.limit_speed){ lengthx = -this.limit_speed; }
					if( lengthy < -this.limit_speed){ lengthy = -this.limit_speed; }
					var checkx = Math.abs(lengthx);
					var checky = Math.abs(lengthy);
					if( checkx < 0.1 && checky < 0.1 ){
						this.linking = true;
						this.speedx = this.front.speedx;
						this.speedy = this.front.speedy;
						this.realx = x + this.radius; 
						this.realy = y; 
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( checkx < 0.1 && checky >= 0.1 ){
						this.realy = this.realy + lengthy + this.speedy;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( checky < 0.1 && checkx >= 0.1){
						this.realx = this.realx + lengthx + this.speedx;
						this.x = Math.floor(this.realx*10000)*0.0001;
					}else{
						this.realx = this.realx + lengthx + this.speedx;
						this.realy = this.realy + lengthy + this.speedy;
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}
				}
			}
			if( this.back != null ){
				this.back.move(this.realx,this.realy);
			}
		},
		navigationPlusSpeedxOne : function( other_cars, back_cars, up_road, down_road, option ){
			var crash = false;
			var checkx = this.x + this.speedx;
			var checky = this.y + this.speedy;
			var checkr = this.radius;
			if( this.front == null || ( this.leader && this.back == null )){
				if( this.line_change ){
					if( this.next_y == this.y ){
						this.line_change = false;
						this.speedy = this.speed_origin_y;
						this.speedx = this.speed_origin_x;
						this.goaly = this.y;
					}
				}else{
					var front_check = false;
					for( var car in other_cars ){
						if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr && other_cars[car].line_change ){
							this.speedx = other_cars[car].speedx;
							front_check = true;
							break;
						}
					}
					if(this.back_crash > 5){
						if(this.speedx + 1 < this.limit_speed){
							this.speedx += 1;
							this.back_crash = 0;
						}
					}else if( !front_check ){
						for( var car in other_cars ){
							if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr ){
								crash = true;
								var result = Math.random() * 10;
								if(this.leader){
									this.speedx = other_cars[car].speedx;
									break;
								}else if( up_road == 1 && result < 2 ){
									this.line_change = true;
									var array  = back_cars;
									array.push.apply( array, other_cars );
									for( var i in array ){
										if( array[i].y < this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y - this.radius;
										this.speedy = - 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else if( down_road == 1 && result > 8 ){
									this.line_change = true;
									var array  = back_cars;
									array.push.apply( array, other_cars );
									for( var i in array ){
										if( array[i].y > this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y + this.radius;
										this.speedy = + 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else{
									this.speedx = other_cars[car].speedx;
									other_cars[car].back_crash++;
									break;
								}
							}else if(this.speed_origin_x > this.speedx){
								this.speedx = this.speed_origin_x;
								crash = false;
							}
						}
					}
				}
				if(!crash){
					this.move(0,0);
				}
			}			
		},
		
		navigationPlusSpeedx : function( other_cars, back_cars, up_road, down_road ){
			var crash = false;
			var checkx = this.x + this.speedx;
			var checky = this.y + this.speedy;
			var checkr = this.radius;
			if( this.front == null || ( this.leader && this.back == null )){
				if( this.line_change ){
					if( this.next_y == this.y ){
						this.line_change = false;
						this.speedy = this.speed_origin_y;
						this.speedx = this.speed_origin_x;
						this.goaly = this.y;
					}
				}else{
					var front_check = false;
					for( var car in other_cars ){
						if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr && other_cars[car].line_change ){
							this.speedx = other_cars[car].speedx;
							front_check = true;
							break;
						}
					}
					if(this.back_crash > 5){
						if(this.speedx + 1 < this.limit_speed){
							this.speedx += 1;
							this.back_crash = 0;
						}
					}else if( !front_check ){
						for( var car in other_cars ){
							if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr ){
								crash = true;
								var result = Math.random() * 10;
								if(this.leader){
									this.speedx = other_cars[car].speedx;
									break;
								}else if( up_road == 1 && result < 2 ){
									this.line_change = true;
									var array  = back_cars;
									array.push.apply( array, other_cars );
									for( var i in array ){
										if( array[i].y < this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y - this.radius;
										this.speedx = max_speed;
										this.speedy = - 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else if( down_road == 1 && result > 8 ){
									this.line_change = true;
									var array  = back_cars;
									array.push.apply( array, other_cars );
									for( var i in array ){
										if( array[i].y > this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y + this.radius;
										this.speedx = max_speed;
										this.speedy = + 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else{
									this.speedx = other_cars[car].speedx;
									other_cars[car].back_crash++;
									break;
								}
							}else if(this.speed_origin_x > this.speedx){
								this.speedx = this.speed_origin_x;
								crash = false;
							}
						}
					}
				}
				if(!crash){
					this.move(0,0);
				}
			}
		},
		navigationMinusSpeedxOne : function( other_cars, back_cars, up_road, down_road, option ){
			var crash = false;
			var checkx = this.x + this.speedx;
			var checky = this.y + this.speedy;
			var checkr = this.radius;
			var length = other_cars.length;
			if( this.front == null || ( this.leader && this.back == null )){
				if( this.line_change ){
					if( this.next_y == this.y ){
						this.line_change = false;
						this.speedy = this.speed_origin_y;
						this.speedx = this.speed_origin_x;
						this.goaly = this.y;
					}
				}else{
					var front_check = false;
					for( var car in other_cars ){
						if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr && other_cars[car].line_change ){
							this.speedx = other_cars[car].speedx;
							front_check = true;
							break;
						}
					}
					if(this.back_crash > 5){
						if(this.speedx - 1 > -(this.limit_speed)){
							this.speedx -= 1;
							this.back_crash = 0;
						}
					}else if( !front_check ){
						for( var car in other_cars ){
							if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr ){
								crash = true;
								var result = Math.random() * 10;
								if(this.leader){
									this.speedx = other_cars[car].speedx;
									break;
								}else if( up_road == 1 && result < 2 ){
									this.line_change = true;
									var array  = other_cars.slice(0);
									array.push.apply( array, back_cars );
									for( var i in array ){
										if( array[i].y < this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y - this.radius;
										this.speedx = - max_speed - option;
										this.speedy = - 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else if( down_road == 1 && result > 8 ){
									this.line_change = true;
									var array  = other_cars.slice(0);
									array.push.apply( array, back_cars );
									for( var i in array ){
										if( array[i].y > this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y + this.radius;
										this.speedx = - max_speed - option;
										this.speedy = + 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else{
									this.speedx = other_cars[car].speedx;
									other_cars[car].back_crash++;
									break;
								}
							}else if( this.speed_origin_x < this.speedx ){
								this.speedx = this.speed_origin_x;
								crash = false;
							}
						}
					}
				}
				if(!crash){
					this.move(0,0);
				}
			}
		},
		navigationMinusSpeedx : function( other_cars, back_cars, up_road, down_road ){
			var crash = false;
			var checkx = this.x + this.speedx;
			var checky = this.y + this.speedy;
			var checkr = this.radius;
			var length = other_cars.length;
			if( this.front == null || ( this.leader && this.back == null )){
				if( this.line_change ){
					if( this.next_y == this.y ){
						this.line_change = false;
						this.speedy = this.speed_origin_y;
						this.speedx = this.speed_origin_x;
						this.goaly = this.y;
					}
				}else{
					var front_check = false;
					for( var car in other_cars ){
						if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr && other_cars[car].line_change ){
							this.speedx = other_cars[car].speedx;
							front_check = true;
							break;
						}
					}
					if(this.back_crash > 5){
						if(this.speedx - 1 > -(this.limit_speed)){
							this.speedx -= 1;
							this.back_crash = 0;
						}
					}else if( !front_check ){
						for( var car in other_cars ){
							if( Math.abs( checkx - other_cars[car].x ) < checkr && Math.abs( checky - other_cars[car].y ) < checkr ){
								crash = true;
								var result = Math.random() * 10;
								if(this.leader){
									this.speedx = other_cars[car].speedx;
									break;
								}else if( up_road == 1 && result < 2 ){
									this.line_change = true;
									var array  = other_cars.slice(0);
									array.push.apply( array, back_cars );
									for( var i in array ){
										if( array[i].y < this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y - this.radius;
										this.speedx = - max_speed;
										this.speedy = - 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else if( down_road == 1 && result > 8 ){
									this.line_change = true;
									var array  = other_cars.slice(0);
									array.push.apply( array, back_cars );
									for( var i in array ){
										if( array[i].y > this.y && Math.abs( this.x - array[i].x ) < checkr * 1.5 ){
											this.line_change = false;
											break;
										}
									}
									if(this.line_change){
										this.next_y = this.y + this.radius;
										this.speedx = - max_speed;
										this.speedy = + 0.5;
									}else{
										this.speedx = other_cars[car].speedx;
										other_cars[car].back_crash++;
									}
									break;
								}else{
									this.speedx = other_cars[car].speedx;
									other_cars[car].back_crash++;
									break;
								}
							}else if( this.speed_origin_x < this.speedx ){
								this.speedx = this.speed_origin_x;
								crash = false;
							}
						}
					}
				}
				if(!crash){
					this.move(0,0);
				}
			}
		},
		stop : function(){
			this.speedx = 0;
			this.speedy = 0;
		},
		follow : function(){
			this.speedx = this.front.speedx;
			this.speedy = this.front.speedy;
		},
		finish : function(){
			if( Math.abs(this.x - this.goalx) < 2 || this.x < 0 || this.x > 700){
				return true;
			}else{
				return false;
			}
		},
		position : function(x,y,realx,realy,radius){
			this.x = x;
			this.y = y;
			this.realx = realx;
			this.realy = realy
		},
		addMember : function(member,count){
			if(this.speedx * member.speedx > 0){
				var num = 0;
				if(!this.member){
					if(!(count > 0)){
						this.leader = true;
					}
					this.back = member;
					this.member = true;
					member.front = this;
				}else{
					this.back.addMember(member,++num);
				}
				this.num_member++;
			}
		},
		unsignedMember : function(){
			if(this.leader){
				if(this.back != null){
					if(this.back.member){
						this.back.leader = true;
					}
					this.back.front = null;
				}
			}else{
				if(this.front != null){
					if(this.back != null){
						this.front.back = this.back;
						this.back.front = this.front;
					}else{
						this.front.member = false;
						this.front.back = null;
					}
				}
			}
			this.member = false;
			this.leader = false;
			this.linking = false;
			this.front = null;
			this.back = null;
		}
}
