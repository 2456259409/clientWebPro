import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/NotFound'
import index from '../views/index'
import Login from '../views/login'
import register from '../views/register'
import musicSearch from '../components/music-search'
import musicMine from '../components/music-mine'
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {
          path:'musicSearch',
          name:musicSearch,
          component:musicSearch
        },
        {
          path:'musicMine',
          name:musicMine,
          component:musicMine
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
