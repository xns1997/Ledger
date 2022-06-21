<template>
    <div class="not-select">
        <div class="help-mask-rect" id="vis-card-mask">
            <header>
                可视化
            </header>
            <p>
                使用Chart.js实现
            </p>
            <p>
                用于展示限定时间范围内的支出情况
            </p>
            <p>
                按照支出金额降序排列
            </p>
        </div>
        <div class="help-mask-rect" id="opr-card-mask">
            <header>
                操作面板
            </header>
            <p>
                提供添加和查询记账数据的功能
            </p>
            <p>
                添加数据前需要选择账目类型
            </p>
            <p>
                “2333”意味着获取所有数据
            </p>
        </div>
        <div class="help-mask-rect" id="datas-card-mask">
            <header>
                数据展示表
            </header>
            <p>
                提供分页展示功能，每页至多10条记录
            </p>
            <p>
                根据添加时间倒序排列
            </p>
            <p>
                时间的显示以当地时间、时区为准
            </p>
            <p>
                添加新纪录后会自动（只）展示当月数据
            </p>
        </div>
        
    </div>
</template>

<style>
.help-mask-rect{
    position: absolute;
    border: solid 3px;
    border-radius: 20px;
}
.help-mask-rect header{
    font-size: 48px;
    font-family:Heavy;
}
.help-mask-rect p{
    font-size: 24px;
    font-family:Medium;
}
</style>

<script>
import { onMounted } from '@vue/runtime-core';
import { setRect } from '../utlls/dom';
import { throttle } from '../utlls/func';
import { candy,setRandomColorWithBorder } from '../utlls/color'
export default {
    name:"HelpMask",
    setup() {
        const maskRectsResize = ()=>{
            let visCard = document.getElementsByClassName("visibility-card")[0];
            let visCardMask = document.getElementById('vis-card-mask');
            if(visCardMask === null){
                return;
            }
            setRect(visCardMask,visCard);
            setRandomColorWithBorder(visCardMask,candy);

            let datasCard = document.getElementsByClassName('datas-card-outer')[0];
            let datasCardMask = document.getElementById('datas-card-mask');
            setRect(datasCardMask,datasCard);
            setRandomColorWithBorder(datasCardMask,candy);

            let oprCard = document.getElementsByClassName('operation-card')[0];
            let oprCardMask = document.getElementById('opr-card-mask');
            setRect(oprCardMask,oprCard);
            setRandomColorWithBorder(oprCardMask,candy);
        };
        onMounted(()=>{
            maskRectsResize();
            window.addEventListener('resize',throttle(maskRectsResize));
        });

    }
}
</script>