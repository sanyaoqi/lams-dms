import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Devices from '../views/Devices'
import DeviceView from '../views/DeviceView'
import MaintainDetail from '../views/DeviceMaintainDetail'
import RepairDetail from '../views/DeviceRepairDetail'
import AddRepair from '../views/DeviceAddRepair'
import Redirect from '../views/Redirect'
import DeviceScan from '../views/DeviceScan'

Vue.use(Router)

const routes = [
  {
    path: '/devices',
    name: 'devices',
    component: Devices
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/device-view/:id',
    name: 'device-view',
    component: DeviceView
  },
  {
    path: '/maintain-detail/:id',
    name: 'maintain-detail',
    component: MaintainDetail
  },
  {
    path: '/repair-detail/:id',
    name: 'repair-detail',
    component: RepairDetail
  },
  {
    path: '/add-repair',
    name: 'add-repair',
    component: AddRepair
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: Redirect
  },
  {
    path: '/device-scan',
    name: 'device-scan',
    component: DeviceScan
  }
]

export default new Router({
  routes
})
