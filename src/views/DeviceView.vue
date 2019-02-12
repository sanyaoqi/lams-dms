<template>
  <div>
    <x-header>设备管理</x-header>
    <card v-if="device !== null">
      <!-- TODO 卡片样式 -->
      <div slot="content" class="card-padding" >
        <p style="font-size:14px;line-height:1.2;">{{device.name}}</p>
        <p style="color:#999;font-size:12px;" >{{device.description}}</p>
      </div>
      <img slot="header" :src="device.images" style="width:40%;display:block;" >
    </card>
    <div>
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @click="selected = item" :key="index">{{item}}</tab-item>
      </tab>
      <!-- TODO 高度调整 -->
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item>
          <device-info></device-info>
        </swiper-item>
        <swiper-item>
          <repair-list></repair-list>
        </swiper-item>
        <swiper-item>
          <maintain-list></maintain-list>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Card, Tab, TabItem, Swiper, SwiperItem, XHeader } from 'vux'
import DeviceInfo from './DeviceInfo'
import MaintainList from './DeviceMaintainList'
import RepairList from './DeviceRepairList'

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
    DeviceInfo,
    MaintainList,
    RepairList
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
      loading: false
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
          'created_at': 0,
          'product_at': 0,
          'owner': 1,
          'images': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549871587939&di=ab88e51659a070b40bc5a91d2d06cc41&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2012-07-31%2F144172066.jpg',
          'status': 0,
          'position': '1'
        }
        this.errored = true
      })
      .finally()
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
