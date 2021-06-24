<template>
    <layout>
        编辑标签
    </layout>
</template>

<script lang="ts">
import tagListModel from '@/model/tagListModel';
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
@Component
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

</style>