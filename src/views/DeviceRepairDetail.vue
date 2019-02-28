<template>
  <div>
    <x-header>维修记录详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>

    <div class="weui-flex">
      <!-- ****** 报修人 ****** -->
      <div class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="repair.user.image" alt="">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-if="repair.user" v-html="repair.user.user_nick"></h4>
          <p class="weui-media-box__desc" v-html="repair.created_at_format"></p>
        </div>
      </div></div>
      <!-- ****** 箭头 ****** -->
      <div style="width: 20px; line-height: 90px;"><img id="img-arrow" :src="repair.user.image" alt=""></div>
      <!-- ****** 维修工作人员 ****** -->
      <div class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd" style="text-align: right;" v-if="repair.assigneeinfo">
          <h4 class="weui-media-box__title" v-html="repair.assigneeinfo.user_nick"></h4>
          <p class="weui-media-box__desc" v-html="repair.close_time_format"></p>
        </div>
        <div class="weui-media-box__hd" style="margin-right: 0px; margin-left: .8em;">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="repair.assigneeinfo.image" alt="">
        </div>
      </div></div>
    </div>
    <!-- ****** 描述 ****** -->
    <article class="weui-article" style="padding-top: 0px; padding-bottom: 0px;">
      <p style="color: #999999;">
        {{ this.repair.description }}
      </p>
    </article>
    <!-- ****** 状态 ****** -->
    <div style="padding-left: 15px; padding-right: 15px; vertical-align: middle;">
      <a class="device-repair-status"
         v-bind:class="{
           'textRed': this.repair.repair.status == 0,
           'textOrange': this.repair.repair.status == 1,
           'textBlue': this.repair.repair.status == 2,
           'textGreen': this.repair.repair.status == 3
           }">
        &nbsp;{{ this.repair.repair.status_name }}&nbsp;
      </a>
      <rater v-model="stars" :disabled="rater_disabled" :font-size="15" style="float: right;"></rater>
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
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Rater, ViewBox } from 'vux'
  import api from '@/api'

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
    mounted () {
      this.repair_id = window.location.href.split('/repair-detail/')[1]
      this.axios
        .get(api.repairDetail + this.repair_id)
        .then(response => {
          console.log(response.data)
          this.repair = response.data.data
          this.stars = this.repair.repair.score.score
          for (var i = 0; i < this.repair.image_list.length; i++) {
            this.demo01_list.push({url: 'javascript:', img: this.repair.image_list[i]})
          }
        //  如果当前状态为完成 且属于本人报修 那么rater_disabled = true
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
    },
    data () {
      return {
        repair_id: '',
        demo01_index: 0,
        demo01_list: [],
        repair: {},
        rater_disabled: false,
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
  .textRed {
    background-color: tomato;
  }
  .textOrange {
    background-color: gold;
  }
  .textBlue {
    background-color: deepskyblue;
  }
  .textGreen {
    background-color: mediumspringgreen;
  }
</style>

<style>
  .vux-img {
    background-size: auto;
  }
</style>
