//一进页面加载代码
function firstshow(){
	getdata(3);
}
firstshow();


function getdata(begin){
	var report_data = {
		list: [
		]
	};
	$.ajax({
    	type: "post",
    	url: "/list", 
    	data:{"begin":begin,"count":10,"sortType":"document_name","sortDir":"desc"},
    	dataType:"json", 
    	async: false,    
    	success: function(data) {
        	report_data.list = data.result;
			document.getElementById('doc').innerHTML = template('index', report_data);
    	},
    	error: function(data) {
        	document.write = $.parseJSON(data.responseText).error;
   		},     
	});
}



//下一页或上一页
function turnpage(){
	var pageOn = 0;
	for(var i=0;i<$("li").length;i++){
		if($("li").eq(i).hasClass("pageOn")){
			pageOn = i;
			console.log(pageOn);
		}
	}
	$("#next").click(function(){
		if(pageOn<($("li").length-1)){
			pageOn = pageOn + 1;
			// getdata(pageOn+1);
			$("li").eq(pageOn-1).removeClass("pageOn");
			$("li").eq(pageOn).addClass("pageOn"); 
		}		
	})
	$("#prev").click(function(){
		if(pageOn>=1){
			pageOn = pageOn - 1;
			// getdata(pageOn+1);
			$("li").eq(pageOn+1).removeClass("pageOn");
			$("li").eq(pageOn).addClass("pageOn");
		}
	})
}
turnpage();

//搜索
$(".search-submit").click(function(){
	$.ajax({
       	type: "post",
       	url: "/list",
       	data:"",     
       	success: function(data) {
       		console.log(data.result.document_id);
        },
        error: function(data) {
	        document.write = $.parseJSON(data.responseText).error;
    	},     
    }) 	
})