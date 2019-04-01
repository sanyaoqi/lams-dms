<template>
  <div v-if="device">
    <x-header>设备管理</x-header>
    <device-card :device="device"></device-card>
    <div>
      <device-bar :device="device" :index="2"></device-bar>
      <div class="position-reports-box">
        <div class="wrapper" ref="wrapper">
          <div class="weui-panel__bd">
            <a v-for="item in items"
             class="weui-media-box weui-media-box_appmsg" 
             :href="'/repair-detail/' + item.id"
             :key="item.id">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb"
                 :src="(item.image_list.length > 0) ? item.image_list[0] : defaultImage"
                 alt="" >
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{ item.description }}</h4>
                <p class="weui-media-box__desc" style="padding:5px 0px;">{{ item.created_at_format }} &nbsp; <span class="device-repair-status"
                   v-bind:class="{
                   'textRed': item.status == 0,
                   'textOrange': item.status == 1,
                   'textBlue': item.status == 2,
                   'textGreen': item.status == 3,
                   'textGray': item.status == 4
                   }">
                  &nbsp;{{ item.status_name }}&nbsp;
                </span></p>
              </div>
            </a>
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
import { XHeader, LoadMore } from 'vux'
import DeviceCard from '@/views/DeviceCard'
import DeviceBar from '@/views/DeviceBar'

export default {
  name: 'DeviceReports',
  components: {
    XHeader,
    LoadMore,
    DeviceCard,
    DeviceBar
  },
  data () {
    return {
      index: 0,
      selected: '详细信息',
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
      let url = this.api.repair + this.device.id + '&page=' + this.page
      this.utils.get(url, this.loadData, this.$vux.confirm)
    },
    onPullingUp () {
      // 模拟上拉 加载更多数据
      if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
        console.log('上拉加载')
        this.page ++
        if (this.page <= this.maxpage) {
          this.loading = true
          let url = this.api.repair + this.device.id + '&page=' + this.page
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
  .device-detail-tab-item {
    height: 100%;
    width: 100%;
  }
  .vux-swiper {
    width:100%;
  }
  .position-reports-box {
    position: fixed;
    top: 245px;
    bottom: 10px;
    left: 0;
    right: 0;
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
  .device-repair-status {
    width: 100%;
    height: 100%;
    /*background-color: aquamarine;*/
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
    color: #fff;
  }
</style>
