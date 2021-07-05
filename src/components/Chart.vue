<template>
    <div class="wrapper" ref="wrapper">

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch,} from 'vue-property-decorator';
// import echarts, { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts';
@Component
export default class Chart extends Vue{
    @Prop()options?:EChartsOption
    chart?:ECharts
    mounted(){
       this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
       this.chart.setOption(this.options!)
    }
    @Watch('options')
    onOptionsChange(newValue:EChartsOption){
        this.chart!.setOption(newValue)
    }
    
}
</script>

<style lang="scss" scoped>
    .wrapper{  
        width: 100%;
        height: 300px;
    }
</style>