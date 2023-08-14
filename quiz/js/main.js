// JavaScript Document
var questionArray = new Array("Q1","Q2","Q3","Q4","Q5");
var rightArray = new Array();  //将答题结果转换为1,0表示
var aryAns = new Array(2,2,1,2,4);   //建立储存正确答案的数组

var str = window.location.href;
var resultArray =  str.split('?');//存放答题结果

//判断题目是否答对
var right_number= 0;//计算答对的题数；
for (var i = 0; i < 5; i++) {
	if (aryAns[i]==resultArray[i+1]) {
		right_number++;
		rightArray[i] = 1;
	}else{
		rightArray[i] = 0;
	}
}

var title = document.getElementsByClassName("title")[0];
switch(right_number){
	case 0:title.innerHTML = "啥也不是";break;
	case 1:title.innerHTML = "纯路人";break;
	case 2:title.innerHTML = "没想好";break;
	case 3:title.innerHTML = "没想好";break;
	case 4:title.innerHTML = "真朋友";break;
	case 5:title.innerHTML = "最佳拍档";break;
}