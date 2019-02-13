<template>
  <div>
    <x-header>设备管理</x-header>
    <div class="weui-flex">
      <div class="weui-flex__item"><div class="placeholder">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text" v-if="device !== null">
            <h2 class="weui-media-box__title">{{device.name}}</h2>
            <p class="weui-media-box__desc">{{device.description}}</p>
            <p class="weui-media-box__desc">{{device.created_at}}</p>
            <p class="weui-media-box__desc">{{device.description}}</p>
            <p class="weui-media-box__desc">{{device.description}}</p>
          </div>
        </div>
      </div></div>
      <div class="weui-flex__item"><div class="placeholder">
        <div id="imgBg" style="">
          <img slot="header" :src="device.images" v-if="device !== null">
        </div>
      </div></div>
    </div>
    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @click="selected = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :aspect-ratio="fullHeight"  :show-dots="false" ref="swiper-wrapper" id="swiper-container">
        <swiper-item>
          <device-info class="device-detail-tab-item" v-if="device !== null" :device="device"></device-info>
        </swiper-item>
        <swiper-item>
          <repair-list class="device-detail-tab-item"></repair-list>
        </swiper-item>
        <swiper-item>
          <maintain-list class="device-detail-tab-item"></maintain-list>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Card, Tab, TabItem, Swiper, SwiperItem, XHeader } from 'vux'

const list = () => ['详情信息', '维修记录', '维护记录']

export default {
  name: 'device-view',
  components: {
    Card,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XHeader,
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
  mounted () {
    this.axios
      .get('http://api.lams.com/devices/' + this.$route.params.id)
      .then(response => {
        this.device = response.data
      })
      .catch(error => {
        console.log(error)
        this.device = {
          'id': '1',
          'name': 'ivc',
          'description': 'ivcivcivcivcivcivc',
          'category': 1,
          'created_at': '21:00',
          'product_at': 0,
          'owner': 'tmachc',
          'images': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549871587939&di=ab88e51659a070b40bc5a91d2d06cc41&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2012-07-31%2F144172066.jpg',
          'status': 0,
          'position': '公司'
        }
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
      console.log('on item click:', index)
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
  #imgBg {
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
