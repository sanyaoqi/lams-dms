<template style="height:100%">
  <div style="height:100%;">
    <group style="height:100%; overflow-y: scroll;" :gutter="0">
      <cell-box
        v-for="maintain in maintains"
        :key="maintain.id + 'maintain'"
        :link="'/maintain-detail/' + maintain.id"
        is-link>
        <device-maintain-item :maintain="maintain"></device-maintain-item>
      </cell-box>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, CellBox } from 'vux'
  import DeviceMaintainItem from './DeviceMaintainItem'

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
              'description': 'ivcivcivcivcivcivc',
              'starts': 4
            })
            arr.push({
              'id': '2',
              'name': 'bbb',
              'description': 'ivcivcivcivcivcivc',
              'starts': 5
            })
          }
          this.maintains = arr
        })
        .finally()
    },
    data () {
      return {
        maintains: [{'id': '4',
          'name': 'ivc',
          'description': 'ivcivcivcivcivcivc',
          'starts': 4}]
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
