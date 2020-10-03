import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/NotFound'
import index from '../views/index'
import Login from '../views/login'
import register from '../views/register'
import musicSearch from '../components/music-search'
import musicMine from '../components/music-mine'
import addPaper from '../components/add-paper'
import myPaper from '../components/my-paper';
import updateInfo from '../components/update-info'
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
          component:musicSearch,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path:'musicMine',
          name:musicMine,
          component:musicMine
        },
        {
          path:'addPaper',
          name:addPaper,
          component:addPaper
        },
        {
          path:'myPaper',
          name:myPaper,
          component:myPaper
        },
        {
          path:'updateInfo',
          name:updateInfo,
          component:updateInfo
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
