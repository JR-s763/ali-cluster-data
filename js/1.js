var myChart = echarts.init(document.getElementById('net'));
const disaster_level_2 = [];
const disaster_level_1 = [],
	machine_meta_time_stamp = [];
machine_meta = [];
Pxscale([314860, 314862])
Scatter([314860, 314862])
d3.csv('./data/machine_meta1.csv', function (data) {
	machine_meta.push(data)
	disaster_level_2.push(data.disaster_level_2);
	machine_meta_time_stamp.push(data.time_stamp)
	disaster_level_1.push(data.disaster_level_1);

}).then(function (data) {

	myChart.setOption(option = {

		backgroundColor: "#143b55",
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
				textStyle: {
					color: "#fff"
				}

			},
		},
		grid: {
			borderWidth: 0,
			top: 120,
			bottom: 95,
			textStyle: {
				color: "#fff"
			}
		},
		legend: {
			x: '46%',
			top: '11%',
			textStyle: {
				color: '#90979c',
			},
			data: ['一级故障域', '二级故障域']
		},


		calculable: true,
		xAxis: [{
			type: "category",
			axisLine: {
				lineStyle: {
					color: "rgba(204,187,225,0.5)",
				}
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			data: machine_meta_time_stamp,
			axisLabel: {
					textStyle:{
						color: '#fff'
					}
			}
		}],

		yAxis: [{
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "rgba(204,187,225,0.5)",
				}
			},
			axisLabel: {
					textStyle:{
						color: '#fff'
					}
			}

		}],
		dataZoom: [{
			show: true,
			height: 30,
			xAxisIndex: [0],
			bottom: 30,

			"start": 10,
			"end": 80,
			handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
			handleSize: '110%',
			handleStyle: {
				color: "#5B3AAE",
			},
			textStyle: {
				color: "rgba(204,187,225,0.5)",
			},
			fillerColor: "rgba(67,55,160,0.4)",
			borderColor: "rgba(204,187,225,0.5)",

		}, {
			type: "inside",
			show: true,
			height: 15,
			start: 1,
			end: 35
		}],
		series: [{
			name: "一级故障域",
			type: "line",
			symbolSize: 10,
			symbol: 'circle',
			itemStyle: {
				color: "#6f7de3",
			},
			markPoint: {
				label: {
					normal: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				data: [{
					type: 'max',
					name: '最大值',

				}, {
					type: 'min',
					name: '最小值'
				}]
			},
			data: disaster_level_1,
		}, {
			name: "二级故障域",
			type: "line",
			symbolSize: 10,
			symbol: 'circle',
			itemStyle: {
				color: "#c257F6",
			},
			markPoint: {
				label: {
					normal: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				data: [{
					type: 'max',
					name: '最大值',

				}, {
					type: 'min',
					name: '最小值'
				}]
			},
			data: disaster_level_2
		}]
	})
	event()
})


function event() {
	myChart.on('click', function (params) {
		var time = []
		time.push(params.name)
		//Pxscale(time)
		Scatter([time,time+1])
	})
	//Pxscale()
}
