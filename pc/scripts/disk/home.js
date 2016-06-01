window.onload = function () {
	$.ajax({
        type: "post",
        url: "/main_page",     
        success: function(data) {
           	console.log(data.result.document_id);
        },
        error: function(data) {
            document.write = $.parseJSON(data.responseText).error;
    	},     
    }) 
}
