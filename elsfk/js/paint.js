// JavaScript Document 

//生产方块形状, 有7种基本形状.   
function generateBlock(){    
	var block = new Array(4);    
	//generate a random int number between 0-6;    
	var t = (Math.floor(Math.random()*20)+1)%7;    
	//方块形状位置的设置：x表示行，y表示列，游戏主面板左上角为（0,0），向下向右数值依次增大，由于方块形状最多为3行，
	//所以x取值从0-2.因为方块形状最多为4列，并且要显示在主面板中间，所以y取值从3-6
	switch(t){  
		case 0:{    
			block[0] = {x:0, y:4};    
			block[1] = {x:1, y:4};    
			block[2] = {x:0, y:5};    
			block[3] = {x:1, y:5};    
			break;    
		}    
		case 1:{    
			block[0] = {x:0, y:3};    
			block[1] = {x:0, y:4};    
			block[2] = {x:0, y:5};    
			block[3] = {x:0, y:6};    
			break;    
		}    
		case 2:{    
			block[0] = {x:0, y:5};    
			block[1] = {x:1, y:4};    
			block[2] = {x:1, y:5};    
			block[3] = {x:2, y:4};    
			break;    
		}    
		case 3:{    
			block[0] = {x:0, y:4};    
			block[1] = {x:1, y:4};    
			block[2] = {x:1, y:5};    
			block[3] = {x:2, y:5};    
			break;    
		}    
		case 4:{    
			block[0] = {x:0, y:4};    
			block[1] = {x:1, y:4};    
			block[2] = {x:1, y:5};    
			block[3] = {x:1, y:6};    
			break;    
		}    
		case 5:{    
			block[0] = {x:0, y:4};    
			block[1] = {x:1, y:4};    
			block[2] = {x:2, y:4};    
			block[3] = {x:2, y:5};    
			break;    
		}    
		case 6:{    
			block[0] = {x:0, y:5};    
			block[1] = {x:1, y:4};    
			block[2] = {x:1, y:5};    
			block[3] = {x:1, y:6};    
			break;    
		}   
	}  
	return block;   
}
   
//绘制方块形状   
function paint(){    
	for(var i=0; i<4; i++){    
		tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor="#0A2F51";    
	}    
}  
//擦除方块形状
function erase(){    
	for(var i=0; i<4; i++){    
		tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor="white";    
	}    
} 
//绘制预览方块形状  
function paintPreview(){  
	for(var i=0; i<4; i++){  
		preTbl.rows[previewBlock[i].x].cells[previewBlock[i].y].style.backgroundColor="#0A2F51";  
	}  
} 
//擦除预览方块形状  
function erasePreview(){  
	for(var i=0; i<4; i++){  
		preTbl.rows[previewBlock[i].x].cells[previewBlock[i].y].style.backgroundColor="white";  
	}  
}
//擦除整个面板   
function eraseBoard(){   
	for(var i=0; i<18; i++){   
		for(var j=0; j<10; j++){   
			tbl.rows[i].cells[j].style.backgroundColor = "white";   
		}   
	}   
}   
//重绘整个面板   
function paintBoard(){   
	for(var i=0;i<18;i++){   
		for(var j=0; j<10; j++){    
		  if(board[i][j]==1){   
			tbl.rows[i].cells[j].style.backgroundColor = "#0A2F51";   
		  }   
		}    
	}    
} 

//产生一个空白行.   
function generateBlankLine(){   
	var line = new Array(10);   
	for(var i=0; i<10; i++){   
		line[i] = 0;   
	}   
	return line;   
}   
//消行   
function deleteLine(){   
	var lines = 0;  //可消行的行数 
	for(var i=0; i<18; i++){      
		for(var j=0; j<10; j++){   
			if(board[i][j]==0) break;  //判断单元格内是否被占据
		}   
		//一整行均被占据，即可以消行
		if(j==10){   
			lines++;   //可消行行数+1
			//当前行数不是第一行
			if(i!=0){ 
				//将被消行上面行的内容分别下移一行
				for(var k=i-1; k>=0; k--){   
					board[k+1] = board[k];   
				}   
			}   
			board[0] = generateBlankLine();  //在游戏主面板第一行添加一行空白行   
		}   
	}   
	return lines;   
}   


//辅助函数，拷贝一个图形。  
function copyBlock(old){  
	var o = new Array(4); 
	//初始化方块形状
	for(var i=0; i<4; i++){    
		o[i] = {x:0, y:0};    
  	} 
	//将old形状拷贝给o
  	for(var i=0; i<4; i++){    
	  o[i].x = old[i].x;    
	  o[i].y = old[i].y;    
	}  
	return o;  
}  
//调整previewBlock的坐标以适应预览窗口  
function applyPreview(){  
	var t = 100;  
	//寻找previewBlock最小的y值
	for(var i=0; i<4; i++){  
		if(previewBlock[i].y<t){  
			t = previewBlock[i].y;  
		}  
	}
	//将所有previewBlock中的y值都减去最小的y值
	//这样处理的原因在于为了能够让方块形状显示在主面板中间位置，所有方块形状的y值设置为3-6，但是预览面板仅有4个单元格，y取值为0-3，所以需要对方块形状的y值进行处理
	for(var i=0; i<4; i++){  
		previewBlock[i].y-=t;  
	}  
}