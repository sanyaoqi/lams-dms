
// import axios from 'axios'
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
  }
}

export default utils
