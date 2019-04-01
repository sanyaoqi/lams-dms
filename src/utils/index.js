
import axios from 'axios'
// import confirm from 'vux'
// import api from '@/api'
// const SIGNURL = 'http://device.olfu.xyz/device-scan'

var utils = {
  dataURLtoBlob: function (dataurl) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },
  deletaUserData: function () {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    window.location.href = '/'
  },
  post: function (url, data, callback, confirm = null) {
    let self = this
    axios
      .post(url, data)
      .then(response => {
        if (response.data.code === 200) {
          callback(response.data)
        } else if (response.data.code === 5009) {
          self.deletaUserData()
        } else {
          console.log(response.data.code + ':' + response.data.message)
          if (confirm !== null) {
            confirm.show({
              title: '提示',
              content: response.data.code + ':' + response.data.message,
              showCancelButton: false
              // 组件除show外的属性
              // onCancel () {
              //   console.log(this) // 非当前 vm
              //   console.log(this) // 当前 vm
              // },
              // onConfirm () {}
            })
          } else {
            alert(response.data.code + ':' + response.data.message)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
        // alert(error.response)
      })
      .finally()
  },
  get: function (url, callback, confirm = null) {
    let self = this
    axios
      .get(url)
      .then(response => {
        if (response.data.code === 200) {
          callback(response.data)
        } else if (response.data.code === 5009) {
          self.deletaUserData()
        } else {
          console.log(response.data.code + ':' + response.data.message)
          if (confirm !== null) {
            confirm.show({
              title: '提示',
              content: response.data.code + ':' + response.data.message,
              showCancelButton: false
              // 组件除show外的属性
              // onCancel () {
              //   console.log(this) // 非当前 vm
              //   console.log(this) // 当前 vm
              // },
              // onConfirm () {}
            })
          }
        }
      })
      .catch(function (error) {
        // alert(url)
        console.log(error)
        // alert(error.response)
      })
      .finally()
  }
}

export default utils
