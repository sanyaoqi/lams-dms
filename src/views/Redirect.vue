<template>
</template>

<script>
  import api from '@/api'

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
      this.axios
        .post(api.userauth, data)
        .then(function (response) {
          window.localStorage.setItem('token', response.data.token)
          window.location.href = 'http://device.olfu.xyz/'
        })
        .catch(function (error) {
          console.log(error)
          alert(error)
        })
        .finally()
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
