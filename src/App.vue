<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  font-family: "微软雅黑";  /*  设置字体 */
  margin: 0px auto; /* 去除上下的边距*/
}
#app{
    margin: 0;
}
html,body,#app{
  height: 100vh;
}
</style>
