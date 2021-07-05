<template>
    <div>
            <label class="notes">
                <span class="name">{{fieldName}}</span>
                <template v-if="type === 'date'">
                    <input :type="type ||'text'" 
                    :value = "x(value)"
                    @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
                </template>
                <template v-else>
                    <input :type="type || 'text'" 
                    :value = "value"
                    @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
                </template>
            </label>
        </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
    @Prop({required:true})fieldName!:string
    @Prop()placeholder?:string
    @Prop({default:''}) readonly value!:string
    @Prop()type?:string
      onValueChanged(value:string){
        this.$emit('update:value',value)
      }
      x(isoString:string){
        return  dayjs(isoString).format('YYYY-MM-DD')
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