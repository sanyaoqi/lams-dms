<template>
  <div>
    <x-header>维护计划详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" v-if="demo01_list.lenght > 0"></swiper>
    <device-card v-if="device" :device="device"></device-card>
    <!-- ****** 维修条目 ****** -->
    <div>
      <div class="weui-form-preview__bd plan-detail">
        <p v-if="plan.name">
          <label class="weui-form-preview__label">计划名称</label>
          <span class="weui-form-preview__value">{{ plan.name }}</span>
        </p>
        <p v-if="plan.cycle">
          <label class="weui-form-preview__label">周期</label>
          <span class="weui-form-preview__value">{{ plan.cycle + ' ' + plan.cycle_unit }}</span>
        </p>
        <p v-if="plan.user">
          <label class="weui-form-preview__label">负责人</label>
          <span class="weui-form-preview__value" v-if="plan.user.user_nick">{{ plan.user.user_nick }}</span>
          <span class="weui-form-preview__value" v-else>{{ plan.user.username }}</span>
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
        <p >
          <label class="weui-form-preview__label">结束时间</label>
          <span class="weui-form-preview__value" v-if="plan.end_time_format">{{ plan.end_time_format }}</span>
          <span class="weui-form-preview__value" v-else> 未完成 </span>
        </p>
      </div>
      <GroupTitle>计划详情</GroupTitle>
      <div class="plan-description">{{ plan.content }}</div>
      <x-button type="primary" 
        v-if="canFinish" 
        class="btn-finish" @click.native="finishPlan()">完成</x-button>
     </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, CheckIcon, GroupTitle, XButton } from 'vux'
  import DeviceCard from '@/views/DeviceCard'

  export default {
    name: 'DeviceMaintainDetail',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      CheckIcon,
      GroupTitle,
      XButton,
      DeviceCard
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
      this.USER = JSON.parse(window.localStorage.getItem('user'))
      this.plan_id = this.$route.params.id
      if (this.plan_id > 0) {
        let url = this.api.maintain + '/' + this.plan_id
        this.utils.get(url, this.loadData, this.$vux.confirm)
      }
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
        if (this.USER && this.USER.id > 0 && this.USER.id === this.plan.user.id && this.plan.status === 1) {
          this.canFinish = true
        }
        // console.log(this.user, this.canFinish)
      },
      finishPlan () {
        let self = this
        if (self.plan_id > 0) {
          let token = window.localStorage.getItem('token')
          let url = self.api.finishPlan + '?id=' + self.plan_id + '&token=' + token
          self.utils.get(url, function (response) {
            if (response) {
              self.loadData(response)
            }
          }, self.$vux.confirm)
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
  .device-maintain-status {
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
    color: #fff;
  }
</style>
