
import axios from 'axios'
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
    window.location.href = 'http://device.olfu.xyz/'
  },
  post: function (url, data, callback) {
    axios
      .post(url, data)
      .then(response => {
        if (response.data.code === 200) {
          callback(response.data)
        } else if (response.data.code === 4009) {
          self.deletaUserData()
        } else {
          alert(response.data.code + ':' + response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
        // alert(error)
      })
      .finally()
  },
  get: function (url, callback) {
    let self = this
    axios
      .get(url)
      .then(response => {
        if (response.data.code === 200) {
          callback(response.data)
        } else if (response.data.code === 4009) {
          self.deletaUserData()
        } else {
          alert(response.data.code + ':' + response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
        // alert(error)
      })
      .finally()
  }
}

export default utils
