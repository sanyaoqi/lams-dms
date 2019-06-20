<template>
</template>

<script>
  export default {
    name: 'Home',
    created () {
      // 测试方法
      this.getTestToken()
      // 登录
      // this.login()
    },
    methods: {
      getTestToken: function () {
        this.utils.post(this.api.weworkToken, {wework_id: 'ChenZhen'}, this.testlogin, this.$vux.confirm)
      },
      testlogin: function (response) {
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('user', JSON.stringify(response.data))
        // console.log(response.data)
        if (window.localStorage.getItem('token')) {
          // 已经登录
          this.$router.push({path: '/devices'})
        } else {
          // console.log('not login')
          // this.TOKEN = window.localStorage.getItem('token')
          // this.USER = JSON.parse(window.localStorage.getItem('user'))
          // console.log('response', this.USER, this.TOKEN)
          // console.log(response, window.localStorage.getItem('token'), this.user )
        }
      },
      login: function () {
        let self = this
        // alert('login:' + window.localStorage.getItem('token'))
        if (window.localStorage.getItem('token')) {
          // 已经登录
          this.$router.push({path: '/devices'})
        } else {
          // 去授权
          let url = this.api.jssign + '?url=' + window.location.href
          this.utils.get(url, function (response) {
            self.json.time_stamp = response.data.timestamp
            self.json.noncestr = response.data.nonce_str
            self.json.signature = response.data.signature
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CORPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_base&agentid=' + AGENTID + '&state=STATE#wechat_redirect'
          }, this.$vux.confirm)
        }
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
  const REDIRECT_URI = encodeURIComponent('http://facility.mymicedb.com/redirect')
  const AGENTID = '1000016'
</script>

<style scoped>

</style>
