<template>
</template>

<script>
  export default {
    name: 'Redirect',
    mounted () {
      let regex = /code=(.+[^&])&?/i
      // let code = regex.exec('http://localhost:8080/device-scan?code=aBsdssc2q12dsfsdf')
      let code = regex.exec(window.location.href)
      if (code) {
        this.code = code[1]
      }
      let data = new FormData()
      data.append('code', this.code)
      this.utils.post(this.api.userauth, data, this.login, this.$vux.confirm)
      // this.axios
      //   .post(api.userauth, data)
      //   .then(function (response) {
      //     window.localStorage.setItem('token', response.data.token)
      //     window.localStorage.setItem('user', response.data.user)
      //     // alert('新的token是--->>>' + response.data.token)
      //     window.location.href = 'http://device.olfu.xyz/'
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //     // alert(error)
      //   })
      //   .finally()
    },
    methods: {
      login: function (response) {
        if (response.code === 200 && response.token && response.data) {
          window.localStorage.setItem('token', response.token)
          window.localStorage.setItem('user', JSON.stringify(response.data))
        }
        console.log(this.$store.state.goback)
        // alert('login success')
        // window.location.href = 'http://device.olfu.xyz/'
        this.$router.push({path: this.$store.state.goback})
        // this.$router.push()
      }
    },
    data () {
      return {
        code: {}
      }
    }
  }
</script>

<style scoped>

</style>
