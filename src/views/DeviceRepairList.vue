<template style="height:100%;">
  <div style="overflow-y: hidden;">
    <div class="position-report-box">
      <div class="wrapper" ref="wrapper">
        <!-- <group style="height:100%; overflow-y: scroll;" :gutter="0" > -->
          <cell-box
            v-for="repair in repairs"
            :key="repair.id + 'repair'"
            :link="'/repair-detail/' + repair.id"
            is-link>
            <device-repair-item :repair="repair" ></device-repair-item>
          </cell-box>
        <!-- </group> -->
      </div>
    </div>
    <router-link :to="{path:'/add-repair', query: {device_id: device.id}}">
      <button id="add-repair" v-on:click="" class="add-repair weui_btn weui_btn_primary">报修</button>
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
      device: Object
    },
    methods: {
      saveStatus () {
        console.log(this.device)
        this.$store.commit('setCurrentRepair', this.device)
      }
    },
    mounted () {
      this.axios
        .get(api.repair + this.device.id)
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
 
</style>



