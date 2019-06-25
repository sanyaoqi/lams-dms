<template>
  <div v-if="device">
    <x-header>设备管理</x-header>
    <device-card :device="device"></device-card>
    <div>
      <device-bar :device="device" :index="3"></device-bar>
      <div class="position-maintains-box">
        <div class="wrapper" ref="wrapper">
          <div class="weui-panel__bd">
            <group style="height:100%; overflow-y: scroll;" :gutter="0">
              <cell-box
                v-for="item in items"
                :key="item.id + 'maintain'"
                :link="'/maintain-detail/' + item.id"
                is-link>
                <device-maintain-item :maintain="item" ></device-maintain-item>
              </cell-box>
            </group>
            <load-more tip='正在加载' background-color="#fbf9fe" v-if="loading"></load-more>
            <load-more :show-loading="false" tip="没有更多数据了" background-color="#fbf9fe" v-if="nomore"></load-more>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{path:'/add-repair', query: {device_id: device.id}}">
      <button id="add-repair" class="add-repair weui_btn weui_btn_primary">报修</button>
    </router-link>
    
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import { XHeader, LoadMore, Group, CellBox, Cell } from 'vux'
import DeviceCard from '@/views/DeviceCard'
import DeviceBar from '@/views/DeviceBar'
import DeviceMaintainItem from '@/views/DeviceMaintainItem'

export default {
  name: 'DeviceMaintains',
  components: {
    XHeader,
    LoadMore,
    DeviceCard,
    DeviceBar,
    Group,
    Cell,
    CellBox,
    DeviceMaintainItem
  },
  data () {
    return {
      index: 2,
      selected: '维护记录',
      device: null,
      loading: false,
      nomore: false,
      items: [],
      pullDownRefreshObj: {
        threshold: 50,
        stop: 20
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      scroll,
      maxpage: 0,
      page: 1,
      defaultImage: 'http://lams-1257122319.cos.ap-beijing.myqcloud.com/20190321eec5375f7c984d813051c65f202ca928'
    }
  },
  mounted () {
    this.getDevice()
  },
  methods: {
    getDevice () {
      // 获取设备数据
      let url = this.api.detail + this.$route.params.id
      this.utils.get(url, this.setDevice, this.$vux.confirm)
    },
    setDevice (response) {
      this.device = response.data
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
    // 滚动到页面顶部
    scrollTo () {
      this.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    onPullingDown () {
      // 模拟下拉刷新
      // console.log('下拉刷新')
      this.loading = true
      this.page = 1
      let url = this.api.maintain + '?device_id=' + this.device.id
      url += '&page=' + this.page
      this.utils.get(url, this.loadData, this.$vux.confirm)
    },
    onPullingUp () {
      // 模拟上拉 加载更多数据
      if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
        console.log('上拉加载')
        this.page ++
        if (this.page <= this.maxpage) {
          this.loading = true
          let url = this.api.maintain + '?device_id=' + this.device.id
          url += '&page=' + this.page
          this.utils.get(url, this.addData, this.$vux.confirm)
        } else {
          this.nomore = true
        }
      }
    },
    addData (response) {
      // 加载更多数据
      console.log(response)
      this.items = this.items.concat(response.data)
      // test
      if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
        this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
      }
      console.log(this.maxpage)
      // test
      this.refreshScroll()
    },
    loadData (response) {
      this.items = response.data
      if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
        this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
      }
      console.log(this.maxpage)
      // test
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
        self.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .position-maintains-box {
    position: fixed;
    top: 185px;
    bottom: 10px;
    left: 0;
    right: 0;
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
