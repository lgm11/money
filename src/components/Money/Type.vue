<template>
    <div>
            <ul class="type">
                <li :class="type ==='-' && 'selected'" @click="selectedType('-')">支出</li>
                <li :class="type ==='+' && 'selected'" @click="selectedType('+')">收入</li>
            </ul>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch} from 'vue-property-decorator';
@Component
export default class Type extends Vue{
    type='-';
    selectedType(type:string){
        if(type !== '-' && type !== '+'){
            throw new Error('type is unknown')
        }else{
            this.type = type;
        }
    }
    @Watch('type')
        onTypeChanged(value:string){
            this.$emit('update:value',value)
        } 
}
</script>

<style lang="scss" scoped>
     .type{
        background: #c4c4c4;
        display: flex;
        text-align: center;
        > li{
            width: 50%;
            height: 64px;
            display: flex;
            font-size: 24px;
            justify-content: center;
            align-items: center;
            position: relative;
            &.selected{
                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #333;
                }
            }
        }
    }
</style>