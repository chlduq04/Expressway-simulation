$(".dr-reflesh").click(function(){
	var max = $(".ds-maxcar").val();
	var speed_car = $(".ds-limitspeed").val();
	var speed_simulation = $(".ds-simulationspeed").val();
	if(max.length>0){
		max_car = parseInt(max);
	}else{
		max_car = 2;
	}
	if(speed_car.length>0){
		max_speed = parseInt(speed_car);
	}else{
		max_speed = 500;
	}
	if(speed_simulation.length>0){
		simulation_speed = parseInt(speed_simulation);
	}else{
		simulation_speed = 40;
	}
	simulation_reset();
});
$(".dl-linking").click(function(){
	var leader = $(".dl-leader").val();
	var after = $(".dl-target").val();
	if(leader.length !=0 && after.length != 0){
		simulation_setting.addLinkById(leader,after);
	}
});
$(".ds-searching").click(function(){
	var target = $(".ds-target").val();
	if(target.length != 0){
		simulation_setting.searchLink(target);
	}
});
$(".test").mousedown(function(){
	var target = this.children[0];
	if($(target).css("display") == "none"){
		$(target).show();
	}else{
		$(target).hide();
	}
});
