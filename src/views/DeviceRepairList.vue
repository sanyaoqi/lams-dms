<template style="height:100%;">
  <div style="height:100%;">
    <view-box>
      <!-- TODO 列表样式调整 -->
      <device-repair-item v-for="repair in repairs" :repair="repair" :key="repair.id + 'repair'">
      </device-repair-item>
    </view-box>
    <router-link tag="li" to="/add-repair">
      <button id="add-repair">添加</button>
    </router-link>
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import DeviceRepairItem from './DeviceRepairItem'
  import DeviceAddRepair from './DeviceAddRepair'

  export default {
    name: 'DeviceRepairList',
    components: {
      ViewBox,
      DeviceRepairItem,
      DeviceAddRepair
    },
    methods: {
    },
    mounted () {
      this.axios
        .get('http://api.lams.com/maintains')
        .then(response => {
          this.repairs = response.data
        })
        .catch(error => {
          console.log(error)
          var arr = []
          for (var i = 0; i < 20; i++) {
            arr.push({
              'id': Math.random(),
              'name': 'ivc',
              'description': 'ivcivcivcivcivcivc'
            })
            arr.push({
              'id': Math.random(),
              'name': 'bbb',
              'description': 'ivcivcivcivcivcivc'
            })
          }
          this.repairs = arr
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
  #add-repair {
    right: 20px;
    bottom: 40px;
    width: 100px;
    height: 100px;
    background-color: aqua;
    z-index: 1000;
    display: block;
    position: fixed;
  }
</style>
