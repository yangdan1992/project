// JavaScript Document
/*
    项目：拼图游戏
*/

window.onload = function() {
    create_pic();
};

/* 检查产生的随机数列是否是合理的，因为有可能出现恢复不到原图的情况 */
function check_random_isValid(random_arr) {
    var num = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = i+1; j < 9; j++) {
            if (random_arr[j] < random_arr[i]) {
                num++;
            }
        }
    }
    return num%2===0;
}

var count = 0;  //识别图像序号

/* 产生拼图 */
function create_pic() {
	//获取网页中的拼图容器
    picture = document.getElementById("picture");
	//生成9个拼图块，并设置每个拼图块的样式和id
    for (var i = 1; i <= 9; i++) {
		//创建div标签存放拼图块
        var part = document.createElement("div");
        part.addEventListener("click", pic_move);
		//设置拼图块样式
        part.className = "picture_part" + count + " position_"+ i;
		//将拼图块添加到拼图容器中
        picture.appendChild(part);
		//设置拼图块id
        part.id = "_position_" + i;
    }
}

/* 改变图片 */
function change_img() {
    //判断当前图片序号(共3幅，序号分别为0,1,2)
	if (count < 2) count++;  //如果序号小于2，则序号加1，显示下一幅图片
    else count = 0;  //如果需要大于等于2，则意味着当前图片为最后一幅图片，所以讲count变为0.重新显示第一幅图片
    //将网页中拼图容器中子节点的类改为当前图片
	for (var i = 0; i < 9; i++) {
        picture.childNodes[i].className += " picture_part" + count;
    }
}

/* 产生随机数列定义位置 */
function random_pos() {
	//初始化游戏状态，将游戏状态当中的内容清空
    document.getElementById("result").innerText = "";
    //产生随机数列前先将拼图块对应的位置复位
    for (var i = 1; i <= 9; i++) {
        document.getElementById("_position_" + i).className="picture_part" + count + " position_" + i;
    }
	
    random_arr = new Array();
    for (var j = 0; j < 8; j++) {
        random_arr[j] = j+1;
    }
    //利用sort和cmp进行随机打散
	while(1) {
		//函数cmp：如果0.5比生成的随机数大，则返回大于0的值；如果0.5比生成的随机数小，则返回小于0的值；如果两者相等，则返回0
        random_arr.sort(function cmp() { return 0.5-Math.random(); });
        //判断产生的随机数列是否合理，如果合理则退出循环，否则继续产生随机数列
		if (check_random_isValid(random_arr)) {
            break;
        }
    }
	
	//定义变量part获取网页中拼图容器中的子节点，即拼图块的集合
    var part = document.getElementById("picture").childNodes;
    /* 通过更改类名来改变位置 */
    for (var i = 0; i < 8; i++) {
        part[i].className = "picture_part" + count + " position_" + random_arr[i];
    }
}

/* 点击图片触发的事件处理器 */
function pic_move() {
	//获取空白拼图块
    var blank_pic_offset = document.getElementById("_position_9");
	//获取空白拼图块相对于版面的顶端位置
    var blank_pic_offset_top = blank_pic_offset.offsetTop;
	//获取空白拼图块相对于版面的左端位置
    var blank_pic_offset_left = blank_pic_offset.offsetLeft;
	//获取当前被点击拼图块相对于版面的顶端位置
    var _offset_top = this.offsetTop;
	//获取当前被点击拼图块相对于版面的左端位置
    var _offset_left = this.offsetLeft;
    
	//判断点击的图片块是否与空格块相邻(上下相邻、左右相邻)
	//abs() 方法可返回数的绝对值
    if ((Math.abs(blank_pic_offset_top-_offset_top) == 110 && blank_pic_offset_left == _offset_left) || (Math.abs(blank_pic_offset_left-_offset_left) == 110 && blank_pic_offset_top == _offset_top)) {
        //将当前被点击拼图块与空白拼图块的样式交换，即实现两个拼图块的交换
		var str = blank_pic_offset.className;
        blank_pic_offset.className = this.className;
        this.className = str;
		// 检查是否还原原图
        check();
    }
}

/* 检查是否还原原图 */
function check() {
    for (var i = 1; i <= 9; i++) {
        var item = document.getElementById("_position_" + i);
        if (item.className != "picture_part" + count +" position_" + i) {
            //没有完成拼图，将游戏状态文本设置为“Continue...”
			document.getElementById("result").innerText = "Continue...";
            //结束判断
			return;
        }
    }
	//完成拼图，将游戏状态文本设置为“You Win!”
    document.getElementById("result").innerText = "You Win!";
}