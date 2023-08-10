// JavaScript Document

//用户框失去焦点后验证value值
function oBlur_u(username) {
    if (username=="") { //用户框value值为空
        document.getElementById("remind_u").innerHTML = "请输入用户名！";
        document.getElementById("change_margin_u").style.marginBottom = "1px";//调整输入框和提示信息之间的间距
    } else { //用户框value值不为空
        document.getElementById("remind_u").innerHTML = "";
        document.getElementById("change_margin_u").style.marginBottom = "19px";//当无提示信息时，回到最初的间距
    }
}

//密码框失去焦点后验证value值
function oBlur_p(pwd) {
    if (pwd=="") { //密码框value值为空
        document.getElementById("remind_p").innerHTML = "请输入密码！";
        document.getElementById("change_margin_p").style.marginBottom = "1px";
        //document.getElementById("change_margin_s").style.marginTop = 2 + "px";
    } else { //密码框value值不为空
        document.getElementById("remind_p").innerHTML = "";
        document.getElementById("change_margin_p").style.marginBottom = "19px";
        //document.getElementById("change_margin_s").style.marginTop = 19 + "px";
    }
}

//用户框获得焦点的隐藏提醒
function oFocus_u() {
    document.getElementById("remind_u").innerHTML = "";
    document.getElementById("change_margin_u").style.marginBottom = "19px";
}

//密码框获得焦点的隐藏提醒
function oFocus_p() {
    document.getElementById("remind_p").innerHTML = "";
    document.getElementById("change_margin_p").style.marginBottom = "19px";
    //document.getElementById("change_margin_s").style.marginTop = 19 + "px";
}

//若输入框为空，阻止表单的提交
function submitTest(username, pwd) {
	var form1=document.getElementsByTagName("form")[0];
	form1.action="http://htmlpreview.github.io/?https://github.com/yangdan1992/project/blob/main/login/welcome.html?"+username;
    if (username=="" && pwd=="") { //用户框value值为空
        document.getElementById("remind_u").innerHTML = "请输入用户名！";
        document.getElementById("change_margin_u").style.marginBottom = 1 + "px";
		
		document.getElementById("remind_p").innerHTML = "请输入密码！";
        document.getElementById("change_margin_p").style.marginBottom = 1 + "px";
        //document.getElementById("change_margin_s").style.marginTop = 2 + "px";
		
        return false;
    }else if (username!="" && pwd=="") { //密码框value值为空
        document.getElementById("remind_p").innerHTML = "请输入密码！";
        document.getElementById("change_margin_p").style.marginBottom = 1 + "px";
        //document.getElementById("change_margin_s").style.marginTop = 2 + "px";
        return false;
	}else if(username=="" && pwd!=""){
		document.getElementById("remind_u").innerHTML = "请输入用户名！";
        document.getElementById("change_margin_u").style.marginBottom = 1 + "px";
		return false;
	}else{
		if(info_verify(username,pwd)==false) return false;
		//else window.open("welcome.html?"+username);
		/*
		else{
			var newWindow = window.open("about:blank");
			newWindow.location = "welcome.html?"+username;
		}*/
	}
}
//用户信息验证
function info_verify(username,pwd){
	//创建一个可以将文件翻译成文件流的对象
	var fso=new ActiveXObject("Scripting.FileSystemObject"); 
	//权限只读(只读=1，只写=2 ，追加=8 等权限)
	var ForReading=1; 
	var src="f:\\user_info.txt";
	//打开指定路径的txt文件，路径为绝对路径，
	var f=fso.OpenTextFile(src,ForReading); 
	
	var flag=0;//用户标识
	
	//判断是否读取到最后一行
	while(!f.AtEndOfStream){
		//读取文件中的当前行
		s=f.ReadLine();
		//将文本中的一行内容做分割，split函数中的参数为分割标准，此处以tab键做分割，并将分割后的内容存储在arr数组中
		arr=s.split("	");
		if(arr[0]==username){
			flag=1;//标识有该用户
			if(arr[1]==pwd) return true;//用户名和密码能够匹配
			else{//用户名和密码不匹配
				alert("密码输入错误！");
				return false;
			}
		}
	}
	f.close();//关闭文件
	
	//如果没有匹配到用户名
	if(flag == 0){
		alert("用户名输入错误！");
		return false;
	}
}
