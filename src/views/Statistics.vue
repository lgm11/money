<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart class="chart" :options="chartOptions"/>
        </div>
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
import _ from 'lodash'

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
    get keyValueList (){
        const today = new Date()
        const array = []
        for(let i = 0;i <= 29;i++){
            const dateString = dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
            array.push({key:dateString,value:_.find(this.groupedList,{title:dateString})?.total})
        }
        array.sort((a,b)=>{
            if(a.key > b.key){
                return 1
            }else if(a.key === b.key){
                return 0
            }else{
                return -1
            }
        })
        return array
    }

    get chartOptions (){
        const keys = this.keyValueList.map(item=>item.key)
        const values = this.keyValueList.map(item=>item.value)
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
                data: keys,
                axisTick:{show:false},
                axisLabel:{
                    formatter: function (value:string, index:string) {
                        return value.substr(5);
                    }
                }
            },
            yAxis: {
                show:false,
                position:'top',
                type: 'value'
            },
            series: [{
                symbolSize:12,
                data: values,
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
            background: #97d9a1;
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