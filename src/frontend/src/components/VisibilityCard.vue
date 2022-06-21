<template>
    <div class="visibility-card uk-card">
        <div id="chart-card">
            <canvas id="dataVis"></canvas>
        </div>
        <div class="summary-card">
            <span id="income-data">收入: {{ summary.income }}</span>

            <span id="expenses-data">支出: {{ summary.expenses }}</span>
        </div>
    </div>
</template>
<style>
.visibility-card{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    height:100%;
    padding-top: 20px;
    padding-left:10px;
    padding-right: 10px;
}
#chart-card{
    height: 80%;
}
#info-vis{
    height: 100%;
    width: 100%;
}
.summary-card{
    display: flex;
    justify-content: center;
}
#income-data{
    color: green;
    font-family:Heavy;
    margin: 5px;

}
#expenses-data{
    color: red;
    font-family:Heavy;
    margin: 5px;
}

</style>
<script>
import Chart from 'chart.js/auto';
import
{
    fontString
}
from "chart.js/helpers"

import{
    candy
} from '../utlls/color'

import {
  onMounted,
    // toRef,
    // toRefs,
    // defineProps
    // ref,
    reactive,
    // onMounted,
    watch
} from 'vue';

export default {
    name:"VisibilityCard",
    props:{
        classes:Object,
        income:Number,
        expenses:Number
    },
    setup(props) {
        let summary = reactive({
            classes:{},
            income:0,
            expenses:0
        });
        const getInitData = ()=>{
            return {
                labels: [],
                datasets: [{
                    label: '支出排行',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            };
        }
        const config = reactive({
            type: 'bar',
            data: {},
            options: {
                indexAxis: 'y',
                scales: {
                    x:{
                        beginAtZero:true
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                hover: {
                    animationDuration: 0  // 防止鼠标移上去，数字闪烁
                },
                maintainAspectRatio: false,
                animation:{}
                
            }
        });
        function ascending(x,y){
            return x.val-y.val;
        }
        let chart;
        watch(()=>props.classes,(newVal)=>{
            summary.classes = newVal;
            let dataSrc = Object.keys(summary.classes).map((key)=>{
                return {key:key,val:summary.classes[key]}
            });
            dataSrc.sort(ascending);
            dataSrc.reverse();
            let data = getInitData();
            let l = 0;
            dataSrc.map((item)=>{
                data.labels.push(item.key);
                data.datasets[0].data.push(item.val);
                data.datasets[0].backgroundColor.push(candy.backgroundColors[l%7]);
                data.datasets[0].borderColor.push(candy.borderColors[l%7]);
                l+=1;
            });
            config.data = data;
            chart.update();
        });
        watch(()=>props.income,(newVal)=>{
            summary.income = newVal.toFixed(2);
        });
        watch(()=>props.expenses,(newVal)=>{
            summary.expenses = newVal.toFixed(2);
        });
        onMounted(()=>{
            chart= new Chart(
                document.getElementById("dataVis"),
                config
            );
            config.options.animation={
                onComplete:function(){
                    var ctx = chart.ctx;
                    let canvasWidth = ctx.canvas.offsetWidth;
                    ctx.font = fontString(12, 'normal');
                    ctx.fillStyle = chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    chart.config._config.data.datasets.forEach(function (dataset,index) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = chart._metasets[index].data[i];
                            let xOffset =  model.x > canvasWidth*0.88? -canvasWidth*0.05:canvasWidth*0.05;
                            ctx.fillText(dataset.data[i].toFixed(2), model.x+xOffset, model.y +5);
                        }
                    });
                }
            }
        });
        return {
            summary,

        }

    }
}
</script>