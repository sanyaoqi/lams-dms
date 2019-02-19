<template>
  <div>
    <x-header>维修记录详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>

    <div class="weui-flex">
      <!-- ****** 报修人 ****** -->
      <div class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd" v-if="user.avatar">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="user.avatar" alt="">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-html="user.name"></h4>
          <p class="weui-media-box__desc" v-html="user.time"></p>
        </div>
      </div></div>
      <!-- ****** 箭头 ****** -->
      <div style="width: 20px; line-height: 90px;"><img id="img-arrow" :src="user.avatar" alt=""></div>
      <!-- ****** 维修工作人员 ****** -->
      <div class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd" style="text-align: right;">
          <h4 class="weui-media-box__title" v-html="worker.name"></h4>
          <p class="weui-media-box__desc" v-html="worker.time"></p>
        </div>
        <div class="weui-media-box__hd" style="margin-right: 0px; margin-left: .8em;" v-if="worker.avatar">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="worker.avatar" alt="">
        </div>
      </div></div>
    </div>
    <!-- ****** 描述 ****** -->
    <article class="weui-article" style="padding-top: 0px; padding-bottom: 0px;">
      <p style="color: #999999;">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </article>
    <!-- ****** 状态 ****** -->
    <div style="padding-left: 15px; padding-right: 15px; vertical-align: middle;">
      <a class="device-repair-status">已完成</a>
      <rater v-model="stars" :font-size="15" style="float: right;"></rater>
    </div>
    <!-- ****** 评论 ****** -->
      <view-box ref="viewBox">
        <!-- TODO 列表样式调整 -->
        <div v-for="comment in comments" :key="comment.id + 'comment'" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="comment.avatar">
            <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="comment.avatar" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" v-html="comment.name"></h4>
            <p class="weui-media-box__desc" v-html="comment.comment"></p>
          </div>
        </div>
      </view-box>
    <div>

    </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Rater, ViewBox } from 'vux'
  export default {
    name: 'DeviceRepairDetail',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      Rater,
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
        user: {
          name: '韩冲',
          avatar: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          time: '2019/2/18'
        },
        worker: {
          name: '韩冲1',
          avatar: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          time: '2019/02/19'
        },
        stars: 4,
        comments: [
          {
            id: 1,
            name: '韩冲1',
            avatar: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
            comment: '评论一下'
          },
          {
            id: 2,
            name: '韩冲2',
            avatar: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
            comment: '评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..评论两下..'
          }
        ]
      }
    }
  }

  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]
</script>

<style scoped>
  #img-arrow {
    vertical-align: middle;
    text-align: center;
    max-width: 100%;
    width: 100%;
  }
  .device-repair-status {
    width: 100%;
    height: 100%;
    background-color: aquamarine;
    font-size: 0.9rem;
  }
</style>
