<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goback"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="notes-wrapper">
            <Notes 
                @update:value = "update"
                :value="tag.name"  
                fieldName="标签名" 
                placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
             <Button @click="remove">删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue'
import Button from  '@/components/Button.vue'
@Component({
    components: {Notes,Button},
})
export default class Labels extends Vue{
    get tag(){
        return this.$store.state.currentTag
    }
    created(){
        const id =this.$route.params.id
        this.$store.commit('setCurrentTag',id)
        if(!this.tag){
            this.$router.replace('/404')
        }
    }
    update(name:string){
        if(this.tag){
            // store.updateTag(this.tag.id,name)
        }
    }
    remove(){
        if(this.tag){
            return
            // if(store.removeTag(this.tag.id)){
            //     this.$router.back()
            // }else{
            //     window.alert('删除失败')
            // }
        }
    }  
    goback(){
        this.$router.back()
    }  
}
</script>

<style lang="scss" scoped>
    .navBar{
        text-align: center;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        > .leftIcon{
             width: 20px;
            height: 20px;
        }
        > .rightIcon{
             width: 20px;
            height: 20px;
        }
    }
    .notes-wrapper{
        background: white;
        margin-top: 8px;
    }
    .button-wrapper{
        text-align: center;
        margin-top: 28px;
    }
</style>