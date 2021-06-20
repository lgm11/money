<template>
    <div class="tags">
            <div class="new">
                <button>新增标签</button>
            </div>
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
        </div>
</template>

<script lang="ts">
    export default {
        name:'Tags'
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