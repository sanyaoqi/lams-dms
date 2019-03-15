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
    <div style="padding: 10px;height: 15px;border-bottom: solid 1px #efeff4;">
      <!-- <button @click="clickTime">时间</button> -->
      <div @click="clickScreen" class="weui-media-box__desc" style="float: right;">筛选</div>
    </div>

    <!-- 筛选弹框 -->
    <div id="screenBg" v-if="isScreenShow"></div>
    <div id="screen" v-if="filters.categorys && isScreenShow">
      <divider style="padding: 15px;">{{ filters.categorys.name }}</divider>
      <div class="box">
        <checker v-model="category" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item v-for="(cate, cate_index) in categorys" :key="cate_index" :value="cate_index">{{ cate }}</checker-item>
        </checker>
      </div>
      <divider style="padding: 15px;">{{ filters.status.name }}</divider>
      <div class="box">
        <checker v-model="status" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item v-for="(status, status_index) in statusList" :key="status_index" :value="status_index">{{ status }}</checker-item>
        </checker>
      </div>
      <div style="line-height: 50px; border-top: 1px;">
        <div class="weui-form-preview__btn" @click="endScreen">确定</div>
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
  mounted () {
    this.getData()
    let self = this
    this.axios
      .get(api.filters)
      .then(response => {
        console.log(response.data.data)
        self.filters = response.data.data
        self.categorys = response.data.data.categorys.values
        self.statusList = response.data.data.status.values
      })
      .catch(error => {
        console.log(error)
      })
      .finally()
    // 初始化详情页的标签选项
    this.$store.commit('setSelected', '详细信息')
  },
  data () {
    return {
      allDevices: [],
      devices: [],
      searchText: '',
      isScreenShow: false,
      filters: {},
      category: '',
      categorys: [],
      statusList: [],
      status: '',
      searchCondition: []
    }
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
      console.log('on-change', this.searchText)
    },
    getData () {
      const self = this
      let url = api.devices
      url += '?category=' + self.category
      url += '&status=' + self.status
      if (self.searchText) {
        url += '&keyword=' + self.searchText
      }
      console.log(url)
      this.axios
        .get(url)
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
      console.log('on-submit', this.searchText)
      this.getData()
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
