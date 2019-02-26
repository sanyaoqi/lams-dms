<template>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'Redirect',
    mounted () {
      this.code = window.location.href.split('code=')[1].split('&')[0]
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
