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
  right: 50%;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: #04be02;
  z-index: 1;
  display: block;
  position: fixed;
  border-radius: 50%;
  color: #fff;
  border: none;
  margin-right: -25px;
}
#add-comment {
  right: 50%;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: #04be02;
  z-index: 1;
  display: block;
  position: fixed;
  border-radius: 50%;
  color: #fff;
  border: none;
  margin-right: -25px;
}
.textRed {
  background-color: tomato;
}
.textOrange {
  background-color: gold;
}
.textBlue {
  background-color: deepskyblue;
}
.textGreen {
  background-color: mediumspringgreen;
}
.textGray {
  background-color: #E5E5E5;
}
.no-more {
  text-align: center;
}
.go-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background: #3cc51f;
  border: none;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 20px;
  padding-bottom: 3px;
}
</style>