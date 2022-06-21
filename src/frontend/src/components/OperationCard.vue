<template>
    <div class="operation-card uk-card">
        <form class="operation-card-insert" @submit.prevent="handleInsert()">
            <h4 class="operation-card-module-title">INSERT</h4>
            <div class="operation-card-insert-main ">
                <select 
                    class="uk-select operation-card-insert-class" 
                    v-model="selectedClass" 
                    name="insert-class"
                    
                >
                    <option v-for="item in categories.items"  v-bind:key="item.id" :value="item.id"  >{{ item.name }}</option>
                </select>
                <div class="operation-card-insert-money">
                    <div class="uk-inline">
                        <span class="uk-form-icon">
                            <img style="height:60%;" src="../assets/yen-sign-solid.svg" />
                        </span>
                        <input id="new-record" class="uk-input" v-model="money" type="number" step="0.01" name="insert-money">
                    </div>
                </div>
                <button 
                    class="operation-card-custom-button"
                    :disabled='selectedClass==""'
                 >ADD</button>
            </div>
        </form>
        <form 
            class="operation-card-filter"
            @submit.prevent="handleFilterByDate()"
        >
            <h4 class="operation-card-module-title">FILTER</h4>
            <div class="operation-card-filter-main ">
                <div class="operation-card-filter-date">
                     <select 
                        class="uk-select operation-card-filter-year" 
                        v-model="filterArgs.year" 
                        name="filter-year"
                    >
                        <option v-for="year in dateList.years"  v-bind:key="year" :value="year" >
                            {{ year }}
                        </option>
                    </select>
                    <select 
                        class="uk-select operation-card-filter-month" 
                        v-model="filterArgs.month" 
                        name="filter-month"
                        :disabled="dateDisabled.val"  
                    >
                        <option v-for="month in dateList.months"  v-bind:key="month.key" :value="month.key" >
                            {{ month.name }}
                        </option>
                    </select>
                    <div 
                        class="operation-card-custom-button" 
                        @click="handleFilterReset()"
                    >RESET
                    </div>
                </div>
                <select
                    class="uk-select operation-card-filter-classes"
                    v-model="filterArgs.classes"
                    multiple="multiple"
                >
                    <option v-for="item in categories.items"  v-bind:key="item.id" :value="item.id"  >{{ item.name }}</option>
                </select>
                <button 
                    class="operation-card-custom-button" 
                >FILTER</button>
            </div>
        </form>
    </div>
</template>
<style>
.operation-card{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
}
.operation-card-module-title{
    margin: 0;
}
.operation-card-insert{
    margin: 0;
}
.operation-card-filter{
    margin: 0;
}
.operation-card-insert-main{
    display: flex;
    flex-wrap: wrap
}
.operation-card-filter-main{
    display: flex;
    flex-wrap: wrap;
}
.operation-card-insert-class{
    flex:2;
}
.operation-card-insert-money{
    flex:3;
}
.operation-card-filter-date{
    flex: 2;
}
.operation-card-filter-classes{
    user-select: none;
    flex:2;
}
.operation-card-custom-button{
    flex:1;
    min-width: 80px;
    background-color: rgb(96, 149, 248);
    color:white;
    border: none;
    text-align: center;
    font-size: 100%;
}
.operation-card-custom-button:disabled{
    background-color: darkgray;
}

</style>
<script>
import {
    ref,
    reactive,
    onMounted,
    watch,
} from 'vue';
import {
    timestampRange
} from '../utlls/time'

function isMoney(num){
    let s = String(num);
    let index = s.indexOf('.') + 1;
    if (index === 0){
        return true;
    }
    let decimals = s.length - index;
    if(decimals <= 2){
        return true
    }
    return false;
}

export default {
    name:"OperationCard",
    props:{
        filterDisabled:Boolean
    },
    setup(props,{emit}) {
        let categories = reactive({
            items:[]
        });
        let dateList = reactive({
            years:[2333],
            months:[
                {key:0,name:"ALL"},
                {key:1,name:"JAN"},
                {key:2,name:"FEB"},
                {key:3,name:"MAR"},
                {key:4,name:"APR"},
                {key:5,name:"MAY"},
                {key:6,name:"JUN"},
                {key:7,name:"JUL"},
                {key:8,name:"AUG"},
                {key:9,name:"SEP"},
                {key:10,name:"OCT"},
                {key:11,name:"NOV"},
                {key:12,name:"DEC"}
            ]
        })
        let selectedClass = ref("");
        let filterArgs = reactive({
            year:2333,
            month:0,
            classes:[]
        })
        let money = ref(0);
        let dateDisabled = reactive({
            val:true
        });
        onMounted(async() => {
            let currYear = new Date().getFullYear(); 
            for(let i = 0 ; i < 50; i++){
                dateList.years.push(currYear - i);
            }
            await fetch('http://127.0.0.1:3000/allClass',{
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                method:"GET",
            }).then(res=>res.json()).then(
                result=>{
                    categories.items = result;
                }
            ).catch(error=>{
                console.log(error)
            });
        });

        watch(money, async (newVal,oldVal)=>{
            console.log(newVal,oldVal);
            if(typeof newVal !== 'number'){
                money.value = oldVal;
            }
            if(!isMoney(newVal)){
                money.value = oldVal;
            }
        });

        watch(filterArgs,async(newVal)=>{
            dateDisabled.val = newVal.year === 2333? true: false;
        });

        let handleInsert = async ()=>{
            let body = {
                'type':selectedClass.value,
                'amount':money.value
            };
            await fetch('http://127.0.0.1:3000/insert',{
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                method:"POST",
                body:JSON.stringify(body)
            }).then(res=>res.json()).then(
                result=>{
                    filterArgs.year = new Date().getFullYear();
                    filterArgs.month = new Date().getMonth()+1;
                    filterArgs.classes = [];
                    handleFilterByDate();
                    emit('new-item',result)
                }
            ).catch(error=>{
                console.log(error)
            });
        };
        let handleFilterByDate = async() =>{
            if(filterArgs.year!=2333){
                let url = new URL('http://127.0.0.1:3000/filter');
                let range = timestampRange(filterArgs);
                let classes = [];
                if(filterArgs.classes.length != 0){
                   classes = filterArgs.classes;
                }
                emit('filter-do',url,classes,range);

            }else{
                let url = new URL('http://127.0.0.1:3000/allWithClass');
                let classes = [];
                if(filterArgs.classes.length != 0){
                    classes = filterArgs.classes;
                }
                emit('filter-do',url,classes);
            }

        };
        let handleFilterReset= ()=>{
            filterArgs.year=2333;
            filterArgs.month=0;
            filterArgs.classes=[];
        }

        return {
            props,
            categories,
            selectedClass,
            filterArgs,
            handleInsert,
            handleFilterByDate,
            handleFilterReset,
            dateList,
            dateDisabled,
            money
        };
    }
}
</script>