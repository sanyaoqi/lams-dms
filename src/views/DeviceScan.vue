<template>
</template>

<script>
  import Vue from 'vue'
  // const REDIRECT_URI = encodeURIComponent(SIGNURL)

  export default {
    name: 'device-scan',
    methods: {
    },
    watch: {
      flag: function (newVal, oldVal) {
        console.log(newVal, 'flag', oldVal)
        alert(newVal + '---flag---' + oldVal)
        if (newVal) {
          Vue.wechat.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1,
            scanType: ['qrCode', 'barCode'],
            success: function (res) {
              console.log(res)
              window.location.href = res.resultStr
            },
            error: function (res) {
              alert(res)
              alert(res.errMsg)
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级')
              }
            }
          })
        }
      }
    },
    computed: {
      flag () {
        return this.$store.state.configFlag
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
</style>
