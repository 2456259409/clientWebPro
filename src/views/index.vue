<template>
  <el-container class="container-class">
    <el-header>
      <div style="display: flex;justify-content: center;align-items: center">
        <img src="../assets/logo.png" style="height: 60px"/>
        <span style="color: #FFFFFF;margin-left: 20px">剑神一笑</span>
      </div>

      <div class="right-icon">
        <img :src="userInfo.icon?userInfo.icon:defaultIcon" style="border-radius: 50%;width: 35px"/>
        <el-dropdown>
          <span>
           <span>{{userInfo.username}}</span>
           <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#313743"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <div class="item-class">
                <i class="el-icon-location"></i>
                <span style="font-size: 18px">音乐</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="searchMusic">搜索</el-menu-item>
              <el-menu-item index="1-2" @click="mineMusic">我的</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <div class="item-class">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </div>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <div class="item-class">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="item-class">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </div>
            <el-menu-item-group>

              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Api from '../common/api';

  export default {
    name: "index",
    components:{
    },
    data() {
      return {
        userInfo: '',
        defaultIcon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2908207382,1429820199&fm=26&gp=0.jpg'
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // console.log(vm);//当前组件的实例
        let user = Api.getStorageItem('user');
        if (!user) {
          vm.$router.push('/login');
        } else if (user === '过期') {
          localStorage.removeItem('user');
          vm.$message.error('您的登录已经过期，请重新登录');
          vm.$router.push('/login');
        } else {
          vm.userInfo = user;
        }
      });
    },
    methods: {
      logout(){
        console.log('退出');
        localStorage.removeItem("user");
        this.$router.push('/login')
      },
      searchMusic(){
        this.$router.push('/index/musicSearch')
      },
      mineMusic(){
        this.$router.push('/index/musicMine')
      }
    }
  }
</script>

<style scoped>
  .item-class{
    padding-right: 60px;
    padding-left: 0;
  }
  .span-class{
    width: 100%;
  }
  .item-group-class{
    margin-left: 0;
  }
  .el-dropdown{
    margin: auto 5px;
    color: #FFFFFF;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .right-icon {
    display: flex;
    font-size: 20px;
    padding-right: 20px;
  }

  .el-header {
    background-color: #363D3F;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    background-color: #313743;
  }

  .el-main {
    background-color: #E9EDF0;
  }

  .container-class {
    height: 100%;
  }
</style>
