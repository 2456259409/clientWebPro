<template>
    <div>
      <el-input
        placeholder="输入搜索音乐"
        prefix-icon="el-icon-search"
        class="input-class"
        v-model="keyword">
      </el-input>
      <el-button style="background-color: #409EFF;color: #FFFFFF;" @click="searchAMusic">搜索</el-button>
      <br>
      <el-table
        :data="musics"
        style="width: 60%;margin: 30px auto"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="singer[0].name"
          label="歌手"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="歌曲"
          width="180">
        </el-table-column>
        <el-table-column
          prop="album.name"
          label="专辑"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="时长">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import Api from '../common/api'
    export default {
        name: "music-search",
      data(){
          return{
            keyword:'好听的音乐',
            musics:[]
          }
      },
      methods:{
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        searchAMusic(){
          let data={
            keyword:this.keyword
          };
          Api.LRapiCall('post','/user/search',data).then(resolve=>{
            this.musics=JSON.parse(resolve.data.data).data.song.list;
            console.log(this.musics)
          })
        }
      }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .input-class{
    width: 35%;
  }
</style>
