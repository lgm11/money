<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value = 'onUpdateAccount'/>
        <Type @update:value = "onUpdateType"/>
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
@Component({components:{Tags,Notes,Type,NumberPad}})
export default class Money extends Vue{
    tags=['衣','食','住','行'];
    onUpdateTags(tag:string[]){
        console.log(tag);
    }
    onUpdateNotes(value:string){
        console.log(value);
    }
    onUpdateType(value:string){
        console.log(value);
    }
    onUpdateAccount(value:string){
        console.log(value);
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