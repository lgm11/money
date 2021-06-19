<template>
    <nav>
      <router-link class="item" to="/labels" active-class="selected">
        <Icon name="label"/>
       标签
      </router-link>
      <router-link class="item" to="/money" active-class="selected">
        <Icon name="money"/>
        记账
        </router-link>
      <router-link class="item" to="/statistics" active-class="selected">
        <Icon name='statistics'/>
        统计
        </router-link>
    </nav>
</template>

<script lang="ts">
   
    export default {
        
    }
</script>

<style lang="scss" scoped>
    nav{
        display:flex;
        box-shadow:0px 0px 10px rgba(0, 0, 0, 0.25);
        flex-direction: row;
        > .item{
            color: #97D9A1;
            padding: 2px 0;
            width: 33.33333333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            > .icon{
            width:32px;
            height: 32px;
            }
            
        }
        > .item.selected{
                color:#2F973E;
            }
    }
</style>