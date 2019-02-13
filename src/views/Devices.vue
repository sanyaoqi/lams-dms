<template style="height:100%">
  <div>
    <x-header :left-options="{showBack: false}">设备列表</x-header>
    <!-- TODO 搜索逻辑 -->
    <search
      @result-click="resultClick"
      @on-change="getResult"
      v-model="searchText"
      position="absolute"
      top="46px"
      :auto-fixed="false"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <!-- TODO 时间排序 筛选样式及逻辑 -->
    <button @click="clickScreen">筛选</button>
    <view-box ref="viewBox">
      <!-- TODO 列表样式调整 -->
      <device-item v-for="device in devices" :device="device" :key="device.id + 'device'">
      </device-item>
    </view-box>
    <!-- 筛选弹框 -->
    <screen-view id="screen" v-if="isScreenShow" :is-screen-show.sync="isScreenShow"></screen-view>
  </div>
</template>

<script>
import { ViewBox, XHeader, Search } from 'vux'
import DeviceItem from './DeviceItem'
import ScreenView from './ScreenView'
import api from '@/api'

export default {
  components: {
    XHeader,
    Search,
    ViewBox,
    DeviceItem,
    ScreenView
  },
  methods: {
    formatDevice (device) {
      return {
        title: device.name,
        desc: device.description,
        src: device.images
      }
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      if (!val) return
      this.devices = [
        {
          'id': '1',
          'name': 'ivc',
          'description': 'ivcivcivcivcivcivc',
          'category': 1,
          'created_at': 0,
          'product_at': 0,
          'owner': 1,
          'images': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549871587939&di=ab88e51659a070b40bc5a91d2d06cc41&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2012-07-31%2F144172066.jpg',
          'status': 0,
          'position': '1'
        }
      ]
    },
    onSubmit () {
      console.log('on-submit')
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
      this.devices = this.allDevices
    },
    clickScreen () {
      this.isScreenShow = true
      // document.getElementById('screen').style.display = 'block'
    }
  },
  watch: {
    isScreenShow: function (newVal, oldVal) {
      console.log(newVal, 'isScreenShow', oldVal)
      if (oldVal) {
        // document.getElementById('screen').style.display = 'none'
      }
    }
  },
  mounted () {
    this.axios
      .get(api.devices)
      .then(response => {
        this.devices = response.data
      })
      .catch(error => {
        console.log(error)
        var arr = []
        for (var i = 0; i < 1; i++) {
          arr.push({
            'id': '1',
            'name': 'ivc',
            'description': 'ivcivcivcivcivcivc',
            'category': 1,
            'created_at': 0,
            'product_at': 0,
            'owner': 1,
            'images': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549871587939&di=ab88e51659a070b40bc5a91d2d06cc41&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2012-07-31%2F144172066.jpg',
            'status': 0,
            'position': '1'
          })
          arr.push({
            'id': '2',
            'name': '笔记本电脑',
            'description': '',
            'category': 0,
            'created_at': 1,
            'product_at': null,
            'owner': 1,
            'images': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549871587938&di=aaf073f44d826f633e0800e53a1d5b09&imgtype=0&src=http%3A%2F%2Fimg5.pcpop.com%2FProductImages%2F0x0%2F3%2F3718%2F003718364.jpg',
            'status': 0,
            'position': '1'
          })
        }
        this.devices = arr
        this.allDevices = arr
        this.errored = true
      })
      .finally()
  },
  data () {
    return {
      allDevices: [],
      devices: [],
      searchText: '',
      isScreenShow: false
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
