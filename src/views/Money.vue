<template>
    <Layout class-prefix="layout">
        {{record}}
        <NumberPad @update:value = 'onUpdateAccount'/>
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
import { Component, Prop} from 'vue-property-decorator';

type Record = {
    tags:string[]
    notes:string
    type:string
    account:number
}

@Component({components:{Tags,Notes,Type,NumberPad}})
export default class Money extends Vue{
    tags=['衣','食','住','行'];
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