//一进页面加载代码
function firstshow(){
	getdata(1);
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
    	data:{"begin":begin,"count":10},
    	dataType:"json", 
    	async: false,    
    	success: function(data) {
    		if(data.pageSize <= 1){
                $(".changePage").css("display","none");
            }else{
                var pageHtml="";
                for(var i=0;i<data.pageSize;i++){
                    pageHtml += "<li><div>"+parseInt(i+1)+"</div></li>";
                }
                var pageNum = document.getElementById('page_num');
                pageNum.innerHTML = pageHtml;
            }
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
	$("li").eq(0).addClass("pageOn");
	$("#next").click(function(){
		if(pageOn<($("li").length-1)){
			pageOn = pageOn + 1;
			getdata(pageOn+1);
			$("li").eq(pageOn-1).removeClass("pageOn");
			$("li").eq(pageOn).addClass("pageOn"); 
		}	
	})
	$("#prev").click(function(){
		if(pageOn>=1){
			pageOn = pageOn - 1;
			getdata(pageOn+1);
			$("li").eq(pageOn+1).removeClass("pageOn");
			$("li").eq(pageOn).addClass("pageOn");
		}
	})
	for(var j=0;j < $("li").length;j++){
		$("li").eq(j).click((function(j){
			return function (){
					console.log(j);
					getdata(j+1);
					$("li").eq(pageOn).removeClass("pageOn");
					$("li").eq(j).addClass("pageOn");
					pageOn = j;				
				}
		})(j));
	}
}
turnpage();

//搜索
//1.点击搜索
$(".search-submit").click(function(){
	if($("#search-input").val()){
		var searchkey = encodeURIComponent($("#search-input").val());
		console.log(searchkey);
		window.open('report_search.html?search=' + searchkey);
	}
})
//2.回车搜索
document.onkeydown = function(event){               
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e.keyCode==13)
    {
        $(".search-submit").trigger("click");   
        return false;                               
    }
}

//增加进入详情面的点击热键
$(".report").click(function(){
	var detailURL = $("input[type='hidden']").val();
	window.open("report_detail.html?id="+detailURL);
})