<template>
  <div>
    <x-header>报修</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" :show-dots="false" @on-index-change="demo01_onIndexChange"></swiper>
    <datetime
      v-model="value1"
      @on-change="change"
      title="报修日期"
      @on-cancel="log('cancel')"
      @on-confirm="onConfirm"
      @on-hide="log('hide', $event)"></datetime>
    <!-- 维修内容自述 -->
    <div style="margin: 0px;">
      <textarea style="width: 100%; height: 150px; padding: 15px;"></textarea>
    </div>
    <!-- 上传图片 -->
    <div style="margin: 15px">
      <div class="upload-image" v-for="image in images" :key="image.key"><img src="image.fileurl"></div>
      <div class="upload-image" id="add-image">添加</div>
    </div>
    <!-- 提交 -->
    <div style="margin: 15px;">
      <x-button>提交</x-button>
    </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Datetime, XButton } from 'vux'
  export default {
    name: 'DeviceAddRepair',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      Datetime,
      XButton
    },
    methods: {
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      change (value) {
        console.log('change', value)
      },
      onConfirm (val) {
        console.log('on-confirm arg', val)
        console.log('current value', this.value1)
      }
    },
    mounted () {
      console.log('val ------>>>>>> ', this.$route.query.device_id)
      this.demo01_list = [{url: 'javascript:', img: this.$route.query.device.images}]
      this.device_id = this.$route.query.device_id
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: [],
        value1: '2019-01-01',
        device_id: '',
        images: [
          {
            filename: 'aaa',
            filekey: '2019022223418b3bed5eb714be5740670d5652cd',
            fileurl: 'http://lams-1257122319.cos.ap-beijing.myqcloud.com/2019022223418b3bed5eb714be5740670d5652cd'
          },
          {
            filename: 'bbb',
            filekey: '2019022223418b3bed5eb714be5740670d5652ab',
            fileurl: 'http://lams-1257122319.cos.ap-beijing.myqcloud.com/2019022223418b3bed5eb714be5740670d5652ab'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  #add-image {
    width: 80px;
    height: 80px;
    background-color: aqua;
  }
  .upload-image {
    width: 80px;
    height: 80px;
    display: inline;
  }
  img {
    width: 80px;
    height: 80px;
  }
</style>
