<template style="height:100%">
  <div style="height:100%;">
    <group style="height:100%; overflow-y: scroll;" :gutter="0">
      <cell-box
        v-for="maintain in maintains"
        :key="maintain.id + 'maintain'"
        :link="'/maintain-detail/' + maintain.id"
        is-link>
        <device-maintain-item :maintain="maintain" ></device-maintain-item>
      </cell-box>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, CellBox } from 'vux'
  import DeviceMaintainItem from './DeviceMaintainItem'
  import utils from '@/utils'
  import api from '@/api'

  export default {
    name: 'DeviceMaintainList',
    components: {
      DeviceMaintainItem,
      Group,
      Cell,
      CellBox
    },
    props: {
      device_id: ''
    },
    mounted () {
      let self = this
      let url = api.maintains + '?id=' + self.device_id
      utils.get(url, self.loadData)
    },
    data () {
      return {
        maintains: []
      }
    },
    methods: {
      formatMaintain (maintain) {
        return {
          id: maintain.id,
          name: maintain.name
        }
      },
      loadData (response, replace = false) {
        console.log(response)
        if (replace) {
          // 刷新
          this.maintains = response.data
        } else {
          this.maintains = this.maintains.concat(response.data)
        }
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
