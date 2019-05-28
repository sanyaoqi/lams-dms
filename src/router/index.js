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
import TestScrollLoad from '../views/TestScrollLoad'
import CommentList from '../views/CommentList'
import ReportList from '../views/ReportList'
import MyMaintains from '../views/MyMaintains'
import MyRepairs from '../views/MyRepairs'
import Reports from '../views/Reports'
import DevicePage from '../views/DevicePage'
import DeviceReports from '../views/DeviceReports'
import DeviceMaintains from '../views/DeviceMaintains'

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
  },
  {
    path: '/comments/:id',
    name: 'comments',
    component: CommentList
  },
  {
    path: '/myreports',
    name: 'myreports',
    component: ReportList
  },
  {
    path: '/myrepairs',
    name: 'myrepairs',
    component: MyRepairs
  },
  {
    path: '/mymaintains',
    name: 'mymaintains',
    component: MyMaintains
  },
  {
    path: '/device/:id',
    name: 'device',
    component: DevicePage
  },
  {
    path: '/device-reports/:id',
    name: 'device-reports',
    component: DeviceReports
  },
  {
    path: '/device-maintains/:id',
    name: 'device-maintains',
    component: DeviceMaintains
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/testscoll',
    name: 'testscoll',
    component: TestScrollLoad
  }
]

export default new Router({
  mode: 'history',
  routes: routes
})
