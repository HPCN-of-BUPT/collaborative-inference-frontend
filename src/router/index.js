import Vue from 'vue'
import Router from 'vue-router'
import Cutting from '@/views/cutting.vue'
import Arrange from '@/views/arrange.vue'
import Test from '@/views/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cutting',
      component: Cutting
    },
    {
      path: '/cutting',
      name: 'cutting',
      component: Cutting
    },
    {
      path: '/arrange',
      name: 'arrange',
      component: Arrange
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
