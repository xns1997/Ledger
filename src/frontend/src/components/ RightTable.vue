<template>
    <div class="right-main not-select">
        <div class="visbility-outer">
            <visibility-card :classes="sumForVis.classes" :income="sumForVis.income" :expenses="sumForVis.expenses"/>
        </div>
        <div class="operation-outer">
            <Operation-Card @new-item="newItem" @filter-do="filerDo"/>
        </div>
        <div class="datas-outer">
            <datas-card :items="state.items"/>
        </div>
    </div>
</template>
<style>
.right-main{
    height: 100%;
    width: 90%;
    display: grid;
    grid-template-columns: 55% 45%;
    grid-template-rows: 36% 62%;
    gap:10px 10px; 
    grid-template-areas: 
        "visbility-outer operation-outer"
        "datas-outer datas-outer"; ; 
}


.visbility-outer { 
    grid-area: visbility-outer; 
}

.operation-outer { 
    grid-area: operation-outer; 
}

.datas-outer { 
    grid-area: datas-outer; 
}

</style>
<script>
import DatasCard from "./DatasCard.vue";
import OperationCard from "./OperationCard.vue";
import VisibilityCard from "./VisibilityCard.vue";
import {
    onMounted,
    onBeforeUpdate,
    // watch,
    // onUpdated,
    ref,
    reactive,
    // unref,
    // toRaw,
} from 'vue'
import{
    timestampToDate
} from '../utlls/time'

function getSummary(datas){
    let income = 0;
    let expenses = 0;
    datas.map((item)=>{
        if(item.type == 1){
            income +=item.amount;
        }else{
            expenses+=item.amount;
        }
    });
    return [income,expenses]
}
export default {
    name:"RightTable",
    components:{
        DatasCard,
        OperationCard,
        VisibilityCard
    },
    setup() {
        const state = reactive({
            items:[],
            range:[],
            classes:[]
        });
        const summary = reactive({
            classes:{},
            income:0,
            expenses:0
        });
        const sumForVis = reactive({
            classes:{},
            income:0,
            expenses:0
        });
        let filterDisabled = ref(true);
        const genStaticFromSummary = ()=>{
            sumForVis.income = summary.income.valueOf();
            sumForVis.expenses = summary.expenses.valueOf();
            sumForVis.classes = summary.classes.valueOf();
            // console.log(sumForVis);
        }
        onMounted(async() => {
            const srcData = await fetch(
                'http://127.0.0.1:3000/allWithClass'
            ).then(rsp => rsp.json())
            state.items = srcData.data;
            state.items.map((item)=>{
                item.formatedTime = timestampToDate(item.time);
            })
            let s = getSummary(state.items);
            summary.income=Number(s[0].toFixed(2));
            summary.expenses=Number(s[1].toFixed(2));
            genStaticFromSummary();
        });
        onBeforeUpdate(()=>{
            summary.classes={};
            state.items.map((item)=>{
                if(item.type==0){
                    if(summary.classes[item.name]==undefined){
                        summary.classes[item.name] = item.amount;
                    }else{
                        summary.classes[item.name] += item.amount;
                    }
                    
                }
            });
            genStaticFromSummary();
        });
        const newItem = (newVal)=>{
            console.log(newVal);
        };
        const getByUrl = async(url)=>{
            await fetch(url,{
                    headers:{
                        'Content-Type': 'application/json;charset=utf-8'
                        },
                        method:"GET",
                    }
                ).then(res=>res.json()).then(
                    result=>{
                        state.items = result.data;
                    }
                ).catch(error=>{
                    console.log(error)
                });
            state.items.map((item)=>{
                item.formatedTime = timestampToDate(item.time);
            });
            let s = getSummary(state.items);
            summary.income=Number(s[0].toFixed(2));
            summary.expenses=Number(s[1].toFixed(2));
            genStaticFromSummary();
        }
        const filerDo = async(url,classes,range) =>{
            if(range!=null){
                url.searchParams.append('start',range[0]);
                url.searchParams.append('end',range[1]);
                state.range = range;
            }
            if(classes.length!=0){
                url.searchParams.append('classes',JSON.stringify(classes));
            }
                
                state.classes = classes;
            await getByUrl(url);
            
        }        
        return {
            state,
            filterDisabled,
            summary,
            sumForVis,
            newItem,
            filerDo,
        };
  }
}
</script>