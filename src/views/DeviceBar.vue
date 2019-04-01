<template>
  <div>
	<tab :line-width=2 active-color='#04be02' v-model="model" :animate="false">
	  <tab-item :selected="index === 1" @click.native="toDeviceInfo">详细信息</tab-item>
      <!-- <tab-item @click.native="toDeviceInfo">详细信息</tab-item> -->

	  <tab-item :selected="index === 2" @click.native="toDeviceReports">维修记录</tab-item>
      <!-- <tab-item v-else @click.native="toDeviceReports">维修记录</tab-item> -->

      <tab-item :selected="index === 3" @click.native="toDeviceMaintains">维护记录</tab-item>
      <!-- <tab-item v-else @click.native="toDeviceMaintains">维护记录</tab-item> -->
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'DeviceBar',
  components: {
    Tab,
    TabItem
  },
  props: {
    index: 0,
    device: Object
  },
  data () {
    return {
      model: 0
    }
  },
  methods: {
    toDeviceInfo () {
      if (this.index !== 1 && this.device) {
        this.$router.push({path: '/device/' + this.device.id})
      }
    },
    toDeviceReports () {
      if (this.index !== 2 && this.device) {
        this.$router.push({path: '/device-reports/' + this.device.id})
      }
    },
    toDeviceMaintains () {
      if (this.index !== 3 && this.device) {
        this.$router.push({path: '/device-maintains/' + this.device.id})
      }
    }
  }
}
</script>