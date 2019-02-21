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
  created () {
    // api文档 https://work.weixin.qq.com/api/doc#10028
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect    这个是授权要访问的地址
    this.axios
      .get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CORPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_base&agentid=' + AGENTID + '&state=STATE#wechat_redirect')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
      .finally()
    // 获取用户信息 https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
    this.$wechat.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: CORPID, // 必填，企业微信的corpID
      timestamp: 2323, // 必填，生成签名的时间戳
      nonceStr: 'ad', // 必填，生成签名的随机串
      signature: 'sd', // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: [] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    })
  },
  mounted () {
    this.axios
      .get(api.devices)
      .then(response => {
        this.devices = response.data
        this.allDevices = response.data
      })
      .catch(error => {
        console.log(error)
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

const CORPID = 'aaaa'
const REDIRECT_URI = encodeURIComponent('http://lamdsdijowfe')
const AGENTID = 'bbbb'
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
