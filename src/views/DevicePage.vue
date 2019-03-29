<template>
  <div>
    <x-header>设备管理</x-header>
    <flexbox :gutter="0">
      <flexbox-item>
        <div class="placeholder device-detail-info-bg">
          <div class="weui-panel__bd device-detail-info">
            <div class="weui-media-box weui-media-box_text" v-if="device !== null">
              <h2 class="weui-media-box__title">{{device.name}}</h2>
              <p class="weui-media-box__desc">{{'类型：' + device.category_name}}</p>
              <p class="weui-media-box__desc">{{'出厂时间：' + device.product_at_format}}</p>
            </div>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item style="padding: 10px;">
        <div class="placeholder">
          <div id="img-bg" style="">
            <img slot="header" :src="device.images" v-if="device !== null">
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @on-item-click="onItemClick" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :aspect-ratio="fullHeight"  :show-dots="false" ref="swiper-wrapper" id="swiper-container">
        <swiper-item>
          <device-info class="device-detail-tab-item" v-if="device !== null && device.user !== null" :device="device"></device-info>
        </swiper-item>
        <swiper-item>
          <repair-list class="device-detail-tab-item" v-if="device !== null && device.user !== null" :device="device"></repair-list>
        </swiper-item>
        <swiper-item>
          <maintain-list class="device-detail-tab-item" v-if="device !== null && device.user !== null" :device_id="device.id"></maintain-list>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Card, Tab, TabItem, Swiper, SwiperItem, XHeader, Flexbox, FlexboxItem } from 'vux'
import api from '@/api'

const list = () => ['详情信息', '维修记录', '维护记录']

export default {
  name: 'device-page',
  components: {
    Card,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XHeader,
    Flexbox,
    FlexboxItem,
    DeviceInfo: () => import('./DeviceInfo'),
    MaintainList: () => import('./DeviceMaintainList'),
    RepairList: () => import('./DeviceRepairList')
  },
  data () {
    return {
      index: 0,
      index01: 0,
      selected: '详细信息',
      list: list(),
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      },
      device: null,
      errored: false,
      loading: false,
      fullHeight: (document.documentElement.clientHeight - document.documentElement.clientWidth * 0.4 - 90) / document.documentElement.clientWidth
    }
  },
  created () {
    // alert(this.$store.state.selected)
    // console.log('this.$store.state.selected :', this.$store.state.selected)
    let tab = this.$route.params.tab
    if (tab > 0) {
      this.$store.commit('setSelected', list()[tab - 1])
      this.selected = list()[tab - 1]
    } else {
      this.selected = this.$store.state.selected
    }
  },
  mounted () {
    this.axios
      .get(api.detail + this.$route.params.id)
      .then(response => {
        this.device = response.data.data
        // this.$store.commit('device', this.device)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally()
  },
  watch: {
    fullHeight (val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.index01 = index
      }, 1000)
    },
    onItemClick (index) {
      // 存储当前选中的标签 以备返回到这个页面时候跳转
      this.$store.commit('setSelected', list()[index])
    },
    addTab () {
      if (this.list.length < 5) {
        this.list = list().slice(0, this.list.length + 1)
      }
    },
    removeTab () {
      if (this.list.length > 1) {
        this.list = list().slice(0, this.list.length - 1)
      }
    },
    next () {
      if (this.index === this.list.length - 1) {
        this.index = 0
      } else {
        ++this.index
      }
    },
    prev () {
      if (this.index === 0) {
        this.index = this.list.length - 1
      } else {
        --this.index
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .device-detail-tab-item {
    height: 100%;
    width: 100%;
  }
  .device-detail-info-bg {
    position: relative; // 使用相对定位
    height: 0; // 高度设置为0，使用padding来设置高度
    width: 100%;
    padding-bottom: 80%;
    display:block;
    flex: 0 0 auto;
  }
  .device-detail-info {
    position: absolute;
    top:50%;
    transform: translate(0,-50%);
  }
  #img-bg {
    position: relative; // 使用相对定位
    height: 0; // 高度设置为0，使用padding来设置高度
    width: 80%;
    padding-bottom: 80%;
    display:block;
    flex: 0 0 auto;
  }
  img {
    position: absolute; // 使用绝对定位position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 100%; // 宽高为容器的宽高
    height: auto;
  }
</style>
