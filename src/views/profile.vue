<template>
    <div class="indexContainer">
        <div class="dropdownContainer">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    IDs<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="null">Null</el-dropdown-item>
                        <el-dropdown-item v-for="(id,index) in this.idArray" v-text="id" :key="index" :command="id"></el-dropdown-item>
                    </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div id="chart" class="chart" :style="{width: '100%', height: '500px'}"></div>
    </div>
</template>
<script>
import { Message } from 'element-ui';
export default {
    name: 'index',
    data(){
        return{
            path: "ws://20.71.20.193:8080/websocket", //  ws://192.168.31.87:4200/websocket ws://20.71.20.193:8080/websocket //http://20.76.154.153/ http://20.86.237.198
            ws: {},
            chartData: [],
            dataMap: new Map(),
            signalArray:[],
            sclArray:[],
            idArray:[],
            currentPath: this.$store.state.selectBarValue,
            chart: null,
            xAxis:[],
        }
    },
    mounted(){
        this.initXAxis();
        this.initEchart();
        this.initWebSocket();
    },
    beforeDestroy: function () {
        console.log('===============beforeDestroy===============');
        this.chart.dispose();
        this.ws.close();
    },
    methods:{
        initWebSocket() {
            this.ws = new WebSocket(this.path) //
            this.ws.onopen = () => {
                //this.ws.send('connection success');
                Message.success('Connect to Web Socket');
                console.log("ws open: "+this.status)
            }
            this.ws.onmessage = (data) => {
                console.log("get message");
                console.log(data.data);
                let cData = JSON.parse(data.data)
                var valueObj = new Map();
                var signalArr = [];
                var sclArr = [];
                if(this.dataMap.has(cData.MeasurementID)){
                    valueObj = this.dataMap.get(cData.MeasurementID);
                    signalArr = valueObj.get("signalArr");
                    sclArr = valueObj.get("sclArr");
                    if(signalArr.length > 150){
                        signalArr.shift();
                    }
                    if(sclArr.length > 150){
                        sclArr.shift();
                    }
                    signalArr.push(cData.Signal);
                    sclArr.push(cData.SCL);
                }else{
                    signalArr.push(cData.Signal);
                    sclArr.push(cData.SCL);
                    this.idArray.push(cData.MeasurementID);
                }
                valueObj.set("signalArr", signalArr);
                valueObj.set("sclArr", sclArr);
                this.dataMap.set(cData.MeasurementID, valueObj);
                // if (this.chartData.length > 20) {
                //     this.chartData.shift()
                // }
                // this.chartData.push(cData)
                console.log(this.dataMap);
                //this.initData();
                this.initEchart();
            }
            this.ws.onclose = (err) => {
                console.log("onCLose:"+err.code);
                //console.log('ws connection status：' + this.ws.readyState);
                Message.error('Connection closed');
            }
            this.ws.onerror = function (error) {
                console.log("onError Code: "+error.code)
                console.log("onError Status: "+this.status)
                console.log('ws connection Status：' + this.ws);
                Message.error('Failed to connect to the websocket');
            }
        },
        initEchart(){
            this.chart = this.$echarts.init(document.getElementById('chart'))
            var option = {
                title: {
                    text: 'Live Data',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#2146FF','#E00B60'],
                legend: {
                    data: ['Signal', 'SCL'],
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
                    data: this.xAxis,
                },
                yAxis: {
                    type: 'value',
                
                    scale:true,
                },
                series: [
                    {
                        name: 'Signal',
                        type: 'line',
                        data: this.signalArray,
                        lineStyle: {
                            normal: {
                                color: '#2146FF',
                            }
                        }
                    },
                    {
                        name: 'SCL',
                        type: 'line',
                        data: this.sclArray,
                        lineStyle: {
                            normal: {
                                color: '#E00B60',
                            }
                        }
                    },
                    
                ]
            };
            this.chart.setOption(option);
        },
        initData(){
            this.signalArray = this.dataMap.get("c6306edf-2555-452a-b382-acc1b4dc78e8").get("signalArr");
            this.sclArray = this.dataMap.get("c6306edf-2555-452a-b382-acc1b4dc78e8").get("sclArr");
        },
        initXAxis(){
            var i = 0;
            for(;i<240;i++){
                this.xAxis.push(i);
            }
        },
        handleCommand(command) {
            console.log('click on item ' + command);
            if(command !=="null"){
                this.signalArray = this.dataMap.get(command).get("signalArr");
                this.sclArray = this.dataMap.get(command).get("sclArr");
            }else{
                this.signalArray = [];
                this.sclArray = []; 
            }
           
        }
    }
}
</script>
<style lang="scss">
.chart{
    margin-top: 10px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #000000;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.dropdownContainer{
    width: 30px;
    margin-top: 10px;
    margin-left: 5px;
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 5px;
}
</style>