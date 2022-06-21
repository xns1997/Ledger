<template>
    <div class="uk-card not-select" id="nav-card-outer">
        <div>
            <h4>菜单</h4>
        </div>
        <hr/>
        <div>
            <h4 @click="sendShowHelp()">提示</h4>
        </div>
        <div>
            <h4 @click="sendShowMind()">项目思维导图</h4>
        </div>
    </div>
</template>
<style>
#nav-card-outer{
    position: relative;
    top:20%;
    left:20px;
    border-radius: 10px;
    min-height: 200px;
    padding: 20px;
}
ul {
  list-style: none;
}
</style>
<script>
import
{
    onMounted,
    reactive,
}from 'vue'

export default {
    name:"LeftNavBar",
    props:{
        msg:String
    },
    components:{

    },
    setup(_,{emit}){
        const windowSize = reactive({
            x:document.body.scrollWidth,
            y:document.body.scrollHeight
        });
        onMounted(()=>{
            window.onresize = ()=>{
                windowSize.x = document.body.scrollWidth;
                windowSize.y = document.body.scrollHeight;
            };
        });
        const sendShowHelp = ()=>{
            emit('show-mask');
        }
        const sendShowMind = ()=>{
            emit('show-mind');
        }
        return {
            windowSize,
            sendShowHelp,
            sendShowMind
        };
    }
}
</script>