<template>
    <div class="datas-card-outer uk-card">
        <div class="datas-card">
            <table 
                class="uk-table uk-table-hover uk-table-middle uk-table-large  uk-table-divide"
            >
                <thead id="datas-card-header" class=" not-select">
                    <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="item in datas.displays" v-bind:key="item.id">
                        <td>{{ item.formatedTime }}</td>
                        <td v-if="item.type===0">支出</td>
                        <td v-else>收入</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.amount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="page-buttons">
            <button class="page-switch-button" @click="handlePrev()" :disabled="pageNum.curr<=1">prev</button>
            <span>{{ pageNum.curr }}</span><span>/</span><span>{{ pageNum.all }}</span>
            <button class="page-switch-button" @click="handleNext()" :disabled="pageNum.curr>=pageNum.all">next</button>
        </div>
    </div>
</template>
<style>
.datas-card-outer{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    height: 100%;
    
    padding-left: 20px;
    padding-right: 20px;
}
.datas-card-outer::-webkit-scrollbar { width: 0  }
.datas-card{
    height: 90%;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
}
.page-buttons{
    height: 8%;
    padding-top: 10px;
    
}
.page-switch-button{
    height: 80%;
    font-family:Bold;
    font-size:100% ;
    color: aliceblue;
    border-radius: 10px;
    border: none;
    background-color: rgb(96, 149, 248);
}
.page-switch-button:hover{
    background-color: rgb(163, 195, 255);
}
.page-switch-button:disabled{
    background-color: grey;
}


#datas-card-header{
    position: sticky;
    top: 0%;
    font-family: Bold;
    background: white;
    
}
#datas-card-header th{
    color: black;
    font-family:Heavy;
}
#datas-card-header th:hover{
    background-color: rgb(255, 162, 99);
    font-family:Heavy;
    color: black;
}
tr>td{
    text-align: left;
}

</style>
<script>

import{
  onMounted,
    onUpdated,
    reactive,
    watch
}from 'vue';

export default {
    name:"DatasCard",
    props:{
        items:Array
    },
    setup(props) {
        const datas = reactive({
            items:[],
            displays:[]
        });
        const pageNum = reactive({
            curr:0,
            all:0
        });
        watch(()=>props.items,(items)=>{
            pageNum.all = Math.ceil(items.length / 10);
            if(pageNum.all > 0){
                pageNum.curr = 1;
            }
            else{
                pageNum.curr=0;
            }
            datas.displays = [];
            let start = (pageNum.curr-1) * 10;
            let itemNums = pageNum.curr == pageNum.all?props.items.length % 10:10;
            if(itemNums == 0){
                itemNums = props.items.length; 
            }
            let end =  (pageNum.curr-1) * 10 +itemNums;
            for(let i = start; i <  end; i++){
                datas.displays.push(props.items[i]);
            }
        });
        watch(pageNum,()=>{
            datas.displays = [];
            let start = (pageNum.curr-1) * 10;
            let itemNums = pageNum.curr ==pageNum.all?props.items.length % 10:10;
            if(itemNums == 0){
                itemNums = props.items.length; 
            }
            let end =  (pageNum.curr-1) * 10 +itemNums;
            for(let i = start; i <  end; i++){
                datas.displays.push(props.items[i]);
            }
        })
        const handlePrev = ()=>{
            pageNum.curr -= 1;
        }
        const handleNext = ()=>{
            pageNum.curr += 1;
        }
        onMounted(()=>{
            pageNum.all = Math.ceil(props.items.length / 10);
            if(pageNum.all > 0){
                pageNum.curr = 1;
            }
            else{
                pageNum.curr=0;
            }
        })
        onUpdated(()=>{
            // console.log(props.items.length);
        })

        return {
            datas,
            pageNum,
            handlePrev,
            handleNext
        }
    }
}
</script>