<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}}</h3>
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
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone';

@Component({
    components:{Tabs}
})
export default class Statistics extends Vue{
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
        return tags.length === 0 ? '无' : tags.join(',')
    }
    get recordList(){
        return (this.$store.state as RootState).recordList
    }
    get groupedList(){
        if(this.recordList.length === 0){return []}
        const newList = clone(this.recordList).sort((a,b)=>dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf())
        const result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD') ,items:[newList[0]]}]
        for(let i=1;i < newList.length;i++){
            const current = newList[i]
            const last = result[result.length-1]
            if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
                last.items.push(current)
            }else{
                result.push({title:dayjs(current.createAt).format('YYYY-MM-DD') ,items:[current]})
            }
        }
        return result
    }
    beforeCreate(){
        this.$store.commit('fetchRecords')
    }
    type='-'
    interval='day'
    intervalList= intervalList
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
</style>