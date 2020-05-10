import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Letter from '@/components/Letter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Letter',
      component: Letter,
    }
  ]
})
