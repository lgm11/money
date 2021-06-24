<template>
    <div>
            <label class="notes">
                <span class="name">{{fieldName}}</span>
                <input type="text" 
                    v-model="value"
                    :placeholder="this.placeholder">
            </label>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
    @Prop({required:true})fieldName!:string
    @Prop()placeholder?:string
    @Prop({default:''})value!:string
      @Watch('value')
      onValueChanged(value:string){
        this.$emit('update:value',value)
      }
    }
</script>

<style lang="scss" scoped>
    .notes{
       display: block;
        font-size: 14px;
        padding:25px 0;
        
        > .name{
            padding-left: 16px;
        }
        > input{
            padding-left: 16px;
            border: none;
            
        }
    }
</style>