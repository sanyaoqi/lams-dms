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
    <!-- <div id="screenBg" v-if="isScreenShow">
    </div> -->
    <div v-transfer-dom>
      <popup v-model="isScreenShow" position="right" width="100%">
        <div id="" v-if="filters.categorys && isScreenShow">
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
        </div>
        <div style="padding: 15px;">
          <x-button @click.native="endScreen" plain type="primary">确定</x-button>
        </div>
      </popup>
    </div>

    <!-- 列表 -->
    <div class="position-devices-box">
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <device-item v-for="device in devices" :device="device" :key="device.id + 'device'">
          </device-item>
          <div class="no-more weui-media-box__desc" v-if="nomore">没有更多数据了</div>
        </div>
      </div>
    </div>
    <button @click="scrollTo" class="go-top weui_btn weui_btn_primary">↑</button>
  </div>
</template>

<script>
import { ViewBox, XHeader, Search, Checker, CheckerItem, Divider, XButton, Popup, TransferDom } from 'vux'
import Bscroll from 'better-scroll'
import DeviceItem from './DeviceItem'
import api from '@/api'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    XButton,
    Search,
    ViewBox,
    DeviceItem,
    Checker,
    CheckerItem,
    Divider,
    Popup
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        pullDownRefresh: this.pullDownRefreshObj,
        click: true
      })
      this.onPullingDown()
      // 绑定下拉刷新方法
      this.scroll.on('pullingDown', this.onPullingDown)
      // 绑定上拉加载更多方法
      this.scroll.on('scrollEnd', this.onPullingUp)
    })
    this.getFilters()
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
      searchCondition: [],
      scroll,
      pullDownRefreshObj: {
        threshold: 50,
        stop: 20
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      page: 1,
      maxpage: 0,
      nomore: false
    }
  },
  methods: {
    // 滚动到页面顶部
    scrollTo () {
      this.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    onPullingDown () {
      // 模拟下拉刷新
      console.log('下拉刷新')
      this.page = 1
      let url = this.api.devices
      url += '?category=' + this.category
      url += '&status=' + this.status
      url += '&page=' + this.page
      if (this.searchText) {
        url += '&keyword=' + this.searchText
      }
      console.log(url)
      this.utils.get(url, this.loadData, this.$vux.confirm)
    },
    onPullingUp () {
      // 模拟上拉 加载更多数据
      if (!this.nomore && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
        this.page++
        console.log('上拉加载', this.page)
        let url = this.api.devices
        url += '?category=' + this.category
        url += '&status=' + this.status
        url += '&page=' + this.page
        if (this.searchText) {
          url += '&keyword=' + this.searchText
        }
        if (this.page <= this.maxpage) {
          this.utils.get(url, this.addData, this.$vux.confirm)
        } else {
          this.nomore = true
          // this.$vux.confirm.show({
          //   title: '提示',
          //   content: '没有更多数据了！'
          // })
        }
      }
    },
    addData (response) {
      // 加载更多数据
      console.log(response)
      this.devices = this.devices.concat(response.data)
      this.allDevices = this.allDevices.concat(response.data)
      // test
      if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
        this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
      }
      console.log(this.maxpage)
      this.refreshScroll()
    },
    loadData (response) {
      // 刷新列表数据
      this.devices = response.data
      this.allDevices = response.data
      if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
        this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
      }
      console.log(this.maxpage)
      this.refreshScroll()
    },
    refreshScroll () {
      let self = this
      this.$nextTick(() => {
        if (!self.scroll) {
          self.scroll = new Bscroll(self.$refs.wrapper, {
            pullDownRefresh: self.pullDownRefreshObj,
            click: true
          })
        } else {
          self.scroll.refresh()
        }
        // 完成加载必须调用
        self.scroll.finishPullDown()
      })
    },
    // 获取过滤器
    getFilters () {
      let self = this
      this.utils.get(this.api.filters, function (response) {
        console.log(response)
        self.filters = response.data
        self.categorys = response.data.categorys.values
        self.statusList = response.data.status.values
      }, this.$vux.confirm)
    },
    formatDevice (device) {
      return {
        title: device.name,
        desc: device.description,
        src: device.images
      }
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          pullDownRefresh: this.pullDownRefreshObj,
          click: true
        })
        this.onPullingDown()
        // 绑定下拉刷新方法
        this.scroll.on('pullingDown', this.onPullingDown)
        // 绑定上拉加载更多方法
        this.scroll.on('scrollEnd', this.onPullingUp)
      })
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
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          pullDownRefresh: this.pullDownRefreshObj,
          click: true
        })
        this.onPullingDown()
        // 绑定下拉刷新方法
        this.scroll.on('pullingDown', this.onPullingDown)
        // 绑定上拉加载更多方法
        this.scroll.on('scrollEnd', this.onPullingUp)
      })
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
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          pullDownRefresh: this.pullDownRefreshObj,
          click: true
        })
        this.onPullingDown()
        // 绑定下拉刷新方法
        this.scroll.on('pullingDown', this.onPullingDown)
        // 绑定上拉加载更多方法
        this.scroll.on('scrollEnd', this.onPullingUp)
      })
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
  .box {
    padding: 0 15px;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;

  }
  .demo1-item-selected {
    background-color: #A5DE37;
    border-color: #A5DE37;
  }
  .position-devices-box {
    position: fixed;
    top: 125px;
    bottom: 5px;
    left: 0;
    right: 0;
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
