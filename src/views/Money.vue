<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value = 'onUpdateAccount' @submit="saveRecord"/>
        <Tabs :dataSource="recordTypeList" :value.sync="record.type"/>
        <div class="notes">
            <Notes fieldName="备注"
                    placeholder="在这里输入备注"
                    :value="record.notes"
                    @update:value = "onUpdateNotes"/>
        </div>
        <div class="createdAt">
            <Notes fieldName="日期"
                    placeholder="在这里输入日期"
                    type="date"
                    :value.sync="record.createAt"
                    />
        </div>
        <Tags @update:selected='record.tags = $event'/>
    </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue'
import Notes from '@/components/Money/Notes.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import Tabs from '@/components/Tabs.vue'
import recordTypeList from '@/constants/recordTypeList'
import {Component} from 'vue-property-decorator';



@Component({
    components:{Tags,Notes,NumberPad,Tabs},
})
export default class Money extends Vue{
    
    recordTypeList = recordTypeList
    get recordList(){
        return this.$store.state.recordList;
    }
    record :RecordItem = {tags:[],notes:'',type:'-',account:0,createAt:new Date().toISOString()}
    created(){
        this.$store.commit('fetchRecords')
        this.$store.commit('fetchTags')
        console.log(new Date().toISOString());
        
    }
    onUpdateNotes(value:string){
        this.record.notes = value
    }
    onUpdateAccount(value:string){
        this.record.account = parseFloat(value)
    }
    saveRecord(){
        this.$store.commit('createRecord',this.record)
        this.record.notes = ''
    }
}
    
</script>
<style lang="scss" scope>
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