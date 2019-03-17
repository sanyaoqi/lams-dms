<template>
  <div>
    <x-header>维护计划详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    <GroupTitle>计划详情</GroupTitle>
    <!-- ****** 维修条目 ****** -->
    <div>
      <div class="plan-description">{{ plan.content }}</div>
      <div class="weui-form-preview__bd plan-detail">
        <p v-if="plan.name">
          <label class="weui-form-preview__label">计划名称</label>
          <span class="weui-form-preview__value">{{ plan.name }}</span>
        </p>
        <p v-if="plan.user">
          <label class="weui-form-preview__label">负责人</label>
          <span class="weui-form-preview__value">{{ plan.user.user_nick }}</span>
        </p>
        <p v-if="plan.pre_end_time_format">
          <label class="weui-form-preview__label">开始时间</label>
          <span class="weui-form-preview__value">{{ plan.pre_end_time_format }}</span>
        </p>
        <p v-if="plan.status">
          <label class="weui-form-preview__label">状态</label>
          <span class="device-maintain-status"
             v-bind:class="{
             'textRed': plan.status == 1,
             'textOrange': plan.status == 2,
             'textGreen': plan.status == 3,
             }">
            &nbsp;{{ plan.status_name }}&nbsp;
          </span>
        </p>
        <p>
          <label class="weui-form-preview__label">结束时间</label>
          <span class="weui-form-preview__value">{{ plan.end_time_format }}</span>
        </p>
      </div>
      <x-button type="primary" 
        v-if="!canFinish" 
        class="btn-finish" @click.native="finishPlan()">完成</x-button>
     </div>
  </div>

</template>

<script>
  import { XHeader, Swiper, SwiperItem, CheckIcon, GroupTitle, XButton } from 'vux'
  import utils from '@/utils'
  import api from '@/api'

  export default {
    name: 'DeviceMaintainDetail',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      CheckIcon,
      GroupTitle,
      XButton
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: [],
        plan_id: 0,
        plan: {},
        device: null,
        canFinish: false

      }
    },
    mounted () {
      let self = this
      self.plan_id = this.$route.params.id
      if (self.plan_id > 0) {
        let url = api.maintain + '/' + self.plan_id
        utils.get(url, self.loadData)
      }
      console.log(this.user)
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      loadData (response) {
        this.plan = response.data
        this.device = response.data.device
        if (this.device.image_list && this.device.image_list.length > 0) {
          for (var i = 0; i < this.device.image_list.length; i++) {
            let img = {}
            img.url = 'javascript:'
            img.img = this.device.image_list[i]
            this.demo01_list.push(img)
          }
        }
      },
      finishPlan () {
        let self = this
        if (self.plan_id > 0) {
          let token = window.localStorage.getItem('token')
          let url = api.finishPlan + '?id=' + self.plan_id + '&token=' + token
          utils.get(url, function (response) {
            if (response) {
              self.loadData(response)
            }
          })
        }
      }
    }
  }
  // const baseList = [{
  //   url: 'javascript:',
  //   img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  // }]
</script>

<style scoped>
  .btn-finish {
    width: 80%;
  }
  .plan-detail {
    margin-bottom: 40px; 
  }
  .plan-description {
    padding: 15px;
  }
</style>
