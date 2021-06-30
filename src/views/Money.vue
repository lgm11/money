<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value = 'onUpdateAccount' @submit="saveRecord"/>
        <Type :value.sync="record.type"/>
        <div class="notes">
            <Notes fieldName="备注"
                    placeholder="在这里输入备注"
                    @update:value = "onUpdateNotes"/>
        </div>
        <Tags/>
    </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue'
import Notes from '@/components/Money/Notes.vue'
import Type from '@/components/Money/Type.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import {Component} from 'vue-property-decorator';

@Component({
    components:{Tags,Notes,Type,NumberPad},
    computed:{
        recordList(){
            return this.$store.state.recordList;
        }
    }
})
export default class Money extends Vue{
    record :RecordItem = {tags:[],notes:'',type:'-',account:0}
    created(){
        this.$store.commit('fetchRecords')
    }
    onUpdateNotes(value:string){
        this.record.notes = value
    }
    onUpdateAccount(value:string){
        this.record.account = parseFloat(value)
    }
    saveRecord(){
        this.$store.commit('createRecord',this.record)
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