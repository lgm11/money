<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value = 'onUpdateAccount' @submit="saveRecord"/>
        <Type :value.sync="record.type"/>
        <div class="notes">
            <Notes fieldName="备注"
                    placeholder="在这里输入备注"
                    @update:value = "onUpdateNotes"/>
        </div>
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
import recordListModel from '@/model/recordListModel'
import tagListModel from '@/model/tagListModel'
const recordList = recordListModel.fetch()
const tagList = tagListModel.fetch()
@Component({components:{Tags,Notes,Type,NumberPad}})
export default class Money extends Vue{
    tags=tagList;
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
        recordListModel.create(this.record)
    }
    @Watch('recordList')
    onRecordListchanged(){
        recordListModel.save()
    }
}
    
</script>
<style lang="scss">
    .notes{
        background: f5f5f5;
    }
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
    
</style>
    
<style lang="scss" scoped>

@import '~@/assets/style/helper.scss';
</style>