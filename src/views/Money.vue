<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value = 'onUpdateAccount' @submit="saveRecord"/>
        <Type :value.sync="record.type"/>
        <Notes @update:value = "onUpdateNotes"/>
        <Tags :dataSource.sync="tags" @update:selected = "onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue'
import Notes from '@/components/Money/Notes.vue'
import Type from '@/components/Money/Type.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import { Component, Prop, Watch} from 'vue-property-decorator';

type Record = {
    tags:string[]
    notes:string
    type:string
    account:number
    createAt?:Date
}

@Component({components:{Tags,Notes,Type,NumberPad}})
export default class Money extends Vue{
    tags=['衣','食','住','行'];
    recordList :Record[] = JSON.parse(window.localStorage.getItem('recordList')||'[]');
    record:Record = {tags:[],notes:'',type:'-',account:0}
    onUpdateTags(tag:string[]){
        this.record.tags = tag
    }
    onUpdateNotes(value:string){
        this.record.notes = value
    }
    onUpdateAccount(value:string){
        this.record.account = parseFloat(value)
    }
    saveRecord(){
        const record2:Record = JSON.parse(JSON.stringify(this.record))
        record2.createAt = new Date()
        this.recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListchanged(){
        window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
    }
}
    
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
</style>