
d3.csv('./data/batch_task.csv').then(function (data) {
    console.log('初始数据：', data)
    let chart = echarts.init(document.querySelector('#line'),'dark')
    window.onresize = function () {
        chart.resize();
    }
    let xAxisData = new Array(data.length)
    let yAxisData1 = new Array(data.length)
    let yAxisData2 = new Array(data.length)
    let yAxisData3 = new Array(data.length)
   
    for (let i = 0; i < data.length; i++) {
        xAxisData[i] = data[i].task_name + '  ' + data[i].job_name
        yAxisData1[i] = data[i].start_time/1000
        yAxisData2[i] = data[i].end_time/1000
    }
    let lineDom = document.querySelector('#line')
        let lineChart = echarts.init(lineDom)
        let Option = {
			backgroundColor: "#143b55",
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['start_time', 'end_time']
            },
            dataZoom: [
                {
                    type: 'inside',
                    orient: 'horizontal',
                },
                {
                    type: 'slider',
                    orient: 'horizontal',
                },
                {
                    type: 'inside',
                    orient: 'vertical',
                },
                {
                    type: 'slider',
                    orient: 'vertical',
                    left: 5,
                },
            ],
            toolbox: {
                show: true,
                orient: 'horizontal',
                right: 30,
                top:20,
                feature: {
                    dataZoom: {
                        show: true,
                    },
                    magicType: {
                        show: true,
                        
                        type: ['line', 'bar', 'stack', 'tiled'],
                    },
                    saveAsImage: {
                        type: 'png',
                        name: '集群',
                    },
                    restore: {
                        show: true,
                    
                    },
                },
            },

            xAxis: {
                name: 'task_name+job_name',
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                name: 'time/1000',
                type: 'value',
                nameTextStyle: {
                    fontSize: 13
                },
            },
            series: [{
                data: yAxisData1,
                name: 'start_time',
                type: 'line',
            },
            {
                data: yAxisData2,
                name: 'end_time',
                type: 'line',
            },
            ]
        }
    
        lineChart.setOption(Option)
})
