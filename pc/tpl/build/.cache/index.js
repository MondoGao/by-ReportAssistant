/*TMODJS:{"version":11,"md5":"dee58047453803d2b1f35feae7efa103"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header> <img src="images/logo.png" class="logo"> <div class="search-container"> <img src="images/header-bg.png"> <div> <div class="search"> <input type="text" id="search-input"> <a href="javascript:;" class="search-submit">搜索</a> </div> <a href="javascript:;" class="upload-file">上传文件</a> </div> </div> </header> <section> ';
$each(list,function($value,$index){
$out+=' <div class="report"> <a class="icon"> <div class="report-logo"> <img src="';
$out+=$escape($value.imgurl);
$out+='" alt=""> </div> </a> <div class="report-intro"> <a>';
$out+=$escape($value.title);
$out+='</a> <p>';
$out+=$escape($value.intro);
$out+='</p> <span>';
$out+=$escape($value.downNum);
$out+='</span> </div> </div> ';
});
$out+=' </section> <div class="changePage clear"> <img src="images/prev.png" alt=""> <ul> <li class="pageOn"><div>1</div></li> <li><div>2</div></li> <li><div>3</div></li> <li><div>4</div></li> <li><div>5</div></li> </ul> <img src="images/next.png" alt=""> </div>';
return new String($out);
});