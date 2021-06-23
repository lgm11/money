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
import { Component, Watch} from 'vue-property-decorator';
import model from '@/model'
const recordList = model.fetch()
@Component({components:{Tags,Notes,Type,NumberPad}})
export default class Money extends Vue{
    tags=['衣','食','住','行'];
    recordList :RecordItem[] = recordList;
    record :RecordItem = {tags:[],notes:'',type:'-',account:0}
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
        const record2 :RecordItem = model.clone(this.record)
        record2.createAt = new Date()
        this.recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListchanged(){
        model.save(this.recordList)
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