<template>
  <div class="allBook">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-top:20px">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Api from '../common/api'
  export default {
    name: "all-book",
    data() {
      return {
        books:[],
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    created(){
      Api.apiCall('get','/book/get_all',{pageNum:1,pageSize:10}).then(resolve=>{
        console.log(resolve,'风云岂是池中物')
      },reject=>{
        console.log('被拒绝了尴尬')
      })
    },
    methods:{
      onSubmit() {
        //Api.a
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .allBook {
    margin: 0 auto;
    width: 70%;
    background: #ffffff;
    height: 100%;
  }
</style>
