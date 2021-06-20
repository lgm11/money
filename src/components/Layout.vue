<template>
     <div class="layout-wrapper">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
            <!-- //插槽，当调用这个组件的时候，里面写的东西就插入到这里 -->
        </div>
        <Nav/>
        <!-- 引用Nav组件 -->
    </div>
</template>

<script>
    export default {
        props:['classPrefix']
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper{
            border: 1px solid green;
            display: flex;//flex布局
            flex-direction: column;//子元素流动方向打竖
            height: 100vh;//最大100保证所有内容都能展示出来，不往下跑
        }
        .content{
            flex-grow: 1;//尽量把所有高度给content
            overflow: auto;//如果content的内容多了就给滚动条，保证下面的内容（底部导航）不会被挤出页面
        }
</style>