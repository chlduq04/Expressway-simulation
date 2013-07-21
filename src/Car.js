function Car(id,x,y,limit_speed,goalx,goaly,speedx,speedy,radius,front,back){
	this.id = id;
	this.limit_speed = limit_speed;
	this.x = x;
	this.y = y;
	this.realx;
	this.realy;
	this.goalx = goalx;
	this.goaly = goaly;
	this.front = front;
	this.back = back;
	this.speedx = speedx;
	this.speedy = speedy;
	this.radius = radius;
}

Car.prototype = {
		move : function(x,y){
			if(x){
				this.realx = this.x + this.speedx; 
				this.x = Math.floor(this.realx*10000)*0.0001;
			}
			if(y){
				this.realy = this.y + this.speedy; 
				this.y = Math.floor(this.realy*10000)*0.0001;
			}
		},
		stop : function(){
			this.speedx = 0;
			this.speedy = 0;
		},
		follow : function(){
			this.x = this.front.x;
			this.realx = this.front.realy;
			this.y = this.front.y;
			this.realy = this.front.realy;
		},
		finish : function(){
			if( Math.abs(this.x - this.goalx) < 2 ){
				return true;
			}else{
				return false;
			}
		}
}
