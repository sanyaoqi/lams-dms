<template>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'Home',
    created () {
      // 测试方法
      // this.getTestToken()
      if (window.localStorage.getItem('token')) {
        this.$router.push({path: '/devices'})
      } else {
        this.axios
          .get(api.jssign + '?url=' + window.location.href)
          .then(response => {
            this.json.time_stamp = response.data.data.timestamp
            this.json.noncestr = response.data.data.nonce_str
            this.json.signature = response.data.data.signature
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CORPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_base&agentid=' + AGENTID + '&state=STATE#wechat_redirect'
          })
          .catch(error => {
            console.log(error)
          })
          .finally()
      }
    },
    methods: {
      getTestToken: function () {
        this.axios
          .post(api.weworkToken, {wework_id: 'ChenZhen'})
          .then(response => {
            window.localStorage.setItem('token', response.data.token)
            if (window.localStorage.getItem('token')) {
              this.$router.push({path: '/devices'})
            } else {
              this.axios
                .get(api.jssign + '?url=' + window.location.href)
                .then(response => {
                  this.json.time_stamp = response.data.data.timestamp
                  this.json.noncestr = response.data.data.nonce_str
                  this.json.signature = response.data.data.signature
                  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CORPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_base&agentid=' + AGENTID + '&state=STATE#wechat_redirect'
                })
                .catch(error => {
                  console.log(error)
                })
                .finally()
            }
          })
      }
    },
    data () {
      return {
        flag: true,
        json: {}
      }
    }
  }

  const CORPID = 'wwa417d520fd30a759'
  const REDIRECT_URI = encodeURIComponent('http://device.olfu.xyz/redirect')
  const AGENTID = '1000016'
</script>

<style scoped>

</style>
