<template>
    <div id="main-row">
        <div class="left-side">
            <LeftNavBar @show-mask="showMask()" @show-mind="showMindMap()"/>
        </div>
        <div class="right-side">
            <RightTable/>
        </div>
        <div v-if="maskOn" class="mask" @click="hideMask()">
            <help-mask/>
        </div>
        <mind-map v-if="svgOn" @click="hideMindMap()"/>
    </div>
</template>
<script>
import LeftNavBar from "./LeftNavBar.vue"
import RightTable from "./ RightTable.vue"
import HelpMask from "./HelpMask.vue"
import MindMap from './MindMap.vue'
import {
    onMounted,
    ref
} from 'vue';
import {
    setRect
} from '../utlls/dom';
import {
    throttle
} from '../utlls/func'
export default {
    name:"MainFrame",
    props:{
        msg:String
    },
    components:{
        LeftNavBar,
        RightTable,
        HelpMask,
        MindMap
    },
    setup(){
        const maskOn = ref(false);
        const svgOn  = ref(false);
        const showMask = ()=>{
            maskOn.value=true;
        }
        const hideMask = ()=>{
            maskOn.value=false;
        }
        const newMaskSize = ()=>{
            let mask = document.getElementsByClassName('mask')[0];
            let wholePage = document.getElementById('app-container');
            setRect(mask,wholePage);
        }
        const showMindMap = ()=>{
            svgOn.value = true;
        }

        const hideMindMap = ()=>{
            svgOn.value = false;
        }
        onMounted(()=>{
            maskOn.value=false;
            window.addEventListener('resize',throttle(newMaskSize));
        });
        return {
            maskOn,
            svgOn,
            hideMask,
            showMask,
            hideMindMap,
            showMindMap
        }
    }
    
}
</script>
<style>
#main-row{
    height: 100%;
    width: 100%;
    display: flex;
    background-color: rgb(175, 239, 239);
    font-family: Regular;

}
.left-side{
    flex:0 0 300px;
    height: 100%;
}
.nav-card{
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position: relative;
    top: 150px;
}
.right-side{
    flex:1;
    display: flex;
    justify-content: center;
    min-width: 900px;
}
.mask{
    height: 100%;
    width:100%;
    position: absolute;
    top: 0;
    left: 0;
}

.uk-card{
    background-color: rgb(255, 255, 255);
}


.not-select{

    -moz-user-select:none; /*火狐*/

    -webkit-user-select:none; /*webkit浏览器*/

    -webkit-touch-callout: none;

    -ms-user-select:none; /*IE10*/

    -khtml-user-select:none; /*早期浏览器*/

    user-select:none;

}


</style>