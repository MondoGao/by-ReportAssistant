/*TMODJS:{"version":53,"md5":"d3c9908c78750c0694238b2a210d606d"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header> <img src="images/logo.png" class="logo"> <div class="search-container"> <img src="images/header-bg.png"> <div> <div class="search"> <input type="text" id="search-input"> <a href="javascript:;" class="search-submit">搜索</a> </div> <a href="report_upload.html" class="upload-file" target="upload_window">上传文件</a> </div> </div> </header> <section> ';
$each(list,function($value,$index){
$out+=' ';
if($value.type === 'doc' || $value.type === 'docx'){
$out+=' <a class="report" href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" target="view_window"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> <div class="icon word"> <div class="report-logo"> <img src="images/word_logo.png" alt=""> </div> </div> <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </a> ';
}else if($value.type === 'ppt' || $value.type === 'pptx'){
$out+=' <a class="report" href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" target="view_window"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> <div class="icon ppt" > <div class="report-logo"> <img src="images/ppt_logo.png" alt=""> </div> </div> <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </a> ';
}else if($value.type === 'pdf'){
$out+=' <a class="report" href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" target="view_window"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> <div class="icon pdf" > <div class="report-logo"> <img src="images/pdf_logo.png" alt=""> </div> </div> <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </a> ';
}else if($value.type === 'zip'){
$out+=' <a class="report" href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" target="view_window"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> <div class="icon zip" > <div class="report-logo"> <img src="images/zip_logo.png" alt=""> </div> </div> <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </a> ';
}else if($value.type === 'rar'){
$out+=' <a class="report" href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" target="view_window"> <input type="hidden" value="';
$out+=$escape($value.document_id);
$out+='"> <div class="icon zip" > <div class="report-logo"> <img src="images/zip_logo.png" alt=""> </div> </div> <div class="report-intro"> <a>';
$out+=$escape($value.document_name);
$out+='</a> <p>';
$out+=$escape($value.grade);
$out+='&nbsp;';
$out+=$escape($value.institute);
$out+='&nbsp;';
$out+=$escape($value.class);
$out+='</p> <span>已有';
$out+=$escape($value.downloads);
$out+='人下载</span> </div> </a> ';
}
$out+=' ';
});
$out+=' </section> ';
return new String($out);
});