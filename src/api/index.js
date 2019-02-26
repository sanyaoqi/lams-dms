
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
  repair: prefix + 'reports?device_id='
}

export default apis
