function Car(id,x,y,limit_speed,goalx,goaly,speedx,speedy,radius,front,back){
	this.id = id;
	this.limit_speed = limit_speed;
	this.x = x;
	this.y = y;
	this.realx = x;
	this.realy = y;
	this.goalx = goalx;
	this.goaly = goaly;
	this.front = front;
	this.back = back;
	this.speedx = speedx;
	this.speedy = speedy;
	this.radius = radius;
	this.leader = false;
	this.member = false;
}

Car.prototype = {
		move : function(x,y){
			if( x == 0 ){
				this.realx = this.x + this.speedx; 
				this.realy = this.y + this.speedy; 
				this.x = Math.floor(this.realx*10000)*0.0001;
				this.y = Math.floor(this.realy*10000)*0.0001;
			}else{
				if(this.speedx >= 0){
					var lengthx = (x - this.realx)/this.radius; 
					var lengthy = (y - this.realy)/this.radius;
					if( lengthx < 1 && lengthy < 1 ){
						this.realx = x - this.radius; 
						this.realy = y; 
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( lengthx < 1 && lengthy >= 1 ){
						this.realy = this.realy + lengthy + this.speedy;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}else if( lengthy < 1 && lengthx >= 1){
						this.realx = this.realx + lengthx + this.speedx;
						this.x = Math.floor(this.realx*10000)*0.0001;
					}else{
						this.realx = this.realx + lengthx + this.speedx;
						this.realy = this.realy + lengthy + this.speedy;
						this.x = Math.floor(this.realx*10000)*0.0001;
						this.y = Math.floor(this.realy*10000)*0.0001;
					}
				}else{
					var lengthx = (this.x - x)/this.radius; 
					var lengthy = (this.y - y)/this.radius;
					if( lengthx < 2 && lengthy < 2 ){
						this.x = x;
						this.y = y;
					}else if( lengthx < 2 ){
						this.y - lengthy;
					}else if( lengthy < 2 ){
						this.x - lengthx;
					}else{
						this.x - lengthx;
						this.y - lengthy;
					}
				}
			}
			if(this.member){
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
		},
		unsignedMember : function(){
			if(this.leader){
				if(this.back.member){
					this.back.leader = true;
				}
				this.back.front = null;
			}else{
				if(this.member){
					this.front.back = this.back;
					this.back.front = this.front;
				}
			}
			this.member = false;
			this.leader = false;
		}
}
