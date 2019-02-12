<template>
  <router-link :to="'/repair-detail/'+repair.id" class="weui-media-box weui-media-box_appmsg">
    <h4 class="weui-media-box__title" v-html="repair.id"></h4>
    <p class="weui-media-box__desc" v-html="repair.name"></p>
  </router-link>
</template>

<script>
  export default {
    name: 'DeviceRepairItem',
    props: {
      repair: Object
    }
  }
</script>

<style scoped>

</style>
