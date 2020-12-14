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
import addBook from '../components/add-book'
import myBook from '../components/my-book'
import fillResult from '../components/file-result'
import backUser from '../components/back-user'
import mobileUser from '../components/mobile-user'
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
          path:'backUser',
          name:backUser,
          component:backUser
        },
        {
          path:'mobileUser',
          name:mobileUser,
          component:mobileUser
        },
        {
          path:'addPaper',
          name:addPaper,
          component:addPaper
        },
        {
          path:'myBook',
          name:myBook,
          component:myBook
        },
        {
          path:'fillResult',
          name: fillResult,
          component: fillResult
        },
        {
          path:'addBook',
          name:addBook,
          component:addBook
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
