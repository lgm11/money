<template>
    <div>
            <label class="notes">
                <span class="name">备注</span>
                <input type="text" 
                v-model="value"
                placeholder="请输入备注">
            </label>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
      value=''; 
      
    }
</script>

<style lang="scss" scoped>
    .notes{
       display: block;
        font-size: 14px;
        padding:25px 0;
        background: #f5f5f5;
        > .name{
            padding-left: 16px;
        }
        > input{
            padding-left: 16px;
            border: none;
            background: #f5f5f5;
        }
    }
</style>