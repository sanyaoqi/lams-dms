<template>
  <router-link :to="'/maintain-detail/'+maintain.id" class="weui-media-box weui-media-box_appmsg">
    <h4 class="weui-media-box__title" v-html="maintain.name"></h4>
    <p class="weui-media-box__desc" v-html="maintain.name"></p>
  </router-link>
</template>

<script>
  export default {
    name: 'DeviceMaintainList',
    props: {
      maintain: Object
    }
  }
</script>

<style scoped>

</style>
