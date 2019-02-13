<template style="height:100%;">
  <div style="overflow-y: hidden;">
    <group style="height:100%; overflow-y: scroll;" :gutter="0">
      <cell-box
        v-for="repair in repairs"
        :key="repair.id + 'repair'"
        :link="'/repair-detail/' + repair.id"
        is-link>
        <device-repair-item :repair="repair"></device-repair-item>
      </cell-box>
    </group>
    <router-link to="/add-repair">
      <button id="add-repair">添加</button>
    </router-link>
  </div>
</template>

<script>
  import { Group, Cell, CellBox } from 'vux'
  import DeviceRepairItem from './DeviceRepairItem'
  import DeviceAddRepair from './DeviceAddRepair'

  export default {
    name: 'DeviceRepairList',
    components: {
      Group,
      Cell,
      CellBox,
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
  #add-repair {
    right: 30px;
    bottom: 40px;
    width: 50px;
    height: 50px;
    background-color: aqua;
    z-index: 1000;
    display: block;
    position: fixed;
  }
</style>



