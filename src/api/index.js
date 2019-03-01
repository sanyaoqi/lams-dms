
const host = 'http://dms.api.olfu.xyz/'
const project = ''
const prefix = host + project + ''

let apis = {
  userauth: prefix + 'user/auth',
  devices: prefix + 'devices',
  detail: prefix + 'devices/',
  filters: prefix + 'devices/filters',
  jsticket: prefix + 'site/jsticket',
  jssign: prefix + 'site/jssign',
  login: prefix + 'user/weworklogin',
  userinfo: prefix + 'user/view',
  redirect: prefix + 'redirect',
  repair: prefix + 'reports?device_id=',
  uploadimage: prefix + 'site/upload',
  uploadimagebase64: prefix + 'site/upload-image-base64',
  addrepair: prefix + 'report/create',
  repairDetail: prefix + 'reports/'
}

export default apis
