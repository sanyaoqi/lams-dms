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
  import api from '@/api'

  export default {
    name: 'DeviceRepairList',
    components: {
      Group,
      Cell,
      CellBox,
      DeviceRepairItem,
      DeviceAddRepair
    },
    props: {
      device_id: ''
    },
    methods: {
    },
    mounted () {
      this.axios
        .get(api.repair + this.device_id)
        .then(response => {
          this.repairs = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
    },
    data () {
      return {
        repairs: []
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



