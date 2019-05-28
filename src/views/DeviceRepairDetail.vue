<template>
  <div v-if="reportinfo">
    <x-header>维修记录详情</x-header>
    <device-card v-if="reportinfo.device" :device="reportinfo.device"></device-card>
    <flexbox :gutter="0">
      <flexbox-item :span="reporterSpan" v-if="reporter" >
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
      <flexbox-item :span="6/12" v-if="assignee && repairinfo">
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
      <flexbox-item :span="6/12" v-if="can_accept_report">
        <x-button mini type="primary" 
        class="accept-report" 
        @click.native="acceptReport">接取</x-button>
      </flexbox-item>
    </flexbox>
    <!-- ****** 轮播 ****** -->
    <swiper auto :list="demo01_list"
     v-model="demo01_index" 
     @on-index-change="demo01_onIndexChange" 
     class="report-images" v-if="demo01_list.lenght > 0"></swiper>    
    <!-- ****** 描述 ****** -->
    <article class="weui-article report-desc">
      <p style="color: #999999;">
        {{ this.reportinfo.description }}
      </p>
    </article>
    <!-- ****** 状态+评分 ****** -->
    <div class="report-status">
      <flexbox :gutter="0">
        <flexbox-item :span="3/4" >
          <div style="padding-left: 15px; padding-right: 15px; vertical-align: middle;">
            <a class="device-repair-status"
               v-bind:class="{
                 'textRed': this.reportinfo.status == this.status_list.new.id,
                 'textOrange': this.reportinfo.status == this.status_list.doing.id,
                 'textBlue': this.reportinfo.status == this.status_list.canceled.id,
                 'textGreen': this.reportinfo.status == this.status_list.repaired.id,
                 'textGray': this.reportinfo.status == this.status_list.finished.id
                 }">
              &nbsp;{{ this.reportinfo.status_name }}&nbsp;
            </a>
          </div>
        </flexbox-item>
        <flexbox-item :span="1/4">
          <x-button mini type="primary" 
          class="finish-repair" 
          v-if="reportinfo.status === this.status_list.doing.id && can_repair" 
          @click.native="finishRepair">完成</x-button>
          <x-button mini type="primary" 
          class="finish-report" 
          v-if="can_close" 
          @click.native="closeReport">关闭</x-button>
          <rater 
             v-model="stars" 
             :font-size="15" 
             v-if="reportinfo.status == this.status_list.finished.id && can_star">
          </rater>
          <rater 
             v-model="stars" 
             :font-size="15" 
             disabled
             v-if="reportinfo.status == this.status_list.finished.id && !can_star"
             @click.native="scoreConfim">
          </rater>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- ****** 评论 ****** -->
    <view-box ref="viewBox" v-if="comments.length > 0" class="position-comments-box">
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
      <div class="more-comment" v-if="comments.length == 10" @click="toCommentList">
        <p class="weui-media-box__desc">
          点击查看更多评论
        </p>
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
  import DeviceCard from '@/views/DeviceCard'

  export default {
    name: 'DeviceRepairDetail',
    directives: {
      TransferDom
    },
    components: {
      DeviceCard,
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
        rater_disabled: false,
        stars: 0,
        comments: [],
        showAddComment: false,
        reporter: {},
        assignee: null,
        reportinfo: null,
        repairinfo: null,
        score: null,
        imgarrow: '',
        error_msg: '',
        confirm: false,
        can_star: false,
        can_repair: false,
        can_accept_report: false,
        can_close: false,
        reporterSpan: 6 / 12,
        status_list: {
          new: {
            id: 0,
            name: '新建'
          },
          doing: {
            id: 1,
            name: '处理中'
          },
          canceled: {
            id: 2,
            name: '已经取消'
          },
          repaired: {
            id: 3,
            name: '完成修理'
          },
          finished: {
            id: 4,
            name: '完成'
          }
        }
      }
    },
    mounted () {
      let self = this
      self.USER = JSON.parse(window.localStorage.getItem('user'))
      self.TOKEN = window.localStorage.getItem('token')
      this.$nextTick(() => {
        self.repair_id = self.$route.params.id
        let url = self.api.repairDetail + self.repair_id
        // 报修详情
        self.utils.get(url, function (response) {
          self.loadReportData(response.data)
          self.getCommentList()
        }, self.$vux.confirm)
        // 报修评论
        // self.getCommentList()
        // alert(this.USER.id)
        // console.log(self.score)
      })
    },
    watch: {
      // whenever question changes, this function will run
      stars: function (newStars, oldStars) {
        // console.log(newStars, oldStars)
        if (this.can_star && newStars > 0 && newStars !== oldStars) {
          this.scoreRepair()
        }
      }
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
        let url = this.api.repairComment + 'object_id=' + this.repair_id + '&object_type=' + '1'
        self.utils.get(url, function (response) {
          // console.log(response)
          self.comments = response.data
        }, this.$vux.confirm)
      },
      loadReportData (report) {
        this.reportinfo = report
        this.repairinfo = this.reportinfo.repair
        this.reporter = this.reportinfo.user
        if (this.reportinfo.assignee) {
          this.assignee = this.reportinfo.assigneeinfo
        }
        // 评分
        this.can_star = true
        if (this.repairinfo && this.repairinfo.score) {
          this.score = this.repairinfo.score
          if (this.score.score > 0) {
            this.stars = this.score.score
            this.can_star = false
          }
        }
        if (this.reportinfo.status === this.status_list.new.id && this.USER && this.USER.role === 10) {
          this.can_accept_report = true
        }
        // 当前用户为修理人时
        if (this.USER) {
          if (this.assignee && this.USER.id === this.assignee.id) {
            this.can_repair = true
          }
          if (this.reporter && this.USER.id === this.reporter.id) {
            if (this.reportinfo.status === this.status_list.repaired.id) {
              this.can_close = true
            }
          }
        }
        if (this.reportinfo.image_list.length > 0) {
          // 报修图片
          for (var i = 0; i < this.reportinfo.image_list.length; i++) {
            let image = {}
            image.url = 'javascript:'
            image.img = this.reportinfo.image_list[i]
            // image.title = '' + i
            this.demo01_list.push(image)
          }
        }
        if (!this.can_accept_report && !(this.assignee && this.repairinfo)) {
          this.reporterSpan = 0
        }
      },
      acceptReport () {
        let posturl = this.api.acceptReport
        let self = this
        let fd = new FormData()
        let token = window.localStorage.getItem('token')
        fd.append('token', token)
        fd.append('id', this.repair_id)
        // console.log(token, this.repair_id, posturl)
        this.utils.post(posturl, fd, function (response) {
          self.loadReportData(response.data)
        }, this.$vux.confirm)
      },
      finishRepair () {
        // 完成修理
        let self = this
        let geturl = this.api.finishRepair + '?token=' + window.localStorage.getItem('token')
        geturl += '&id=' + self.repairinfo.id
        // console.log(geturl)
        this.utils.get(geturl, function (response) {
          // self.repairinfo = response.data
          self.loadReportData(response.data)
        })
      },
      closeReport () {
        // 关闭报修
        let self = this
        let geturl = this.api.closeReport + '?token=' + window.localStorage.getItem('token')
        geturl += '&id=' + self.reportinfo.id
        // console.log(geturl)
        this.utils.get(geturl, function (response) {
          // self.repairinfo = response.data
          self.loadReportData(response.data)
          self.can_star = true
          self.can_close = false
        })
      },
      scoreRepair () {
        let self = this
        // console.log(self.stars)
        if (this.stars <= 0 || this.stars > 5) {
          this.error_msg = '请填写正确的分数'
          this.showConfirm()
          return
        }
        this.$vux.confirm.show({
          title: '提示',
          content: '为本次维修服务打 ' + this.stars + ' 颗星',
          showCancelButton: true,
          onConfirm: function () {
            // 为维修服务打分
            let fd = new FormData()
            self.TOKEN = window.localStorage.getItem('token')
            fd.append('token', self.TOKEN)
            fd.append('id', self.repairinfo.id)
            fd.append('type', 1)
            fd.append('score', self.stars)
            let posturl = self.api.score + '?token=' + self.TOKEN
            // console.log(geturl)
            self.utils.post(posturl, fd, function (response) {
              // self.repairinfo = response.data
              // console.log(response.data)
              self.score = response.data
              self.can_star = false
            })
          }
        })
      },
      scoreConfim () {
        this.error_msg = '不能重复评分！'
        this.showConfirm()
      },
      clickAddComment () {
        if (this.TOKEN) {
          this.showAddComment = true
        } else {
          // console.log('111', this.TOKEN)
          this.utils.deletaUserData()
          // 去登陆吧
        }
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
        let posturl = this.api.addcomment
        let fd = new FormData()
        fd.append('token', this.TOKEN)
        fd.append('id', this.repair_id)
        fd.append('type', 1)
        fd.append('content', message)
        // console.log(posturl)
        this.utils.post(posturl, fd, function (response) {
          self.comments.unshift(response.data)
        }, this.$vux.confirm)
      },
      toCommentList () {
        this.$router.push({path: '/comments/' + this.repair_id})
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
    /*background-color: aquamarine;*/
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
    color: #fff;
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
    height: 120px;
    overflow: hidden;
  }
  .report-images {
    height: 180px;
  }
  .more-comment {
    height: 30px;
    text-align: center;
  }
  .more-comment>p {
    line-height: 30px;
  }
</style>

<style>
  .vux-img {
    background-size: auto;
  }
</style>
