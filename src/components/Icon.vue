<template>
    <svg class="icon">
        <use v-bind:xlink:href="'#'+name"/>
        <!-- //绑定事件并且把name传进来 -->
    </svg>
</template>

<script >
  let importAll = (requireContext) => requireContext.keys().forEach(requireContext);//写了这句代码就能使用importAll
    try {
        importAll(require.context('../assets/icons',true,/\.svg$/))
    } catch (error) {
        console.log(error);
        
    }
    export default {
        props:['name']//接受外部数据，用name表示
    }
</script>

<style lang="scss" scoped>
    .icon{
        width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>