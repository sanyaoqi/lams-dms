<template>
  <div>
    <x-header>维修记录详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>

    <div class="weui-flex">
      <!-- ****** 报修人 ****** -->
      <div class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img v-if="reporter.image" class="weui-media-box__thumb" style="vertical-align: middle;" :src="reporter.image" alt="">
          <img v-else class="weui-media-box__thumb" style="vertical-align: middle;" :src="default_image" alt="">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-if="reporter" v-html="reporter.user_nick"></h4>
          <p class="weui-media-box__desc" v-html="reportinfo.created_at_format"></p>
        </div>
      </div></div>
      <!-- ****** 箭头 ****** -->
      <div style="width: 20px; line-height: 90px;">
        <img v-if="assignee" id="img-arrow" :src="imgarrow" alt="">
      </div>
      <!-- ****** 维修工作人员 ****** -->
      <div v-if="assignee" class="weui-flex__item"><div class="placeholder weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd" style="text-align: right;" v-if="assignee">
          <h4 class="weui-media-box__title" v-html="assignee.user_nick"></h4>
          <p class="weui-media-box__desc" v-html="repairinfo.created_at_format"></p>
        </div>
        <div class="weui-media-box__hd" style="margin-right: 0px; margin-left: .8em;">
          <img v-if="assignee.image" class="weui-media-box__thumb" style="vertical-align: middle;" :src="assignee.image" alt="">
          <img v-else class="weui-media-box__thumb" style="vertical-align: middle;" :src="default_image" alt="">
        </div>
      </div></div>
    </div>
    <!-- ****** 描述 ****** -->
    <article class="weui-article" style="padding-top: 0px; padding-bottom: 0px;">
      <p style="color: #999999;">
        {{ this.reportinfo.description }}
      </p>
    </article>
    <!-- ****** 状态 ****** -->
    <div style="padding-left: 15px; padding-right: 15px; vertical-align: middle;">
      <a class="device-repair-status"
         v-bind:class="{
           'textRed': this.reportinfo.status == 0,
           'textOrange': this.reportinfo.status == 1,
           'textBlue': this.reportinfo.status == 2,
           'textGreen': this.reportinfo.status == 3
           }">
        &nbsp;{{ this.reportinfo.status_name }}&nbsp;
      </a>
      <rater v-model="stars" :disabled="rater_disabled" :font-size="15" style="float: right;"></rater>
    </div>
    <!-- ****** 评论 ****** -->
    <view-box ref="viewBox">
      <!-- TODO 列表样式调整 -->
      <div v-for="comment in comments" :key="comment.id + 'comment'" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd" v-if="comment.user.image">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="comment.user.image" alt="">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-html="comment.user.user_nick"></h4>
          <p class="weui-media-box__desc" v-html="comment.content"></p>
        </div>
      </div>
    </view-box>
    <button id="add-comment" @click="clickAddComment">评论</button>
    <div v-transfer-dom style="width: 100%;">
      <confirm v-model="showAddComment"
               show-input
               ref="confirmComment"
               title="添加评论"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
      </confirm>
    </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Rater, ViewBox, TransferDom, Confirm } from 'vux'
  import api from '@/api'

  export default {
    name: 'DeviceRepairDetail',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      Rater,
      ViewBox,
      Confirm
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      clickAddComment () {
        console.log('add comment')
        this.showAddComment = true
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        this.$refs.confirmComment.setInputValue('default')
      },
      onCancel () {
      },
      onConfirm (value) {
        this.$refs.confirmComment.setInputValue('')
        this.$vux.toast.text('input value: ' + value)
      },
      hasaAssignee () {
        if (this.assignee.img) {
          return true
        }
        return false
      }
    },
    mounted () {
      this.repair_id = window.location.href.split('/repair-detail/')[1]
      this.axios
        .get(api.repairDetail + this.repair_id)
        .then(response => {
          console.log(response.data)
          this.repair = response.data.data
          this.reportinfo = this.repair
          this.repairinfo = this.repair.repair
          this.reporter = this.repair.user
          if (this.assignee) {
            this.assignee = this.repair.assigneeinfo
          }
          if (this.repairinfo && this.repairinfo.score) {
            this.score = this.repairinfo.score
          }
          // 评分
          this.stars = this.score.score
          // 报修图片
          for (var i = 0; i < this.reportinfo.image_list.length; i++) {
            this.demo01_list.push({url: 'javascript:', img: this.reportinfo.image_list[i]})
          }
          //  如果当前状态为完成 且属于本人报修 那么rater_disabled = true
          // console.log(this.reporter.image)
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
      this.axios
        .get(api.repairComment + 'object_id=' + this.repair_id + '&object_type=' + '1')
        .then(response => {
          console.log(response.data.data)
          this.comments = response.data.data
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
        comments: [],
        showAddComment: false,
        default_image: 'http://lams-1257122319.cos.ap-beijing.myqcloud.com/20190301b0fbbde3f298a051cb5d464c54b018be',
        reporter: {},
        assignee: {},
        reportinfo: {},
        repairinfo: {},
        score: {},
        imgarrow: ''
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
  #add-comment {
    right: 30px;
    bottom: 40px;
    width: 50px;
    height: 50px;
    background-color: aqua;
    z-index: 1000;
    display: block;
    position: fixed;
  }
</style>

<style>
  .vux-img {
    background-size: auto;
  }
</style>
