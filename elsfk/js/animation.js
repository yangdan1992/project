// JavaScript Document
//检查坐标为(x,y)的单元格是否合法
function isCellValid(x, y){    
	//超出主面板边界，不合法
	if(x>17||x<0||y>9||y<0){    
		return false;    
	}
	//该单元格中已有内容，不合法
	if(board[x][y]==1){    
		return false;    
	}    
	return true;    
} 

//检查左边界  
function checkLeftBorder(){    
	for(var i=0; i<activeBlock.length; i++){    
		//已经在左边界
		if(activeBlock[i].y==0){    
			return false;    
		}
		//尝试向左移动一格,判断是否合法
		if(!isCellValid(activeBlock[i].x, activeBlock[i].y-1)){    
			return false;    
		}    
	}    
	return true;    
}

//左移动   
function moveLeft(){   
	//如果向左移动合法
	if(checkLeftBorder()){    
		//在原位置上清除方块形状
		erase();    
		//方块形状y值减1，即向左移动一格
		for(var i=0; i<4; i++){    
			activeBlock[i].y = activeBlock[i].y - 1;    
		} 
		//在新位置上绘制方块形状
		paint();    
	}    
}

//检查右边界
function checkRightBorder(){    
	for(var i=0; i<activeBlock.length; i++){ 
		//已经在右边界
		if(activeBlock[i].y==9){    
			return false;    
		}
		//尝试向右移动一格,判断是否合法
		if(!isCellValid(activeBlock[i].x, activeBlock[i].y+1)){    
			return false;    
		}    
	}    
	return true;    
}    

//右移动   
function moveRight(){ 
	//如果向右移动合法
	if(checkRightBorder()){    
		//在原位置上清除方块形状
		erase();    
		//方块形状y值加1，即向右移动一格
		for(var i=0; i<4; i++){    
			activeBlock[i].y = activeBlock[i].y + 1;    
		}  
		//在新位置上绘制方块形状
		paint();    
	}    
}   

//检查底边界
function checkBottomBorder(){    
	for(var i=0; i<activeBlock.length; i++){ 
		//已经在底边界
		if(activeBlock[i].x==17){    
			return false;    
		}
		//尝试向下移动一格,判断是否合法
		if(!isCellValid(activeBlock[i].x+1, activeBlock[i].y)){    
			return false;    
		}    
	}    
	return true;    
} 

//向下移动   
function moveDown(){   
	//如果向下移动合法   
	if(checkBottomBorder()){    
		//在原位置上清除方块形状  
	  	erase();    
	  	//方块形状x值加1，即向下移动一格
		for(var i=0; i<4; i++){   
		  activeBlock[i].x = activeBlock[i].x + 1;    
		}   
		//在新位置上绘制方块形状
		paint();    
	}   
	//否则表示已经触底
	else{   
		clearInterval(timer);   //停止当前的定时器, 也就是停止自动向下移动.   
		updateBoard();         //更新board数组，将对应方块形状单元格的值设置为1  
		var lines = deleteLine();   //判断是否需要消行  
		//如果有消行  
		if(lines!=0){   
			//计算分数，一次消多行则分数加倍  
			switch(lines){
				case 2:{ lines=3; break; }
				case 3:{ lines=6; break; }
				case 4:{ lines=10; break; }
			}
			score += lines;  //累加分数 
			document.getElementById("score").innerText=" " + score;   //在网页中更新分数
			
			eraseBoard();    //擦除整个面板    
			paintBoard();    //重绘面板
		}  
		erasePreview();      //擦除预览方块形状 
		//判断当前游戏主面板是否有位置放置下一个方块   
		//当前主面板无法放置该方块，即游戏结束
		if(!validateBlock(nextBlock)){
			alert("Game over!");   
			status = 2;     //设置游戏状态
			document.getElementsByTagName("input")[0].disabled = false;
			return;         //结束该函数
		};  
		activeBlock = nextBlock;   //将下一个方块设置为当前活动方块
		nextBlock = generateBlock();  //新生成一个方块作为下一个方块
		previewBlock = copyBlock(nextBlock);  //复制下一个方块作为预览方块
		paint();             //在主面板中绘制当前活动方块形状	
		applyPreview();      //调整预览方块的坐标
		paintPreview();      //在预览面板中绘制预览方块
		timer = setInterval("moveDown()",1000);   //开启定时器, 每隔一秒执行一次moveDown  
	}    
} 
//更新board数组   
function updateBoard(){    
	for(var i=0; i<4; i++){    
		board[activeBlock[i].x][activeBlock[i].y]=1;    
	}    
}
//判断当前游戏主面板是否有位置放置下一个方块
function validateBlock(block){  
	if(!block){  
		return false;  
	}  
	for(var i=0; i<4; i++){   
	  if(!isCellValid(block[i].x, block[i].y)){   
		  return false;   
	  }   
	}  
	return true;  
} 

//因为旋转之后可能会有方格覆盖已有的方格，因此先用一个tmpBlock,把activeBlock的内容都拷贝到tmpBlock,然后对tmpBlock尝试旋转, 如果旋转后检测发现没有方格产生冲突,则把旋转后的tmpBlock的值给activeBlock.   
function rotate(){
	//把当前活动方格拷贝给临时方格
	var tmpBlock = copyBlock(activeBlock);   
	//计算方格四个点的中心点，则这四个点围绕中心旋转90度
	//Math.round() 函数返回一个数字四舍五入后最接近的整数
	var cx = Math.round((tmpBlock[0].x + tmpBlock[1].x + tmpBlock[2].x + tmpBlock[3].x)/4);    
	var cy = Math.round((tmpBlock[0].y + tmpBlock[1].y + tmpBlock[2].y + tmpBlock[3].y)/4);    
	
	//旋转的主要算法. 可以这样分解来理解：先假设围绕原点旋转，然后再加上中心点的坐标。  
	for(var i=0; i<4; i++){    
		tmpBlock[i].x = cx+cy-activeBlock[i].y;   
		tmpBlock[i].y = cy-cx+activeBlock[i].x;   
	}
	
	//检查旋转后方格是否合法   
	for(var i=0; i<4; i++){    
		if(!isCellValid(tmpBlock[i].x,tmpBlock[i].y)){   
			return;   
		}   
	}   
	//如果合法, 擦除原方块   
	erase();    
	//将旋转后的临时方块赋值给activeBlock
	activeBlock = copyBlock(tmpBlock);
	//重画当前活动方块
	paint();    
}    