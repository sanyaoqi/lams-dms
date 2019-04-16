<template>
  <div>
    <!-- <div class="scan-result">{{ scan_result }}</div> -->
    <confirm
    v-model="show4"
    :close-on-confirm="false"
    :title="$t('提示')"
    :show-cancel-button="false"
    @on-confirm="onConfirm4">
      <p style="text-align:center;">{{ this.scan_result }}</p>
    </confirm>
  </div>

</template>

<i18n>
Scan Result:
  zh-CN: 扫描结果
</i18n>

<script>
  import api from '@/api'
  import { Confirm, TransferDomDirective as TransferDom, Group, XSwitch } from 'vux'
  // const REDIRECT_URI = encodeURIComponent(SIGNURL)
  const SIGNURL = 'http://facility.mymicedb.com/device-scan'

  export default {
    name: 'device-scan',
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch
    },
    mounted () {
      if (!this.$store.state.configFlag) {
        this.$vux.loading.show({
          transition: '',
          text: '...'
        })
        this.initWxConfig()
      } else {
        this.checkJsApi()
        // console.log(this.$store.state.configFlag)
      }
      this.$wechat.ready(() => {
        // console.log('configFlag success')
        this.$store.commit('setConfigFlag')
        this.startScanQRCode()
        this.$vux.loading.hide()
      })
      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('$wechat config error')
      })
    },
    beforeDestroy () {
      clearInterval(this.timer)
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
              jsApiList: ['scanQRCode']
            })
          })
      },
      startScanQRCode () {
        let self = this
        self.$wechat.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: function (res) {
            if (/^https?:\/\/(\S[^/]+)/.exec(res.resultStr)) {
              window.location.href = res.resultStr
            } else {
              self.scan_result = res.resultStr
              self.show4 = true
            }
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
      },
      islink (str) {
        let regex = new RegExp(/^https?:\/\/(\S[^/]+)/, 'gi')
        let regexResult = regex.exec(str)
        if (!regexResult) {
          return false
        }
        return regexResult
      },
      onConfirm4 () {
        console.log('on confirm')
        this.$vux.loading.show({
          transition: '',
          text: '...'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.show4 = false
          window.location.reload()
        }, 1000)
      },
      showPlugin (str) {
        this.show4 = true
      }
    },
    data () {
      return {
        wx_config_data: {},
        scan_result: '',
        show4: false
      }
    }
  }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
  .scan-result {
    padding: 10px;
  }
</style>
