<template>
  <div>
  	<confirm
      v-model="confirm"
      :close-on-confirm="false"
      :title="title"
      @on-confirm="finishMaintain"
      @on-cancel="onCancel">
        <p style="text-align:center;">{{ error_msg }}</p>
    </confirm>
  </div>
</template>

<script>
import { Confirm } from 'vux'

export default {
  name: 'DeviceBar',
  components: {
    Confirm
  },
  props: {
    model: false,
    device: Object
  },
  data () {
    return {
      model: 0,
      title: '提示',
      error_msg: '...',
      hasCancel: true 
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