function CarLink(id,x,y,limit_speed,goalx,goaly,speedx,speedy,radius,leader,member){
	this.id = id;
	this.x = x;
	this.y = y;
	this.limit_speed = limit_speed;
	this.realx;
	this.realy;
	this.goalx = goalx;
	this.goaly = goaly;
	this.speedx = speedx;
	this.speedy = speedy;
	this.radius = radius;
	this.leader = leader;
	this.end = leader;
	if(member == null){
		this.member = [];
	}else{
		this.member = member;
	}
}
CarLink.prototype = {
		init : function(){
			if( this.numMember() != 0 ){
				this.end = this.member.unshift()
			}
			if( this.leader.length != 0 ){
				this.goal = this.leader.goal;
				this.speed = this.leader.speed;
			}
		},
		addMember : function(member){
			if( this.numMember() < 1 ){
				member.front = this.leader;
				this.leader.back = member;
				if(this.leader.x > 0){
					member.x = this.leader.x - this.leader.radius;
				}else{
					member.x = this.leader.x + this.leader.radius;
				}
				member.y = this.leader.y;
			}else{
				this.end.back = member;
				member.front = this.end;
				if(this.end.x > 0){
					member.x = this.end.x - this.end.radius;
				}else{
					member.x = this.end.x + this.end.radius;
				}
				member.y = this.end.y;
			}
			this.member.push(member);
			this.end = member;
		},
		deleteMember : function(id){
			if( this.numMember() > 1 ){
				var dels = this.member.slice(id, 1);
				dels.front.back = dels.back;
				dels.back.front = dels.front;
				delete dels.front;
				delete dels.back;
				end = member.unshift();
			}
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
		},
		finish : function(){
			if( Math.abs(this.x - this.goalx) < 2 ){
				return true;
			}else{
				return false;
			}
		}
}
