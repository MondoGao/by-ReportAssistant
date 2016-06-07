function firstshow(){
    var hrefPra = gethref();
    var searchKey = decodeURI(hrefPra[hrefPra.length-1]);
	getdata(1,searchKey,1);
    console.log(searchKey);
}
firstshow();


function getdata(begin,searchKey,firstIn){
	var report_data = {
		list: [
		]
	};
	$.ajax({
    	type: "post",
    	url: "/list", 
    	data:{"begin":begin,"count":10,"keyword":searchKey},
    	dataType:"json", 
    	async: false,    
    	success: function(data) {
            if(firstIn){
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
            }
        	report_data.list = data.result;
			document.getElementById('doc').innerHTML = template('index', report_data);
    	},
    	error: function(data) {
        	document.write = $.parseJSON(data.responseText).error;
   		},     
	});
}

function gethref(){
    var href = window.location.href;
    console.log(href);
    var hrefPra = href.split("=");
    return hrefPra;
}

//搜索
//1.点击搜索
$(".search-submit").click(function(){
    if($("#search-input").val()){
        var searchkey = encodeURIComponent($("#search-input").val());
        console.log(searchkey);
        window.location.href ='report_search.html?search=' + searchkey;
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
