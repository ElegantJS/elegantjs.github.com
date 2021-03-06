var init,
      data={//配置可选日期的上下限
        startDate:"1990/1/1",
        endDate:"2016/9/30"
      },
      defaultDate="2016/5/1";//设定日期的接口，指定具体日期
(function(){
    var initialize=function(){//初始化渲染页面
        var today=new Date(defaultDate);
        drawCalendar(today.getFullYear(),today.getMonth()+1,today.getDate(),today.getDay());
    };
    var dayArray=function(year,month){//创建存放日期的函数
        var firstDay=new Date(year,month-1,1).getDay(),//求出当月第一天是星期几
        days=new Date(year,month,0).getDate(),//求出当月天数，下个月第零天就是当月最后一天
        arr=new Array(42);//创建数组，存放日期
        for(var i=0;i<days;i++,firstDay++){
            arr[firstDay]=year+"/"+month+"/"+(i+1);
        }
        return arr;
    };
    //绘制日历内容函数
    var drawCalendar=function(year,month,date){
            var weeks="日一二三四五六".split(""),
            fragment=document.createDocumentFragment(),
            calendar=document.createElement("div"),
            body=document.getElementsByTagName("body")[0],
            _calendar=document.getElementById("calendar"),
            a=document.createElement("a"),
            bt=document.createElement("b"),
            span=document.createElement("span"),
            dayArr=dayArray(year,month),
            bts=[];
            if(_calendar){//如果已存在calendar，删除之后再重新渲染
                           _calendar.parentNode.removeChild(_calendar);
            }
                           body.insertBefore(calendar,null);//将calender插入DOM中
                           calendar.setAttribute("id","calendar");//给calender设置id
            //生成四个改变月份和年份的按钮
            for(var i=0;i<4;i++){
                          var newA=bt.cloneNode(true);
                          newA.addEventListener("click",(function(index){
                                        return function(){
                                                    redrawCalendar(year,month,date,index);
                                         };
                           })(i),false);
                          if(i==2) {
                                         span.appendChild(document.createTextNode(year+"年"+month+"月"));
                           }
                          span.appendChild(newA);
                          newA.className="btn";
                          bts[i]=newA;//保存按钮的引用
                          }
            bts[0].innerHTML = '<<';
            bts[1].innerHTML = '<';
            bts[2].innerHTML = '>';
            bts[3].innerHTML = '>>';
            fragment.appendChild(span);
            //创建星期显示区
            for(var j=0;j<7;j++){
                    var weekItem=a.cloneNode(true);
                    weekItem.innerHTML=weeks[j];
                    weekItem.className="week";
                    fragment.appendChild(weekItem);
             }
            //创建日期显示区
            for(var k=0;k<dayArr.length;k++){
                           var dayItem=a.cloneNode(true);
                            if(dayArr[k]==undefined){
                            fragment.appendChild(dayItem);
                            }else{
                                    dayItem.innerHTML=dayArr[k].split("/")[2];
                                    dayItem.className="day";
                                    var newDay=Date.parse(new Date(dayArr[k]));
                                    if(newDay<Date.parse(new Date(data.startDate))||newDay>Date.parse(new Date(data.endDate))){
                                        dayItem.className+=" exceed";
                                    }
                                    if(k%7===0||k%7===6){
                                            dayItem.className+=" weekend";
                                    }
                                    if(dayArr[k]===defaultDate){
                                        dayItem.className+=" choosen";
                                    }
                                    fragment.appendChild(dayItem);
                            }
            }
            calendar.appendChild(fragment);
                //显示选中日期的函数
            var dateShow=function (day){
                        var showInput=document.getElementById("showDate"),
                            yearAndMonth=document.getElementsByClassName("btn")[1].nextSibling;
                        showInput.value=yearAndMonth.data+day+"日";
             };
                    //点击日期时间处理程序
            var dateClick = function (){
                     var target=event.target,
                            day=target.innerHTML;
                     if(target.className.indexOf("day")>-1&&target.className.indexOf("exceed")==-1){
                             dateShow(day);
                     }
                };
                //为日历元素添加点击事件处理程序
                calendar.addEventListener("click",dateClick,false);
    };

    //点击按钮重新绘制日历内容
    var redrawCalendar=function(year,month,date,index){
             switch(index){
             case 0 ://preyear
                           year--;
                           break;
             case 1://premonth
                          month--;
                          if(month < 1){
                                    year--;
                                    month = 12;
                           }
                        break;
             case 2://nextmonth
                          month++;
                           if(month > 12){
                                    year++;
                                    month = 1;
                           }
                          break;
             case 3://nextyear
                        year++;
                        break;
        }
            drawCalendar(year,month,date);
        };
       init=initialize;
})();
init();