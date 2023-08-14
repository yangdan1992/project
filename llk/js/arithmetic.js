// JavaScript Document
//以下部分为路径搜索算法部分,与表现层无关
//路径搜索，给出两个点，搜索出通路
//通路用可连通的点表示
//x表示纵向，y表示横向，游戏主面板左上角为（0,0），向下向右数值依次增大
function getPath(p1, p2){
	//开始搜索前对p1,p2排序，使p2尽可能的在p1的右下方。
	//这样做可以简化算法
	if(p1.x>p2.x){
		var t = p1; 
		p1 = p2;
		p2 = t; 
	}
	else if(p1.x==p2.x){
		if(p1.y>p2.y){
			var t = p1; 
			p1 = p2;
			p2 = t; 
		}
	}
	//通过分析连连看中两点之间的位置关系，逐步由简到难分析每一种类型
	//第一种类型，两点在一条直线上，而且两点之间可直线连通
	if((onlineY(p1, p2)||onlineX(p1, p2)) && hasLine(p1, p2)){
		status = 'type 1';
		return [p1,p2];
	}
	//第二种类型，如果两点中任何一个点被全包围，则不通
	//p1被全包围
	if( !isEmpty({x:p1.x, y:p1.y+1}) && !isEmpty({x:p1.x, y:p1.y-1}) && !isEmpty({x:p1.x-1, y:p1.y}) && !isEmpty({x:p1.x+1, y:p1.y}) ){
		status = 'type 2';
		return null;
	}
	//p2被全包围
	if( !isEmpty({x:p2.x, y:p2.y+1}) && !isEmpty({x:p2.x, y:p2.y-1}) && !isEmpty({x:p2.x-1, y:p2.y}) && !isEmpty({x:p2.x+1, y:p2.y}) ){
		status = 'type 2';
		return null;
	}
	//第三种类型，两点在一条直线上，但是不能直线连接，需要用折线连接
	//每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通
	var pt0, pt1, pt2, pt3;
	//如果都在x轴（纵轴），则自左至右扫描可能的路径，
	if(onlineX(p1, p2)){
		//遍历每一列
		for(var i=0; i<Y; i++){
			//如果当前列为p1点所在列，则跳过，进行下一个循环（因为p1、p2两点在一列，且不能直线连接）
			if(i==p1.y){
				continue;
			}
			pt0 = p1;
			pt1 = {x: p1.x, y: i};
			pt2 = {x: p2.x, y: i};
			pt3 = p2;
			//如果顶点不为空，则该路不通，进行下一个循环
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
				return [pt0, pt1, pt2, pt3];
			}
		}
	}
	//如果都在y轴（横轴），则自上至下扫描可能的路径，
	//每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通
	if(onlineY(p1, p2)){
		//遍历每一行
		for(var j=0; j<X; j++){
			//如果当前行为p1点所在行，则跳过，进行下一个循环（因为p1、p2两点在一行，且不能直线连接）
			if(j==p1.x){
				continue; 
			}
			pt0 = p1;
			pt1 = {x:j, y:p1.y};
			pt2 = {x:j, y:p2.y};
			pt3 = p2;
			//如果顶点不为空，则该路不通，进行下一个循环
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
				return [pt0, pt1, pt2, pt3];
			}
		}
	}
	//第四种类型，两点不在一条直线上
	//同样，每次构造4个顶点，看是否可通
	//从左至右遍历每一列
	for(var k=0; k<Y; k++){
		pt0 = p1;
		pt1 = {x:p1.x, y:k};
		pt2 = {x:p2.x, y:k};
		pt3 = p2;
		status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
		//特殊情况，如果pt0和pt1重合
		if(equal(pt0,pt1)){
			//如果pt2不为空，则此路不通，进行下一个循环
			if(!isEmpty(pt2)){
				continue;
			}
			//如果3点之间存在连线
			if( hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				return [pt1, pt2, pt3];
			}
			else{
				continue;
			}
		}
		//特殊情况，如果pt2和pt3重合
		else if(equal(pt2,pt3)){
			//如果pt1不为空，则此路不通，进行下一个循环
			if(!isEmpty(pt1)){
			 continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) ){
			 return [pt0, pt1, pt2];
			}
			else{
			 continue;
			}
		}
		//如果pt1, pt2都不为空,则不通，进行下一个循环
		if(!isEmpty(pt1) || !isEmpty(pt2)){
			continue;
		}
		if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
			return [pt0, pt1, pt2, pt3];
		}
	}
	//从上至下扫描每一行
	for(var k=0; k<X; k++){
		pt0 = p1;
		pt1 = {x:k, y:p1.y};
		pt2 = {x:k, y:p2.y};
		pt3 = p2;
		status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
		//特殊情况，如果pt0和pt1重合
		if(equal(pt0,pt1)){
			//如果pt2不为空，则此路不通，进行下一个循环
			if(!isEmpty(pt2)){
				continue;
			}
			//如果3点之间存在连线
			if( hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				return [pt1, pt2, pt3];
			}
		}
		//特殊情况，如果pt2和pt3重合
		if(equal(pt2,pt3)){
			//如果pt1不为空，则此路不通，进行下一个循环
			if(!isEmpty(pt1)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) ){
				return [pt0, pt1, pt2];
			}
		}
		//如果pt1, pt2都不为空,则不通，进行下一个循环
		if(!isEmpty(pt1) || !isEmpty(pt2)){
			continue;
		}
		if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
			return [pt0, pt1, pt2, pt3];
		}
	}
	return null;
	/********** end type 4 **************/
}
//判断两点是否为同一点
function equal(p1, p2){
	return ((p1.x==p2.x)&&(p1.y==p2.y));
}
//判断两点是否在同一列
function onlineX(p1, p2){
	return p1.y==p2.y;
}
//判断两点是否在同一行
function onlineY(p1, p2){
	return p1.x==p2.x; 
}
//判断点内是否有图像
function isEmpty(p){
	return (arr[p.y][p.x]==0); 
}
//判断两点之间是否能连线
function hasLine(p1, p2){
	//存在以下三种情况
	//情况1：两点为同一点
	if(p1.x==p2.x&&p1.y==p2.y){
		return true; 
	}
	//情况2：两点在同一行
	else if(onlineY(p1, p2)){
		//i表示两点中位于左侧点的横坐标
		var i = p1.y>p2.y?p2.y:p1.y;
		i = i+1;
		//max表示两点中位于右侧点的横坐标
		var max = p1.y>p2.y?p1.y:p2.y;
		//遍历两点间是否有其他图片
		for(; i<max; i++){
			var p = {x: p1.x, y: i};
			//如果两点间存在其他图片，则意味着该两点之间不能连线，结束循环
			if(!isEmpty(p)){
				break;
			}
		}
		//如果i=max意味着上述循环完整运行，表明两点间不存在其他图片，可以连线
		if(i==max){
			return true;
		}
		return false;
	}
	//情况3：两点在同一列
	else if(onlineX(p1, p2)){
		//j表示两点中位于上方点的纵坐标
		var j = p1.x>p2.x?p2.x:p1.x;
		j = j+1;
		//max表示两点中位于下方点的纵坐标
		var max = p1.x>p2.x?p1.x:p2.x;
		//遍历两点间是否有其他图片
		for(; j<max; j++){
			var p = {x: j, y: p1.y};
			//如果两点间存在其他图片，则意味着该两点之间不能连线，结束循环
			if(!isEmpty(p)){
				break
			}
		}
		//如果i=max意味着上述循环完整运行，表明两点间不存在其他图片，可以连线
		if(j==max){
			return true;
		}
		return false;
	}
}