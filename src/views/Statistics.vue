<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <div class="chart-wrapper" ref="chartWrapper"><Chart class="chart" :options="x"/></div>
        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}}
                    <span>💴{{group.total}}</span>
                </h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id"
                    class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>💴{{item.account}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="no-result">
            没有记账记录
        <Icon name='cry'/> 
        </div>
    </Layout>
</template>
<style scoped lang="scss">
    %item{
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
    }
    .title{
        background: rgb(151,217,161);
       @extend %item
    }
    .record{
        @extend %item
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
</style>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue'
import recordTypeList from '@/constants/recordTypeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue'

@Component({
    components:{Tabs,Chart}
})
export default class Statistics extends Vue{
    mounted(){
        (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = (this.$refs.chartWrapper as HTMLDivElement).scrollWidth
    }
    beautify(string:string){
        const day = dayjs(string)
        const now = dayjs()
        if(day.isSame(now,'day')){
            return '今天'
        }else if(day.isSame(now.valueOf()-84600*1000,'day')){
            return '昨天'
        }else if(day.isSame(now.valueOf()-84600*1000*2,'day')){
            return '前天'
        }else if(day.isSame(now,'year')){
            return day.format('M月D日')
        }else{
            return day.format('YYYY年M月D日')
        }
    }
    tagString(tags:Tag[]){
        return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，')
    }
    get recordList(){
        return (this.$store.state as RootState).recordList
    }
    get groupedList(){
        if(this.recordList.length === 0){return []}
        type Result = {title:string,total?:number,items:RecordItem[]}[]
        const newList = clone(this.recordList).filter(r=>r.type === this.type).sort((a,b)=>dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf())
        if(newList.length === 0){return []}
        const result:Result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD') ,items:[newList[0]]}]
        for(let i=1;i < newList.length;i++){
            const current = newList[i]
            const last = result[result.length-1]
            if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
                last.items.push(current)
            }else{
                result.push({title:dayjs(current.createAt).format('YYYY-MM-DD') ,items:[current]})
            }
        }
        result.map(group=>{group.total=group.items.reduce((sum,item)=>sum+item.account,0)})
        return result
    }
    beforeCreate(){
        this.$store.commit('fetchRecords')
    }
    get x (){
        return{
            tooltip:{
                show:true,
                position:'top',
                
                triggerOn: "click",
                formatter: '{c}'
            },
            grid: {
                left: 0,
                right: 0,
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28','29', '30',],
                axisTick:{show:false}
            },
            yAxis: {
                show:false,
                position:'top',
                type: 'value'
            },
            series: [{
                symbolSize:12,
                data: [150, 230, 224, 218, 135, 147, 260,150, 230, 224, 0, 135, 147, 260,150, 230, 224, 218, 135, 147, 260,150, 230, 224, 218, 135, 147, 260,150, 230,],
                type: 'line',
                lineStyle: {
                    color: "#666",
                    },
                itemStyle:{
                    color:'#666'
                },
                symbol: "circle"
            }]
        }
    };
    type='-'
    // interval='day'
    // intervalList= intervalList
    recordTypeList = recordTypeList
} 
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item{
        background: white;
        &.selected{
            background: #c4c4c4;
            &::after{
                display: none;
            }
        }
    }
    ::v-deep .interval-tabs-item{
        height: 48px;
    }
    .no-result{
        padding: 16px;
        text-align: center;
    }
    .chart{
        width: 430%;
        &-wrapper{
            overflow: auto;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>