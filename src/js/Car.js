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
	this.front = front;
	this.back = back;
	this.speedx = speedx;
	this.speedy = speedy;
	this.radius = radius;
	this.leader = leader;
	this.linking = false;
	this.member = false;
	this.num_member = 0;
}

Car.prototype = {
		move : function(x,y){
			if( x == 0 || this.linking ){
				this.realx = this.x + this.speedx; 
				this.realy = this.y + this.speedy; 
				this.x = Math.floor(this.realx*10000)*0.0001;
				this.y = Math.floor(this.realy*10000)*0.0001;
			}else{
				if( this.speedx >= 0 ){
					var lengthx = ( (x - this.realx) / this.radius ) / 10; 
					var lengthy = ( (y - this.realy) / this.radius ) / 10;
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
					var lengthy = ( (y - this.realy) / this.radius ) / 10;
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
			if( this.member ){
				this.back.move(this.realx,this.realy);
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
			if( Math.abs(this.x - this.goalx) < 2 ){
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
				if(this.back != null){
					if(this.front != null){
						this.front.back = this.back;
						this.back.front = this.front;
					}
				}
			}
			this.member = false;
			this.leader = false;
			this.linking = false;
		}
}
