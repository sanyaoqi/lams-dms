<template>
    <div class="screen-view" @click="clickBg">
      <button @click="clickTest">测试</button>
    </div>
</template>

<script>
    export default {
      name: 'screen-view',
      props: ['isScreenShow'],
      methods: {
        clickBg () {
          console.log('clickBg')
          this.$emit('update:isScreenShow', false)
        },
        clickTest () {
          console.log('test')
        }
      }
    }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
  .screen-view {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: aqua;
    z-index: 9999;
    display: block;
    position: fixed;
  }

</style>
