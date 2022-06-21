<template>
    <div id="mind-map-outer" class="not-select">
        <svg id="mind-map-svg">
        </svg>
    </div>
</template>

<script>
import * as d3 from "d3";
import { 
    onMounted,
    // reactive
} from '@vue/runtime-core';
import {candy} from '../utlls/color';
function sumArr(arr){
        var sum = 0;
        arr.forEach(function(val){
              sum += val;
        })
    return sum;
}
export default {
    name:"MindMap",
    setup() {
        let svg;
        let srcData = [
            {
                level:1,
                children:[
                    {nid:1,val:"Project",Parent:0,x:0,y:0}
                ]
            },
            {
                level:2,
                children:[
                    {nid:2,val:"Front-End",Parent:1,x:0,y:0},
                    {nid:3,val:"Back-End",Parent:1,x:0,y:0}
                ]
            },
            {
                level:3,
                children:[
                    {nid:4,val:"Framework",Parent:2,x:0,y:0},
                    {nid:5,val:"Features",Parent:2,x:0,y:0},
                    {nid:6,val:"Frameworks",Parent:3,x:0,y:0},
                    {nid:7,val:"Interfaces",Parent:3,x:0,y:0},
                ]
            },
            {
                level:4,
                children:[
                    {nid:8,val:"Vue3+Composition API",Parent:4,x:0,y:0},
                    {nid:9,val:"Data Visibility--ChartJS",Parent:5,x:0,y:0},
                    {nid:10,val:"Data Operations",Parent:5,x:0,y:0},
                    {nid:11,val:"Data Presentation",Parent:5,x:0,y:0},
                    {nid:12,val:"NodeJS+Express",Parent:6,x:0,y:0},
                    {nid:13,val:"SQLite3",Parent:6,x:0,y:0},
                    {nid:14,val:"/all | GET",Parent:7,x:0,y:0},
                    {nid:15,val:"/allWithClass | GET",Parent:7,x:0,y:0},
                    {nid:16,val:"/allClass | GET",Parent:7,x:0,y:0},
                    {nid:17,val:"/insert | POST",Parent:7,x:0,y:0},
                    {nid:18,val:"/filter | GET",Parent:7,x:0,y:0},
                    {nid:19,val:"/count | GET",Parent:7,x:0,y:0},
                ]
            },
        ];
        onMounted(() => {
            svg = d3.select("#mind-map-svg");
            let numOfLevels = srcData.length;
            for(let i = numOfLevels - 1; i >= 0; i--){
                let numInALevel = srcData[i].children.length;
                for(let j = 0; j < numInALevel; j++){
                    let x = Math.floor(1400/numOfLevels * i + 20);
                    let y = Math.floor(800/numInALevel * j +20);
                    if(i < numOfLevels - 1){
                        let ys = [];
                        for(let k = 0; k < srcData[i+1].children.length; k ++){
                            if(srcData[i+1].children[k].Parent == srcData[i].children[j].nid){
                                let curr = srcData[i+1].children[k].y;
                                ys.push(curr);
                            }
                        }
                        y = Math.floor(sumArr(ys)/ys.length);

                        for(let k = 0; k < srcData[i+1].children.length; k ++){
                            if(srcData[i+1].children[k].Parent == srcData[i].children[j].nid){
                                let start = [x+300,y+30];
                                let end = [srcData[i+1].children[k].x,srcData[i+1].children[k].y+30];
                                let mid1 = [];
                                let mid2 = [];
                                let dfY = end[1] - start[1];
                                if(dfY > 0){
                                    mid1 = [
                                            start[0] + Math.abs(start[0]-end[0])*0.45, 
                                            start[1] + Math.abs(start[1]-end[1])*0.4
                                        ];
                                    mid2 = [
                                            start[0] + Math.abs(start[0]-end[0])*0.55, 
                                            start[1] + Math.abs(start[1]-end[1])*0.6
                                        ];
                                }
                                else{
                                    mid1 = [
                                            start[0] + Math.abs(start[0]-end[0])*0.45, 
                                            start[1] - Math.abs(start[1]-end[1])*0.4
                                        ];
                                    mid2 = [
                                            start[0] + Math.abs(start[0]-end[0])*0.55, 
                                            start[1] - Math.abs(start[1]-end[1])*0.6
                                        ];
                                }
                                let path = `
                                            M ${start[0]} ${start[1]}
                                            Q ${mid1[0]}  ${mid1[1]},
                                              ${mid2[0]}  ${mid2[1]}
                                            T ${end[0]}   ${end[1]}`;

                                svg.append("circle")
                                    .attr('cx',mid1[0])
                                    .attr('cy',mid1[1])
                                    .attr('r',4)
                                    .attr('fill','blue');
                                svg.append("circle")
                                    .attr('cx',mid2[0])
                                    .attr('cy',mid2[1])
                                    .attr('r',4)
                                    .attr('fill','red');
                                svg.append("path")
                                    .attr("d",path)
                                    .attr('stroke',"black")
                                    .attr('stroke-width',3)
                                    .attr("fill","transparent");
                                continue;
                            }
                        }

                    }
                    srcData[i].children[j].x = x;
                    srcData[i].children[j].y = y;
                    svg.append("rect")
                        .attr("width",300)
                        .attr("height",60)
                        .attr("x",x)
                        .attr("y",y)
                        .attr("rx",20)
                        .attr("ry",20)
                        .attr("stroke-width",3)
                        .attr("fill",candy.backgroundColors[(i+j)%candy.length])
                        .attr("stroke",candy.borderColors[(i+j)%candy.length])
                        .attr("id",srcData[i].children[j].nid)
                    svg.append("text")
                        .attr("width",300)
                        .attr("height",60)
                        .attr("x",x + 15)
                        .attr("y",y + 40)
                        .text(srcData[i].children[j].val)
                }
            }
        });
        return {
            srcData,
            svg
        }
    }
}
</script>

<style>
#mind-map-outer{
    position: absolute;
    height: 100%;
    width: 100%;
    min-width: 1200px;
    background-color: rgba(255, 255, 255, 0.9);
    overflow-x: scroll;
    overflow-y: scroll;
    font-family: Heavy;
    font-size:24px;
}
#mind-map-svg{
    min-height: 900px;
    min-width: 1600px;
}
svg txt{
    text-align: center;
}
</style>