<template>
      <button @click="clickTest">测试扫一扫</button>
</template>

<script>
    export default {
      name: 'device-scan',
      methods: {
        clickTest () {
          this.$wechat.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 0,
            scanType: ['qrCode', 'barCode'],
            success: function (res) {
              console.log('success')
            },
            error: function (res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级')
              }
            }
          })
        }
      }
    }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
</style>
