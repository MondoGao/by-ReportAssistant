/*TMODJS:{"version":1,"md5":"2c42e708a1964439a00b13582cb5a92b"}*/
template('report_content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,result=$data.result,$escape=$utils.$escape,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="report-preview"> <div class="report-thumb-container clearfix"> ';
if(result.type === 'doc' || result.type === 'docx'){
$out+=' <img src="images/word.png"> ';
}else if(result.type === 'ppt' || result.type === 'pptx'){
$out+=' <img src="images/ppt.png"> ';
}else if(result.type === 'zip' || result.type === 'rar'){
$out+=' <img src="images/zip.png"> ';
}else if(result.type === 'pdf'){
$out+=' <img src="images/pdf.png"> ';
}
$out+=' <div> <h2>';
$out+=$escape(result.document_name);
$out+='</h2> <p class="report-thumb-info">';
$out+=$escape(result.grade);
$out+=' ';
$out+=$escape(result.institute);
$out+=' ';
$out+=$escape(result.class);
$out+='</p> <p class="download-count">已有';
$out+=$escape(result.downloads);
$out+='人下载</p> </div> </div> ';
if(!result.preview){
$out+=' <div class="report-miss-container"> <img src="images/report-preview-miss.png"> </div> ';
}else{
$out+=' <div class="report-ifr-container" id="report-ifr-container"> <!--<iframe src="';
$out+=$escape(result.preview);
$out+='" id="report-preview-file" scrolling="no" frameborder="0"></iframe>--> <iframe id="report-preview-file"></iframe> </div> ';
}
$out+=' <div class="report-download-bar"> <input type="hidden" value="';
$out+=$escape(result.downloadUrl);
$out+='" id="downloadLink"> <a href="javascript:;" class="report-download-button"> <span>下载</span> </a> </div> </div> <div class="report-related"> <h2>相关文档推荐</h2> <ul class="report-related-list"> ';
$each(result.related,function($value,$index){
$out+=' <li> <a href="report_detail.html?id=';
$out+=$escape($value.document_id);
$out+='" title="';
$out+=$escape($value.class);
$out+=' ';
$out+=$escape($value.document_name);
$out+='"> ';
if($value.type === 'doc' || $value.type === 'docx'){
$out+=' <img src="images/word.png"> ';
}else if($value.type === 'ppt' || $value.type === 'pptx'){
$out+=' <img src="images/ppt.png"> ';
}else if($value.type === 'zip' || $value.type === 'rar'){
$out+=' <img src="images/zip.png"> ';
}else if($value.type === 'pdf'){
$out+=' <img src="images/pdf.png"> ';
}
$out+=' <div> <h3>';
$out+=$escape($value.document_name);
$out+='</h3> <p>';
$out+=$escape($value.institute);
$out+='</p> </div> </a> </li> ';
});
$out+=' </ul> </div>';
return new String($out);
});