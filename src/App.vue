<template>
  <div id="app">
    <router-view/>
  <!-- 把router到的内容显示到这里 -->
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';
#app {
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;//优化苹果系统的显示
  -moz-osx-font-smoothing: grayscale;//优化苹果系统的显示
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  max-width: 500px;
  margin: 0 auto;
}

</style>
