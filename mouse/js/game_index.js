// JavaScript Document
var djs_span,df_span,ksBtn,ztBtn,tzBtn,imgs;  //页面中的元素
var djs_id,jg_id,tl_id,play_id;  //定时器
var djs_data;//倒计时的时间
var dz=0,ld=0,df=0;//游戏计分

window.onload = function(){
	//获取HTML元素
	djs_span = document.getElementById("djs");  //获取游戏倒计时
	df_span = document.getElementById("defen");  //获取游戏得分
	ksBtn = document.getElementById("ksBtn");  //获取开始按钮
	ztBtn = document.getElementById("ztBtn");  //获取暂停按钮
	tzBtn = document.getElementById("tzBtn");  //获取停止按钮
	imgs = document.images;                    //获取网页中的图片，即表格单元格中的图片
	
	//设置暂停和停止按钮初始化状态，即在未开始游戏前不允许点击暂停和停止按钮
	ztBtn.disabled = true;
	tzBtn.disabled = true;
}

//游戏开始事件
function start(){
	dz = ld = df = 0;  //得分初始化
	djs_span.innerHTML = df_span.innerHTML = "";  //页面初始化，清空页面内倒计时和得分中的内容
	
	//默认游戏参数
	tl_time = 1;  //地鼠停留时间1秒
	jg_time = 1;  //地鼠出现间隔时间1秒
	sc_time = 60;  //游戏时长60秒

	//记录游戏开始时间（获取当前时间）
	start_Time = new Date();

	//执行倒计时方法
	djs(sc_time,start_Time);
	//执行地鼠出现的方法
	mouse_show();

	//设置游戏开始后按钮状态
	ksBtn.disabled = true;
	ztBtn.disabled = false;
	tzBtn.disabled = false;
}

//游戏暂停事件
function pause(){
	//判断暂停游戏or继续游戏
	if(ztBtn.textContent == "继续游戏"){
		//继续游戏
		ztBtn.textContent = "暂停游戏";  //将暂停按钮的文字设置为“暂停游戏”		
		
		sc_time = djs_span.innerHTML;  //获取倒计时中的时长，作为继续游戏的总时长
		start_Time = new Date();       //获取当前时间作为继续游戏的开始时间
		djs(sc_time,start_Time);	   //执行倒计时方法
		
		qingchang();                    //执行地鼠清场方法
		mouse_show();                   //执行地鼠出现的方法
	}else{
		//暂停游戏
		//清空计时设置
		clearTimeout(djs_id);
		clearTimeout(jg_id);
		clearTimeout(tl_id);
		
		ztBtn.textContent = "继续游戏";  //将暂停按钮的文字设置为“继续游戏”
	}
}

//游戏结束事件
function game_over(){
	//清空计时设置
	clearTimeout(tl_id);
	clearTimeout(jg_id);
	clearTimeout(djs_id);
	clearTimeout(play_id);
	
	djs_span.innerHTML = 0;  //将页面内倒计时中的内容设置为0

	qingchang();             //地鼠清场
		
	//设置游戏结束后按钮状态
	ksBtn.disabled = false;  //游戏结束后，恢复开始按钮
	ztBtn.disabled = true;   //游戏结束后，如果没有点击开始按钮，则不允许点击暂停按钮
	ztBtn.textContent = "暂停游戏";
}

//倒计时方法
function djs(remain_time,start_time){
	//实时记录游戏时间
	var game_time = new Date();
	//计算倒计时 = 游戏时长（60秒） - （当前时间-游戏开始时间）/1000(毫秒转化为秒)
	djs_data = remain_time - parseInt((game_time-start_time)/1000);

	//显示倒计时
	djs_span.innerHTML = djs_data;

	if(djs_data < 1 ){
		alert("游戏结束");
		game_over();  //执行游戏结束方法
		return;       //结束倒计时方法
	}

	//倒计时的计时器，1000毫秒（1秒）后执行djs()方法，由于该计时器在djs()方法中，所以能够起到循环调用的效果
	djs_id = setTimeout("djs(sc_time,start_Time)",1000);
}

//地鼠清场
function qingchang(){
	for (var i=0;i<imgs.length;i++) {
		imgs[i].src = "img/00.jpg";
	}
}

//地鼠出现方法
function mouse_show(){
	//生成随机的数组下标
	var i = parseInt(Math.random()*imgs.length);
	//随机改变图片
	imgs[i].src = "img/01.jpg";

	//地鼠出现间隔
	jg_id = setTimeout("mouse_show()",jg_time*1000);
	//地鼠停留时间
	tl_id = setTimeout("mouse_hide("+i+")",tl_time*1000);

}

//地鼠消失，没打中
function mouse_hide(i){
	//substr() 方法可在字符串中抽取从start下标开始的指定数目的字符
	//如果图像的路径为"img/01.jpg"，则长度为12，该语句的含义为从"img/01.jpg"中抽取从第7位开始的一个字符，即为1
	var name = imgs[i].src.substr(imgs[i].src.length-5,1);

	//如果满足条件，则当前网页中显示的图片为01.jpg，即没有打中地鼠
	if(name == 1){
		imgs[i].src = "img/00.jpg";  //将图片替换为00.jpg，即地鼠消失
		//计分
		ld++;  //漏掉数量+1
		df--;  //分数减1
		if(df<=0) df = 0;
		df_span.innerHTML = "打中"+dz+"只，漏掉"+ld+"只，得分"+df;  //将得分在网页中输出
	}
}

//打中地鼠
function play(obj){
	//获取图片的名称
	var name = obj.src.substr(obj.src.length-5,1);

	//如果满足条件，则当前点击的单元格内有地鼠，即打中地鼠
	if(name == 1){
		obj.src = "img/02.jpg";  //将图片替换为02.jpg，显示打中地鼠图片
		//计分
		dz++;  //打中数+1
		df+=2;  //分数加2
		df_span.innerHTML = "打中"+dz+"只，漏掉"+ld+"只，得分"+df;  //将得分在网页中输出

		//打中后还原
		play_id = setTimeout(function(){
			obj.src = "img/00.jpg";
		},500);
	}else{
		df--; //如果点击的单元格内无地鼠，则分数减1
	}
}