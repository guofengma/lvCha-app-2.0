import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import loading from '@/components/loading'
import lottery from '@/components/lottery'
import grzx from '@/components/grzx'
import jlb from '@/components/jlb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/grzx',
      name: 'grzx',
      component: grzx
    },
    {
      path: '/jlb',
      name: 'jlb',
      component: jlb
    }
  ]
})
