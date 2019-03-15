<template>
  <div>
    <x-header>维修记录详情</x-header>
    <swiper auto :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" v-if="demo01_list.length > 0"></swiper>
    <!-- ****** 轮播 ****** -->
    <!-- <swiper loop auto :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" dots-position="center" :aspect-ratio="300/800"></swiper> -->
    <flexbox :gutter="0">
      <flexbox-item :span="6/12" >
        <!-- ****** 报修人 ****** -->
        <div class="placeholder weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img v-if="reporter.image" class="weui-media-box__thumb" style="vertical-align: middle;" :src="reporter.image" alt="">
            <i v-else class="weui-media-box__thum weui_icon_circle" style="vertical-align: middle;"></i>
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" v-if="reporter" v-html="reporter.user_nick"></h4>
            <p class="weui-media-box__desc" v-html="reportinfo.created_at_format"></p>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item :span="6/12" v-if="assignee">
        <!-- ****** 维修工作人员 ****** -->
        <div  class="weui-flex__item">
          <div class="placeholder weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd" style="text-align: right;" v-if="assignee">
              <h4 class="weui-media-box__title" v-html="assignee.user_nick"></h4>
              <p class="weui-media-box__desc" v-html="repairinfo.created_at_format"></p>
            </div>
            <div class="weui-media-box__hd" style="margin-right: 0px; margin-left: .8em;">
              <img v-if="assignee.image" class="weui-media-box__thumb" style="vertical-align: middle;" :src="assignee.image" alt="">
              <i v-else class="weui-media-box__thum weui_icon_circle" style="vertical-align: middle;"></i>
            </div>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item :span="6/12" v-else>
        <x-button mini type="primary" 
        class="accept-report" 
        v-if="reportinfo.status == 0" 
        @click.native="acceptReport">接取</x-button>
      </flexbox-item>
    </flexbox>
    <!-- ****** 描述 ****** -->
    <article class="weui-article report-desc">
      <p style="color: #999999;">
        {{ this.reportinfo.description }}
      </p>
    </article>
    <!-- ****** 状态 ****** -->
    <flexbox :gutter="0" class="report-status">
      <flexbox-item :span="3/4" >
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
          <rater 
             v-model="stars" 
             :disabled="rater_disabled" 
             :font-size="15" 
             style="float: right;" 
             v-if="this.reportinfo.status == 3">
          </rater>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/4" v-if="reportinfo.status == 1">
        <x-button mini type="primary" 
        class="finish-repair" 
        v-if="reportinfo.status == 1" 
        @click.native="finishRepair">完成</x-button>
      </flexbox-item>
    </flexbox>
    <!-- ****** 评论 ****** -->
    <view-box ref="viewBox">
      <!-- TODO 列表样式调整 -->
      <div v-for="comment in comments" :key="comment.id + 'comment'" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd" v-if="comment.user.image">
          <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="comment.user.image" alt="">
        </div>
        <div class="weui-media-box__bd">
          <flexbox :gutter="0">
            <flexbox-item :span="1/2">
              <h4 class="weui-media-box__title" v-html="comment.user.user_nick"></h4>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <p class="weui-media-box__desc">{{ comment.created_at_format }}</p>
            </flexbox-item>
          </flexbox>
          <p class="weui-media-box__desc" v-html="comment.content"></p>
        </div>
      </div>
    </view-box>
    <button id="add-comment" @click="clickAddComment">评论</button>
    <br>
    <div v-transfer-dom style="left: 50%;">
      <confirm v-model="showAddComment"
         show-input
         ref="confirmComment"
         title="发送评论"
         @on-cancel="onCancel"
         @on-confirm="onConfirmComment"
         @on-show="onShow"
         @on-hide="onHide">
      </confirm>
      <confirm
      v-model="confirm"
      :close-on-confirm="false"
      :title="$t('提示')"
      :show-cancel-button="false"
      @on-confirm="onConfirm">
        <p style="text-align:center;">{{ this.error_msg }}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Rater, ViewBox, TransferDom, Confirm, XButton, Flexbox, FlexboxItem } from 'vux'
  import api from '@/api'
  import utils from '@/utils'

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
      Confirm,
      XButton,
      Flexbox,
      FlexboxItem
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
        reporter: {},
        assignee: {},
        reportinfo: {},
        repairinfo: {},
        score: {},
        imgarrow: '',
        error_msg: '',
        confirm: false,
        user: {}
      }
    },
    mounted () {
      this.repair_id = window.location.href.split('/repair-detail/')[1]
      let self = this
      // 报修详情
      self.axios
        .get(api.repairDetail + this.repair_id)
        .then(response => {
          self.loadReportData(response.data.data)
          // 如果当前状态为完成 且属于本人报修 那么rater_disabled = true
          // console.log(this.reporter.image)
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
      // 报修评论
      self.getCommentList()
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      onSwiperItemIndexChange (index) {
        console.log('demo item change', index)
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        this.$refs.confirmComment.setInputValue('')
      },
      onCancel () {
      },
      onConfirm (value) {
        this.confirm = false
      },
      showConfirm () {
        this.confirm = true
        setTimeout(() => {
          this.confirm = false
        }, 3000)
      },
      getCommentList () {
        let self = this
        self.axios
          .get(api.repairComment + 'object_id=' + self.repair_id + '&object_type=' + '1')
          .then(response => {
            // console.log(response.data.data)
            self.comments = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
          .finally()
      },
      loadReportData (report) {
        this.repair = report
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
          let image = {}
          image.url = 'javascript:'
          image.img = this.reportinfo.image_list[i]
          // image.title = '' + i
          this.demo01_list.push(image)
        }
      },
      acceptReport () {
        let posturl = api.acceptReport
        let self = this
        let fd = new FormData()
        let token = window.localStorage.getItem('token')
        fd.append('token', token)
        fd.append('id', this.repair_id)
        // console.log(token, this.repair_id, posturl)
        self.axios
          .post(posturl, fd)
          .then(function (response) {
            if (response.data.code === 200) {
              self.loadReportData(response.data.data)
            } else if (response.data.code === 5009) {
              utils.deletaUserData()
            } else {
              self.error_msg = response.data.code + ':' + response.data.message
              self.showConfirm()
            }
          })
          .catch(function (error) {
            console.log(error)
            // alert(error)
          })
          .finally()
      },
      finishRepair () {
        console.log('11111')
      },
      clickAddComment () {
        this.showAddComment = true
      },
      onConfirmComment (value) {
        this.sendComment(value)
        this.$refs.confirmComment.setInputValue('')
      },
      sendComment (message) {
        let self = this
        if (message === '') {
          this.error_msg = '评论内容不能为空'
          this.showConfirm()
          return
        }
        let posturl = api.addcomment
        let fd = new FormData()
        let token = window.localStorage.getItem('token')
        fd.append('token', token)
        fd.append('id', this.repair_id)
        fd.append('type', 1)
        fd.append('content', message)
        // console.log(posturl)
        self.axios
          .post(posturl, fd)
          .then(function (response) {
            if (response.data.code === 200) {
              // console.log('data', response.data.data)
              self.comments.unshift(response.data.data)
            } else if (response.data.code === 5009) {
              utils.deletaUserData()
            } else {
              // alert('报修失败' + response.data.code)
              self.error_msg = response.data.code + ':' + response.data.message
              self.showConfirm()
            }
          })
          .catch(function (error) {
            console.log(error)
            // alert(error)
          })
          .finally()
        // console.log(token, self.repair_id, message, fd)
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
    border-radius: 5px;
    padding: 2px;
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
  .accept-report {
    float: right;
    margin-right: 15px;
  }
  .report-status {
    padding: 5px;
    border-top: solid 1px #E5E5E5;
    border-bottom: solid 1px #E5E5E5;
  }
  .report-desc {
    border-top: solid 1px #E5E5E5;
    padding: 10px 15px 0px 15px;
  }
</style>

<style>
  .vux-img {
    background-size: auto;
  }
</style>
