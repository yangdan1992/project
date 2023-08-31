
//dom操作封装
function query(html){
			return document.querySelector(html)
		}
		
		
		var tag = {
			
			//滑动验证码方法
			verify: function(arr, box, imgbox, btn, img, que, slider, btit,tu,ming) {
				var atu = arr[Math.floor(Math.random() * (arr.length))]
				tu.src = atu;
				img.style.backgroundImage = " url(" + atu + ")"
				var tap = imgbox.offsetHeight - img.offsetHeight
				// var lef=imgbox.offsetWidth-img.offsetWidth;
				var left = 
			Math.random() * (imgbox.offsetWidth - img.offsetWidth - imgbox.offsetWidth / 2) + imgbox.offsetWidth /2;
				console.log(left)
				var tops = Math.random() * (tap);
				img.style.top = tops + "px"
				que.style.top = tops + "px"
				que.style.left = left + "px"
				img.style.backgroundPositionY = -tops + "px";
				img.style.backgroundPositionX = -left + "px";
				
				console.log(img.style.top)
				btn.onmousedown = function() {
					img.style.opacity = "1"
					que.style.opacity = "1"
					ming.innerHTML="";
					btit.innerHTML="拖动图片完成验证";
					slider.onmousemove = function(event) {
						console.log(event.offsetX);
						var zuo = event.clientX - box.offsetLeft - slider.offsetLeft;
						console.log(zuo)
						if (zuo > slider.offsetWidth) {
							zuo = slider.offsetWidth - img.offsetWidth / 2
						}
						btn.style.left = zuo + "px";
						img.style.left = zuo + "px";
						ming.style.width=zuo+10+"px"
						
					}

				}

				box.onmouseup = function() {
					var yes = que.offsetLeft - img.offsetLeft
					console.log(yes)
					slider.onmousemove = null
					if (yes < 10 && yes > -10) {
						btit.innerHTML = "验证成功√"
						
						ming.innerHTML="验证成功"
						btit.style.color = "chartreuse"
						img.style.opacity = "0";
						que.style.opacity = "0";
						return "yes"
					}else{
						btit.innerHTML = "验证失败X"
						ming.innerHTML=""
						btit.style.color = "red";
						zuo=0
						btn.style.left = zuo + "px";
						img.style.left = zuo + "px";
						ming.style.width=zuo+"px"
						
					}
					
				}

			}
		}
		
		function imgver(){
			var bigbox=document.createElement("div");
			bigbox.id="box";
			bigbox.innerHTML='<h3 class="btit">请完成图片验证</h3>'+
			'<div class="img">'+'<img src="img/t1.png" alt="..." id="tu">'+
			'<div class="kuai"></div>'+'<div class="kuai2"></div></div>'+
			'<div class="slider"><div class="ming"></div><button type="button" id="btn"></button></div>'
			document.body.appendChild(bigbox);
			var box = query("#box")
			var imgbox = query(".img");
			var btn = query("#btn");
			var img = query(".kuai");
			var que = query(".kuai2");
			var slider = query(".slider");
			var btit = query(".btit");
			var tu = query("#tu");
			var arr = ["img/t1.png", "img/t2.png", "img/t3.png", "img/t4.png", "img/t5.png"];
			var ming=query(".ming");
			return tag.verify(arr, box, imgbox, btn, img, que, slider, btit,tu,ming)
		}