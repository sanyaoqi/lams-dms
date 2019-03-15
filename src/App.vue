<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      json: {}
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/weui/weui.less';

body {
  background-color: #fbf9fe;
}

#add-repair {
  right: 30px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  background-color: #04be02;
  z-index: 1;
  display: block;
  position: fixed;
  border-radius: 50%;
  color: #fff;
  border: none;
}
#add-comment {
  right: 30px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  background-color: #04be02;
  z-index: 1;
  display: block;
  position: fixed;
  border-radius: 50%;
  color: #fff;
  border: none;
}
</style>