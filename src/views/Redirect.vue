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
      console.log(code)
      if (code) {
        this.code = code[1]
      }
      // let data = { code: this.code }
      let data = new FormData()
      data.append('code', this.code)
      this.axios
        .post(api.userauth, data)
        .then(function (response) {
          console.log(response)
          alert(response)
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
