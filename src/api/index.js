const host = 'http://api.facility.mymicedb.com/'
// const host = 'http://api.lams.com/'
// const host = 'http://admtest.facility.mymicedb.com/'
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
  repairDetail: prefix + 'reports/',
  repairComment: prefix + 'comments?',
  weworkToken: prefix + 'user/weworklogin',
  uploadimageserverId: prefix + 'site/upload-image-serverid',
  addcomment: prefix + 'comment/create',
  acceptReport: prefix + 'report/accept',
  finishRepair: prefix + 'repair/finish',
  closeReport: prefix + 'report/finish',
  score: prefix + 'score/create',
  maintains: prefix + 'device/plan',
  maintain: prefix + 'maintains',
  finishPlan: prefix + 'maintain/finish',
  reportList: prefix + 'reports',
  repairList: prefix + 'repairs',
  autoCloseReport: prefix + 'report/auto-close-report'
}

export default apis
