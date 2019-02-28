<template>
  <div>
    <x-header>报修</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" :show-dots="false" @on-index-change="demo01_onIndexChange"></swiper>
    <datetime
      v-model="value1"
      title="报修日期"
      :readonly='true'></datetime>
    <!-- 维修内容自述 -->
    <div style="margin: 0px; width: 100%;text-align: center;">
      <textarea placeholder="请输入文字内容" style="width: 90%; height: 150px; padding: 10px;text-align: left;" v-model="text">{{ this.text }}</textarea>
    </div>
    <!-- 上传图片 -->
    <div style="margin: 15px">
      <div class="upload-image" v-for="image in images" :key="image.filekey"><img :src="image.fileurl"></div>
      <div class="upload-image" id="add-image" @click="clickAddImage"></div>
    </div>
    <!-- 提交 -->
    <div style="margin: 15px;">
      <x-button @click.native="clickSubmit">提交</x-button>
    </div>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Datetime, XButton, dateFormat } from 'vux'
  import utils from '@/utils'
  import api from '@/api'

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
      },
      clickAddImage () {
        let self = this
        self.$wechat.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          defaultCameraMode: 'batch', // 表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
          success: function (res) {
            let localId = res.localIds[0] // 返回选定照片的本地ID列表，
            // andriod中localId可以作为img标签的src属性显示图片；
            // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
            self.$wechat.getLocalImgData({
              localId: localId, // 图片的localID
              success: function (res) {
                var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                var fd = new FormData()
                fd.append('filedata', localData)
                self.axios
                  .post(api.uploadimagebase64, fd)
                  .then(function (response) {
                    self.images.push(response.data)
                  })
                  .catch(function (error) {
                    console.log(error)
                    alert(error)
                  })
                  .finally()
              },
              fail: function (error) {
                console.log(error)
                alert(error)
              }
            })
          }
        })
      },
      clickSubmit () {
        alert('clickSubmit')
        if (this.text === '') {
          alert('请填写描述')
          return
        }
        if (this.images.length === 0) {
          alert('请上传图片')
          return
        }
        let self = this
        var fd = new FormData()
        var imagesStr = ''
        for (var i = 0; i < this.images.length; i++) {
          if (imagesStr === '') {
            imagesStr = this.images[i].filekey
          } else {
            imagesStr = imagesStr + ',' + this.images[i].filekey
          }
        }
        fd.append('device_id', this.device_id)
        fd.append('description', this.text)
        fd.append('time', this.value1)
        fd.append('images', imagesStr)
        // fd.append('token', window.localStorage.getItem('token'))
        alert(api.addrepair + '?token=' + window.localStorage.getItem('token'))
        self.axios
          .post(api.addrepair + '?token=' + window.localStorage.getItem('token'), fd)
          .then(function (response) {
            alert(response.data.code)
            if (response.data.code === 200) {
              alert('报修成功')
              self.$router.go(-1)
            } else if (response.data.code === 5004) {
              utils.deletaUserData()
            } else if (response.data.code === 5009) {
              utils.deletaUserData()
            } else {
              alert('报修失败' + response.data.code)
            }
          })
          .catch(function (error) {
            console.log(error)
            alert(error)
          })
          .finally()
      }
    },
    mounted () {
      console.log('val ------>>>>>> ', this.$route.query.device_id)
      if (this.$route.query.device) {
        this.demo01_list = [{url: 'javascript:', img: this.$route.query.device.images}]
      }
      this.device_id = this.$route.query.device_id
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: [],
        value1: dateFormat(new Date(), 'YYYY-MM-DD'),
        device_id: '',
        images: [],
        text: '',
        fullWidth: document.documentElement.clientWidth
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
    display: inline-block;
  }
  img {
    width: 80px;
    height: 80px;
  }
</style>
