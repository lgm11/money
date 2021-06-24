<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <Notes class="notes-wrapper" fieldName="标签名" placeholder="请输入标签名"/>
        <div class="button-wrapper">
             <Button>删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
import tagListModel from '@/model/tagListModel';
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue'
import Button from  '@/components/Button.vue'
@Component({components: {Notes,Button}})
    export default class Labels extends Vue{
        created(){
            const id = this.$route.params.id
            tagListModel.fetch()
            const tags = tagListModel.data
            const tag = tags.filter(t => t.id === id)[0]
            if(tag){

            }else{
                this.$router.replace('/404')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navBar{
        text-align: center;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        > .title{
           
        }
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