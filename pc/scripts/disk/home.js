var mouseclick = function(obj,color){
	$(obj).mousedown(function(){
		$(obj).css("background-color",color);
		$(obj).css("color","#000");
		console.log("mousedown");
	})
	$(obj).mouseup(function(){
		$(obj).css("background-color","#282828");
		$(obj).css("color","#fff");
		console.log("mousedown");
	})
}


mouseclick(".upload","#FFFFFF");
mouseclick(".report-logo","blue");

