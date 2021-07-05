<template>
    <div class="wrapper" ref="wrapper">

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop,} from 'vue-property-decorator';
// import echarts, { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts';
@Component
export default class Chart extends Vue{
    @Prop()options?:EChartsOption
    mounted(){
       const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
       chart.setOption(this.options!)
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{  
        width: 100%;
        height: 300px;
    }
</style>