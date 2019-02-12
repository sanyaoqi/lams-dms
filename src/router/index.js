import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Devices'
import DeviceView from '../views/DeviceView'
import MaintainDetail from '../views/DeviceMaintainDetail'
import RepairDetail from '../views/DeviceRepairDetail'
import AddRepair from '../views/DeviceAddRepair'

Vue.use(Router)

const routes = [
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
  }
]

export default new Router({
  routes
})
