<template>
  <div v-if="device">
    <x-header>设备管理</x-header>
    <device-card :device="device"></device-card>
    <div>
      <device-bar :device="device" :index="1"></device-bar>
      <div class="position-device-box">
        <device-info :device="device" class="wrapper" ref="wrapper"></device-info>
      </div>
    </div>
    <router-link :to="{path:'/add-repair', query: {device_id: device.id}}">
      <button id="add-repair" class="add-repair weui_btn weui_btn_primary">报修</button>
    </router-link>
  </div>
</template>
<script>
import { XHeader, LoadMore } from 'vux'
import DeviceCard from '@/views/DeviceCard'
import DeviceInfo from '@/views/DeviceInfo'
import DeviceBar from '@/views/DeviceBar'
import api from '@/api'

export default {
  name: 'DevicePage',
  components: {
    XHeader,
    LoadMore,
    DeviceCard,
    DeviceInfo,
    DeviceBar
  },
  data () {
    return {
      index: 0,
      selected: '详细信息',
      device: null
    }
  },
  mounted () {
    this.getDevice()
  },
  methods: {
    getDevice () {
      // 获取设备数据
      let url = api.detail + this.$route.params.id
      this.utils.get(url, this.setDevice, this.$vux.confirm)
    },
    setDevice (response) {
      this.device = response.data
    }
  }
}
</script>
<style lang="less" scoped>
  .device-detail-tab-item {
    height: 100%;
    width: 100%;
  }
  .wrapper {
    height: 100%;
    overflow-y: auto;
  }
  .position-device-box {
    position: fixed;
    top: 185px;
    bottom: 10px;
    left: 0;
    right: 0;
  }
</style>
