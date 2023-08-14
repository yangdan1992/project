// JavaScript Document
var info = document.getElementsByClassName("info");

function oBlur_1(username) {
	var str = /\w[a-zA-Z0-9_]*/;
	if (username == "") {
		info[0].innerHTML = "请输入用户名";
		info[0].style.color = "red";
	} else if(!username.match(str)) {
		info[0].innerHTML = "只能够输入英文、数字和下划线";
		info[0].style.color = "red";
	} else if (username.length<6 || username.length>10){
		info[0].innerHTML = "用户名为6~10个字符";
		info[0].style.color = "red";
	} else {
		info[0].innerHTML = "√";
		info[0].style.color = "green";
	}
}

function oFocus_1(){
	info[0].innerHTML = "6~10个字符，可使用字母、数字、下划线";
	info[0].style.color = "green";
}

function oBlur_2(pwd) {
	if (pwd == "") {
		info[1].innerHTML = "请输入密码";
		info[1].style.color = "red";
	} else if (pwd.length<6 || pwd.length>16){
		info[1].innerHTML = "密码为6~16个字符";
		info[1].style.color = "red";	   
	} else {
		info[1].innerHTML = "√";
		info[1].style.color = "green";
	}
}

function oFocus_2(){
	info[1].innerHTML = "6~16个字符，区分大小写";
	info[1].style.color = "green";
}

function oBlur_3(pwd, pwd1) {
	if (pwd1 == "") {
		info[2].innerHTML = "请再次输入密码";
		info[2].style.color = "red";
	} else if(pwd!=pwd1){
		info[2].innerHTML = "密码不一致，请重新输入";
		info[2].style.color = "red";	  
    } else {
		info[2].innerHTML = "√";
		info[2].style.color = "green";
	}
}

function oFocus_3(){
	info[2].innerHTML = "请再次输入密码";
	info[2].style.color = "green";
}

function oBlur_4(email) {
	var re=/^[\w-]+(\.[\w]+)*@([\w-]+\.)+[a-zA-z]{2,7}$/;
	if (email == "") {
		info[3].innerHTML = "请输入邮箱地址";
		info[3].style.color = "red";
	} else if(!email.match(re)){
		info[3].innerHTML = "邮箱格式不正确";
		info[3].style.color = "red";	  
    } else {
		info[3].innerHTML = "√";
		info[3].style.color = "green";
	}
}
function oFocus_4(){
	info[3].innerHTML = "请输入正确的邮箱地址";
	info[3].style.color = "green";
}

function submitTest() {
	for(var i=0; i<info.length; i++) {
		if (info[i].innerHTML!="√") return false;
	}
	alert("注册成功！");
}