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
    <div style="padding: 10px;">
      <button @click="clickTime">时间</button>
      <button @click="clickScreen" class="weui-btn weui-btn_mini weui-btn_default" style="float: right;">筛选</button>
    </div>

    <!-- 筛选弹框 -->
    <div id="screenBg" v-if="isScreenShow"></div>
    <div id="screen" style="padding: 15px 0;" v-if="filters.categorys && isScreenShow">
      <divider>{{ filters.categorys.name }}</divider>
      <div class="box">
        <checker v-model="category" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item value="1">{{ filters.categorys.values[1] }}</checker-item>
          <checker-item value="2">{{ filters.categorys.values[1] }}</checker-item>
        </checker>
      </div>
      <divider>{{ filters.status.name }}</divider>
      <div class="box">
        <checker v-model="status" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item value="0">{{ filters.status.values[0] }}</checker-item>
          <checker-item value="1">{{ filters.status.values[1] }}</checker-item>
          <checker-item value="2">{{ filters.status.values[2] }}</checker-item>
          <checker-item value="-1">{{ filters.status.values[-1] }}</checker-item>
        </checker>
      </div>
      <div style="line-height: 50px; border-top: 1px;">
        <btn class="weui-form-preview__btn" @click="endScreen">确定</btn>
      </div>
    </div>

    <!-- 列表 -->
    <view-box ref="viewBox">
      <!-- TODO 列表样式调整 -->
      <device-item v-for="device in devices" :device="device" :key="device.id + 'device'">
      </device-item>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Search, Checker, CheckerItem, Divider } from 'vux'
import DeviceItem from './DeviceItem'
import api from '@/api'

export default {
  components: {
    XHeader,
    Search,
    ViewBox,
    DeviceItem,
    Checker,
    CheckerItem,
    Divider
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
      this.getData()
    },
    getResult (val) {
      console.log('on-change', val)
    },
    getData () {
      const self = this
      this.axios
        .get(api.devices + '?category=' + self.category + '&status=' + self.status + '&keyword=' + self.searchText)
        .then(response => {
          console.log(response.data.data)
          this.devices = response.data.data
          this.allDevices = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
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
    },
    clickTime () {
      // 时间排序
    },
    endScreen () {
      // 确定排序
      this.isScreenShow = false
      this.getData()
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
    this.getData()
    this.axios
      .get(api.filters)
      .then(response => {
        console.log(response.data.data)
        this.filters = response.data.data
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
      isScreenShow: false,
      filters: {},
      category: '',
      status: ''
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
  #screenBg {
    position: fixed;
    z-index: 9998;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(0,0,0,0.5);
  }
  #screen {
    position: fixed;
    background-color: white;
    z-index: 9999;
  }
  .box {
    padding: 0 15px;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }
</style>
