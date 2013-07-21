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
	this.leader = false;
	this.member = false;
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
		addMember : function(member){
			if(!this.member){
				this.back = member;
				this.member = true;
			}else{
				this.back.addMember(member);
			}
		},
		deleteMember : function(id){
		},
		popMember : function(){
			if( this.numMember( ) != 0 ){
				var pops = this.member.pop();
				this.end = pops.front();
				delete pops.front;
			}
		},
		numMember : function(){
			return this.member.length;
		},
		moveMember : function(x,y){
			if(x){
				var vleader = this.leader;
				vleader.realx = vleader.x + vleader.speedx;
				vleader.x = Math.floor(vleader.realx*10000)*0.0001;
				this.x = vleader.x;
				this.realx = vleader.realx;
			}
			if(y){
				var vleader = this.leader;
				vleader.realy = vleader.y + vleader.speedy;
				vleader.y = Math.floor(vleader.realy*10000)*0.0001;
				this.y = vleader.y;
				this.realy = vleader.realy;
			}
			var length = this.member.length;
			for( var i = 0 ; i < length ; i++ ){
				this.member[i].follow();
				this.member[i].move(true,true);
			}
		}
}
