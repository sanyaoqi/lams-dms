<template>
</template>

<script>
  import api from '@/api'
  // const REDIRECT_URI = encodeURIComponent(SIGNURL)
  const SIGNURL = 'http://device.olfu.xyz/device-scan'

  export default {
    name: 'device-scan',
    mounted () {
      if (!this.$store.state.configFlag) {
        this.initWxConfig()
      } else {
        console.log(this.$store.state.configFlag)
      }
      this.$wechat.ready(() => {
        console.log('configFlag success')
        this.$store.commit('setConfigFlag')
        this.startScanQRCode()
      })
      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('$wechat config error')
      })
    },
    methods: {
      initWxConfig () {
        this.axios
          .get(api.jssign + '?url=' + SIGNURL)
          .then(response => {
            console.log('getJssign Api', response.data)
            this.wx_config_data.time_stamp = response.data.data.timestamp
            this.wx_config_data.noncestr = response.data.data.nonce_str
            this.wx_config_data.signature = response.data.data.signature
            this.$wechat.config({
              beta: true,
              debug: false,
              appId: 'wwa417d520fd30a759',
              timestamp: this.wx_config_data.time_stamp,
              nonceStr: this.wx_config_data.noncestr,
              signature: this.wx_config_data.signature,
              jsApiList: ['scanQRCode', 'getLocalImgData', 'chooseImage']
            })
          })
      },
      startScanQRCode () {
        this.$wechat.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: function (res) {
            alert(res.resultStr)
            console.log('startScanQRCode success', res.resultStr)
            // window.location.href = res.resultStr
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      },
      checkJsApi () {
        this.$wechat.checkJsApi({
          jsApiList: ['scanQRCode'],
          success: function (res) {
            console.log('checkJsApi success', res)
            alert(res)
          }
        })
      }
    },
    watch: {
      flag: function (newVal, oldVal) {
        if (!this.$store.state.configFlag) {
          // this.$store.commit('setConfigFlag')
          console.log('not set configFlag')
        } else {
          console.log('seted configFlag', this.$store.state.configFlag)
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
        wx_config_data: {}
      }
    }
  }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
</style>
