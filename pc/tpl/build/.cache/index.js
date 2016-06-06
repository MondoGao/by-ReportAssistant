/*TMODJS:{"version":41,"md5":"ec01a7c2ab881a736cdece77e2036814"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header> <img src="images/logo.png" class="logo"> <div class="search-container"> <img src="images/header-bg.png"> <div> <div class="search"> <input type="text" id="search-input"> <a href="javascript:;" class="search-submit">搜索</a> </div> <a href="report_upload.html" class="upload-file" target="upload_window">上传文件</a> </div> </div> </header> <section> ';
$each(list,function($value,$index){
$out+=' <div class="report"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> ';
if($value.type === 'doc' || $value.type === 'docx'){
$out+=' <a class="icon word" href="report_detail.html?id=\'';
$out+=$escape($value.document_id);
$out+='\'" target="view_window"> <div class="report-logo"> <img src="images/word_logo.png" alt=""> </div> </a> ';
}else if($value.type === 'ppt' || $value.type === 'pptx'){
$out+=' <a class="icon ppt" href="report_detail.html?id=\'';
$out+=$escape($value.document_id);
$out+='\'" target="view_window"> <div class="report-logo"> <img src="images/ppt_logo.png" alt=""> </div> </a> ';
}else if($value.type === 'pdf'){
$out+=' <a class="icon pdf" href="report_detail.html?id=\'';
$out+=$escape($value.document_id);
$out+='\'" target="view_window"> <div class="report-logo"> <img src="images/pdf_logo.png" alt=""> </div> </a> ';
}else if($value.type === 'zip'){
$out+=' <a class="icon zip" href="report_detail.html?id=\'';
$out+=$escape($value.document_id);
$out+='\'" target="view_window"> <div class="report-logo"> <img src="images/zip_logo.png" alt=""> </div> </a> ';
}else if($value.type === 'rar'){
$out+=' <a class="icon zip" href="report_detail.html?id=\'';
$out+=$escape($value.document_id);
$out+='\'" target="view_window"> <div class="report-logo"> <img src="images/zip_logo.png" alt=""> </div> </a> ';
}
$out+=' <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </div> ';
});
$out+=' </section> <div class="changePage clear"> <img src="images/prev.png" alt="" id="prev"> <ul id="page_num"> <li><div>1</div></li> <li><div>2</div></li> <li><div>3</div></li> <li><div>4</div></li> <li><div>5</div></li> </ul> <img src="images/next.png" alt="" id="next"> </div>';
return new String($out);
});