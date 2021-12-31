var myChart3 = echarts.init(document.getElementById('count_plot'));
var machine_abnormal_num = []
var time_stamp = []

d3.csv("./data/machine_usage_all.csv").then(function (data) {
	//var machine_time_stamp.push(data.time_stamp)
	for (let i of data) {
		//console.log(i.timeStamp)
		machine_abnormal_num.push(i.countNum)
		time_stamp.push(i.timeStamp)
	}

	//machine_abnormal_num[Math.round(data.time_stamp / 60)]++;
	var option = {
		backgroundColor: "#143b55",
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				// console.log(pt[0]);
				return [pt[0], '10%'];

			}
		},
		title: {
			left: 'center',
			text: 'machine_abnormal_num',
			textStyle:{
				color: '#fff'
			}
		},
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				brush: {
					type: ['rect', 'polygon', 'clear']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		brush: {
			xAxisIndex: 'all',
			yAxisIndex: 'all',
			throttleType: 'debounce',
			throttleDelay: 1000,
			xAxisIndex: "all",
		},
		xAxis: {
			//type: 'time',
			boundaryGap: false,
			data: time_stamp,
			triggerEvent: true,
			axisLabel:{
				textStyle:{
					color: '#fff'
				},
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%'],
			axisLabel:{
				textStyle:{
					color: '#fff'
				},
			}
		},
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 20
		}, {
			start: 0,
			end: 20
		}],
		series: [
			{
				name: 'machine_abnormal_num',
				type: 'line',
				smooth: true,
				symbol: 'none',
				areaStyle: {},
				itemStyle:{
					normal:{
						lineStyle:{
							color:"#c30fff"
						}
					}
				},
				data: machine_abnormal_num
			}
		]
	};

	// mychart3.dispatchAction({
	//    type: 'brush',
	//    areas: [
	//  	{
	//  		brushType: 'rect',
	//  		coordRange: [[minX, maxX], [minY, maxY]],
	//  		xAxisIndex: 'all',
	//  		yAxisIndex: 'all'
	//  	}
	//    ]
	//  })

	myChart3.setOption(option, true)

	myChart3.on('brushSelected', function (params) {
		console.log(params.batch[0])
		var brushComponent = params.batch[0];
		//console.log(brushComponent.areas[0])
		if(brushComponent.areas[0]!==undefined)
		{
			console.log(brushComponent.areas[0])
			var numArray = brushComponent.areas[0].coordRange[0];
			console.log(numArray)
			var time = [];
			for (let i of numArray) {
				//这里可以得到首位时间！！！
				time.push(data[i].timeStamp)
			}
			console.log(time)
			Pxscale(time)
			Scatter(time)
		}
	})
	/*myChart3.dispatchAction({
	    type: 'brush',
	    areas: [
	  	{
	  		brushType: 'rect',
	  		coordRange: [[minX, maxX], [minY, maxY]],
	  		xAxisIndex: 'all',
	  		yAxisIndex: 'all'
	  	}
	    ]
	  })*/
	// myChart3.setOption(option,true)
})

// for(var i = 1; i < 20000; i++) {
//     var now = new Date(base += oneDay);
//     data.push([
//         [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//         Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])
//     ]);
// }
