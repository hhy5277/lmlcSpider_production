$(document).ready(function(){function t(){$.post("/ajax/getPeriodSales",{startTime:$(".startTime").datepicker("getDate","yyyy-mm-dd"),endTime:$(".endTime").datepicker("getDate","yyyy-mm-dd")},function(t){a.myChart2&&a.myChart2.clear(),a.myChart2=echarts.init(document.getElementById("periodSales"));var e={title:{text:"总销售额/天(元)"},tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:t.data.dates},yAxis:{type:"value"},series:[{name:"",type:"line",stack:"总量",data:t.data.sales}]};a.myChart2.setOption(e)})}function e(){var t=$(".oneday").datepicker("getDate","yyyy-mm-dd");$.post("/ajax/getOnedayTable",{date:t},function(e){a.onedayTable&&a.onedayTable.destroy();var n=["<tr>",'<td><a target="_blank" href="/detail?date='+t+'&id=${productId}&name=${encodeURIComponent(productName)}">${productName}</a></td>',"<td>${(sellAmount/10000).toFixed(0)}</td>","<td>${(financeTotalAmount/10000).toFixed(0)}</td>","<td>${yearReturnRate}</td>","<td>${investementDays}</td>","<td>${interestStartTime}</td>","<td>${interestEndTime}</td>","</tr>"].join("");$.template("onedayTemplate",n),$("#onedayTbody").html($.tmpl("onedayTemplate",e.data.prod)),a.onedayTable=$("#onedayTable").DataTable({order:[[0,"desc"]]})}),$.post("/ajax/getOnedayChart",{date:t},function(t){a.myChart3&&a.myChart3.clear(),a.myChart3=echarts.init(document.getElementById("onedayChart"));var e={title:{text:"销售额/小时(元)"},color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点","24点"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"前一小时销售额",type:"bar",barWidth:"75%",data:t.data.serials}]};a.myChart3.setOption(e)})}var a={},n={autoHide:!0,language:"zh-CN",format:"yyyy-mm-dd",yearFirst:!0,autoPick:!0,startDate:"2017-12-22",endDate:new Date(+new Date-864e5)};$.fn.datepicker.setDefaults(n),$(".datepicker").on("keydown",function(t){t.preventDefault()}),$(".startTime").datepicker({date:new Date(+new Date-864e6)}),$(".endTime").datepicker({date:new Date(+new Date-864e5)}),$(".startTime").on("pick.datepicker",function(t){$(".endTime").datepicker("destroy"),$(".endTime").datepicker({startDate:t.date}),$(".endTime").datepicker("show")}),$(".endTime").on("hide.datepicker",function(e){t()}),function(){function t(t,e){var a;if("min"==e){var n=Math.min.apply(null,t);a=parseInt(n/Math.pow(10,n.toString().length-2))*Math.pow(10,n.toString().length-2)}if("max"==e){var i=Math.max.apply(null,t);(a=(parseInt(i/Math.pow(10,i.toString().length-2))+1)*Math.pow(10,i.toString().length-2))<1e4&&(a=1e4)}return a}$.post("/ajax/getInitSales",function(e){var n=e.data.span,i=e.data.total;a.myChart1=echarts.init(document.getElementById("nowSales"));var d={title:{text:"实时数据",subtext:"10秒刷新"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#283b56"}}},legend:{data:["最新售卖记录","已售总金额"]},xAxis:[{type:"category",boundaryGap:!0,data:function(){for(var t=new Date,e=[],a=10;a--;)e.unshift(t.toLocaleTimeString().replace(/^\D*/,"")),t=new Date(t-1e4);return e}()}],yAxis:[{type:"value",scale:!0,name:"已售总金额",min:t(i,"min"),max:t(i,"max"),boundaryGap:[.2,.2]},{type:"value",scale:!0,name:"前10秒售卖金额",min:t(n,"min"),max:t(n,"max"),boundaryGap:[.2,.2]}],series:[{name:"前10秒售卖金额",type:"bar",xAxisIndex:0,yAxisIndex:1,data:n},{name:"已售总金额",type:"line",xAxisIndex:0,yAxisIndex:0,data:i}]};a.myChart1.setOption(d),setInterval(function(){$.post("/ajax/getNowSales",function(e){var n=Date.parse((new Date).toLocaleDateString()+" "+d.xAxis[0].data[9])+1e4,i=new Date(n).toLocaleTimeString().replace(/^\D*/,""),r=d.series[0].data,o=d.series[1].data;r.shift(),r.push(e.data.total-o[9]),o.shift(),o.push(e.data.total),d.xAxis[0].data.shift(),d.xAxis[0].data.push(i),d.yAxis[0].min=t(o,"min"),d.yAxis[0].max=t(o,"max"),d.yAxis[1].min=t(r,"min"),d.yAxis[1].max=t(r,"max"),a.myChart1.setOption(d)})},9900)})}(),t(),$(".oneday").datepicker({date:new Date(+new Date-864e5)}),e(),$(".oneday").on("pick.datepicker",function(t){e()})});