<template>

</template>

<script>
  import { Checker, CheckerItem, Divider } from 'vux'

  export default {
    name: 'ScreenView',
    components: {
      Checker,
      CheckerItem,
      Divider
    },
    props: ['isScreenShow', 'filters', 'category', 'status'],
    methods: {
      clickBg () {
        console.log('clickBg')
        this.$emit('update:isScreenShow', false)
      },
      clickTest () {
        console.log('test')
      }
    },
    watch: {
      filters: function (newVal, oldVal) {
        console.log(newVal, 'filters', oldVal)
      },
      category: function (newVal, oldVal) {
        console.log(newVal, 'category', oldVal)
        this.category_new = newVal
      }
    },
    data () {
      return {
        category_new: '',
        status_new: ''
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
