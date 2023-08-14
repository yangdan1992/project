// JavaScript Document
//以下部分为表现层部分,包括绘图, 初始化矩阵, 绑定鼠标事件...
//全局变量
var tbl;//显示布局的table元素
var X = 14;//表格总行数
var Y = 14;//表格总列数
var types = 15;//图形种类
//布局矩阵
//为了算法方便，矩阵的第一行，第一列，最后一行，最后一列都标注为0，天然通路。
//因此页面中表格的实际行数为X-2，实际列数为Y-2
var arr = new Array(Y);
var p1 = null;//搜索路径用的第1个点的坐标
var p2 = null;//搜索路径用的第2个点的坐标
var e1 = null;//第1个点对应的元素
var e2 = null;//第2个点对应的元素
var timer;   //定时器

//如果时间数值小于10，则在前面补充0
function two_char(n) {
	return n >= 10 ? n : "0" + n;  //条件运算符，如果n>=10成立，则返回n；如果不成立，则返回"0"+n
}
//设置游戏计时
function time_show(){
	var sec = 0;
	timer = setInterval(function(){
		sec++;
		var date = new Date(0,0);
		date.setSeconds(sec);
		var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
		document.getElementById("time").innerHTML = two_char(h) + ":" + two_char(m) + ":" + two_char(s);
	}, 1000);
}

//初始化
function init(){
	var tbl = document.getElementById("tbl");
	//构造table，表格的第一行、第一列、最后一行、最后一列的图片可以通过外围直接连接，因此需要分别空出2行2列
	for(var row=0;row<Y-2;row++){
		var tr=tbl.insertRow(0);       //insertRow() 方法用于在表格中的指定位置插入一个新行
		for(var col=0;col<X-2;col++) {
			var td=tr.insertCell(0);   //insertCell()方法用于在HTML表的一行的指定位置插入一个空的<td>元素
		}
	}
	//构造图片库
	var imgs = new Array(30);
	for(var i=1; i<=30; i++){
		imgs[i] = i + '.jpg';
	}
	//构造矩阵并初始化，0表示该单元格中无内容，1表示该单元格中有内容
	for(var i=0; i<Y; i++){
		arr[i] = new Array(X);
		for(var j=0; j<X; j++){
			arr[i][j] = 0;
		}
	}
	var total = (X-2)*(Y-2);
	var tmp = new Array(total);//产生随机位置用
	//随机数组初始化
	for(var i=0; i<total; i++){
		tmp[i] = 0;
	}
	//生成随机数组
	for(var i=0; i<total; i++){
		if(tmp[i]==0){
			//因为对随机数进行了向下取整，为了保证所有类型都有，所以需要+1
			var t = Math.floor(Math.random()*types) + 1;  
			tmp[i] = t;
			//找到与tmp[i]对应的另一个随机位置，放置同样的图片，保证每幅图片成对出现
			while(true){
				var c = Math.floor(Math.random()*(total-i)) + i;
				if(tmp[c]==0){
					tmp[c] = t;
					break;
				}
			}
		}
	}
	var c = 0;
	//在单元格中按照生成的随机数组填充图片
	for(var i=1; i<Y-1; i++){
		for(var j=1; j<X-1; j++){
			arr[i][j] = tmp[c++];
			tbl.rows[i-1].cells[j-1].innerHTML = '<img src="img/' + imgs[arr[i][j]] + '" />';
		} 
	}
	time_show();  //设置游戏计时
	//绑定鼠标事件
	var img1, img2;
	document.body.onclick = function(e){
		//IE下,event对象有srcElement属性,但是没有target属性;Firefox下,event对象有target属性,但是没有srcElement属性.
		//但他们的作用是相当的，即：firefox 下的 event.target = IE 下的 event.srcElement 
		//通过document.all能够判断当前浏览器是否为ie，如果为ie浏览器，则el=event.srcElement；如果不是ie浏览器，则el=e.target
		var el = document.all?event.srcElement:e.target;
		//如果点击的不是单元格内容，则结束该方法
		if(el.parentNode.tagName!='TD'){
			return;
		}
		//如果第一次点击图片，则el为img1
		if(!img1){
			img1 = el;
		}
		//如果第二次点击图片，则el为img2
		else{
			img2 = el;
		}
		//设置被点击图片的边框样式
		el.style.border = 'solid #3399FF 2px';
		//获取el的父节点，即td单元格
		el = el.parentNode;
		//如果当前单元格中无内容
		if(el.innerHTML==""){
			p1 = p2 = e1 = e2 = null;
		}
		//获取被点击单元格所在的行数和列数
		var r = el.parentNode.rowIndex +1;
		var c = el.cellIndex +1;
		//如果p1为空，即为点击的第一幅图片
		if(p1==null){
			p1 = {x:c, y:r};
			e1 = el;
		}
		//如果p1不为空，即当前点击的为第二幅图片
		else{
			p2 = {x:c, y:r};
			e2 = el;
			//如果两点不是同一点，且两点中的图片为同一幅
			if(!equal(p1, p2)&&e1.innerHTML==e2.innerHTML){
				//验证p1和p2之间是否存在路径
				var path = getPath(p1, p2);
				//如果存在路径
				if(path!=null){
					//消除e1和e2两个单元格内的内容
					e1.innerHTML = e2.innerHTML = "";
					//设置arr数组中两个单元格的状态
					arr[p1.y][p1.x] = arr[p2.y][p2.x] = 0;
				}
			}
			//清空被点击图片的边框样式
			img1.style.border = "solid #fff 2px";
			img2.style.border = "solid #fff 2px";
			//清空变量，为下一次消除做准备
			p1 = p2 = e1 = e2 = img1 = img2 = null;
			
			//判断是否游戏结束
			var flag = 0;
			for(var i=1; i<Y-1; i++){
				for(var j=1; j<X-1; j++){
					if(arr[i][j] != 0) {
						flag = 1;  //单元格内不为空
						break;
					}
				}
				if(flag == 1) break;
			}
			if(flag == 0){
				alert("恭喜您，游戏通关！用时" + document.getElementById("time").innerHTML);
				clearInterval(timer);
			}
		}
	}
}