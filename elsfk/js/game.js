// JavaScript Document
//表示页面中的table, 这个table就是将要显示游戏的主面板   
var tbl;   
//预览窗口  
var preTbl;   
//游戏状态 0: 未开始;1 运行; 2 中止;   
var status = 0;    
//定时器, 定时器内将做moveDown操作   
var timer;   
//分数   
var score = 0;   
//board是一个18*10的二维数组,也和页面的table对应.   
//用来标注哪些方格已经被占据. 初始时都为0, 如果被占据则为1   
var board = new Array(18);   
for(var i=0;i<18;i++){   
	board[i] = new Array(10);    
}
//当前活动的方块, 它可以左右下移动, 变型.当它触底后, 将会更新board;   
var activeBlock;  
//下一个图形  
var nextBlock;  
//下一个图形预览  
var previewBlock; 

//开始游戏  
function begin(obj){   
	obj.disabled = true;                           //游戏开始后不能再点击按钮  
	status = 1;                                    //设置游戏状态为运行
	tbl = document.getElementById("board");        //获取网页中的主面板
	preTbl = document.getElementById("preBoard");  //获取网页中的预览面板
	//游戏初始化设置
	eraseBoard();                                  //擦除主面板当中的内容
	//board数组初始化
	for(var i=0;i<18;i++){    
		for(var j=0; j<10; j++){    
			board[i][j] = 0;    
		}    
	}
	activeBlock = generateBlock();  			   //生成当前活动方块
	nextBlock = generateBlock();                   //生成下一个方块
	previewBlock = copyBlock(nextBlock);           //将下一个方块拷贝给预览方块
	paint();                                       //在主面板中绘制当前活动方块
	applyPreview();                                //调整预览方块坐标
	paintPreview();                                //在预览面板中绘制预览方块
	timer = setInterval("moveDown()",1000);        //开启定时器，实现方块自动下移效果
}  
//捕捉键盘按键事件
document.onkeydown = function(){    
	//如果当前不是运行状态，则终止该函数
	if(status!=1){   
		return;   
	}
	//获取键盘按键
	var code = event.keyCode;    
	//判断当前按下哪个键盘键
	switch(code){    
		//左箭头
		case 37:{   
			moveLeft();   
			break;    
		}
		//上箭头
		case 38:{   
			rotate();    
			break;    
		}
		//右箭头
		case 39:{    
			moveRight();    
			break;   
		}
		//下箭头
		case 40:{    
			moveDown();    
			break;    
		}    
	}    
}; 