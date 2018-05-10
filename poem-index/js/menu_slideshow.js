/*右侧黑色菜单栏的显示*/
function menushow(){
    var scrollHeight=document.documentElement.scrollTop;  /*获取滚动的高度*/
    var rightmenu=document.getElementsByClassName("right_menu");
    /* console.log("小的页面"+scrollHeight+'px');*/
    rightmenu[0].style.left="0";
    rightmenu[0].style.top=scrollHeight+'px';  /*将菜单位置移到滚动高度*/
    rightmenu[0].style.transition="left";   /*渐变动画，只对left变化进行操作*/
    rightmenu[0].style.transitionDuration="0.8s";
    /* var body=document.getElementsByTagName("body");*/
    /*
                body[0].style.overflow="hidden";
    */
}


/*右侧黑色菜单栏的隐藏*/
function menuhidden(){
    var rightmenu=document.getElementsByClassName("right_menu");
    rightmenu[0].style.left="100%";
    rightmenu[0].style.transition="left";
    rightmenu[0].style.transitionDuration="0.5s";
}

/*鼠标滚动事件*/
/*   if(document.addEventListener){
        document.addEventListener("DOMMouseScroll",scrollmenu,false);
       }*/

/*鼠标滚动事件*/
/* window.onmousewheel=function(){
    var scrollHeight=document.documentElement.scrollTop;
    if(scrollHeight>=154){
        alert(12);
      }
}*/
var a= window.onload=function(){
    var scrollHeight=document.documentElement.scrollTop;
    var screenwidth=document.documentElement.clientWidth;
    console.log("大的页面"+scrollHeight+'px');
    if(screenwidth>=1160){
        function show(){
            $("body").css("overflowY","auto");  /*宽度大于1160，高度始终自动，可以有滚动条*/
            if(scrollHeight>=154){
                $("header").attr("class","bigheader"); /*添加类名；宽度大的时候顶部固定的导航栏*/
            }else{
                $("header").removeAttr("class");
            }
        }
        show();
    }else{
        var left= $(".right_menu").css("left");  /*获取右侧菜单栏的位置*/
        $("body").css("overflowX","hidden");  /*页面横向无滑条*/
        if(left=="0px"){
            /*如果右侧菜单栏出现的话，就设置它的高度为滑动条高度，超出部分隐藏，会出现滑条*/
            var scrollHeight=document.documentElement.scrollTop;
            $(".right_menu").css("top",scrollHeight+"px");
            $("body").css("overflow","hidden");
        }
        else{
            /*如果右侧菜单栏没出现的话，就设置超出部分自动，有滑条*/
            $("body").css("overflowY","auto");
        }
    }
}
setInterval(a,300);



/*轮播图*/
var boxwidth;
//监控浏览器宽度高度的变化，浏览器宽度/高度一变化，就重新获取外盒子宽度，图片的位置和位移大小也要变
window.onresize=function(){
    var list=document.getElementById("banner_list");
    boxwidth=banner.clientWidth;
    list.style.left=-boxwidth+"px";
}
/*
onresize的定义方式：
  1、直接在html中定义：<body onresize="myfunction()"></body>
  2、直接给onresize赋值： window.onresize=function(){}
                         document.body.onresize=function(){}
  3、使用事件监听（只对window有作用）
    window.addEventListener("resize",fn);
 说明：
    1、直接给onresize赋值会覆盖在html中定义
    2、直接给onresize赋值，window.body只有一个起作用，后定义的覆盖前一个
    3、事件监听只对window有效，可以其他方式同时触发；


   jQuery方法：
  $(window).resize(function(){
        var list=document.getElementById("banner_list");
        boxwidth=banner.clientWidth;
        list.style.left=-boxwidth+"px";
   }); */
window.onload=function (){
    var banner=document.getElementById("banner");
    var list=document.getElementById("banner_list");
    var buttons=document.getElementById("slideBtn").getElementsByTagName("span");
    var pre=document.getElementById("prev");
    var next=document.getElementById("next");

    var index=1;  //用于存放当前要显示的图片，初始化为第一张图；不影响图片移动效果，与底下的圆点按钮相关
    var animated=false;  //优化动画效果；动画执行完毕为false才能重新开始执行；
    boxwidth=banner.clientWidth;    //可视盒子的宽度
    list.style.left=-boxwidth+"px";  //初始位置就是将第一张图片完全隐藏的位置
    //偏移动作，形参为偏移量；
    function animate(offset){
        animated=true;
        var newleft=parseInt(list.style.left)+offset;  //偏移之后的位置
        var time=500;   //唯一总时间
        var interval=10;  //位移间隔时间，每十秒执行一次函数
        var speed=offset/(time/interval);

        //偏移动作，只是按照偏移量移动的动作，无论左右，可设置偏移速度;其他向左向右的动作都是由该函数调用而来
        function go(){
            if(speed<0 && parseInt(list.style.left)>newleft || speed>0 && parseInt(list.style.left)<newleft ){
                list.style.left=parseInt(list.style.left)+speed+"px";
                setTimeout(go,interval);   //设置定时器，每个interval的时间调用一次go函数；setTimeout(go,interval)只会调用一次；
            }else{
                animated=false;  //动画结束
                list.style.left=newleft+'px';

                //设置无缝切换
                if(newleft>-boxwidth){
                    list.style.left=-(boxwidth*3)+"px";
                }
                if(newleft<-(3*boxwidth)){
                    list.style.left=-boxwidth+"px";
                }
            }
        }
        go();
    }

    //将圆点按钮样式切换封装到showBtn()函数中
    function showBtn(){
        //遍历圆点按钮数组
        for(var i=0;i<buttons.length;i++){
            var btn=buttons[i];
            //取消之前按钮设置的active状态
            if(btn.className=='active'){
                btn.className="";
                break;
            }
        }
        //设置当前图片对应的圆点按钮状态为active
        buttons[index-1].className='active';
        // buttons[index-1].setAttribute("class","active");
    }


    //设置左右移动按钮
    pre.onclick=function(){
        //与index有关的是圆点按钮，此处是向左滑动时，底下的按钮点亮也会变
        if(index==1){
            index=3;
        }else{
            index-=1;
        }
        //判断动画是否执行中
        if(!animated){
            animate(boxwidth);
        }
        showBtn();
    }

    next.onclick=function(){
        if(index==3){
            index=1;
        }else{
            index+=1;
        }
        if(!animated){
            animate(-boxwidth);
        }
        showBtn();
    }

    //圆点按钮绑定效果函数
    for(var i=0;i<buttons.length;i++){
        var btn=buttons[i];
        btn.onclick=function(){
            //程序优化：如果点击当前处于active状态的按钮，则不执行任何操作
            if(this.className=="active"){
                return;  //当程序执行到这里会退出当前函数，不会再执行后面的语句；
            }
            //问题：如何再点击圆点按钮时，定位切换到对应的图片上
            //解决办法：获取html页面按钮上自定义的index属性值，通过该index值可以算出每次点击的按钮距之前按钮的偏移量；
            var myIndex=parseInt(this.getAttribute('index')); //获得自定义的属性值并且转换为数字；
            var offset=(-boxwidth)*(myIndex-index); //算出偏移量；myIndex是点击的按钮的自定义属性index的值；index则是上面函数中有的，处于激活状态的按钮的index；
            if(!animated){
                animate(offset);
            }
            index=myIndex;  //更新当前的index值
            showBtn();    //调用showBtn实现按钮的样式切换
        }
    }

    //设置定时器，让图片自动轮播
    var timer;
    function start(){
        timer=setInterval(function(){
            next.onclick();
            showBtn();
        },3000);
    }
    /* var b=function ani(){
         var boxwidth=banner.clientWidth;    //可视盒子的宽度
         list.style.left=-boxwidth+"px";  //初始位置就是将第一张图片完全隐藏的位置
     }
     setInterval(b,5);*/

    function stop(){
        clearInterval(timer);
    }

    banner.onmouseover=stop; //鼠标移动上去，清除定时器
    banner.onmouseout=start;

    start();
    /*  //偏移动作的函数，形参为偏移量
      function animate(offset){
          animated=true;  //调用animate()时切换为true；
          var newleft=parseInt(list.style.left)+offset;  //偏移之后的位置
          var time=500;  //位移总时间
          var interval=10; //位移间隔时间
          var speed=offset/(time/interval);  //每次位移量=总偏移量/次数

          function go(){ //递归，在函数内部调用自身实现入场图片500ms淡入的效果
              //判断偏移量是否达到了目标值，如果没有，在原来的基础上继续移动
              //整体向左移动，则offset为负，speed<0，所以left+offset会逐渐减小，所以当left大于最后要达到的newleft时，表示还未达到目标值；
              if((speed<0 && parseInt(list.style.left)>newleft) || (speed>0 &&parseInt(list.style.left)<newleft)){
                  list.style.left=parseInt(list.style.left)+speed+"px";
                  //设置定时器，每个interval的时间调用一次go()函数；
                  //setTimeout()函数只会被执行一次
                  setTimeout(go,interval);
              }
              else{
                  //如果达到目标值，就将newleft值设置为目标值
                  animated=false;  //切换结束，讲annimated设置为false；

                  list.style.left=newleft+"px";

                  //设置无缝切换
                  if(newleft>-boxwidth){
                      list.style.left="-300%";
                  }
                  if(newleft<-(boxwidth*3)){
                      list.style.left="-100%";
                  }
              }
          }
          go();   //调用animate()时执行go()函数

      }

      //将圆点按钮样式切换封装到showBtn()函数中
      function showBtn(){
          //遍历圆点按钮数组
          for(var i=0;i<buttons.length;i++){
              var btn=buttons[i];
              //取消之前按钮设置的active状态
              if(btn.className=='active'){
                  btn.className="";
                  break;
              }
          }
          //设置当前图片对应的圆点按钮状态为active
          buttons[index-1].className="active";
      }

      //向左按钮绑定效果函数
      pre.onclick=function(){
          //切换到左边的图片，即整体右移，left为正数；
          //如果当前是第一张，会切换到最后一张
          if(index==1){
              index=3;
          }else{
              //否则会切换到前一张，即index-1
              index-=1;
          }
          //每次点击时，判断animated为false时执行切换
          if(!animated){
              animate(boxwidth);
          }
          //设置当前圆点按钮样式切换到选中状态，其他圆点为未选中状态
          showBtn();
      }


      //向右按钮绑定效果函数
      next.onclick=function(){
          //切换到右边的图片，即整体左移，left为负数
          if(index==3){
              index=1;
          }else{
              index+=1;
          }
          if(!animated){
              animate(boxwidth);
          }
          showBtn();
      }


      //圆点按钮绑定效果函数
      for(var i=0;i<buttons.length;i++){
          var btn=buttons[i];
          btn.onclick=function(){
              //程序优化：如果点击当前处于active状态的按钮，则不执行任何操作
              if(this.className=="active"){
                  return;  //当程序执行到这里会退出当前函数，不会再执行后面的语句；
              }
              //问题：如何再点击圆点按钮时，定位切换到对应的图片上
              //解决办法：获取html页面按钮上自定义的index属性值，通过该index值可以算出每次点击的按钮距之前按钮的偏移量；
              var myIndex=parseInt(this.getAttribute('index')); //获得自定义的属性值并且转换为数字；
              var offset=(-boxwidth)*(myIndex-index); //算出偏移量；myIndex是点击的按钮的自定义属性index的值；index则是上面函数中有的，处于激活状态的按钮的index；
              if(!animated){
                  animate(offset);
              }
              index=myIndex;  //更新当前的index值
              showBtn();    //调用showBtn实现按钮的样式切换
          }
      }

      //设置定时器，让图片自动轮播
      var timer;
      function start(){
          timer=setInterval(function(){
              next.onclick();
          },3000);
      }

      function stop(){
          clearInterval(timer);
      }

      banner.onmouseover=stop; //鼠标移动上去，清除定时器
      banner.onmouseout=start;

      start();
*/
}