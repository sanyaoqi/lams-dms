
const host = 'http://dms.api.olfu.xyz/'
const project = ''
const prefix = host + project + ''

let apis = {
  devices: prefix + 'devices',
  info: prefix + 'devices/',
  filters: prefix + 'devices/filters',
  jsticket: prefix + 'site/jsticket',
  login: prefix + 'user/weworklogin',
  userinfo: prefix + 'user/view',
  redirect: prefix + 'redirect'
}

export default apis
