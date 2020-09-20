<template>
    <div style="width: 100%;height: 100%">
      <div class="paper-class">
        <el-input
          style="width: 30%;padding: 0 auto;margin-top: 10px"
          placeholder="请输入标题"
          v-model="paper.title"
          clearable>
        </el-input>
        <div>

        </div>
        <div>
          <div class="button-class">
            <el-button size="mini" round>单选题</el-button>
            <el-button size="mini" round>多选题</el-button>
            <el-button size="mini" round>文本题</el-button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "add-paper",
      data(){
          return {
            paper:{
              title:''
            }
         }
      },
      methods:{
        test123(){
          console.log('任建123')
        }
      }
    }
</script>

<style scoped>
  .paper-class{
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin: 20px auto;
    width: 70%;
    height: 100%;
  }
  .button-class{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

</style>
