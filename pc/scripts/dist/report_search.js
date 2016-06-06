function firstshow(){
    var hrefPra = gethref();
    var searchKey ='"'+hrefPra[hrefPra.length-1]+'"';
	getdata(1,searchKey);
}
firstshow();


function getdata(begin,searchKey){
	var report_data = {
		list: [
		]
	};
	$.ajax({
    	type: "post",
    	url: "/list", 
    	data:{"begin":begin,"count":10,"sortType":"document_name","sortDir":"desc","search":searchKey},
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

function gethref(){
    var href = window.location.pathname;
    var hrefPra = href.split("/");
    return hrefPra;
}

$(".search-submit").click(function(){
    if($("#search-input").val()){
        console.log("1");
        window.location.href = "report_search.html?search=" + $("#search-input").val();
    }
})