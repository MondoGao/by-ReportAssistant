/*TMODJS:{"version":1,"md5":"48272bd96eb864a0dade89474f74b641"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<header> <div class="header-one clear"> <div class="logo1"><img src="images/logo1.png" alt=""></div> <div class="bk"><img src="images/bk.png" alt=""></div> </div> <div class="header-two clear"> <div class="logo2"><img src="images/logo2.png" alt=""></div> ';
include('./search');
$out+=' </div> </header> <section> ';
$each(list,function($value,$index){
$out+=' <div class="report"> <div class="icon"> <img src="';
$out+=$escape($value.imgurl);
$out+='" alt=""> </div> <div class="report-intro"> <a>';
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