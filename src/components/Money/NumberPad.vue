<template>
    <div class="numberPad">
            <div class="output">{{output}}</div>
            <div class="buttons">
                <button @click="inputContent">1</button>
                <button @click="inputContent">2</button>
                <button @click="inputContent">3</button>
                <button @click="remove">删除</button>
                <button @click="inputContent">4</button>
                <button @click="inputContent">5</button>
                <button @click="inputContent">6</button>
                <button @click="clear">清空</button>
                <button @click="inputContent">7</button>
                <button @click="inputContent">8</button>
                <button @click="inputContent">9</button>
                <button @click="ok" class="ok">OK</button>
                <button @click="inputContent" class="zero">0</button>
                <button @click="inputContent">.</button>
            </div>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
@Component
export default class NumberPad extends Vue{
    output='0';
    inputContent(event:MouseEvent){
        const input = (event.target as HTMLButtonElement).textContent!; 
        if(this.output.length === 16){return}
        if(this.output === '0'){
            if('1234567890'.indexOf(input)>=0){
                this.output = input
            }else{this.output += input}
            return
        }
        if(this.output.indexOf('.') >= 0){
            if(input === '.'){return}
        }
        this.output += input
    }
    remove(){
        if(this.output.length === 1){
            this.output = '0'
        }
        else{
            this.output = this.output.slice(0,-1)
        }
        
    }
    clear(){
        this.output = '0'
    }
    ok(){
        this.$emit('update:value',this.output)
        this.$emit('submit',this.output)
        this.output = '0'
    }
}       
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
     .numberPad{
        > .output{
            font-size: 36px;
            font-family: Consolas,monospace;
            padding:9px 16px;
            text-align: right;
            box-shadow: inset 0px -2px 3px rgba(0, 0, 0, 0.25)
        }
        > .buttons{
           @extend %clearfix;
            flex-wrap: wrap;
            > button{
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                border: none;
                &.ok{
                    height: 128px;
                    float: right;
                }
                &.zero{
                    width: 50%;
                }
                $bg:#97d9a1;
                &:nth-child(1){
                    background: $bg;
                }
                &:nth-child(2),&:nth-child(5){
                    background: darken($bg, 4%);
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: darken($bg, 8%);
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: darken($bg, 8%);
                }
                &:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
                    background: darken($bg, 12%);
                }
                &:nth-child(8),&:nth-child(11){
                    background: darken($bg, 16%);
                }
                &:nth-child(14){
                    background: darken($bg, 20%);
                }
                &:nth-child(12){
                    background: darken($bg, 24%);
                }

            }
        }
    }
    
</style>