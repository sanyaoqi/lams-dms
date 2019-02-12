<template>
  <div>
    <view-box>
      <!-- TODO 列表样式调整 -->
      <device-repair-item v-for="repair in repairs" :repair="repair" :key="repair.id + 'repair'">
      </device-repair-item>
    </view-box>
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import DeviceRepairItem from './DeviceRepairItem'

  export default {
    name: 'DeviceRepairList',
    components: {
      ViewBox,
      DeviceRepairItem
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
          console.log(this.maintains)
        })
        .finally()
    },
    data () {
      return {
        repairs: [
          {
            'id': '1',
            'name': 'aaa'
          },
          {
            'id': '2',
            'name': 'bbb'
          }
        ]
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
