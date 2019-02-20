<template>
  <div>
    <x-header>维护记录详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    <GroupTitle>维护项目</GroupTitle>
    <!-- ****** 维修条目 ****** -->
    <view-box ref="viewBox">
      <div v-for="item in items" :key="item.id + 'item'" class="weui-media-box weui-media-box_appmsg">
        <!--<div class="weui-flex">-->
          <!--<div class="weui-flex__item">-->
          <!--</div>-->
        <!--</div>-->

        <div class="placeholder weui-media-box__bd">
          <div class="weui-media-box__title" style="color: #333">
            {{ item.title }}
          </div>
          <div class="weui-media-box__desc" style="margin-top: 5px;">
            <a>处理人：{{ item.worker }}</a>
            <a style="position: absolute; left: 40%;">时间：{{ item.time }}</a>
          </div>
        </div>
        <div style="width: 20px;">
          <check-icon :value="item.state"></check-icon>
        </div>
      </div>
    </view-box>
  </div>

</template>

<script>
  import { XHeader, Swiper, SwiperItem, CheckIcon, GroupTitle, ViewBox } from 'vux'

  export default {
    name: 'DeviceMaintainDetail',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      CheckIcon,
      GroupTitle,
      ViewBox
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      }
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: baseList,
        items: [
          {
            id: 1,
            title: '清洁键盘',
            worker: '韩冲',
            time: '2019/02/20',
            state: true
          },
          {
            id: 2,
            title: '清洁鼠标',
            worker: '韩冲1',
            time: '2019/02/21',
            state: false
          }
        ]
      }
    }
  }

  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  }]
</script>

<style scoped>

</style>
