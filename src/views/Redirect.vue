<template>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'Redirect',
    mounted () {
      alert('Redirect')
      alert(window.location.href)
      this.code = window.location.href.split('code=')[1].split('&')[0]
      this.axios.post(api.userauth, {
        code: this.code
      }, {
        'Access-Control-Allow-Origin': '*'
      })
        .then(function (response) {
          console.log(response)
          alert(response)
        })
        .catch(function (error) {
          console.log(error)
          alert(error)
        })
      // this.axios
      //   .post(api.userauth, {
      //     code: this.code
      //   })
      //   .then(response => {
      //     alert('success')
      //     alert(response)
      //   })
      //   .finally()
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
