<template style="height:100%">
  <div style="height:100%;">
    <view-box>
      <!-- TODO 列表样式调整 -->
      <device-maintain-item v-for="maintain in maintains" :maintain="maintain" :key="maintain.id + 'maintain'">
      </device-maintain-item>
    </view-box>
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import DeviceMaintainItem from './DeviceMaintainItem'

  export default {
    name: 'DeviceMaintainList',
    components: {
      DeviceMaintainItem,
      ViewBox
    },
    methods: {
      formatMaintain (maintain) {
        return {
          id: maintain.id,
          name: maintain.name
        }
      }
    },
    mounted () {
      this.axios
        .get('http://api.lams.com/maintains')
        .then(response => {
          this.maintains = response.data
        })
        .catch(error => {
          console.log(error)
          var arr = []
          for (var i = 0; i < 1; i++) {
            arr.push({
              'id': '1',
              'name': 'ivc',
              'description': 'ivcivcivcivcivcivc'
            })
            arr.push({
              'id': '2',
              'name': 'bbb',
              'description': 'ivcivcivcivcivcivc'
            })
          }
          this.maintains = arr
        })
        .finally()
    },
    data () {
      return {
        maintains: [{'id': '1',
          'name': 'ivc',
          'description': 'ivcivcivcivcivcivc'}]
      }
    }
  }
</script>

<style scoped>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
