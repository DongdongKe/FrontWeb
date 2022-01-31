<template>
    <div class="echartsContainer">
        <div id="firstChart" class="firstChart" :style="{width: '100%', height: '300px'}"></div>
        <el-divider></el-divider>
        <div id="secondChart" class="secondChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>
<script>
export default {
    name: 'historyDataDetail',
    data(){
        return{
            times: [],
            gsr: [],
            scl: [],
            scr: [],
            finalScr:[],
            emotions:[],
            events:[],
            id: this.$route.params.id
        }
    },
    mounted(){
        this.getMeasurementData();
    },
    methods:{
        getMeasurementData(){
            this.$fetch("/measurementValues", {id : this.id}).then((res) => {
                if(res.data != null){
                    console.log(res);
                    this.times = res.data.times;
                    this.gsr = res.data.gsr;
                    this.scl = res.data.scl;
                    this.scr = res.data.scr;
                    this.finalScr = res.data.finalScr;
                    this.emotions = res.data.emotion;
                    this.events = res.data.event;
                    this.drawFirstChartLine();
                    this.drawSecondChartLine();
                }
            })
        },
        drawFirstChartLine(){
            let firstChart = this.$echarts.init(document.getElementById('firstChart'))
            firstChart.setOption({
                title: {
                    text: 'Measurement Data',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#2146FF','#E00B60','#0BE064'],
                legend: {
                    data: ['gsr', 'scl', 'scr', 'finalScr'],
                    left:'center',
                    textStyle:{
                        color:'#000000',
                        fontSize:16
                    }
                },
                grid: {
                    left: '3%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.times
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'gsr',
                        type: 'line',
                        data: this.gsr,
                        lineStyle: {
                            normal: {
                                color: '#2146FF',
                            }
                        }
                    },
                    {
                        name: 'scl',
                        type: 'line',
                        data: this.scl,
                        lineStyle: {
                            normal: {
                                color: '#E00B60',
                            }
                        }
                    },
                    {
                        name: 'scr',
                        type: 'line',
                        data: this.scr,
                        lineStyle: {
                            normal: {
                                color: '#0BE064',
                            }
                        }
                    },
                    {
                        name: 'finalScr',
                        type: 'line',
                        data: this.finalScr,
                        lineStyle:{
                            normal: {
                                color: '#4EB3FF',
                            }
                        }
                    }
                ]
            });
        },
        drawSecondChartLine(){
            let firstChart = this.$echarts.init(document.getElementById('secondChart'))

            var nullArr = [];
            for(let i = 0; i< this.times.length; i++){
                nullArr.push(null);
            }
            var arrTotal = [];
            var count = 1;
            this.events.forEach(element => {
                var arr = [];
                const startTime = element.times[0];
                const timeLength = element.times.length;
                var startIndex = 0;
                for(let i = 0; i < this.times.length; i++){
                    if(this.times[i] == startTime){
                        startIndex = i;
                        break;
                    }
                }
                for(let j = 0; j < startIndex; j++){
                    arr.push(null);
                }
                for(let n = 0; n < timeLength; n++){
                    arr.push(count);
                }
                const endLength = this.times.length - arr.length;
                for(let m = 0; m < endLength; m++){
                    arr.push(null);
                }
                arrTotal.push(arr);
                count++;
            });
            firstChart.setOption({
                title: {
                    text: 'User Feedback',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                //color:['#2146FF','#E00B60','#0BE064'],
                color:[],
                legend: {
                    //data: ['gsr', 'event', 'emotion'],
                    data:[],
                    left:'center',
                    textStyle:{
                        color:'#000000',
                        fontSize:16
                    }
                },
                grid: {
                    left: '3%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.times
                },
                /*yAxis: {
                    type: 'value'
                },*/
                yAxis:{}, 
                series: [
                    {
                        name: 'event1',
                        type: 'line',
                        data: arrTotal[0],
                        lineStyle: {
                            normal: {
                                color: '#db2b08',
                            }
                        }
                    },
                    {
                        name: 'event2',
                        type: 'line',
                        data: arrTotal[1],
                        lineStyle: {
                            normal: {
                                color: '#1163e6',
                            }
                        }
                    },
                    {
                        name: 'event3',
                        type: 'line',
                        data: arrTotal[2],
                        lineStyle: {
                            normal: {
                                color: '#00ff00',
                            }
                        }
                    },
                    {
                        name: 'event4',
                        type: 'line',
                        data: arrTotal[3],
                        lineStyle: {
                            normal: {
                                color: '#ff00ff',
                            }
                        }
                    },
                     {
                        name: 'emotion',
                        type: 'bar',
                        data: this.emotions,
                        itemStyle:{
                            normal:{
                                color:function(params){
                                    if(params.value == 1){
                                        return "#FE8463";
                                    }else if(params.value ==2){
                                        return "#27727B";
                                    }
                                    return "#9BCA63";
                                }
                            }
                        }
                    }
                ]
            });
        }
    }
}
</script>
<style lang="scss">
.firstChart, .secondChart{
    width: fit-content;
    height: fit-content;
    margin-top: 10px;
}
</style>