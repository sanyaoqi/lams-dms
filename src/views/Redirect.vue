<template>
  <div>
    <x-header :left-options="{showBack: false}">设备列表</x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    name: 'Redirect',
    components: {
      XHeader
    },
    mounted () {
      alert('Redirect')
      alert(window.location.href)
      this.code = window.location.href.split('code=')[1].split('&')[0]
      this.axios
        .get('https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=' + this.code)
        .then(response => {
          console.log(response)
          alert('success')
          alert(response)
          window.location.href = 'http://device.olfu.xyz/#/'
        })
        .catch(error => {
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
