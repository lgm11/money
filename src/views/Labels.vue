<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" 
                        v-for="tag in tags" :key="tag.id" 
                        :to="`/labels/edit/${tag.id}`">
                <span>
                    {{tag.name}}
                </span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <button class="createTag" @click="createTag">
                添加标签
            </button>
        </div>
    </Layout>
</template>

<script>
import tagListModel from '@/model/tagListModel';
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
tagListModel.fetch()
@Component
export default class Labels extends Vue{
    tags = tagListModel.data
    createTag(){
        const name = window.prompt('请输入标签名')
        if(name){
           const message = tagListModel.create(name)
           if(message === 'duplicated'){
               window.alert('标签名重复了')
           }else if(message === 'success'){
               window.alert('添加成功')
           }
        }
    }
} 
</script>

<style lang="scss" scoped>
    .tags{
        padding-left: 16px;
        > .tag{
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            svg{
                width: 20px;
                height: 20px;
                margin-right: 16px;
            }
        }
    }
    .createTag{//button是内联元素,想要用text-align居中需要用在父元素
        background: #767676;
        color: white;
        border-radius: 10px;
        border: none;
        height: 40px;
        padding: 0 16px;
        &-wrapper{
            text-align: center;
            padding: 16px;
            margin-top: 28px;

        }
    }
</style>