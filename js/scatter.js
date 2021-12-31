function Scatter(time){
	var t = []
	for (var i = 0; i < time.length; i++) {
	    //console.log(time[i])
	    t.push(parseFloat(time[i]))
	}
	
var myChart4 = echarts.init(document.getElementById('scatter'));
var cpu_util_percent = []
var mem_util_percent = []

var start_time = t[0]
var end_time = t[1]

var data = [] //存储二维数据

 for (i = 1; i <= 12; i++) {
        if (i == 12) {
            i = i + 1
        }
        if (t[0] < 100000 + (i - 1) * 50000) {
            var file = './data/usage/usage' + String(i) + ".csv";
            break;
        }
    }

d3.csv(file).then(function (_data, i) {
    // console.log(_data[i]);
    _data.forEach((ele, i, arr) => {
        // console.log(ele);
        if (ele.time_stamp >= start_time && ele.time_stamp <= end_time) {
            // console.log(1)
            cpu_util_percent.push(ele.cpu_util_percent)
            mem_util_percent.push(ele.mem_util_percent)
            // start_time.push(ele.start_time)
        }
    });
    for (let i = 0; i < cpu_util_percent.length; i++) {
        data.push([cpu_util_percent[i], mem_util_percent[i]])
    }
    // console.log(data)
    // console.log(cpu_util_percent)
    // console.log(mem_util_percent)
    // console.log(y)

    window.onresize = function () {
        myChart4.resize()
    }

    // 3. 指定图表的配置项和数据
    let option = {
		backgroundColor: "#143b55",
        title: {
            text:'CPU和内存利用率',
			fontSize: 8,
			textStyle:{
				color: '#fff'
			}
        },
        grid: {
            left: '3%',
            right: '7%',
            bottom: '7%',
            containLabel: true
        },
        tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            formatter: function (params) {
                if (params.value.length > 1) {
                    return params.seriesName + ' :<br/>' +
                        params.value[0] + '% ' +
                        params.value[1] + '% ';
                } else {
                    return params.seriesName + ' :<br/>' +
                        params.name + ' : ' +
                        params.value + '% ';
                }
            },
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        toolbox: {
            feature: {
                dataZoom: {},
                brush: {
                    type: ['rect', 'polygon', 'clear']
                }
            }
        },
        brush: {},
        xAxis: [{
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value}%',
					textStyle:{
						color: '#fff'
					}
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value}%',
				textStyle:{
					color: '#fff'
				}
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
			itemStyle:{
				normal:{
					color:"#01b2e3",
					 opacity:0.4
				}
			},
            // name: 'Female',
            type: 'scatter',
            emphasis: {
                focus: 'series',
            },
            data: data,
            markArea: {
                silent: true,
                itemStyle: {
                    color: 'transparent',
                    borderWidth: 1,
                    borderType: 'dashed'
                },
                data: [
                    [{
                        name: 'Data Range',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]
                ]
            },
            markPoint: {
                data: [{
                    type: 'max',
                    name: 'Max'
                },
                {
                    type: 'min',
                    name: 'Min'
                }
                ]
            },
            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                },
                {
                    xAxis: 160
                }
                ]
            }
        },]
    };
    // 4. 使用刚指定的配置项和数据显示图表。
    myChart4.setOption(option)
})
		// 1. 通过document选中Id为basicChart的的DOM结点，并且将其保存为basicChart。
}