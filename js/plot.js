function Pxscale(time) {
    var t = []
    for (var i = 0; i < time.length; i++) {
        //console.log(time[i])
        t.push(parseFloat(time[i]))
    }
    var myChart2 = echarts.init(document.getElementById('pxscale'));
	
    for (i = 1; i <= 12; i++) {
        //console.log(i)
        if (i == 12) {
            i = i + 1
        }
        if (t[0] < 100000 + (i - 1) * 50000) {
            var file = './data/usage/usage' + String(i) + ".csv";
            break;
        }
    }
    d3.csv(file)
        .then(function (data) {

            var all = []
            for (let i of data) {
                //if((t[0]<parseFloat(i.time_stamp)) && (parseFloat(i.time_stamp)<t[1]))
                if (t[0] == parseFloat(i.time_stamp)) {
                    var d = []
                    //d.push(i.machine_id)
                    d.push(parseFloat(i.cpu_util_percent))
                    d.push(parseFloat(i.disk_usage_percent))
                    d.push(parseFloat(i.mem_util_percent))
                    d.push(parseFloat(i.net_in))
                    d.push(parseFloat(i.net_out))
                    all.push(d)
                }
                //console.log(all)
            }
            draw(all)
        })
    //draw(all)
    // Schema:
    // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
    function draw(all) {
        var schema = [
            { name: 'cpu_util', index: 0, text: 'cpu_util' },
            { name: 'disk_usage', index: 1, text: 'disk_usage' },
            { name: 'mem_util', index: 2, text: 'mem_util' },
            { name: 'net_in', index: 3, text: ' net_in' },
            { name: 'net_out', index: 4, text: 'net_out' },
        ];


        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5,
				color:"#5B3AAE"
            }
        };

        var option = {
			
			
            backgroundColor: "#143b55",
             legend: {
                 bottom: 10,
                 data: ['资源利用'],
                 itemGap: 20,
                 textStyle: {
                     fontSize: 14,
					 color:'#ffffff'
                 }
             },
            tooltip: {
                padding: 10,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderWidth: 1
            },
            // dataZoom: {
            //     show: true,
            //     orient: 'vertical',
            //     parallelAxisIndex: [0]
            // },
            parallelAxis: [
                //{dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
                { dim: 0, name: schema[0].text },
                { dim: 1, name: schema[1].text },
                { dim: 2, name: schema[2].text },
                { dim: 3, name: schema[3].text },
                { dim: 4, name: schema[4].text },
            ],
             // visualMap: {
             //     // show: true,
             //     // min: 0,
             //     // max: 150,
             //     // dimension: 1,
             //     inRange: {
             //        color: ['#376ea5']
             //     }
             // },
            parallel: {
                left: '6%',
                right: '15%',
                bottom: 60,
                parallelAxisDefault: {
                    type: 'value',
                    name: 'AQI指数',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aaa'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#777'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    name: '资源利用',
                    type: 'parallel',
                    lineStyle: lineStyle,
                    data: all
                },
            ]
        };
        myChart2.setOption(option)

    }
}