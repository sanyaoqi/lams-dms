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
    <flexbox :gutter="0" class="image-list">
      <flexbox-item :span="1/4" v-for="preview in previews" :key="preview.id" class="upload-image">
        <img :src="preview.fileurl">
      </flexbox-item>
      <flexbox-item :span="1/4">
        <div class="upload-image vux-flexbox-item" id="add-image" @click="clickAddImage">
          <span>+</span>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- 提交 -->
    <div style="margin: 15px;">
      <x-button @click.native="clickSubmit">提交</x-button>
    </div>
    <confirm
      v-model="confirm"
      :close-on-confirm="false"
      :title="$t('提示')"
      :show-cancel-button="false"
      @on-confirm="onConfirm">
        <p style="text-align:center;">{{ this.error_msg }}</p>
      </confirm>
  </div>
</template>

<script>
  import { XHeader, Swiper, SwiperItem, Datetime, XButton, dateFormat, Flexbox, FlexboxItem, Confirm } from 'vux'
  import utils from '@/utils'
  import api from '@/api'

  export default {
    name: 'DeviceAddRepair',
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      Datetime,
      XButton,
      Flexbox,
      FlexboxItem,
      Confirm
    },
    methods: {
      initWxConfig () {
        let signUrl = window.location.href
        this.axios
          .get(api.jssign + '?url=' + signUrl)
          .then(response => {
            console.log('getJssign Api', response.data)
            this.wx_config_data.time_stamp = response.data.data.timestamp
            this.wx_config_data.noncestr = response.data.data.nonce_str
            this.wx_config_data.signature = response.data.data.signature
            // console.log('signature', this.wx_config_data.signature)
            this.$wechat.config({
              beta: true,
              debug: false,
              appId: 'wwa417d520fd30a759',
              timestamp: this.wx_config_data.time_stamp,
              nonceStr: this.wx_config_data.noncestr,
              signature: this.wx_config_data.signature,
              jsApiList: ['getLocalImgData', 'chooseImage']
            })
          })
      },
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
        this.confirm = false
      },
      showConfirm () {
        this.confirm = true
        setTimeout(() => {
          this.confirm = false
        }, 3000)
      },
      clickAddImage () {
        let self = this
        self.$wechat.chooseImage({
          count: 5, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          defaultCameraMode: 'batch', // 表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
          success: function (res) {
            self.localIds = res.localIds // 返回选定照片的本地ID列表，
            // andriod中localId可以作为img标签的src属性显示图片；
            // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
            self.uploadImage(self.localIds.shift())
          },
          fail: function (res) {
            // alert(res.errMsg)
          }
        })
      },
      clickSubmit () {
        if (this.text === '') {
          this.error_msg = '请填写描述'
          this.showConfirm()
          return
        }
        if (this.previews.length === 0) {
          this.error_msg = '请上传图片'
          this.showConfirm()
          return
        }
        let self = this
        var fd = new FormData()
        var imagesStr = ''
        for (var i = 0; i < this.previews.length; i++) {
          if (imagesStr === '') {
            imagesStr = this.previews[i].filekey
          } else {
            imagesStr = imagesStr + ',' + this.previews[i].filekey
          }
        }
        fd.append('device_id', this.device_id)
        fd.append('description', this.text)
        fd.append('time', this.value1)
        fd.append('images', imagesStr)
        // fd.append('token', window.localStorage.getItem('token'))
        // alert(api.addrepair + '?token=' + window.localStorage.getItem('token'))
        self.axios
          .post(api.addrepair + '?token=' + window.localStorage.getItem('token'), fd)
          .then(function (response) {
            // alert(response.data.code)
            if (response.data.code === 200) {
              // alert('报修成功')
              self.$router.go(-1)
            } else if (response.data.code === 5004) {
              utils.deletaUserData()
            } else if (response.data.code === 5009) {
              utils.deletaUserData()
            } else {
              // alert('报修失败' + response.data.code)
              this.error_msg = response.data.code + ':' + response.data.message
              this.showConfirm()
            }
          })
          .catch(function (error) {
            console.log(error)
            // alert(error)
          })
          .finally()
      },
      getDevice (id) {
        this.axios
          .get(api.detail + id)
          .then(response => {
            this.device = response.data.data
            this.demo01_list = [{url: 'javascript:', img: this.device.images}]
            // console.log('val ------>>>>>> ', this.device)
          })
      },
      uploadImage (localId) {
        // alert('start upload image')
        let self = this
        self.$vux.loading.show({
          transition: '',
          text: '图片上传中...'
        })
        self.$wechat.getLocalImgData({
          localId: localId, // 图片的localID
          success: function (res) {
            // alert('getLocalImgData')
            let base64Image = res.localData
            // let prefix = 'base64,'
            // let index = base64Image.indexOf(prefix)
            let actData = base64Image
            // alert(actData)
            var fd = new FormData()
            fd.append('filedata', actData)
            self.axios
              .post(api.uploadimagebase64, fd)
              .then(function (response) {
                // alert('post ImgData')
                self.previews.push(response.data)
                if (self.localIds.length > 0) {
                  self.uploadImage(self.localIds.shift())
                }
              })
              .catch(function (error) {
                console.log(error)
                alert(error)
              })
              .finally()
          },
          fail: function (error) {
            console.log(error)
            // alert('error getLocalImgData')
            // alert(localId)
            self.$wechat.uploadImage({
              localId: localId,
              isShowProgressTips: 1,
              success: function (res) {
                // alert('serverId')
                let serverId = res.serverId
                // alert(serverId)
                var fd = new FormData()
                fd.append('server_id', serverId)
                self.axios
                  .post(api.uploadimageserverId, fd)
                  .then(function (response) {
                    // alert('post ImgData')
                    self.previews.push(response.data)
                    if (self.localIds.length > 0) {
                      self.uploadImage(self.localIds.shift())
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                    alert(error)
                  })
                  .finally()
              }
            })
          }
        })
        self.$vux.loading.hide()
      }
    },
    mounted () {
      this.initWxConfig()
      this.device_id = this.$route.query.device_id
      if (this.device_id <= 0) {
        window.history.go(-1)
      }
      this.getDevice(this.device_id)
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: [],
        value1: dateFormat(new Date(), 'YYYY-MM-DD'),
        device_id: '',
        text: '',
        fullWidth: document.documentElement.clientWidth,
        wx_config_data: {},
        previews: [],
        localIds: [],
        confirm: false,
        error_msg: ''
      }
    }
  }
</script>

<style scoped>
  .image-list {
    padding: 10px;
  }
  #add-image {
    width: 80px;
    height: 80px;
    background-color: #d9d9d9;
    color: #fff;
    font-size: 44px;
  }
  #add-image>span {
    left: 50%;
    position: relative;
    margin-left: -14px;
    font-size: 44px;
  }
  .upload-image {
    width: 80px;
    height: 80px;
    display: inline-block;
  }
  .upload-image>img {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(0, 0, 0, 0.2)
  }
</style>
