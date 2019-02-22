
const host = 'http://dms.api.olfu.xyz/'
const project = ''
const prefix = host + project + ''

let apis = {
  devices: prefix + 'devices',			//设备列表 和 设备搜索（注意：搜索时必须带上keyword参数）
  info: prefix + 'devices/',			//设备详情
  filters: prefix + 'devices/filters', 	//筛选
  jsticket: prefix + 'site/jsticket', 	//js_ticket
  login: prefix + 'user/weworklogin',	//登录
  userinfo: prefix + 'user/view'	//登录(参数传token)
}

export default apis
