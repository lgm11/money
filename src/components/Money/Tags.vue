<template>
    <div class="tags">
            <div class="new">
                <button @click="createTag">新增标签</button>
            </div>
            <ul class="current">
                <li v-for="tag in tagList" :key="tag.id" 
                @click="selected(tag)" :class="selectedTags.indexOf(tag)>=0 && 'selected'">{{tag.name}}</li>
            <!-- 遍历外部传来的数组 -->
            </ul>
        </div>
</template>

<script lang="ts">
import TagHelper from '@/mixins/TagHelper';
import Vue from 'vue';
import { mixins } from 'vue-class-component';
import { Component} from 'vue-property-decorator';
@Component
export default class Tags extends mixins(TagHelper){
    get tagList(){
        return this.$store.state.tagList
    }
    creted(){
        this.$store.commit('fetchTags')
    }
    selectedTags:string[] = [];
    selected(tag:string){
        const index = this.selectedTags.indexOf(tag);
        if(index >= 0){
            this.selectedTags.splice(index,1)
        }else{
            this.selectedTags.push(tag)
            }
        this.$emit('update:selected',this.selectedTags)
    }
}
</script>

<style lang="scss" scoped>
    .tags{
       flex-grow: 1;
       font-size: 14px;
       padding: 16px;
       display: flex;
       flex-direction: column-reverse;
       > .current{
           display: flex;
           margin-top: 3px;
           flex-wrap: wrap;
           > li{
               background: #D9D9D9;
               height: 24px;
               line-height: 24px;
               border-radius: 12px;
               padding: 0 17px;
               margin-right: 12px;
               &.selected{
                   background: darken(#D9D9D9,50%);
                   color: white;
               }
           }
       }
        > .new{
            > button{
                background:transparent ;
                border: none;
                color:#999999;
                border-bottom: 1px solid;
                padding: 0 3px;
            } 
            margin-top: 16px;
           }
    }
</style>